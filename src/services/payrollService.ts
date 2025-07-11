
import { payrollQueries } from './payroll/payrollQueries';
import { payrollOperations } from './payroll/payrollOperations';
import { salaryComponentsService } from './payroll/salaryComponentsService';
import { payrollSummaryService } from './payroll/payrollSummaryService';

// Re-export types
export type { PayrollRecord, SalaryComponent, PayrollSummary } from './payroll/types';

// Main payroll service combining all modules
export const payrollService = {
  ...payrollQueries,
  ...payrollOperations,
  ...salaryComponentsService,
  ...payrollSummaryService
};
