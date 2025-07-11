
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';
import { formatCurrency } from '../utils/payslipContentGenerator';

interface CurrentPayslipTabProps {
  currentPayslip: any;
  onDownload: () => void;
}

const CurrentPayslipTab = ({ currentPayslip, onDownload }: CurrentPayslipTabProps) => {
  // Safely calculate total deductions with proper type checking
  const totalDeductions = currentPayslip?.deductions 
    ? Object.values(currentPayslip.deductions)
        .filter((amount): amount is number => typeof amount === 'number')
        .reduce((sum: number, amount: number) => sum + amount, 0)
    : 0;

  // Safely get allowance values with default fallbacks
  const getAmount = (value: unknown): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Current Payslip - {currentPayslip?.month || 'N/A'} {currentPayslip?.year || 'N/A'}
          </CardTitle>
          <Button 
            onClick={onDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Earnings */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-green-700">Earnings</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Basic Salary</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.basicSalary))}</span>
              </div>
              <div className="flex justify-between">
                <span>House Rent Allowance</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.allowances?.hra))}</span>
              </div>
              <div className="flex justify-between">
                <span>Transport Allowance</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.allowances?.transport))}</span>
              </div>
              <div className="flex justify-between">
                <span>Medical Allowance</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.allowances?.medical))}</span>
              </div>
              <div className="flex justify-between">
                <span>Other Allowances</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.allowances?.other))}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Gross Salary</span>
                  <span>{formatCurrency(getAmount(currentPayslip?.grossSalary))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-red-700">Deductions</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Income Tax</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.deductions?.tax))}</span>
              </div>
              <div className="flex justify-between">
                <span>Provident Fund</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.deductions?.providentFund))}</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance Premium</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.deductions?.insurance))}</span>
              </div>
              <div className="flex justify-between">
                <span>Other Deductions</span>
                <span className="font-medium">{formatCurrency(getAmount(currentPayslip?.deductions?.other))}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Deductions</span>
                  <span>{formatCurrency(totalDeductions)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Net Salary</span>
            <span className="text-2xl font-bold text-blue-600">{formatCurrency(getAmount(currentPayslip?.netSalary))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPayslipTab;
