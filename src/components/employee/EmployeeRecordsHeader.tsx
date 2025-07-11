
/**
 * Employee Records Header Component
 * Handles the top navigation and title section for the Employee Records page
 * 
 * This component provides:
 * - Navigation back to dashboard
 * - Page title with icon
 * - Add new employee functionality
 * 
 * @component
 * @example
 * <EmployeeRecordsHeader onAddEmployee={handleAddEmployee} />
 */

import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddEmployeeModal from './AddEmployeeModal';
import { Employee } from '@/hooks/useEmployeeData';

/**
 * Props interface for EmployeeRecordsHeader component
 * @interface EmployeeRecordsHeaderProps
 */
interface EmployeeRecordsHeaderProps {
  /** Callback function to handle adding a new employee */
  onAddEmployee: (employee: Omit<Employee, 'id'>) => void;
}

/**
 * EmployeeRecordsHeader functional component
 * 
 * Renders the header section of the Employee Records page with navigation,
 * title, and action buttons for employee management operations.
 * 
 * @param {EmployeeRecordsHeaderProps} props - Component props
 * @returns {JSX.Element} The rendered header component
 */
const EmployeeRecordsHeader = ({
  onAddEmployee
}: EmployeeRecordsHeaderProps) => {
  // React Router hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Handle navigation back to dashboard
   * Uses React Router's navigate function to redirect user
   */
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header content with flexbox layout */}
        <div className="flex justify-between items-center h-16">
          
          {/* Left section: Back button and page title */}
          <div className="flex items-center space-x-4">
            {/* Back to Dashboard navigation button */}
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard} 
              className="text-red-600 bg-amber-400 hover:bg-amber-300"
              aria-label="Navigate back to dashboard"
            >
              ← Back to Dashboard
            </Button>
            
            {/* Page title with icon */}
            <div className="flex items-center space-x-2">
              <Users 
                className="w-6 h-6 text-blue-600" 
                aria-hidden="true" 
              />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Employee Records
              </h1>
            </div>
          </div>
          
          {/* Right section: Add Employee modal trigger */}
          <AddEmployeeModal onAddEmployee={onAddEmployee} />
        </div>
      </div>
    </header>
  );
};

export default EmployeeRecordsHeader;
