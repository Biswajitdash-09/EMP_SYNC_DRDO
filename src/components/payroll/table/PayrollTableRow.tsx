
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Edit, Save, X } from 'lucide-react';
import { PayrollRecord } from '@/services/payrollService';

interface PayrollTableRowProps {
  employee: PayrollRecord;
  onViewEmployee: (employee: PayrollRecord) => void;
  onUpdateRecord: (id: string, updates: Partial<PayrollRecord>) => Promise<void>;
}

const PayrollTableRow = ({ employee, onViewEmployee, onUpdateRecord }: PayrollTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<Partial<PayrollRecord>>({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditValues({
      base_salary: employee.base_salary,
      bonuses: employee.bonuses,
      deductions: employee.deductions
    });
  };

  const handleSave = async () => {
    try {
      await onUpdateRecord(employee.id, editValues);
      setIsEditing(false);
      setEditValues({});
    } catch (error) {
      console.error('Error saving employee edit:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValues({});
  };

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

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">{employee.employee_id}</TableCell>
      <TableCell>{employee.employee_name}</TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            type="number"
            value={editValues.base_salary || 0}
            onChange={(e) => setEditValues(prev => ({ ...prev, base_salary: Number(e.target.value) }))}
            className="w-24"
          />
        ) : (
          formatCurrency(employee.base_salary)
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            type="number"
            value={editValues.bonuses || 0}
            onChange={(e) => setEditValues(prev => ({ ...prev, bonuses: Number(e.target.value) }))}
            className="w-24"
          />
        ) : (
          formatCurrency(employee.bonuses)
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            type="number"
            value={editValues.deductions || 0}
            onChange={(e) => setEditValues(prev => ({ ...prev, deductions: Number(e.target.value) }))}
            className="w-24"
          />
        ) : (
          formatCurrency(employee.deductions)
        )}
      </TableCell>
      <TableCell className="font-semibold">{formatCurrency(employee.net_pay)}</TableCell>
      <TableCell>
        <Badge className={getStatusColor(employee.status)}>
          {employee.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewEmployee(employee)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {isEditing ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSave}
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleCancel}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            employee.status === 'Pending' && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleEdit}
              >
                <Edit className="w-4 h-4" />
              </Button>
            )
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PayrollTableRow;
