
/**
 * Employee Dashboard Content Component
 * Renders the main dashboard content with tabs and employee data
 */

import EmployeeDashboardHeader from '@/components/employee-dashboard/components/EmployeeDashboardHeader';
import EmployeeDashboardWelcome from '@/components/employee-dashboard/components/EmployeeDashboardWelcome';
import EmployeeDashboardStats from '@/components/employee-dashboard/components/EmployeeDashboardStats';
import EmployeeDashboardTabs from './EmployeeDashboardTabs';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  joinDate: string;
  profilePicture?: string;
  manager: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  baseSalary: number;
  status: 'Active' | 'Probation' | 'Terminated';
}

interface EmployeeDashboardContentProps {
  employee: Employee;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onProfileUpdate: (updates: any) => void;
}

const EmployeeDashboardContent = ({
  employee,
  activeTab,
  onTabChange,
  onLogout,
  onProfileUpdate
}: EmployeeDashboardContentProps) => {
  // Transform employee data for components
  const salaryData = {
    basic: employee.baseSalary || 0,
    allowances: Math.round((employee.baseSalary || 0) * 0.2), // 20% allowances
    deductions: Math.round((employee.baseSalary || 0) * 0.1), // 10% deductions
    netSalary: Math.round((employee.baseSalary || 0) * 1.1) // Net after allowances and deductions
  };

  // Enhanced leave balance
  const leaveBalance = {
    annual: 20,
    sick: 10,
    personal: 5
  };

  const employeeWithSalaryAndLeave = {
    ...employee,
    position: employee.role, // Add the missing position property
    salary: salaryData,
    leaveBalance: leaveBalance,
    profilePictureUrl: employee.profilePicture
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EmployeeDashboardHeader employee={employee} onLogout={onLogout} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmployeeDashboardWelcome employee={employee} />
        <EmployeeDashboardStats leaveBalance={leaveBalance} baseSalary={employee.baseSalary || 0} />

        <EmployeeDashboardTabs 
          employee={employeeWithSalaryAndLeave}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboardContent;
