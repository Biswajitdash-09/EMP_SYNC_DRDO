
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from 'lucide-react';
import { PayrollRecord } from '@/services/payrollService';

interface PayrollDetailModalProps {
  employee: PayrollRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

const PayrollDetailModal = ({ employee, isOpen, onClose }: PayrollDetailModalProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Payroll Details - {employee.employee_name}
          </DialogTitle>
          <DialogDescription>
            Detailed breakdown of payroll components for {employee.employee_id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Employee ID</label>
              <p className="text-lg font-semibold">{employee.employee_id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Employee Name</label>
              <p className="text-lg font-semibold">{employee.employee_name}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Payroll Breakdown</h4>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-800 mb-2">Earnings</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Salary</span>
                  <span className="font-medium">{formatCurrency(employee.base_salary)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonuses & Incentives</span>
                  <span className="font-medium">{formatCurrency(employee.bonuses)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Gross Salary</span>
                    <span>{formatCurrency(employee.base_salary + employee.bonuses)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h5 className="font-medium text-red-800 mb-2">Deductions</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tax & Other Deductions</span>
                  <span className="font-medium">{formatCurrency(employee.deductions)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Net Pay</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(employee.net_pay)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Processing Status:</span>
              <Badge className={getStatusColor(employee.status)}>
                {employee.status}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayrollDetailModal;
