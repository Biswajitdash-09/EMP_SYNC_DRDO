
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw } from 'lucide-react';

interface AttendanceTableHeaderProps {
  isAdmin: boolean;
  loading: boolean;
  onRefresh: () => void;
}

const AttendanceTableHeader = ({ isAdmin, loading, onRefresh }: AttendanceTableHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Real-time Attendance Tracking
          </CardTitle>
          <CardDescription>
            {isAdmin ? 'Admin view: All employee attendance logs with real-time updates' : 'Live clock-in/clock-out system with automated time calculation'}
          </CardDescription>
        </div>
        {isAdmin && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>
    </CardHeader>
  );
};

export default AttendanceTableHeader;
