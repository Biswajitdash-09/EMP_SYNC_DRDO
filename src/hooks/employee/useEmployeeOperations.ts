
import { supabase } from '@/integrations/supabase/client';
import { Employee } from '@/types/employee';

export const useEmployeeOperations = (refreshEmployees: () => Promise<void>) => {
  const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    try {
      console.log('➕ Adding new employee:', employeeData.email);

      // Create the main employee record using direct table insertion
      const { data: newEmployee, error: employeeError } = await supabase
        .from('employees')
        .insert({
          name: employeeData.name,
          email: employeeData.email,
          phone: employeeData.phone,
          department: employeeData.department,
          role: employeeData.role,
          status: employeeData.status || 'Active',
          join_date: employeeData.joinDate,
          address: employeeData.address,
          date_of_birth: employeeData.dateOfBirth,
          profile_picture_url: employeeData.profilePictureUrl,
          manager: employeeData.manager,
          base_salary: employeeData.baseSalary,
          login_access: employeeData.loginCredentials?.isActive,
          login_email: employeeData.loginCredentials?.loginEmail,
          login_password: employeeData.loginCredentials?.password
        })
        .select()
        .single();

      if (employeeError) {
        console.error('❌ Error creating employee:', employeeError);
        throw employeeError;
      }

      // Refresh employees list
      await refreshEmployees();
      
    } catch (error: any) {
      console.error('💥 Error adding employee:', error);
      throw new Error(error.message || 'Failed to add employee');
    }
  };

  const updateEmployee = async (employeeId: string, updates: Partial<Employee>) => {
    try {
      console.log('✏️ Updating employee:', employeeId);

      // Update the main employee record
      const { error: employeeError } = await supabase
        .from('employees')
        .update({
          name: updates.name,
          email: updates.email,
          phone: updates.phone,
          department: updates.department,
          role: updates.role,
          status: updates.status,
          join_date: updates.joinDate,
          address: updates.address,
          date_of_birth: updates.dateOfBirth,
          profile_picture_url: updates.profilePictureUrl,
          manager: updates.manager,
          base_salary: updates.baseSalary,
          login_access: updates.loginCredentials?.isActive,
          login_email: updates.loginCredentials?.loginEmail,
          login_password: updates.loginCredentials?.password
        })
        .eq('employee_id', employeeId);

      if (employeeError) {
        console.error('❌ Error updating employee:', employeeError);
        throw employeeError;
      }

      // Refresh employees list
      await refreshEmployees();
      
    } catch (error: any) {
      console.error('💥 Error updating employee:', error);
      throw new Error(error.message || 'Failed to update employee');
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    try {
      console.log('🗑️ Deleting employee:', employeeId);

      // Delete the employee (cascade will handle related records)
      const { error: deleteError } = await supabase
        .from('employees')
        .delete()
        .eq('employee_id', employeeId);

      if (deleteError) {
        console.error('❌ Error deleting employee:', deleteError);
        throw deleteError;
      }

      // Refresh employees list
      await refreshEmployees();
      
    } catch (error: any) {
      console.error('💥 Error deleting employee:', error);
      throw new Error(error.message || 'Failed to delete employee');
    }
  };

  return {
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};
