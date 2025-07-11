
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from 'lucide-react';
import { AttendanceLog } from '@/services/attendanceService';

interface AttendanceHistoryProps {
  attendanceLogs: AttendanceLog[];
  loading: boolean;
}

const AttendanceHistory = ({ attendanceLogs, loading }: AttendanceHistoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Attendance History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {loading ? (
            <p className="text-center py-4">Loading attendance records...</p>
          ) : attendanceLogs.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No attendance records found</p>
          ) : (
            attendanceLogs.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">
                    {record.clock_in ? new Date(record.clock_in).toLocaleTimeString() : 'Not clocked in'} - {
                      record.clock_out 
                        ? new Date(record.clock_out).toLocaleTimeString()
                        : 'Not checked out'
                    }
                    {record.total_hours > 0 && (
                      ` (${record.total_hours.toFixed(1)}h)`
                    )}
                  </p>
                  {record.project && (
                    <p className="text-xs text-gray-500">Project: {record.project}</p>
                  )}
                </div>
                <Badge className={getStatusColor(record.status)}>
                  {record.status === 'active' ? 'Active' : record.status === 'completed' ? 'Completed' : record.status}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
