
/**
 * Employee Operations Hook
 * 
 * This hook handles all data modification operations for employee management.
 * It provides functions to create, update, and delete employee records.
 * 
 * Key Features:
 * - Add new employees to the database
 * - Update existing employee information
 * - Delete employee records
 * - Automatic data refresh after operations
 * - Toast notifications for user feedback
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Employee } from '@/types/employee';
import { generateStrongPassword } from '@/utils/employee/passwordGenerator';

/**
 * Custom hook for employee data operations
 * 
 * @returns {Object} Object containing mutation functions:
 * - addEmployee: Function to add a new employee
 * - updateEmployee: Function to update an existing employee
 * - deleteEmployee: Function to remove an employee
 * - loading states for each operation
 */
export const useEmployeeOperations = () => {
  // Get query client to invalidate cache after operations
  const queryClient = useQueryClient();
  
  // Get toast function for user notifications
  const { toast } = useToast();

  /**
   * Mutation for adding a new employee
   * Uses React Query's useMutation for optimistic updates and error handling
   */
  const addEmployeeMutation = useMutation({
    // The actual function that performs the database operation
    mutationFn: async (newEmployee: Omit<Employee, 'id'>) => {
      console.log('👤 Adding new employee:', newEmployee.name);
      
      // Generate a secure password for the new employee
      const generatedPassword = generateStrongPassword('EMP001');
      
      // Prepare data for database insertion
      const employeeData = {
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone,
        department: newEmployee.department,
        role: newEmployee.role,
        status: newEmployee.status,
        join_date: newEmployee.joinDate,
        address: newEmployee.address,
        date_of_birth: newEmployee.dateOfBirth,
        profile_picture_url: newEmployee.profilePictureUrl,
        manager: newEmployee.manager,
        base_salary: newEmployee.baseSalary,
        login_email: newEmployee.loginCredentials.loginEmail,
        login_password: generatedPassword,
        login_access: newEmployee.loginCredentials.isActive
      };

      // Insert the new employee into the database
      const { data, error } = await supabase
        .from('employees')
        .insert(employeeData)
        .select()
        .single();

      // Handle any database errors
      if (error) {
        console.error('❌ Error adding employee:', error);
        throw error;
      }

      console.log('✅ Employee added successfully');
      return data;
    },
    
    // What to do when the operation succeeds
    onSuccess: () => {
      // Refresh the employee list in the cache
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      
      // Show success notification to user
      toast({
        title: "Employee Added",
        description: "New employee has been successfully added to the system.",
      });
    },
    
    // What to do when the operation fails
    onError: (error) => {
      console.error('❌ Failed to add employee:', error);
      
      // Show error notification to user
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
    }
  });

  /**
   * Mutation for updating an existing employee
   */
  const updateEmployeeMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Employee> }) => {
      console.log('📝 Updating employee:', id);
      
      // Prepare update data, mapping from Employee interface to database schema
      const updateData: any = {};
      
      // Map each field that might be updated
      if (updates.name) updateData.name = updates.name;
      if (updates.email) updateData.email = updates.email;
      if (updates.phone) updateData.phone = updates.phone;
      if (updates.department) updateData.department = updates.department;
      if (updates.role) updateData.role = updates.role;
      if (updates.status) updateData.status = updates.status;
      if (updates.address) updateData.address = updates.address;
      if (updates.manager) updateData.manager = updates.manager;
      if (updates.baseSalary) updateData.base_salary = updates.baseSalary;
      
      // Update login credentials if provided
      if (updates.loginCredentials) {
        if (updates.loginCredentials.loginEmail) {
          updateData.login_email = updates.loginCredentials.loginEmail;
        }
        if (updates.loginCredentials.password) {
          updateData.login_password = updates.loginCredentials.password;
        }
        updateData.login_access = updates.loginCredentials.isActive;
      }

      // Perform the database update
      const { data, error } = await supabase
        .from('employees')
        .update(updateData)
        .eq('employee_id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating employee:', error);
        throw error;
      }

      console.log('✅ Employee updated successfully');
      return data;
    },
    
    onSuccess: () => {
      // Refresh the cached data
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      
      // Notify user of success
      toast({
        title: "Employee Updated",
        description: "Employee information has been successfully updated.",
      });
    },
    
    onError: (error) => {
      console.error('❌ Failed to update employee:', error);
      toast({
        title: "Error",
        description: "Failed to update employee. Please try again.",
        variant: "destructive",
      });
    }
  });

  /**
   * Mutation for deleting an employee
   */
  const deleteEmployeeMutation = useMutation({
    mutationFn: async (employeeId: string) => {
      console.log('🗑️ Deleting employee:', employeeId);
      
      // Delete the employee record from database
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('employee_id', employeeId);

      if (error) {
        console.error('❌ Error deleting employee:', error);
        throw error;
      }

      console.log('✅ Employee deleted successfully');
    },
    
    onSuccess: () => {
      // Refresh the employee list
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      
      // Notify user
      toast({
        title: "Employee Deleted",
        description: "Employee has been successfully removed from the system.",
      });
    },
    
    onError: (error) => {
      console.error('❌ Failed to delete employee:', error);
      toast({
        title: "Error",
        description: "Failed to delete employee. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Return all the operations and their loading states
  return {
    // Functions to call from components
    addEmployee: addEmployeeMutation.mutate,
    updateEmployee: updateEmployeeMutation.mutate,
    deleteEmployee: deleteEmployeeMutation.mutate,
    
    // Loading states for UI feedback
    addingEmployee: addEmployeeMutation.isPending,
    updatingEmployee: updateEmployeeMutation.isPending,
    deletingEmployee: deleteEmployeeMutation.isPending
  };
};
