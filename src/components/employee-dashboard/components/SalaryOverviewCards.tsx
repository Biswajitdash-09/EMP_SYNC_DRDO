
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/payslipContentGenerator';

interface SalaryOverviewCardsProps {
  employee: {
    salary: {
      basic: number;
      netSalary: number;
    };
  };
  totalAllowances: number;
  totalDeductions: number;
}

const SalaryOverviewCards = ({ employee, totalAllowances, totalDeductions }: SalaryOverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Basic Salary</p>
              <p className="text-2xl font-bold">{formatCurrency(employee.salary.basic)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Allowances</p>
              <p className="text-2xl font-bold">{formatCurrency(totalAllowances)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deductions</p>
              <p className="text-2xl font-bold">{formatCurrency(totalDeductions)}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Salary</p>
              <p className="text-2xl font-bold">{formatCurrency(employee.salary.netSalary)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryOverviewCards;
