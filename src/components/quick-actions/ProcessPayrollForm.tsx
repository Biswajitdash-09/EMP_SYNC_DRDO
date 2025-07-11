
/**
 * Process Payroll Form Component for Quick Actions
 * Shows payroll summary from main employee records
 * Processes payroll for all active employees in the system
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, AlertTriangle } from 'lucide-react';
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { usePayrollQuickActions } from "@/hooks/quick-actions/usePayrollQuickActions";

interface ProcessPayrollFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const ProcessPayrollForm = ({
  onSubmit,
  onCancel
}: ProcessPayrollFormProps) => {
  const { allEmployees } = useEmployeeData();
  const { handleProcessPayroll } = usePayrollQuickActions();

  const activeEmployees = allEmployees.filter(emp => emp.status === 'Active');
  const totalSalaryBudget = activeEmployees.reduce((sum, emp) => sum + emp.baseSalary, 0);
  const departmentBreakdown = activeEmployees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const avgSalary = activeEmployees.length > 0 ? totalSalaryBudget / activeEmployees.length : 0;

  const handleSubmit = () => {
    handleProcessPayroll();
    onSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span>Process Payroll</span>
        </CardTitle>
        <CardDescription>
          Calculate and process monthly payroll for all active employees from main records
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payroll Summary from Main Records */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">Active Employees</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{activeEmployees.length}</div>
            <div className="text-sm text-blue-600">Ready for payroll</div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Total Budget</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              ${totalSalaryBudget.toLocaleString()}
            </div>
            <div className="text-sm text-green-600">Annual salaries</div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-800">Avg Salary</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              ${Math.round(avgSalary).toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">Per employee</div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Department Breakdown</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(departmentBreakdown).map(([dept, count]) => (
              <div key={dept} className="flex items-center justify-between p-2 rounded bg-blue-700">
                <span className="text-sm font-medium text-white">{dept}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Warning */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Payroll Processing</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This will initialize payroll records for {activeEmployees.length} active employees
                from the main employee records. The system will automatically calculate salaries, deductions, and net pay.
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                <strong>Total processing amount:</strong> ${Math.round(totalSalaryBudget / 12).toLocaleString()} (monthly)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit} 
            disabled={activeEmployees.length === 0} 
            className="bg-orange-400 hover:bg-orange-300"
          >
            Initialize Payroll for {activeEmployees.length} Employees
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        {activeEmployees.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No active employees found for payroll processing.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProcessPayrollForm;
