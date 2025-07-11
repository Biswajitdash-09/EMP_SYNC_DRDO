/**
 * Report Configuration Component
 * Handles report parameter selection and configuration
 */

import { Label } from "@/components/ui/label";
interface ReportConfigurationProps {
  reportParams: {
    reportType: string;
    dateRange: string;
    format: string;
    department: string;
  };
  departments: string[];
  onParamsChange: (updates: any) => void;
}
const ReportConfiguration = ({
  reportParams,
  departments,
  onParamsChange
}: ReportConfigurationProps) => {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="reportType">Report Type *</Label>
        <select id="reportType" value={reportParams.reportType} onChange={e => onParamsChange(prev => ({
        ...prev,
        reportType: e.target.value
      }))} className="w-full p-2 border rounded-md bg-lime-500">
          <option value="Attendance Report">Attendance Report</option>
          <option value="Payroll Summary">Payroll Summary</option>
          <option value="Leave Analysis">Leave Analysis</option>
          <option value="Performance Report">Performance Report</option>
          <option value="Department Overview">Department Overview</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="dateRange">Date Range *</Label>
        <select id="dateRange" value={reportParams.dateRange} onChange={e => onParamsChange(prev => ({
        ...prev,
        dateRange: e.target.value
      }))} className="w-full p-2 border rounded-md bg-amber-500">
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 3 Months">Last 3 Months</option>
          <option value="Last 6 Months">Last 6 Months</option>
          <option value="Last Year">Last Year</option>
          <option value="Current Month">Current Month</option>
          <option value="Current Quarter">Current Quarter</option>
          <option value="Last Quarter">Last Quarter</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="format">Format *</Label>
        <select id="format" value={reportParams.format} onChange={e => onParamsChange(prev => ({
        ...prev,
        format: e.target.value
      }))} className="w-full p-2 border rounded-md bg-red-500">
          <option value="PDF">PDF</option>
          <option value="Excel">Excel</option>
          <option value="CSV">CSV</option>
          <option value="Text">Text File</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="department">Department (Optional)</Label>
        <select id="department" value={reportParams.department} onChange={e => onParamsChange(prev => ({
        ...prev,
        department: e.target.value
      }))} className="w-full p-2 border rounded-md bg-violet-500">
          <option value="">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>
      </div>
    </div>;
};
export default ReportConfiguration;