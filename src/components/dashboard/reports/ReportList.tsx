
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar } from 'lucide-react';
import { Report, getStatusColor, getCategoryColor } from './reportUtils';

interface ReportListProps {
  reports: Report[];
  onDownload: (reportId: number) => void;
}

const ReportList = ({ reports, onDownload }: ReportListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Reports</CardTitle>
        <CardDescription>
          Your recently generated reports and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="flex items-start gap-4 flex-1">
                <FileText className="w-8 h-8 text-blue-600 mt-1" />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{report.title}</h4>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <Badge className={getCategoryColor(report.category)}>
                      {report.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{report.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Generated: {new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <span>Size: {report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {report.status === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownload(report.id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportList;
