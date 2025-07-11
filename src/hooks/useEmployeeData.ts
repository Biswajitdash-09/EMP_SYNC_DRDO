
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

import { useEmployeeQueries } from './employee/useEmployeeQueries';
import { useEmployeeOperations } from './employee/useEmployeeOperations';

/**
 * Combined employee data management hook
 * 
 * This hook brings together both data fetching and data operations
 * for employee management, providing a complete interface for components.
 * 
 * @returns {Object} Complete employee data interface containing:
 * - allEmployees: Array of all employee records
 * - loading: Loading state for data fetching
 * - error: Any error from data fetching
 * - refetch: Function to manually refresh employee data
 * - addEmployee: Function to add a new employee
 * - updateEmployee: Function to update an existing employee
 * - deleteEmployee: Function to remove an employee
 * - Loading states for each operation
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
    updateEmployee,
    deleteEmployee,
    addingEmployee,
    updatingEmployee,
    deletingEmployee
  } = useEmployeeOperations();

  // Return combined interface for components to use
  return {
    // Data and data fetching
    allEmployees,        // Array of employee records
    loading,             // True when fetching data
    error,               // Error object if fetching failed
    refetch,             // Function to manually refresh data
    
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
