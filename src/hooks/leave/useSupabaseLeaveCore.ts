
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LeaveType, LeaveRequest, LeaveBalance, Holiday } from '@/services/leave/types';
import { leaveService } from '@/services/leave/leaveService';

export const useSupabaseLeaveCore = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [typesData, requestsData, balancesData, holidaysData] = await Promise.all([
        leaveService.getLeaveTypes(),
        leaveService.getLeaveRequests(),
        leaveService.getLeaveBalances(),
        leaveService.getHolidays()
      ]);

      setLeaveTypes(typesData);
      setLeaveRequests(requestsData);
      setLeaveBalances(balancesData);
      setHolidays(holidaysData);
    } catch (err) {
      console.error('Error loading leave data:', err);
      setError('Failed to load leave management data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    loadAllData();
  }, []);

  // Realtime subscriptions
  useEffect(() => {
    const channels = [
      supabase
        .channel('leave_requests_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'leave_requests' }, () => {
          leaveService.getLeaveRequests().then(setLeaveRequests);
        })
        .subscribe(),
      
      supabase
        .channel('leave_types_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'leave_types' }, () => {
          leaveService.getLeaveTypes().then(setLeaveTypes);
        })
        .subscribe(),
      
      supabase
        .channel('holidays_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'holidays' }, () => {
          leaveService.getHolidays().then(setHolidays);
        })
        .subscribe()
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, []);

  return {
    leaveTypes,
    leaveRequests,
    leaveBalances,
    holidays,
    loading,
    error,
    refreshData: loadAllData
  };
};
