
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { attendanceService, AttendanceLog } from '@/services/attendanceService';
import { useRealtimeAttendanceLogs } from '@/hooks/useRealtimeAttendanceLogs';
import AttendanceControls from './AttendanceTracking/AttendanceControls';
import AttendanceStats from './AttendanceTracking/AttendanceStats';
import AttendanceHistory from './AttendanceTracking/AttendanceHistory';

interface AttendanceTrackingProps {
  employeeId: string;
}

const AttendanceTracking = ({ employeeId }: AttendanceTrackingProps) => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentSession, setCurrentSession] = useState<AttendanceLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLogs, setInitialLogs] = useState<AttendanceLog[]>([]);
  
  const { attendanceLogs } = useRealtimeAttendanceLogs(initialLogs);

  // Hide attendance tracking for admins
  const isEmployee = !profile?.role || profile?.role !== 'admin';

  useEffect(() => {
    if (isEmployee) {
      loadAttendanceData();
    }
  }, [isEmployee]);

  const loadAttendanceData = async () => {
    try {
      setLoading(true);
      
      // Get today's attendance
      const todayAttendance = await attendanceService.getTodayAttendance();
      
      if (todayAttendance && todayAttendance.clock_in && !todayAttendance.clock_out) {
        setIsCheckedIn(true);
        setCurrentSession(todayAttendance);
      }

      // Get recent attendance records
      const records = await attendanceService.getAttendanceRecords(10);
      setInitialLogs(records);
    } catch (error) {
      console.error('Error loading attendance data:', error);
      toast({
        title: "Error",
        description: "Failed to load attendance data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      
      const record = await attendanceService.clockIn();
      
      setIsCheckedIn(true);
      setCurrentSession(record);
      
      console.log('Clock-in successful, triggering real-time sync:', record);
      
      toast({
        title: "Checked In Successfully",
        description: `Check-in time: ${new Date(record.clock_in!).toLocaleTimeString()}`,
      });
    } catch (error: any) {
      console.error('Error checking in:', error);
      toast({
        title: "Check-in Failed",
        description: error.message || "Failed to record check-in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!currentSession) return;
    
    try {
      setLoading(true);
      
      const updatedRecord = await attendanceService.clockOut(currentSession.id);
      
      setIsCheckedIn(false);
      setCurrentSession(null);
      
      console.log('Clock-out successful, triggering real-time sync:', updatedRecord);
      
      toast({
        title: "Checked Out Successfully",
        description: `Check-out time: ${new Date().toLocaleTimeString()}`,
      });
    } catch (error: any) {
      console.error('Error checking out:', error);
      toast({
        title: "Check-out Failed",
        description: error.message || "Failed to record check-out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Don't render attendance tracking for admins
  if (!isEmployee) {
    return (
      <AttendanceControls 
        isCheckedIn={false}
        currentSession={null}
        loading={false}
        onCheckIn={() => {}}
        onCheckOut={() => {}}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AttendanceControls 
        isCheckedIn={isCheckedIn}
        currentSession={currentSession}
        loading={loading}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />

      <AttendanceStats attendanceLogs={attendanceLogs} />

      <AttendanceHistory attendanceLogs={attendanceLogs} loading={loading} />
    </div>
  );
};

export default AttendanceTracking;
