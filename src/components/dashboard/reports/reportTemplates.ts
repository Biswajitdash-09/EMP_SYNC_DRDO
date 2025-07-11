
import { DollarSign, TrendingUp, Users, FileText } from 'lucide-react';

export interface ReportTemplate {
  id: number;
  title: string;
  description: string;
  icon: any;
  category: string;
  requiresDateRange: boolean;
  requiresDepartment: boolean;
}

export const reportTemplates: ReportTemplate[] = [
  {
    id: 1,
    title: 'Employee Attendance Report',
    description: 'Generate attendance summary for selected employees and date range',
    icon: Users,
    category: 'HR',
    requiresDateRange: true,
    requiresDepartment: true
  },
  {
    id: 2,
    title: 'Payroll Summary Report',
    description: 'Comprehensive payroll summary with breakdowns and statistics',
    icon: DollarSign,
    category: 'Finance',
    requiresDateRange: true,
    requiresDepartment: false
  },
  {
    id: 3,
    title: 'Performance Analytics',
    description: 'Employee performance metrics and trend analysis',
    icon: TrendingUp,
    category: 'Performance',
    requiresDateRange: true,
    requiresDepartment: true
  },
  {
    id: 4,
    title: 'Custom Data Export',
    description: 'Export custom data sets with filtering and formatting options',
    icon: FileText,
    category: 'Data',
    requiresDateRange: false,
    requiresDepartment: false
  }
];
