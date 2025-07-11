
/**
 * Employee Data Generator
 * Main entry point for generating sample employee data
 */

import { Employee } from '@/types/employee';
import { createEmployee } from './employee/employeeFactory';

/**
 * Generate array of 100 unique employee records
 * Creates realistic employee records with strong, unique passwords
 */
export const generateEmployeeData = (): Employee[] => {
  const employees: Employee[] = [];
  
  // Generate 100 unique employees
  for (let i = 0; i < 100; i++) {
    employees.push(createEmployee(i));
  }
  
  console.log(`✅ Generated ${employees.length} unique employees with strong passwords`);
  console.log(`📊 Active employees: ${employees.filter(emp => emp.status === 'Active').length}`);
  console.log(`🔐 Sample credentials:`);
  console.log(`   - ${employees[0].name}: ${employees[0].loginCredentials.loginEmail} / ${employees[0].loginCredentials.password}`);
  console.log(`   - ${employees[1].name}: ${employees[1].loginCredentials.loginEmail} / ${employees[1].loginCredentials.password}`);
  console.log(`   - ${employees[2].name}: ${employees[2].loginCredentials.loginEmail} / ${employees[2].loginCredentials.password}`);
  
  return employees;
};
