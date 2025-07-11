
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { AttendanceLog } from '@/services/attendanceService';

interface AttendanceControlsProps {
  isCheckedIn: boolean;
  currentSession: AttendanceLog | null;
  loading: boolean;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

const AttendanceControls = ({ 
  isCheckedIn, 
  currentSession, 
  loading, 
  onCheckIn, 
  onCheckOut 
}: AttendanceControlsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Attendance Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            {!isCheckedIn ? (
              <Button 
                onClick={onCheckIn} 
                className="flex items-center gap-2"
                disabled={loading}
              >
                <CheckCircle className="w-4 h-4" />
                Check In
              </Button>
            ) : (
              <Button 
                onClick={onCheckOut} 
                variant="outline" 
                className="flex items-center gap-2"
                disabled={loading}
              >
                <XCircle className="w-4 h-4" />
                Check Out
              </Button>
            )}
          </div>

          {currentSession && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Checked in at: <strong>{new Date(currentSession.clock_in!).toLocaleTimeString()}</strong>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceControls;
