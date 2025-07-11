
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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

export interface ShiftSchedule {
  id: string;
  employeeId: string;
  employeeName: string;
  shiftName: string;
  startTime: string;
  endTime: string;
  date: string;
  status: 'scheduled' | 'active' | 'completed' | 'missed';
}

export interface OvertimeRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  hours: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  requestedAt: string;
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

export const useTimeTrackingCore = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClocked, setIsClocked] = useState(false);
  const [todayHours, setTodayHours] = useState(7.5);
  const [weeklyHours, setWeeklyHours] = useState(37.5);
  
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      employeeId: 'emp1',
      employeeName: 'John Smith',
      date: '2024-06-21',
      clockIn: '09:00 AM',
      clockOut: '05:30 PM',
      totalHours: 8.5,
      overtime: 0.5,
      status: 'clocked-out',
      project: 'Website Development',
      description: 'Working on user dashboard'
    },
    {
      id: '2',
      employeeId: 'emp2',
      employeeName: 'Sarah Johnson',
      date: '2024-06-21',
      clockIn: '08:45 AM',
      clockOut: '05:15 PM',
      totalHours: 8.5,
      overtime: 0.5,
      status: 'clocked-out',
      project: 'Mobile App',
      description: 'Bug fixes and testing'
    },
    {
      id: '3',
      employeeId: 'emp3',
      employeeName: 'Mike Chen',
      date: '2024-06-21',
      clockIn: '09:30 AM',
      totalHours: 0,
      overtime: 0,
      status: 'clocked-in',
      project: 'API Development',
      description: 'Working on authentication system'
    }
  ]);

  const [shifts, setShifts] = useState<ShiftSchedule[]>([
    {
      id: '1',
      employeeId: 'emp1',
      employeeName: 'John Smith',
      shiftName: 'Morning Shift',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      date: '2024-06-21',
      status: 'completed'
    },
    {
      id: '2',
      employeeId: 'emp2',
      employeeName: 'Sarah Johnson',
      shiftName: 'Morning Shift',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      date: '2024-06-21',
      status: 'completed'
    },
    {
      id: '3',
      employeeId: 'emp3',
      employeeName: 'Mike Chen',
      shiftName: 'Evening Shift',
      startTime: '02:00 PM',
      endTime: '10:00 PM',
      date: '2024-06-21',
      status: 'active'
    }
  ]);

  const [overtimeRequests, setOvertimeRequests] = useState<OvertimeRequest[]>([
    {
      id: '1',
      employeeId: 'emp1',
      employeeName: 'John Smith',
      date: '2024-06-20',
      hours: 2.5,
      reason: 'Project deadline',
      status: 'pending',
      requestedAt: '2024-06-20T18:00:00Z'
    },
    {
      id: '2',
      employeeId: 'emp2',
      employeeName: 'Sarah Johnson',
      date: '2024-06-19',
      hours: 1.5,
      reason: 'Client meeting preparation',
      status: 'approved',
      approvedBy: 'Manager',
      requestedAt: '2024-06-19T17:30:00Z'
    }
  ]);

  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats>({
    presentToday: 92,
    totalEmployees: 100,
    lateArrivals: 5,
    absences: 3,
    avgWorkHours: 8.2,
    weeklyHours: 37.5,
    monthlyHours: 168
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClockToggle = () => {
    const newStatus = !isClocked;
    setIsClocked(newStatus);
    
    if (newStatus) {
      // Clock In
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        employeeId: 'current-user',
        employeeName: 'Current User',
        date: new Date().toISOString().split('T')[0],
        clockIn: currentTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        totalHours: 0,
        overtime: 0,
        status: 'clocked-in'
      };
      
      setTimeEntries(prev => [newEntry, ...prev]);
      
      toast({
        title: "Clocked In",
        description: `Successfully clocked in at ${newEntry.clockIn}`,
      });
    } else {
      // Clock Out
      const clockOutTime = currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      setTimeEntries(prev => 
        prev.map(entry => 
          entry.employeeId === 'current-user' && entry.status === 'clocked-in'
            ? { 
                ...entry, 
                clockOut: clockOutTime, 
                status: 'clocked-out' as const,
                totalHours: 8.5, // Calculate actual hours
                overtime: 0.5
              }
            : entry
        )
      );
      
      toast({
        title: "Clocked Out",
        description: `Successfully clocked out at ${clockOutTime}`,
      });
    }
  };

  // CRUD Operations for Time Entries
  const updateTimeEntry = (updatedEntry: TimeEntry) => {
    setTimeEntries(prev =>
      prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    );
    
    toast({
      title: "Time Entry Updated",
      description: "Time entry has been successfully updated",
    });
  };

  const deleteTimeEntry = (entryId: string) => {
    setTimeEntries(prev => prev.filter(entry => entry.id !== entryId));
    
    toast({
      title: "Time Entry Deleted",
      description: "Time entry has been successfully deleted",
    });
  };

  const addTimesheetEntry = (entry: Partial<TimeEntry>) => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      employeeId: entry.employeeId || 'current-user',
      employeeName: entry.employeeName || 'Current User',
      date: entry.date || new Date().toISOString().split('T')[0],
      clockIn: entry.clockIn || '',
      clockOut: entry.clockOut,
      totalHours: entry.totalHours || 0,
      overtime: entry.overtime || 0,
      status: entry.status || 'clocked-out',
      project: entry.project,
      description: entry.description
    };

    setTimeEntries(prev => [newEntry, ...prev]);
    
    toast({
      title: "Timesheet Entry Added",
      description: "New timesheet entry has been recorded",
    });
  };

  // CRUD Operations for Shifts
  const addShift = (shiftData: Omit<ShiftSchedule, 'id'>) => {
    const newShift: ShiftSchedule = {
      ...shiftData,
      id: Date.now().toString()
    };

    setShifts(prev => [newShift, ...prev]);
    
    toast({
      title: "Shift Created",
      description: "New shift has been successfully created",
    });
  };

  const updateShift = (updatedShift: ShiftSchedule) => {
    setShifts(prev =>
      prev.map(shift => shift.id === updatedShift.id ? updatedShift : shift)
    );
    
    toast({
      title: "Shift Updated",
      description: "Shift has been successfully updated",
    });
  };

  const deleteShift = (shiftId: string) => {
    setShifts(prev => prev.filter(shift => shift.id !== shiftId));
    
    toast({
      title: "Shift Deleted",
      description: "Shift has been successfully deleted",
    });
  };

  // CRUD Operations for Overtime
  const approveOvertime = (requestId: string) => {
    setOvertimeRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: 'approved' as const, approvedBy: 'Manager' }
          : request
      )
    );

    toast({
      title: "Overtime Approved",
      description: "Overtime request has been approved",
    });
  };

  const rejectOvertime = (requestId: string) => {
    setOvertimeRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: 'rejected' as const }
          : request
      )
    );

    toast({
      title: "Overtime Rejected",
      description: "Overtime request has been rejected",
    });
  };

  const addOvertimeRequest = (request: Omit<OvertimeRequest, 'id' | 'status' | 'requestedAt'>) => {
    const newRequest: OvertimeRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    setOvertimeRequests(prev => [newRequest, ...prev]);
    
    toast({
      title: "Overtime Request Submitted",
      description: "Your overtime request has been submitted for approval",
    });
  };

  const deleteOvertimeRequest = (requestId: string) => {
    setOvertimeRequests(prev => prev.filter(request => request.id !== requestId));
    
    toast({
      title: "Overtime Request Deleted",
      description: "Overtime request has been successfully deleted",
    });
  };

  return {
    currentTime,
    isClocked,
    todayHours,
    weeklyHours,
    timeEntries,
    shifts,
    overtimeRequests,
    attendanceStats,
    handleClockToggle,
    // Time Entry CRUD
    addTimesheetEntry,
    updateTimeEntry,
    deleteTimeEntry,
    // Shift CRUD
    addShift,
    updateShift,
    deleteShift,
    // Overtime CRUD
    approveOvertime,
    rejectOvertime,
    addOvertimeRequest,
    deleteOvertimeRequest,
    // Setters for backward compatibility
    setTimeEntries,
    setShifts,
    setOvertimeRequests
  };
};
