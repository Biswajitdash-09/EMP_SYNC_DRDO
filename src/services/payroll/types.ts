
export interface PayrollRecord {
  id: string;
  employee_id: string;
  employee_name: string;
  base_salary: number;
  bonuses: number;
  deductions: number;
  net_pay: number;
  status: 'Processed' | 'Pending';
  pay_period: string;
  created_at: string;
  updated_at: string;
}

export interface SalaryComponent {
  id: string;
  name: string;
  type: 'earning' | 'deduction' | 'benefit';
  value: string;
  editable: boolean;
  created_at: string;
  updated_at: string;
}

export interface PayrollSummary {
  totalPayroll: number;
  employeesPaid: number;
  totalEmployees: number;
  taxDeductions: number;
  nextPayDate: string;
}
