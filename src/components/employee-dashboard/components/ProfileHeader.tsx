
/**
 * Profile Header Component
 * Displays employee's basic profile information with avatar and key details
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Calendar, UserCheck } from 'lucide-react';
import { DashboardEmployee } from '../hooks/useEmployeeDashboard';

interface ProfileHeaderProps {
  employee: DashboardEmployee;
}

const ProfileHeader = ({ employee }: ProfileHeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTenure = (joinDate: string) => {
    const join = new Date(joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - join.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={employee.profilePictureUrl} alt={employee.name} />
              <AvatarFallback className="text-lg">{getInitials(employee.name)}</AvatarFallback>
            </Avatar>
            <Badge variant="secondary" className="text-sm">
              Employee ID: {employee.id}
            </Badge>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{employee.name}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">{employee.role}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{employee.department}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  Joined {formatDate(employee.joinDate)} ({calculateTenure(employee.joinDate)})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Reports to {employee.manager}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
