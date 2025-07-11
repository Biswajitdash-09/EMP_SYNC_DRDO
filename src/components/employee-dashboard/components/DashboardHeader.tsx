
import { Button } from "@/components/ui/button";
import { User, Bell } from 'lucide-react';

interface DashboardHeaderProps {
  employeeName: string;
}

const DashboardHeader = ({ employeeName }: DashboardHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6 text-orange-600" />
              <h1 className="text-xl font-bold text-gray-900">Employee Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {employeeName}</span>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
