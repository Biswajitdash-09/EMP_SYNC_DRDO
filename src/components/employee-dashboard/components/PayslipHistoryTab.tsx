
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/payslipContentGenerator';

interface PayslipHistoryTabProps {
  payslips: any[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  onDownloadHistory: () => void;
  onDownloadPayslip: (payslip: any) => void;
}

const PayslipHistoryTab = ({ 
  payslips, 
  selectedYear, 
  onYearChange, 
  onDownloadHistory, 
  onDownloadPayslip 
}: PayslipHistoryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Payslip History
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={onDownloadHistory}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Summary
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payslips.map((payslip) => (
            <div key={payslip.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{payslip.month} {payslip.year}</h4>
                  <p className="text-sm text-gray-600">Net Salary: {formatCurrency(payslip.netSalary)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={payslip.status === 'Processed' ? 'default' : 'secondary'}>
                    {payslip.status}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDownloadPayslip(payslip)}
                    className="flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayslipHistoryTab;
