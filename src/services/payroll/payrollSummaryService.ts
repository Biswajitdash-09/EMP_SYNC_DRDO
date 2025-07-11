
import { PayrollSummary } from './types';
import { payrollQueries } from './payrollQueries';

export const payrollSummaryService = {
  // Get payroll summary statistics
  async getPayrollSummary(payPeriod: string = 'June 2024'): Promise<PayrollSummary> {
    try {
      const records = await payrollQueries.getPayrollRecords(payPeriod);
      
      const processedRecords = records.filter(r => r.status === 'Processed');
      const totalPayroll = processedRecords.reduce((sum, r) => sum + r.net_pay, 0);
      const taxDeductions = records.reduce((sum, r) => sum + r.deductions, 0);

      return {
        totalPayroll,
        employeesPaid: processedRecords.length,
        totalEmployees: records.length,
        taxDeductions,
        nextPayDate: 'July 1, 2024'
      };
    } catch (error) {
      console.error('Error in getPayrollSummary:', error);
      throw error;
    }
  }
};
