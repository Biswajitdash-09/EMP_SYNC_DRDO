
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { leaveTypeSchema, LeaveTypeForm } from './schemas/leaveTypeSchema';
import ColorPicker from './ColorPicker';
import LeaveTypeSettings from './LeaveTypeSettings';

interface LeaveType {
  id: string;
  name: string;
  description: string;
  annual_days: number;
  carry_forward: boolean;
  requires_approval: boolean;
  color: string;
}

interface LeaveTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<LeaveType, 'id'>) => void;
  leaveType?: LeaveType;
  isEdit?: boolean;
}

const LeaveTypeModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  leaveType, 
  isEdit = false 
}: LeaveTypeModalProps) => {
  const { toast } = useToast();

  const form = useForm<LeaveTypeForm>({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: {
      name: leaveType?.name || '',
      description: leaveType?.description || '',
      maxDays: leaveType?.annual_days || 1,
      carryForward: leaveType?.carry_forward || false,
      requiresApproval: leaveType?.requires_approval || true,
      color: leaveType?.color || 'blue'
    }
  });

  const handleSubmit = (data: LeaveTypeForm) => {
    // Transform form data to match service layer expectations
    const leaveTypeData = {
      name: data.name,
      description: data.description,
      annual_days: data.maxDays,
      carry_forward: data.carryForward,
      requires_approval: data.requiresApproval,
      color: data.color
    };
    
    onSubmit(leaveTypeData);
    if (!isEdit) {
      form.reset();
    }
    toast({
      title: isEdit ? "Leave Type Updated" : "Leave Type Created",
      description: `${data.name} has been ${isEdit ? 'updated' : 'created'} successfully.`
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {isEdit ? 'Edit Leave Type' : 'Configure Leave Type'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the leave type configuration' : 'Create a new leave type with custom settings'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Vacation Leave" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe this leave type..."
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Days Per Year</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ColorPicker control={form.control} />

            <LeaveTypeSettings control={form.control} />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEdit ? 'Update' : 'Create'} Leave Type
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveTypeModal;
