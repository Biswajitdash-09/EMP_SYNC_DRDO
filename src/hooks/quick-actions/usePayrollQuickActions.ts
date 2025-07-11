
/**
 * Payroll Quick Actions Hook
 * Handles payroll-related quick actions with database integration
 */

import { useToast } from "@/hooks/use-toast";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { payrollService } from "@/services/payrollService";

export const usePayrollQuickActions = () => {
  const { toast } = useToast();
  const { allEmployees } = useEmployeeData();

  const handleProcessPayroll = async () => {
    const activeEmployees = allEmployees.filter(emp => emp.status === 'Active');
    
    if (activeEmployees.length === 0) {
      toast({
        title: "No Active Employees",
        description: "No active employees found for payroll processing.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Initializing payroll for employees:', activeEmployees.map(emp => ({
        id: emp.id,
        name: emp.name,
        department: emp.department,
        baseSalary: emp.baseSalary
      })));

      // Initialize payroll records from employee data
      await payrollService.initializePayrollFromEmployees('June 2024');

      toast({
        title: "Payroll Initialized",
        description: `Payroll records have been created for ${activeEmployees.length} active employees. You can now process payroll from the Payroll System.`,
      });
    } catch (error) {
      console.error('Error initializing payroll:', error);
      toast({
        title: "Initialization Failed",
        description: "Failed to initialize payroll records. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    handleProcessPayroll
  };
};
