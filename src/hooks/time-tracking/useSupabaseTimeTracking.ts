import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { attendanceService, AttendanceLog } from '@/services/attendanceService';
import { useRealtimeAttendanceLogs } from '@/hooks/useRealtimeAttendanceLogs';

export interface TimeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  totalHours: number;
  overtime: number;
  status: 'clocked-in' | 'clocked-out' | 'break';
  project?: string;
  description?: string;
}

export interface AttendanceStats {
  presentToday: number;
  totalEmployees: number;
  lateArrivals: number;
  absences: number;
  avgWorkHours: number;
  weeklyHours: number;
  monthlyHours: number;
}

export const useSupabaseTimeTracking = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClocked, setIsClocked] = useState(false);
  const [todayHours, setTodayHours] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLogs, setInitialLogs] = useState<AttendanceLog[]>([]);
  
  const { attendanceLogs } = useRealtimeAttendanceLogs(initialLogs);

  // Only allow employees to use time tracking
  const isEmployee = !profile?.role || profile?.role !== 'admin';

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load initial data only for employees
  useEffect(() => {
    if (isEmployee) {
      loadAttendanceData();
    }
  }, [isEmployee]);

  // Update clocked status based on attendance logs
  useEffect(() => {
    if (!isEmployee) return;

    const today = new Date().toISOString().split('T')[0];
    const todayLog = attendanceLogs.find(log => log.date === today);
    
    if (todayLog && todayLog.clock_in && !todayLog.clock_out) {
      setIsClocked(true);
    } else {
      setIsClocked(false);
    }

    // Calculate today's hours
    const todayTotalHours = todayLog?.total_hours || 0;
    setTodayHours(todayTotalHours);

    // Calculate weekly hours (simple calculation for demo)
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekStartStr = weekStart.toISOString().split('T')[0];
    
    const weeklyTotal = attendanceLogs
      .filter(log => log.date >= weekStartStr)
      .reduce((total, log) => total + (log.total_hours || 0), 0);
    
    setWeeklyHours(weeklyTotal);
  }, [attendanceLogs, isEmployee]);

  const loadAttendanceData = async () => {
    if (!isEmployee) return;

    try {
      setLoading(true);
      const records = await attendanceService.getAttendanceRecords(50);
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

  const handleClockToggle = async () => {
    if (!isEmployee) {
      toast({
        title: "Access Denied",
        description: "Time tracking is only available for employees.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      if (!isClocked) {
        // Clock In
        await attendanceService.clockIn();
        toast({
          title: "Clocked In",
          description: `Successfully clocked in at ${currentTime.toLocaleTimeString()}`,
        });
      } else {
        // Clock Out
        const today = new Date().toISOString().split('T')[0];
        const todayLog = attendanceLogs.find(log => log.date === today);
        
        if (todayLog) {
          await attendanceService.clockOut(todayLog.id);
          toast({
            title: "Clocked Out",
            description: `Successfully clocked out at ${currentTime.toLocaleTimeString()}`,
          });
        }
      }
    } catch (error: any) {
      console.error('Error toggling clock:', error);
      toast({
        title: "Clock Toggle Failed",
        description: error.message || "Failed to update clock status.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Convert AttendanceLog to TimeEntry format for compatibility
  const timeEntries: TimeEntry[] = attendanceLogs.map(log => ({
    id: log.id,
    employeeId: log.employee_id,
    employeeName: 'Current User', // This would be populated from profiles in real implementation
    date: log.date,
    clockIn: log.clock_in ? new Date(log.clock_in).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }) : '',
    clockOut: log.clock_out ? new Date(log.clock_out).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }) : undefined,
    totalHours: log.total_hours || 0,
    overtime: log.overtime || 0,
    status: log.status === 'active' ? 'clocked-in' : 'clocked-out',
    project: log.project,
    description: log.notes
  }));

  const attendanceStats: AttendanceStats = {
    presentToday: 1, // This would be calculated from all employees
    totalEmployees: 1,
    lateArrivals: 0,
    absences: 0,
    avgWorkHours: todayHours,
    weeklyHours,
    monthlyHours: weeklyHours * 4 // Simplified calculation
  };

  return {
    currentTime,
    isClocked: isEmployee ? isClocked : false,
    todayHours: isEmployee ? todayHours : 0,
    weeklyHours: isEmployee ? weeklyHours : 0,
    timeEntries: isEmployee ? timeEntries : [],
    attendanceStats,
    handleClockToggle,
    loading,
    // Keep existing methods for compatibility
    addTimesheetEntry: () => {},
    updateTimeEntry: () => {},
    deleteTimeEntry: () => {},
  };
};
