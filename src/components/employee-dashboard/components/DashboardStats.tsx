
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, Shield } from 'lucide-react';
import { DashboardEmployee } from '../hooks/useEmployeeDashboard';

interface DashboardStatsProps {
  employee: DashboardEmployee;
}

const DashboardStats = ({ employee }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Department</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{employee.department}</div>
          <p className="text-xs text-muted-foreground">
            {employee.position}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{employee.leaveBalance.annual}</div>
          <p className="text-xs text-muted-foreground">
            Annual leave days remaining
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Employment Status</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{employee.status}</div>
          <p className="text-xs text-muted-foreground">
            Since {employee.joinDate}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
