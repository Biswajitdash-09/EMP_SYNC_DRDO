
/**
 * Employment Details Component
 * Displays employee's employment and salary information
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, Calendar, Building } from 'lucide-react';
import { DashboardEmployee } from '../hooks/useEmployeeDashboard';

interface EmploymentDetailsProps {
  employee: DashboardEmployee;
}

const EmploymentDetails = ({ employee }: EmploymentDetailsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Probation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Employment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Building className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium">{employee.position}</p>
              <p className="text-xs text-gray-500">{employee.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm">Join Date</p>
              <p className="text-xs text-gray-500">{formatDate(employee.joinDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm">Status:</span>
            <Badge className={getStatusColor(employee.status)}>
              {employee.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Salary Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Basic Salary</p>
              <p className="text-lg font-semibold">{formatCurrency(employee.salary.basic)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Allowances</p>
              <p className="text-lg font-semibold text-green-600">
                +{formatCurrency(employee.salary.allowances)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Deductions</p>
              <p className="text-lg font-semibold text-red-600">
                -{formatCurrency(employee.salary.deductions)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Net Salary</p>
              <p className="text-xl font-bold text-blue-600">
                {formatCurrency(employee.salary.netSalary)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmploymentDetails;
