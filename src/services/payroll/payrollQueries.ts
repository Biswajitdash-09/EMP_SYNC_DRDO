
import { supabase } from '@/integrations/supabase/client';
import { PayrollRecord } from './types';

export const payrollQueries = {
  // Fetch all payroll records for current period
  async getPayrollRecords(payPeriod: string = 'June 2024'): Promise<PayrollRecord[]> {
    try {
      const { data, error } = await supabase
        .from('payroll')
        .select('*')
        .eq('pay_period', payPeriod)
        .order('employee_name');

      if (error) {
        console.error('Error fetching payroll records:', error);
        throw error;
      }

      return (data || []).map(record => ({
        ...record,
        status: record.status as 'Processed' | 'Pending'
      }));
    } catch (error) {
      console.error('Error in getPayrollRecords:', error);
      throw error;
    }
  },

  // Create new payroll record
  async createPayrollRecord(record: Omit<PayrollRecord, 'id' | 'created_at' | 'updated_at' | 'net_pay'>): Promise<PayrollRecord> {
    try {
      const { data, error } = await supabase
        .from('payroll')
        .insert(record)
        .select()
        .single();

      if (error) {
        console.error('Error creating payroll record:', error);
        throw error;
      }

      return {
        ...data,
        status: data.status as 'Processed' | 'Pending'
      };
    } catch (error) {
      console.error('Error in createPayrollRecord:', error);
      throw error;
    }
  },

  // Update payroll record
  async updatePayrollRecord(id: string, updates: Partial<PayrollRecord>): Promise<PayrollRecord> {
    try {
      const { data, error } = await supabase
        .from('payroll')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating payroll record:', error);
        throw error;
      }

      return {
        ...data,
        status: data.status as 'Processed' | 'Pending'
      };
    } catch (error) {
      console.error('Error in updatePayrollRecord:', error);
      throw error;
    }
  }
};
