
/**
 * Employee Dashboard Header Component
 * Handles the header section with navigation and user info
 */

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, LogOut } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  profilePicture?: string;
}

interface EmployeeDashboardHeaderProps {
  employee: Employee;
  onLogout: () => void;
}

const EmployeeDashboardHeader = ({ employee, onLogout }: EmployeeDashboardHeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">EMP SYNC</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Employee Portal</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={employee.profilePicture} alt={employee.name} />
                <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{employee.role}</div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={onLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmployeeDashboardHeader;
