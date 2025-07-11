/**
 * Generate Report Form Component for Quick Actions
 * Creates reports using data from main system records
 * Supports multiple report types with real-time data integration
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle } from 'lucide-react';
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { useLeaveData } from "@/hooks/useLeaveData";
import ReportDataSource from "./report-form/ReportDataSource";
import ReportConfiguration from "./report-form/ReportConfiguration";
import ReportPreview from "./report-form/ReportPreview";
interface GenerateReportFormProps {
  reportParams: {
    reportType: string;
    dateRange: string;
    format: string;
    department: string;
  };
  onParamsChange: (updates: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}
const GenerateReportForm = ({
  reportParams,
  onParamsChange,
  onSubmit,
  onCancel
}: GenerateReportFormProps) => {
  // Get real-time data from main system records
  const {
    allEmployees,
    departments
  } = useEmployeeData();
  const {
    allLeaveRequests
  } = useLeaveData();

  // Filter data based on report parameters
  const filteredEmployees = reportParams.department ? allEmployees.filter(emp => emp.department === reportParams.department) : allEmployees;
  const filteredLeaveRequests = reportParams.department ? allLeaveRequests.filter(req => {
    const emp = allEmployees.find(e => e.name === req.employee);
    return emp?.department === reportParams.department;
  }) : allLeaveRequests;

  // Get data count based on report type and filters
  const getDataCount = () => {
    switch (reportParams.reportType) {
      case 'Attendance Report':
        return filteredEmployees.length;
      case 'Payroll Summary':
        return filteredEmployees.filter(emp => emp.status === 'Active').length;
      case 'Leave Analysis':
        return filteredLeaveRequests.length;
      case 'Performance Report':
        return filteredEmployees.length;
      case 'Department Overview':
        return reportParams.department ? filteredEmployees.length : departments.length;
      default:
        return filteredEmployees.length;
    }
  };
  const dataCount = getDataCount();

  // Get additional stats for preview
  const getAdditionalStats = () => {
    switch (reportParams.reportType) {
      case 'Payroll Summary':
        const totalSalary = filteredEmployees.reduce((sum, emp) => sum + emp.baseSalary, 0);
        return `Total Annual Salaries: $${totalSalary.toLocaleString()}`;
      case 'Leave Analysis':
        const pendingRequests = filteredLeaveRequests.filter(req => req.status === 'Pending').length;
        return `Pending Requests: ${pendingRequests}`;
      case 'Department Overview':
        if (reportParams.department) {
          const deptSalary = filteredEmployees.reduce((sum, emp) => sum + emp.baseSalary, 0);
          return `Department Budget: $${deptSalary.toLocaleString()}`;
        }
        return `Total Departments: ${departments.length}`;
      default:
        return `Active Employees: ${filteredEmployees.filter(emp => emp.status === 'Active').length}`;
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <span>Generate Report</span>
        </CardTitle>
        <CardDescription>
          Configure report parameters and generate comprehensive reports from main system data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Data Source Info */}
        <ReportDataSource totalEmployees={allEmployees.length} totalLeaveRequests={allLeaveRequests.length} />

        {/* Report Configuration */}
        <ReportConfiguration reportParams={reportParams} departments={departments} onParamsChange={onParamsChange} />

        {/* Report Preview */}
        <ReportPreview reportParams={reportParams} dataCount={dataCount} additionalStats={getAdditionalStats()} />

        {/* Validation Warning */}
        {dataCount === 0 && <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">No Data Available</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  No data matches the selected criteria. Please adjust your filters or select a different report type.
                </p>
              </div>
            </div>
          </div>}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={onSubmit} disabled={dataCount === 0} className="bg-yellow-500 hover:bg-yellow-400">
            Generate & Download Report ({dataCount} records)
          </Button>
          <Button variant="outline" onClick={onCancel} className="bg-pink-800 hover:bg-pink-700">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>;
};
export default GenerateReportForm;