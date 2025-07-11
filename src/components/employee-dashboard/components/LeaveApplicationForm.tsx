/**
 * Leave Application Form Component
 * Handles the leave application form logic and UI
 * Enhanced with better validation and error handling
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addLeaveRequest } from '@/services/leaveRequestService';

interface LeaveBalance {
  annual: number;
  sick: number;
  personal: number;
}

interface Employee {
  id: string;
  name: string;
  leaveBalance: LeaveBalance;
}

interface LeaveApplicationFormProps {
  employee: Employee;
}

const LeaveApplicationForm = ({ employee }: LeaveApplicationFormProps) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.type) {
      errors.type = 'Please select a leave type';
    }
    
    if (!formData.startDate) {
      errors.startDate = 'Please select a start date';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'Please select an end date';
    }
    
    if (!formData.reason.trim()) {
      errors.reason = 'Please provide a reason for your leave';
    }
    
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate < startDate) {
        errors.endDate = 'End date cannot be before start date';
      }
      
      if (startDate < new Date(new Date().toDateString())) {
        errors.startDate = 'Start date cannot be in the past';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    } catch (error) {
      console.error('Error calculating days:', error);
      return 0;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const days = calculateDays(formData.startDate, formData.endDate);
      
      // Check leave balance
      const leaveType = formData.type.toLowerCase().replace(' leave', '');
      const availableBalance = employee.leaveBalance[leaveType as keyof typeof employee.leaveBalance];
      
      if (days > availableBalance) {
        toast({
          title: "Insufficient Leave Balance",
          description: `You only have ${availableBalance} days of ${formData.type.toLowerCase()} remaining. You requested ${days} days.`,
          variant: "destructive",
        });
        return;
      }

      // Submit leave request
      const leaveRequest = addLeaveRequest({
        employeeId: employee.id,
        employeeName: employee.name,
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days,
        reason: formData.reason
      });

      toast({
        title: "Leave Application Submitted",
        description: `Your ${formData.type.toLowerCase()} application for ${days} days has been submitted for approval.`,
      });

      // Reset form
      setFormData({
        type: '',
        startDate: '',
        endDate: '',
        reason: ''
      });
      setFormErrors({});
      setShowForm(false);
      
      console.log('✅ Leave application submitted successfully:', leaveRequest);
      
    } catch (error) {
      console.error('❌ Error submitting leave application:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit your leave application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      type: '',
      startDate: '',
      endDate: '',
      reason: ''
    });
    setFormErrors({});
    setShowForm(false);
  };

  const days = calculateDays(formData.startDate, formData.endDate);
  const leaveType = formData.type.toLowerCase().replace(' leave', '');
  const availableBalance = employee.leaveBalance[leaveType as keyof typeof employee.leaveBalance] || 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Apply for Leave
          </CardTitle>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            variant="outline"
            disabled={isSubmitting}
          >
            {showForm ? 'Cancel' : 'New Application'}
          </Button>
        </div>
      </CardHeader>
      
      {showForm && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="leaveType">Leave Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => {
                    setFormData({...formData, type: value});
                    if (formErrors.type) {
                      setFormErrors({...formErrors, type: ''});
                    }
                  }}
                >
                  <SelectTrigger className={formErrors.type ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Annual Leave">Annual Leave ({employee.leaveBalance.annual} days available)</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave ({employee.leaveBalance.sick} days available)</SelectItem>
                    <SelectItem value="Personal Leave">Personal Leave ({employee.leaveBalance.personal} days available)</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.type && <p className="text-sm text-red-500 mt-1">{formErrors.type}</p>}
              </div>
              
              <div>
                <Label htmlFor="days">Calculated Days</Label>
                <Input 
                  value={days} 
                  readOnly 
                  className="bg-gray-50 dark:bg-gray-800"
                />
                {days > 0 && formData.type && (
                  <p className="text-sm text-gray-600 mt-1">
                    {days > availableBalance ? 
                      <span className="text-red-500">⚠️ Exceeds available balance ({availableBalance} days)</span> :
                      <span className="text-green-600">✅ Within available balance ({availableBalance} days)</span>
                    }
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input 
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => {
                    setFormData({...formData, startDate: e.target.value});
                    if (formErrors.startDate) {
                      setFormErrors({...formErrors, startDate: ''});
                    }
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className={formErrors.startDate ? 'border-red-500' : ''}
                />
                {formErrors.startDate && <p className="text-sm text-red-500 mt-1">{formErrors.startDate}</p>}
              </div>
              
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input 
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => {
                    setFormData({...formData, endDate: e.target.value});
                    if (formErrors.endDate) {
                      setFormErrors({...formErrors, endDate: ''});
                    }
                  }}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className={formErrors.endDate ? 'border-red-500' : ''}
                />
                {formErrors.endDate && <p className="text-sm text-red-500 mt-1">{formErrors.endDate}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="reason">Reason *</Label>
              <Textarea 
                placeholder="Please provide a detailed reason for your leave application..."
                value={formData.reason}
                onChange={(e) => {
                  setFormData({...formData, reason: e.target.value});
                  if (formErrors.reason) {
                    setFormErrors({...formErrors, reason: ''});
                  }
                }}
                rows={3}
                className={formErrors.reason ? 'border-red-500' : ''}
              />
              {formErrors.reason && <p className="text-sm text-red-500 mt-1">{formErrors.reason}</p>}
            </div>

            {days > availableBalance && formData.type && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your request for {days} days exceeds your available {formData.type.toLowerCase()} balance of {availableBalance} days.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting || days > availableBalance}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Submit Application
                  </div>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
};

export default LeaveApplicationForm;
