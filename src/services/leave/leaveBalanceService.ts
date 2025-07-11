
import { supabase } from '@/integrations/supabase/client';
import { LeaveBalance } from './types';

export const leaveBalanceService = {
  async getLeaveBalances(): Promise<LeaveBalance[]> {
    try {
      const { data, error } = await supabase
        .from('leave_balances')
        .select(`
          *,
          employee:profiles!employee_id(full_name),
          leave_type:leave_types(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Leave balances table not found:', error);
        return [];
      }
      
      return (data || []).map((balance: any) => ({
        ...balance,
        employee_name: balance.employee?.full_name || 'Unknown',
        leave_type_name: balance.leave_type?.name || 'Unknown'
      }));
    } catch (error) {
      console.warn('Error fetching leave balances:', error);
      return [];
    }
  },

  async getAvailableBalance(employeeId: string, leaveTypeId: string): Promise<number> {
    try {
      // First check if employee exists in profiles table
      const { data: profileCheck } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', employeeId)
        .single();

      if (!profileCheck) {
        console.warn('Employee not found in profiles table:', employeeId);
        return 0;
      }

      const { data, error } = await supabase
        .from('leave_balances')
        .select('available_days')
        .eq('employee_id', employeeId)
        .eq('leave_type_id', leaveTypeId)
        .eq('year', new Date().getFullYear())
        .single();
      
      if (error) {
        console.warn('No leave balance found, seeding default balance');
        // Call the database function to seed balances
        const { error: seedError } = await supabase.rpc('seed_employee_leave_balances', {
          employee_uuid: employeeId
        });
        
        if (seedError) {
          console.error('Error seeding leave balances:', seedError);
          return 0;
        }
        
        // Try to fetch again after seeding
        const { data: newData } = await supabase
          .from('leave_balances')
          .select('available_days')
          .eq('employee_id', employeeId)
          .eq('leave_type_id', leaveTypeId)
          .eq('year', new Date().getFullYear())
          .single();
        
        return newData?.available_days || 0;
      }
      
      return data?.available_days || 0;
    } catch (error) {
      console.error('Error getting available balance:', error);
      return 0;
    }
  }
};
