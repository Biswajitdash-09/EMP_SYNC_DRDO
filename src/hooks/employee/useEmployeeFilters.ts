
/**
 * Employee filtering and search functionality
 * Provides real-time filtering of employee data based on various criteria
 * Includes search by name/email/ID, department filter, and status filter
 */

import { useState, useMemo } from 'react';
import { Employee } from '@/hooks/useEmployeeData';

export const useEmployeeFilters = (employees: Employee[]) => {
  // Filter state management
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /**
   * Filter employees based on search criteria
   * Searches across name, email, and employee ID
   * Applies department and status filters
   */
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Search functionality - checks name, email, and ID
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Department filtering
      const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
      
      // Status filtering  
      const matchesStatus = !statusFilter || employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  /**
   * Extract unique departments from employee data
   * Used for department filter dropdown options
   */
  const departments = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.department))).filter(Boolean);
  }, [employees]);

  /**
   * Extract unique statuses from employee data
   * Used for status filter dropdown options
   */
  const statuses = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.status))).filter(Boolean);
  }, [employees]);

  // Return filtering interface
  return {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    filteredEmployees,
    departments,
    statuses
  };
};
