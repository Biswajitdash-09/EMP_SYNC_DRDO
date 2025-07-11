
/**
 * Employee Dashboard Welcome Section Component
 * Displays welcome message and employee status information
 */

import { Badge } from "@/components/ui/badge";

interface Employee {
  id: string;
  name: string;
  department: string;
  status: 'Active' | 'Probation' | 'Terminated';
}

interface EmployeeDashboardWelcomeProps {
  employee: Employee;
}

const EmployeeDashboardWelcome = ({ employee }: EmployeeDashboardWelcomeProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome back, {employee.name.split(' ')[0]}!
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Manage your profile, apply for leave, and view your salary details.
      </p>
      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
        <span>Employee ID: {employee.id}</span>
        <span>•</span>
        <span>Department: {employee.department}</span>
        <span>•</span>
        <span>Status: <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>{employee.status}</Badge></span>
      </div>
    </div>
  );
};

export default EmployeeDashboardWelcome;
