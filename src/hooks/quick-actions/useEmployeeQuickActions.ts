
/**
 * Employee Quick Actions Hook
 * Handles employee-related quick actions
 */

import { useToast } from "@/hooks/use-toast";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { 
  validateRequiredFields, 
  validateEmailFormat, 
  checkDuplicateEmail,
  checkDuplicateLoginEmail,
  createEmployeeFromForm,
  EmployeeFormData 
} from "@/utils/employeeValidation";
import { Employee } from "@/types/employee";

export const useEmployeeQuickActions = () => {
  const { toast } = useToast();
  
  // Get the hook data
  const employeeDataHook = useEmployeeData();
  const { addEmployee, allEmployees } = employeeDataHook;

  const handleAddEmployee = (employeeForm: EmployeeFormData, resetForm: () => void) => {
    // Validate required fields
    if (!validateRequiredFields(employeeForm)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (First Name, Last Name, Email, Department, Login Email, Login Password).",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    if (!validateEmailFormat(employeeForm.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid contact email address.",
        variant: "destructive"
      });
      return;
    }

    // Validate login email format
    if (!validateEmailFormat(employeeForm.loginEmail)) {
      toast({
        title: "Invalid Login Email",
        description: "Please enter a valid login email address.",
        variant: "destructive"
      });
      return;
    }

    // Transform allEmployees to the format expected by validation
    const employeesForValidation: Employee[] = allEmployees.map(emp => ({
      ...emp,
      // Ensure all required fields are present with defaults
      joinDate: emp.joinDate || new Date().toISOString().split('T')[0],
      address: emp.address || '',
      status: emp.status as "Active" | "Probation" | "Terminated"
    }));

    // Check for duplicate contact email
    if (checkDuplicateEmail(employeeForm.email, employeesForValidation)) {
      toast({
        title: "Duplicate Contact Email",
        description: "An employee with this contact email already exists.",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate login email
    if (checkDuplicateLoginEmail(employeeForm.loginEmail, employeesForValidation)) {
      toast({
        title: "Duplicate Login Email",
        description: "An employee with this login email already exists.",
        variant: "destructive"
      });
      return;
    }

    // Create and add new employee
    const newEmployee = createEmployeeFromForm(employeeForm);
    
    addEmployee(newEmployee);
    
    const fullName = `${employeeForm.firstName.trim()} ${employeeForm.lastName.trim()}`;
    toast({
      title: "Employee Added Successfully",
      description: `${fullName} has been added to the employee records with login credentials and is now available in the Employee Records page.`,
    });

    resetForm();
    console.log('Employee added via Quick Actions and synced to main records:', newEmployee);
  };

  return {
    handleAddEmployee
  };
};
