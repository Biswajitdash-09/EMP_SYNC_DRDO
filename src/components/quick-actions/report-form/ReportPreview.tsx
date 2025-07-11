
/**
 * Report Preview Component
 * Shows preview of report parameters and statistics
 */

import { Download } from 'lucide-react';

interface ReportPreviewProps {
  reportParams: {
    reportType: string;
    dateRange: string;
    format: string;
    department: string;
  };
  dataCount: number;
  additionalStats: string;
}

const ReportPreview = ({ reportParams, dataCount, additionalStats }: ReportPreviewProps) => {
  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Download className="w-4 h-4 text-gray-600" />
        <span className="font-medium text-gray-800">Report Preview</span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Report:</strong> {reportParams.reportType}</p>
        <p><strong>Period:</strong> {reportParams.dateRange}</p>
        <p><strong>Format:</strong> {reportParams.format}</p>
        <p><strong>Scope:</strong> {reportParams.department || 'All Departments'}</p>
        <p><strong>Data Records:</strong> {dataCount} items will be included</p>
        <p><strong>Additional Info:</strong> {additionalStats}</p>
      </div>
    </div>
  );
};

export default ReportPreview;
