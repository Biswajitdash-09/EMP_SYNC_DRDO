
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { payrollService, PayrollRecord, SalaryComponent, PayrollSummary } from '@/services/payrollService';

export const usePayrollData = () => {
  const [payrollData, setPayrollData] = useState<PayrollRecord[]>([]);
  const [salaryComponents, setSalaryComponents] = useState<SalaryComponent[]>([]);
  const [payrollSummary, setPayrollSummary] = useState<PayrollSummary>({
    totalPayroll: 0,
    employeesPaid: 0,
    totalEmployees: 0,
    taxDeductions: 0,
    nextPayDate: 'July 1, 2024'
  });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const currentPayPeriod = 'June 2024';

  // Load payroll data
  const loadPayrollData = async () => {
    try {
      setLoading(true);
      
      // Initialize payroll from employees if needed
      await payrollService.initializePayrollFromEmployees(currentPayPeriod);
      
      // Load all data
      const [records, components, summary] = await Promise.all([
        payrollService.getPayrollRecords(currentPayPeriod),
        payrollService.getSalaryComponents(),
        payrollService.getPayrollSummary(currentPayPeriod)
      ]);

      setPayrollData(records);
      setSalaryComponents(components);
      setPayrollSummary(summary);
    } catch (error) {
      console.error('Error loading payroll data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load payroll data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Process payroll
  const processPayroll = async () => {
    try {
      setProcessing(true);
      
      const processedRecords = await payrollService.processPayroll(currentPayPeriod);
      
      // Refresh data after processing
      await loadPayrollData();
      
      toast({
        title: "Payroll Processed",
        description: `Successfully processed payroll for ${processedRecords.length} employees.`
      });
    } catch (error) {
      console.error('Error processing payroll:', error);
      toast({
        title: "Processing Failed", 
        description: "Failed to process payroll. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  // Update payroll record
  const updatePayrollRecord = async (id: string, updates: Partial<PayrollRecord>) => {
    try {
      await payrollService.updatePayrollRecord(id, updates);
      await loadPayrollData(); // Refresh data
      
      toast({
        title: "Record Updated",
        description: "Payroll record has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating payroll record:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update payroll record. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Update salary component
  const updateSalaryComponent = async (id: string, updates: Partial<SalaryComponent>) => {
    try {
      await payrollService.updateSalaryComponent(id, updates);
      await loadPayrollData(); // Refresh data
      
      toast({
        title: "Component Updated",
        description: "Salary component has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating salary component:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update salary component. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Load data on mount
  useEffect(() => {
    loadPayrollData();
  }, []);

  return {
    payrollData,
    salaryComponents,
    payrollSummary,
    loading,
    processing,
    processPayroll,
    updatePayrollRecord,
    updateSalaryComponent,
    refreshData: loadPayrollData
  };
};
