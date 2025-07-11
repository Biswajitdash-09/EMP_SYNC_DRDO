
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { LeaveType } from '@/services/leave/leaveService';
import { supabase } from '@/integrations/supabase/client';

const leaveRequestSchema = z.object({
  employee: z.string().min(1, "Employee is required"),
  type: z.string().min(1, "Leave type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().min(10, "Reason must be at least 10 characters")
});

type LeaveRequestForm = z.infer<typeof leaveRequestSchema>;

interface Employee {
  id: string;
  name: string;
}

interface NewLeaveRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  leaveTypes: LeaveType[];
  employees: Employee[];
  getAvailableBalance: (employeeId: string, leaveTypeId: string) => Promise<number>;
  onSuccess?: () => void; // Add callback for successful submission
}

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const NewLeaveRequestModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  leaveTypes, 
  employees,
  getAvailableBalance,
  onSuccess
}: NewLeaveRequestModalProps) => {
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [availableBalance, setAvailableBalance] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [refreshedData, setRefreshedData] = useState(false);

  const form = useForm<LeaveRequestForm>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      employee: '',
      type: '',
      startDate: '',
      endDate: '',
      reason: ''
    }
  });

  // Refresh data when modal opens
  useEffect(() => {
    if (open && !refreshedData) {
      console.log('Modal opened - checking data freshness');
      console.log('Available employees:', employees.length);
      console.log('Available leave types:', leaveTypes.length);
      setRefreshedData(true);
    }
  }, [open, employees, leaveTypes, refreshedData]);

  // Reset form and state when modal closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setSelectedEmployee('');
      setSelectedLeaveType('');
      setAvailableBalance(0);
      setRefreshedData(false);
    }
  }, [open, form]);

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const watchedStartDate = form.watch('startDate');
  const watchedEndDate = form.watch('endDate');
  const calculatedDays = calculateDays(watchedStartDate, watchedEndDate);

  // Update available balance when employee or leave type changes
  const updateAvailableBalance = async (employeeId: string, leaveTypeId: string) => {
    if (employeeId && leaveTypeId) {
      // Validate UUIDs before making request
      if (!UUID_REGEX.test(employeeId) || !UUID_REGEX.test(leaveTypeId)) {
        console.error('Invalid UUID format:', { employeeId, leaveTypeId });
        setAvailableBalance(0);
        return;
      }

      try {
        const balance = await getAvailableBalance(employeeId, leaveTypeId);
        setAvailableBalance(balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setAvailableBalance(0);
      }
    } else {
      setAvailableBalance(0);
    }
  };

  const validateAuthAndFormData = async (data: LeaveRequestForm) => {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('You must be logged in to submit a leave request.');
    }

    // Trim and sanitize inputs
    const sanitizedData = {
      employee: data.employee?.trim(),
      type: data.type?.trim(),
      startDate: data.startDate?.trim(),
      endDate: data.endDate?.trim(),
      reason: data.reason?.trim()
    };

    // Validate UUIDs
    if (!UUID_REGEX.test(sanitizedData.employee)) {
      throw new Error('Invalid employee ID format. Please reselect the employee.');
    }

    if (!UUID_REGEX.test(sanitizedData.type)) {
      throw new Error('Invalid leave type ID format. Please reselect the leave type.');
    }

    // Validate that we can find the selected items
    const selectedEmp = employees.find(emp => emp.id === sanitizedData.employee);
    const selectedTypeObj = leaveTypes.find(type => type.id === sanitizedData.type);
    
    if (!selectedEmp) {
      throw new Error('Selected employee not found. Please refresh and try again.');
    }

    if (!selectedTypeObj) {
      throw new Error('Leave type not found. Please contact admin.');
    }

    // Validate dates
    const startDate = new Date(sanitizedData.startDate);
    const endDate = new Date(sanitizedData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new Error('Start date cannot be in the past.');
    }

    if (endDate < startDate) {
      throw new Error('End date cannot be before start date.');
    }

    return { sanitizedData, selectedEmp, selectedTypeObj, user };
  };

  const handleSubmit = async (data: LeaveRequestForm) => {
    if (submitting) return;
    
    setSubmitting(true);
    
    try {
      // Validate authentication and form data
      const { sanitizedData, selectedEmp, selectedTypeObj, user } = await validateAuthAndFormData(data);
      
      // Check leave balance
      if (calculatedDays > availableBalance) {
        toast({
          title: "Insufficient Balance",
          description: `You only have ${availableBalance} days available for this leave type.`,
          variant: "destructive"
        });
        return;
      }

      const requestData = {
        employeeId: sanitizedData.employee, // UUID from profiles table
        employee: selectedEmp.name, // Display name for compatibility
        type: sanitizedData.type, // UUID from leave_types table
        startDate: sanitizedData.startDate,
        endDate: sanitizedData.endDate,
        days: calculatedDays,
        reason: sanitizedData.reason,
        status: 'pending' as const
      };

      console.log('Submitting leave request with validated data:', {
        employee_id: requestData.employeeId,
        leave_type_id: requestData.type,
        user_id: user.id,
        dates: { start: requestData.startDate, end: requestData.endDate },
        days: requestData.days
      });

      await onSubmit(requestData);
      
      form.reset();
      setSelectedEmployee('');
      setSelectedLeaveType('');
      setAvailableBalance(0);
      onClose();
      
      // Call success callback to refresh data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error submitting leave request:', error);
      
      let errorMessage = "Failed to submit leave request";
      if (error.message?.includes('must be logged in')) {
        errorMessage = "You must be logged in to submit leave requests.";
      } else if (error.message?.includes('Leave type not found')) {
        errorMessage = "Leave type not found. Please contact admin.";
      } else if (error.message?.includes('Invalid') || error.message?.includes('not found')) {
        errorMessage = error.message;
      } else if (error.message?.includes('foreign key') || error.message?.includes('violates')) {
        errorMessage = "Could not match selected employee or leave type. Please reselect or reload.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            New Leave Request
          </DialogTitle>
          <DialogDescription>
            Submit a new leave request for approval
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedEmployee(value);
                      updateAvailableBalance(value, selectedLeaveType);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedLeaveType(value);
                      updateAvailableBalance(selectedEmployee, value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leaveTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} (Max: {type.annual_days} days)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedEmployee && selectedLeaveType && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>Available Balance: {availableBalance} days</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} min={watchedStartDate || new Date().toISOString().split('T')[0]} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {calculatedDays > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium">
                  Total days: {calculatedDays}
                  {calculatedDays > availableBalance && (
                    <span className="text-red-600 ml-2">
                      (Exceeds available balance)
                    </span>
                  )}
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide a detailed reason for your leave request..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={submitting || (calculatedDays > 0 && calculatedDays > availableBalance)}
                className="min-w-[120px]"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeaveRequestModal;
