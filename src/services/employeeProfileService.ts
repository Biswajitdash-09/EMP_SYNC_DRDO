
/**
 * Employee Profile Service
 * Handles employee profile updates and syncs with main employee data
 */

import { generateEmployeeData } from '@/utils/employeeDataGenerator';
import { Employee } from '@/types/employee';

const EMPLOYEE_DATA_KEY = 'employee-data-updates';

/**
 * Get stored employee updates
 */
const getStoredUpdates = (): Record<string, Partial<Employee>> => {
  try {
    const stored = localStorage.getItem(EMPLOYEE_DATA_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading employee updates:', error);
    return {};
  }
};

/**
 * Store employee updates
 */
const storeUpdates = (updates: Record<string, Partial<Employee>>): void => {
  try {
    localStorage.setItem(EMPLOYEE_DATA_KEY, JSON.stringify(updates));
  } catch (error) {
    console.error('Error storing employee updates:', error);
  }
};

/**
 * Update employee profile
 */
export const updateEmployeeProfile = async (employeeId: string, updates: Partial<Employee>): Promise<void> => {
  const storedUpdates = getStoredUpdates();
  
  // Merge with existing updates for this employee
  const existingUpdates = storedUpdates[employeeId] || {};
  const mergedUpdates = { ...existingUpdates, ...updates };
  
  // Store the updates
  storedUpdates[employeeId] = mergedUpdates;
  storeUpdates(storedUpdates);
  
  console.log('✅ Employee profile updated:', employeeId, updates);
};

/**
 * Get employee with applied updates
 */
export const getEmployeeWithUpdates = (employeeId: string): Employee | null => {
  const employees = generateEmployeeData();
  const baseEmployee = employees.find(emp => emp.id === employeeId);
  
  if (!baseEmployee) return null;
  
  const storedUpdates = getStoredUpdates();
  const updates = storedUpdates[employeeId] || {};
  
  return { ...baseEmployee, ...updates };
};

/**
 * Get all employees with applied updates
 */
export const getAllEmployeesWithUpdates = (): Employee[] => {
  const employees = generateEmployeeData();
  const storedUpdates = getStoredUpdates();
  
  return employees.map(employee => ({
    ...employee,
    ...(storedUpdates[employee.id] || {})
  }));
};
