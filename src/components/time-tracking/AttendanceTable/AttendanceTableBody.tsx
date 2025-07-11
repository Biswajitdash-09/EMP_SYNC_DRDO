
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Edit, Eye } from 'lucide-react';
import { TimeEntry } from '@/hooks/time-tracking/useTimeTrackingCore';

interface AttendanceTableBodyProps {
  displayData: TimeEntry[];
  loading: boolean;
  isAdmin: boolean;
  onViewDetails?: (entry: TimeEntry) => void;
  onEditClick: (entry: TimeEntry) => void;
}

const AttendanceTableBody = ({ 
  displayData, 
  loading, 
  isAdmin, 
  onViewDetails, 
  onEditClick 
}: AttendanceTableBodyProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  return (
    <TableBody>
      {displayData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={9} className="text-center py-8">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-gray-400" />
              <p className="text-gray-500">
                {loading ? 'Loading attendance records...' : 'No time entries found'}
              </p>
            </div>
          </TableCell>
        </TableRow>
      ) : (
        displayData.map((entry) => (
          <TableRow key={entry.id} className="hover:bg-gray-50">
            <TableCell className="font-medium">{entry.employeeName}</TableCell>
            <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
            <TableCell>{entry.clockIn || '-'}</TableCell>
            <TableCell>{entry.clockOut || '-'}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                {entry.totalHours > 0 ? `${entry.totalHours.toFixed(1)}h` : 'In Progress'}
              </div>
            </TableCell>
            <TableCell>
              {entry.overtime > 0 ? (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  +{entry.overtime.toFixed(1)}h
                </Badge>
              ) : (
                <span className="text-gray-400">0h</span>
              )}
            </TableCell>
            <TableCell>
              <div className="max-w-32 truncate" title={entry.project}>
                {entry.project || '-'}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(entry.status)}>
                {getStatusText(entry.status)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails?.(entry)}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditClick(entry)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
};

export default AttendanceTableBody;
