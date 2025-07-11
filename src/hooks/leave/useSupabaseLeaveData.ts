
import { useState, useEffect, useCallback } from 'react';
import { useSupabaseLeaveCore } from './useSupabaseLeaveCore';
import { useRealtimeLeaveRequests } from './useRealtimeLeaveRequests';
import { leaveService } from '@/services/leave/leaveService';
import { useToast } from '@/hooks/use-toast';
import { LeaveRequest, LeaveType, Holiday } from '@/services/leave/types';

export const useSupabaseLeaveData = () => {
  const { toast } = useToast();
  const {
    leaveTypes,
    leaveRequests: coreLeaveRequests,
    leaveBalances,
    holidays,
    loading,
    error,
    refreshData
  } = useSupabaseLeaveCore();

  // Use real-time hook for leave requests
  const { leaveRequests: realtimeLeaveRequests } = useRealtimeLeaveRequests(coreLeaveRequests);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [employeeFilter, setEmployeeFilter] = useState<string>('all');

  // Filtered leave requests based on real-time data
  const filteredLeaveRequests = realtimeLeaveRequests.filter(request => {
    if (statusFilter !== 'all' && request.status !== statusFilter) return false;
    if (typeFilter !== 'all' && request.leave_type_id !== typeFilter) return false;
    if (employeeFilter !== 'all' && request.employee_id !== employeeFilter) return false;
    return true;
  });

  // Statistics
  const pendingRequests = realtimeLeaveRequests.filter(req => req.status === 'pending').length;
  const approvedThisMonth = realtimeLeaveRequests.filter(req => {
    if (req.status !== 'approved') return false;
    const reviewedDate = new Date(req.reviewed_date || req.created_at);
    const now = new Date();
    return reviewedDate.getMonth() === now.getMonth() && 
           reviewedDate.getFullYear() === now.getFullYear();
  }).length;

  // CRUD operations with real-time updates
  const addLeaveRequest = useCallback(async (requestData: any) => {
    try {
      console.log('Adding leave request:', requestData);
      
      const newRequest = await leaveService.createLeaveRequest({
        employee_id: requestData.employeeId,
        leave_type_id: requestData.type,
        start_date: requestData.startDate,
        end_date: requestData.endDate,
        days: requestData.days,
        reason: requestData.reason
      });

      toast({
        title: "Leave Request Submitted",
        description: "Your leave request has been submitted successfully.",
      });

      return newRequest;
    } catch (error) {
      console.error('Error adding leave request:', error);
      toast({
        title: "Error",
        description: "Failed to submit leave request. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  const approveLeaveRequest = useCallback(async (id: string, approvedBy: string, comments?: string) => {
    try {
      await leaveService.updateLeaveRequestStatus(id, 'approved', approvedBy, comments);
      
      toast({
        title: "Leave Request Approved",
        description: "The leave request has been approved successfully.",
      });
    } catch (error) {
      console.error('Error approving leave request:', error);
      toast({
        title: "Error",
        description: "Failed to approve leave request. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  const rejectLeaveRequest = useCallback(async (id: string, approvedBy: string, comments: string) => {
    try {
      await leaveService.updateLeaveRequestStatus(id, 'rejected', approvedBy, comments);
      
      toast({
        title: "Leave Request Rejected",
        description: "The leave request has been rejected.",
      });
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      toast({
        title: "Error",
        description: "Failed to reject leave request. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  const deleteLeaveRequest = useCallback(async (id: string) => {
    try {
      await leaveService.deleteLeaveRequest(id);
      
      toast({
        title: "Leave Request Deleted",
        description: "The leave request has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting leave request:', error);
      toast({
        title: "Error",
        description: "Failed to delete leave request. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  // Leave type operations
  const addLeaveType = useCallback(async (typeData: Omit<LeaveType, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await leaveService.createLeaveType(typeData);
      await refreshData();
      
      toast({
        title: "Leave Type Added",
        description: "New leave type has been created successfully.",
      });
    } catch (error) {
      console.error('Error adding leave type:', error);
      toast({
        title: "Error",
        description: "Failed to create leave type. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [refreshData, toast]);

  const updateLeaveType = useCallback(async (id: string, typeData: Partial<LeaveType>) => {
    try {
      await leaveService.updateLeaveType(id, typeData);
      await refreshData();
      
      toast({
        title: "Leave Type Updated",
        description: "Leave type has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating leave type:', error);
      toast({
        title: "Error",
        description: "Failed to update leave type. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [refreshData, toast]);

  const deleteLeaveType = useCallback(async (id: string) => {
    try {
      await leaveService.deleteLeaveType(id);
      await refreshData();
      
      toast({
        title: "Leave Type Deleted",
        description: "Leave type has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting leave type:', error);
      toast({
        title: "Error",
        description: "Failed to delete leave type. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [refreshData, toast]);

  // Holiday operations
  const addHoliday = useCallback(async (holidayData: Omit<Holiday, 'id' | 'created_at'>) => {
    try {
      await leaveService.createHoliday(holidayData);
      await refreshData();
      
      toast({
        title: "Holiday Added",
        description: "New holiday has been created successfully.",
      });
    } catch (error) {
      console.error('Error adding holiday:', error);
      toast({
        title: "Error",
        description: "Failed to create holiday. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [refreshData, toast]);

  const deleteHoliday = useCallback(async (id: string) => {
    try {
      await leaveService.deleteHoliday(id);
      await refreshData();
      
      toast({
        title: "Holiday Deleted",
        description: "Holiday has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting holiday:', error);
      toast({
        title: "Error",
        description: "Failed to delete holiday. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }, [refreshData, toast]);

  // Get available balance
  const getAvailableBalance = useCallback(async (employeeId: string, leaveTypeId: string): Promise<number> => {
    try {
      return await leaveService.getAvailableBalance(employeeId, leaveTypeId);
    } catch (error) {
      console.error('Error getting available balance:', error);
      return 0;
    }
  }, []);

  return {
    // Data with real-time updates
    leaveRequests: filteredLeaveRequests,
    allLeaveRequests: realtimeLeaveRequests, // All requests without filtering
    leaveBalances,
    leaveTypes,
    holidays,
    loading,
    error,

    // Filter states
    statusFilter,
    typeFilter,
    employeeFilter,
    setStatusFilter,
    setTypeFilter,
    setEmployeeFilter,

    // Statistics
    pendingRequests,
    approvedThisMonth,

    // CRUD operations
    addLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest,
    addLeaveType,
    updateLeaveType,
    deleteLeaveType,
    addHoliday,
    deleteHoliday,
    getAvailableBalance,
    refreshData
  };
};
