
import { supabase } from '@/integrations/supabase/client';
import { PayrollRecord } from './types';

export const payrollOperations = {
  // Process payroll - update status to Processed
  async processPayroll(payPeriod: string = 'June 2024'): Promise<PayrollRecord[]> {
    try {
      const { data, error } = await supabase
        .from('payroll')
        .update({ status: 'Processed' })
        .eq('pay_period', payPeriod)
        .eq('status', 'Pending')
        .select();

      if (error) {
        console.error('Error processing payroll:', error);
        throw error;
      }

      return (data || []).map(record => ({
        ...record,
        status: record.status as 'Processed' | 'Pending'
      }));
    } catch (error) {
      console.error('Error in processPayroll:', error);
      throw error;
    }
  },

  // Initialize payroll from employee records
  async initializePayrollFromEmployees(payPeriod: string = 'June 2024'): Promise<void> {
    try {
      // First check if payroll already exists for this period
      const { data: existingRecords } = await supabase
        .from('payroll')
        .select('id')
        .eq('pay_period', payPeriod);

      if (existingRecords && existingRecords.length > 0) {
        console.log('Payroll already initialized for period:', payPeriod);
        return;
      }

      // Fetch employees from the employees table
      const { data: employees, error } = await supabase
        .from('employees')
        .select('employee_id, name, base_salary')
        .eq('status', 'Active');

      if (error) {
        console.error('Error fetching employees:', error);
        throw error;
      }

      if (!employees || employees.length === 0) {
        console.log('No active employees found');
        return;
      }

      // Create payroll records for each employee
      const payrollRecords = employees.map(emp => ({
        employee_id: emp.employee_id,
        employee_name: emp.name,
        base_salary: emp.base_salary || 0,
        bonuses: 0,
        deductions: Math.round((emp.base_salary || 0) * 0.25), // 25% deductions
        status: 'Pending' as const,
        pay_period: payPeriod
      }));

      const { error: insertError } = await supabase
        .from('payroll')
        .insert(payrollRecords);

      if (insertError) {
        console.error('Error initializing payroll records:', insertError);
        throw insertError;
      }

      console.log(`Initialized payroll for ${payrollRecords.length} employees`);
    } catch (error) {
      console.error('Error in initializePayrollFromEmployees:', error);
      throw error;
    }
  }
};
