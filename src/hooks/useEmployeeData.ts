
import { useState } from 'react';
import { useEmployeeQueries } from './employee/useEmployeeQueries';
import { useEmployeeOperations } from './employee/useEmployeeOperations';
import { useEmployeeFilters } from './employee/useEmployeeFilters';

// Re-export Employee interface for backward compatibility
export type { Employee } from '@/types/employee';

export const useEmployeeData = () => {
  const { allEmployees, setAllEmployees, loading, error, fetchEmployees } = useEmployeeQueries();
  const { addEmployee, updateEmployee, deleteEmployee } = useEmployeeOperations(fetchEmployees);
  const {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    filteredEmployees
  } = useEmployeeFilters(allEmployees);

  const refreshEmployees = () => {
    fetchEmployees();
  };

  // Derive departments and statuses from employee data
  const departments = Array.from(new Set(allEmployees.map(emp => emp.department).filter(Boolean)));
  const statuses = Array.from(new Set(allEmployees.map(emp => emp.status).filter(Boolean)));

  return {
    employees: filteredEmployees,
    allEmployees,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    refreshEmployees,
    departments,
    statuses,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};
