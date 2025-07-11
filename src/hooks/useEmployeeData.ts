
/**
 * Main Employee Data Hook
 * 
 * This is the main hook that combines employee queries and operations.
 * It serves as a central point for all employee-related data management.
 * 
 * Purpose:
 * - Provides a single interface for employee data operations
 * - Combines data fetching and modification capabilities
 * - Simplifies component usage by providing everything in one place
 * 
 * Usage:
 * Components can import this hook to get both employee data and functions
 * to modify that data, without needing to import multiple hooks.
 */

import { useState, useMemo } from 'react';
import { useEmployeeQueries } from './employee/useEmployeeQueries';
import { useEmployeeOperations } from './employee/useEmployeeOperations';
import { Employee } from '@/types/employee';

// Re-export the Employee type for backward compatibility
export type { Employee } from '@/types/employee';

/**
 * Combined employee data management hook
 * 
 * This hook brings together both data fetching and data operations
 * for employee management, providing a complete interface for components.
 * 
 * @returns {Object} Complete employee data interface containing:
 * - allEmployees: Array of all employee records
 * - employees: Filtered array of employee records (for backward compatibility)
 * - loading: Loading state for data fetching
 * - error: Any error from data fetching
 * - refetch: Function to manually refresh employee data
 * - addEmployee: Function to add a new employee
 * - updateEmployee: Function to update an existing employee
 * - deleteEmployee: Function to remove an employee
 * - Loading states for each operation
 * - Search and filter functionality
 */
export const useEmployeeData = () => {
  // Get data fetching capabilities from queries hook
  const {
    employees: allEmployees,
    loading,
    error,
    refetch
  } = useEmployeeQueries();

  // Get data modification capabilities from operations hook
  const {
    addEmployee,
    updateEmployee: updateEmployeeMutation,
    deleteEmployee,
    addingEmployee,
    updatingEmployee,
    deletingEmployee
  } = useEmployeeOperations();

  // State for search and filtering functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Create wrapper function for updateEmployee to match expected signature
  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    updateEmployeeMutation({ id, updates });
  };

  // Get unique departments from employee data
  const departments = useMemo(() => {
    const depts = allEmployees.map(emp => emp.department).filter(Boolean);
    return [...new Set(depts)];
  }, [allEmployees]);

  // Get unique statuses from employee data
  const statuses = useMemo(() => {
    const stats = allEmployees.map(emp => emp.status).filter(Boolean);
    return [...new Set(stats)];
  }, [allEmployees]);

  // Filter employees based on search term and filters
  const filteredEmployees = useMemo(() => {
    return allEmployees.filter(employee => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Department filter
      const matchesDepartment = !departmentFilter || employee.department === departmentFilter;

      // Status filter
      const matchesStatus = !statusFilter || employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [allEmployees, searchTerm, departmentFilter, statusFilter]);

  // Return combined interface for components to use
  return {
    // Data and data fetching
    allEmployees,        // Array of all employee records
    employees: filteredEmployees, // Filtered employees (for backward compatibility)
    loading,             // True when fetching data
    error,               // Error object if fetching failed
    refetch,             // Function to manually refresh data
    refreshEmployees: refetch, // Alias for backward compatibility
    
    // Search and filtering
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    statuses,
    
    // Data operations
    addEmployee,         // Function to add new employee
    updateEmployee,      // Function to update existing employee  
    deleteEmployee,      // Function to remove employee
    
    // Operation loading states
    addingEmployee,      // True when adding employee
    updatingEmployee,    // True when updating employee
    deletingEmployee     // True when deleting employee
  };
};
