
/**
 * Employee Salary Details Component
 * Displays salary information, payslips, and tax details
 */

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import SalaryOverviewCards from './components/SalaryOverviewCards';
import CurrentPayslipTab from './components/CurrentPayslipTab';
import PayslipHistoryTab from './components/PayslipHistoryTab';
import TaxInformationTab from './components/TaxInformationTab';
import { createDownloadHandlers } from './utils/downloadHandlers';

interface Employee {
  id: string;
  name: string;
  salary: {
    basic: number;
    allowances: number;
    deductions: number;
    netSalary: number;
  };
}

interface Payslip {
  id: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: {
    hra: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    tax: number;
    providentFund: number;
    insurance: number;
    other: number;
  };
  grossSalary: number;
  netSalary: number;
  status: 'Processed' | 'Pending';
}

interface EmployeeSalaryDetailsProps {
  employee: Employee;
}

const EmployeeSalaryDetails = ({ employee }: EmployeeSalaryDetailsProps) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const { toast } = useToast();
  
  // Mock payslip data - will be replaced with Supabase data
  const [payslips] = useState<Payslip[]>([
    {
      id: 'PS-2024-06',
      month: 'June',
      year: 2024,
      basicSalary: 75000,
      allowances: {
        hra: 22500,
        transport: 2000,
        medical: 1500,
        other: 1000
      },
      deductions: {
        tax: 15000,
        providentFund: 9000,
        insurance: 2000,
        other: 500
      },
      grossSalary: 102000,
      netSalary: 75500,
      status: 'Processed'
    },
    {
      id: 'PS-2024-05',
      month: 'May',
      year: 2024,
      basicSalary: 75000,
      allowances: {
        hra: 22500,
        transport: 2000,
        medical: 1500,
        other: 1000
      },
      deductions: {
        tax: 15000,
        providentFund: 9000,
        insurance: 2000,
        other: 500
      },
      grossSalary: 102000,
      netSalary: 75500,
      status: 'Processed'
    },
    {
      id: 'PS-2024-04',
      month: 'April',
      year: 2024,
      basicSalary: 75000,
      allowances: {
        hra: 22500,
        transport: 2000,
        medical: 1500,
        other: 1000
      },
      deductions: {
        tax: 15000,
        providentFund: 9000,
        insurance: 2000,
        other: 500
      },
      grossSalary: 102000,
      netSalary: 75500,
      status: 'Processed'
    }
  ]);

  const currentPayslip = payslips[0];
  const totalAllowances = Object.values(currentPayslip.allowances).reduce((sum, amount) => sum + amount, 0);
  const totalDeductions = Object.values(currentPayslip.deductions).reduce((sum, amount) => sum + amount, 0);

  // Create download handlers
  const downloadHandlers = createDownloadHandlers(employee, toast);

  return (
    <div className="space-y-6">
      {/* Salary Overview */}
      <SalaryOverviewCards 
        employee={employee}
        totalAllowances={totalAllowances}
        totalDeductions={totalDeductions}
      />

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Payslip</TabsTrigger>
          <TabsTrigger value="history">Payslip History</TabsTrigger>
          <TabsTrigger value="tax">Tax Information</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <CurrentPayslipTab 
            currentPayslip={currentPayslip}
            onDownload={() => downloadHandlers.downloadCurrentPayslip(currentPayslip)}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <PayslipHistoryTab 
            payslips={payslips}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            onDownloadHistory={() => downloadHandlers.downloadPayslipHistory(payslips, selectedYear)}
            onDownloadPayslip={downloadHandlers.downloadHistoricalPayslip}
          />
        </TabsContent>

        <TabsContent value="tax" className="space-y-6">
          <TaxInformationTab 
            onDownloadTaxDocument={downloadHandlers.downloadTaxDocument}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeSalaryDetails;
