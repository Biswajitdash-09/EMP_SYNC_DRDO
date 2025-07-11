
/**
 * Report Data Source Info Component
 * Shows live data statistics for report generation
 */

import { Badge } from "@/components/ui/badge";
import { Database } from 'lucide-react';

interface ReportDataSourceProps {
  totalEmployees: number;
  totalLeaveRequests: number;
}

const ReportDataSource = ({ totalEmployees, totalLeaveRequests }: ReportDataSourceProps) => {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-blue-800">Live Data Source</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-blue-700">Total Employees:</span>
          <Badge variant="secondary" className="ml-2">{totalEmployees}</Badge>
        </div>
        <div>
          <span className="text-blue-700">Leave Requests:</span>
          <Badge variant="secondary" className="ml-2">{totalLeaveRequests}</Badge>
        </div>
      </div>
    </div>
  );
};

export default ReportDataSource;
