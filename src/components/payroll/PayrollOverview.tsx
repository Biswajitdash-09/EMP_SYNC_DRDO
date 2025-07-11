
/**
 * Payroll Overview Component
 * Displays payroll summary and employee payment status
 * Main interface for payroll management and monitoring
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PayrollSummaryCards from './PayrollSummaryCards';
import PayrollTable from './PayrollTable';
import { PayrollRecord, PayrollSummary } from '@/services/payrollService';

interface PayrollOverviewProps {
  payrollData: PayrollRecord[];
  payrollSummary: PayrollSummary;
  onUpdateRecord: (id: string, updates: Partial<PayrollRecord>) => Promise<void>;
}

const PayrollOverview = ({ payrollData, payrollSummary, onUpdateRecord }: PayrollOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* High-level payroll statistics */}
      <PayrollSummaryCards payrollSummary={payrollSummary} />

      {/* Detailed payroll data table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Payroll Period</CardTitle>
          <CardDescription>June 2024 payroll processing status</CardDescription>
        </CardHeader>
        <CardContent>
          <PayrollTable 
            payrollData={payrollData} 
            onUpdateRecord={onUpdateRecord}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollOverview;
