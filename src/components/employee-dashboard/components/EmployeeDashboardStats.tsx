
/**
 * Employee Dashboard Stats Cards Component
 * Displays quick stats overview cards
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, DollarSign } from 'lucide-react';

interface LeaveBalance {
  annual: number;
  sick: number;
  personal: number;
}

interface EmployeeDashboardStatsProps {
  leaveBalance: LeaveBalance;
  baseSalary: number;
}

const EmployeeDashboardStats = ({ leaveBalance, baseSalary }: EmployeeDashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Annual Leave</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{leaveBalance.annual}</div>
          <p className="text-xs text-muted-foreground">days remaining</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{leaveBalance.sick}</div>
          <p className="text-xs text-muted-foreground">days remaining</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Personal Leave</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{leaveBalance.personal}</div>
          <p className="text-xs text-muted-foreground">days remaining</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Base Salary</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${baseSalary.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">annual</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboardStats;
