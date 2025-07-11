
import { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PayrollTableRow from './table/PayrollTableRow';
import PayrollDetailModal from './table/PayrollDetailModal';
import { PayrollRecord } from '@/services/payrollService';

interface PayrollTableProps {
  payrollData: PayrollRecord[];
  onUpdateRecord: (id: string, updates: Partial<PayrollRecord>) => Promise<void>;
}

const PayrollTable = ({ payrollData, onUpdateRecord }: PayrollTableProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollRecord | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleViewEmployee = (employee: PayrollRecord) => {
    setSelectedEmployee(employee);
    setIsViewOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead>Bonuses</TableHead>
              <TableHead>Deductions</TableHead>
              <TableHead>Net Pay</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.map((employee) => (
              <PayrollTableRow
                key={employee.id}
                employee={employee}
                onViewEmployee={handleViewEmployee}
                onUpdateRecord={onUpdateRecord}
              />
            ))}
          </TableBody>
        </Table>
        
        {payrollData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No payroll data available for this period.
          </div>
        )}
      </div>

      <PayrollDetailModal
        employee={selectedEmployee}
        isOpen={isViewOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PayrollTable;
