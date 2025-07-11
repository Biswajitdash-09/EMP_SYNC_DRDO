import { useToast } from '@/hooks/use-toast';
import { leaveService } from '@/services/leave/leaveService';
import { LeaveType, LeaveRequest, Holiday } from '@/services/leave/types';
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseLeaveOperations = () => {
  const { toast } = useToast();

  const addLeaveRequest = async (requestData: {
    employeeId: string;
    employee: string;
    type: string;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    status: 'pending';
  }) => {
    try {
      console.log('Submitting leave request with IDs:', {
        employee_id: requestData.employeeId,
        leave_type_id: requestData.type,
        dates: { start: requestData.startDate, end: requestData.endDate }
      });

      // Validate that we have proper IDs, not display names
      if (!requestData.employeeId || !requestData.type) {
        throw new Error('Invalid employee or leave type selected - missing IDs');
      }

      await leaveService.createLeaveRequest({
        employee_id: requestData.employeeId, // This should be a valid UUID
        leave_type_id: requestData.type, // This should be a valid UUID
        start_date: requestData.startDate,
        end_date: requestData.endDate,
        days: requestData.days,
        reason: requestData.reason
      });

      toast({
        title: "Success",
        description: "Leave request submitted successfully"
      });
    } catch (err: any) {
      console.error('Error creating leave request:', err);
      
      // Provide more specific error messages
      let errorMessage = "Failed to submit leave request";
      if (err.message?.includes('foreign key') || err.message?.includes('violates')) {
        errorMessage = "Invalid employee or leave type selected. Please refresh the page and try again.";
      } else if (err.message?.includes('not authenticated')) {
        errorMessage = "Please log in to submit leave requests";
      } else if (err.message?.includes('missing IDs')) {
        errorMessage = "Please select a valid employee and leave type";
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const approveLeaveRequest = async (id: string, approvedBy: string, comments?: string) => {
    try {
      // Validate that approvedBy is a valid UUID
      if (!approvedBy) {
        throw new Error('Reviewer ID is required');
      }

      console.log('Approving leave request:', { id, approvedBy, comments });
      
      await leaveService.updateLeaveRequestStatus(id, 'approved', approvedBy, comments);
      
      toast({
        title: "Success",
        description: "Leave request approved successfully"
      });
    } catch (err: any) {
      console.error('Error approving leave request:', err);
      
      let errorMessage = "Failed to approve leave request";
      if (err.message?.includes('uuid')) {
        errorMessage = "Invalid user ID. Please try logging out and back in.";
      } else if (err.message?.includes('not found')) {
        errorMessage = "Leave request not found";
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const rejectLeaveRequest = async (id: string, approvedBy: string, comments: string) => {
    try {
      // Validate that approvedBy is a valid UUID
      if (!approvedBy) {
        throw new Error('Reviewer ID is required');
      }

      console.log('Rejecting leave request:', { id, approvedBy, comments });
      
      await leaveService.updateLeaveRequestStatus(id, 'rejected', approvedBy, comments);
      
      toast({
        title: "Success",
        description: "Leave request rejected"
      });
    } catch (err: any) {
      console.error('Error rejecting leave request:', err);
      
      let errorMessage = "Failed to reject leave request";
      if (err.message?.includes('uuid')) {
        errorMessage = "Invalid user ID. Please try logging out and back in.";
      } else if (err.message?.includes('not found')) {
        errorMessage = "Leave request not found";
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteLeaveRequest = async (id: string) => {
    try {
      await leaveService.deleteLeaveRequest(id);
      
      toast({
        title: "Success",
        description: "Leave request deleted successfully"
      });
    } catch (err) {
      console.error('Error deleting leave request:', err);
      toast({
        title: "Error",
        description: "Failed to delete leave request",
        variant: "destructive"
      });
      throw err;
    }
  };

  const addLeaveType = async (leaveTypeData: Omit<LeaveType, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Ensure all required fields are present, including both database and compatibility fields
      const completeLeaveTypeData = {
        name: leaveTypeData.name,
        description: leaveTypeData.description || '',
        annual_days: leaveTypeData.annual_days || leaveTypeData.maxDays || 0,
        requires_approval: leaveTypeData.requires_approval ?? leaveTypeData.requiresApproval ?? true,
        carry_forward: leaveTypeData.carry_forward ?? leaveTypeData.carryForward ?? false,
        color: leaveTypeData.color || '#3B82F6',
        // Include compatibility fields
        maxDays: leaveTypeData.maxDays || leaveTypeData.annual_days || 0,
        carryForward: leaveTypeData.carryForward ?? leaveTypeData.carry_forward ?? false,
        requiresApproval: leaveTypeData.requiresApproval ?? leaveTypeData.requires_approval ?? true
      };

      await leaveService.createLeaveType(completeLeaveTypeData);
      
      toast({
        title: "Success",
        description: "Leave type created successfully"
      });
    } catch (err) {
      console.error('Error creating leave type:', err);
      toast({
        title: "Error",
        description: "Failed to create leave type. Please check your permissions.",
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateLeaveType = async (id: string, updates: Partial<LeaveType>) => {
    try {
      await leaveService.updateLeaveType(id, updates);
      
      toast({
        title: "Success",
        description: "Leave type updated successfully"
      });
    } catch (err) {
      console.error('Error updating leave type:', err);
      toast({
        title: "Error",
        description: "Failed to update leave type",
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteLeaveType = async (id: string) => {
    try {
      await leaveService.deleteLeaveType(id);
      
      toast({
        title: "Success",
        description: "Leave type deleted successfully"
      });
    } catch (err) {
      console.error('Error deleting leave type:', err);
      toast({
        title: "Error",
        description: "Failed to delete leave type",
        variant: "destructive"
      });
      throw err;
    }
  };

  const addHoliday = async (holidayData: Omit<Holiday, 'id' | 'created_at'>) => {
    try {
      // Ensure all required fields are present and properly formatted
      const completeHolidayData = {
        name: holidayData.name,
        date: holidayData.date,
        type: holidayData.type as 'National' | 'Company' | 'Regional',
        description: holidayData.description || ''
      };

      await leaveService.createHoliday(completeHolidayData);
      
      toast({
        title: "Success",
        description: "Holiday added successfully"
      });
    } catch (err) {
      console.error('Error creating holiday:', err);
      toast({
        title: "Error",
        description: "Failed to add holiday. Please check your permissions.",
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteHoliday = async (id: string) => {
    try {
      await leaveService.deleteHoliday(id);
      
      toast({
        title: "Success",
        description: "Holiday deleted successfully"
      });
    } catch (err) {
      console.error('Error deleting holiday:', err);
      toast({
        title: "Error",
        description: "Failed to delete holiday",
        variant: "destructive"
      });
      throw err;
    }
  };

  const getAvailableBalance = async (employeeId: string, leaveTypeId: string): Promise<number> => {
    try {
      return await leaveService.getAvailableBalance(employeeId, leaveTypeId);
    } catch (err) {
      console.error('Error getting available balance:', err);
      return 0;
    }
  };

  return {
    addLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest,
    addLeaveType,
    updateLeaveType,
    deleteLeaveType,
    addHoliday,
    deleteHoliday,
    getAvailableBalance
  };
};
