
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AttendanceLog } from '@/services/attendanceService';

export const useRealtimeAttendanceSync = (initialLogs: AttendanceLog[] = []) => {
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>(initialLogs);
  const { toast } = useToast();

  useEffect(() => {
    setAttendanceLogs(initialLogs);
  }, [initialLogs]);

  useEffect(() => {
    console.log('Setting up real-time attendance sync for admin dashboard');
    
    const channel = supabase
      .channel('attendance_sync')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'attendance_logs' 
        },
        (payload) => {
          console.log('Real-time attendance update:', payload);
          
          try {
            if (payload.eventType === 'INSERT') {
              const newLog = payload.new as AttendanceLog;
              setAttendanceLogs(prev => {
                // Prevent duplicates
                const exists = prev.some(log => log.id === newLog.id);
                if (exists) return prev;
                return [newLog, ...prev];
              });
              
              toast({
                title: "New Clock-In",
                description: `Employee clocked in at ${new Date(newLog.clock_in || '').toLocaleTimeString()}`,
              });
            } else if (payload.eventType === 'UPDATE') {
              const updatedLog = payload.new as AttendanceLog;
              setAttendanceLogs(prev => 
                prev.map(log => 
                  log.id === updatedLog.id ? updatedLog : log
                )
              );

              if (updatedLog.clock_out && !payload.old.clock_out) {
                toast({
                  title: "Clock-Out Recorded",
                  description: `Employee clocked out at ${new Date(updatedLog.clock_out).toLocaleTimeString()}`,
                });
              }
            } else if (payload.eventType === 'DELETE') {
              setAttendanceLogs(prev => 
                prev.filter(log => log.id !== payload.old.id)
              );

              toast({
                title: "Attendance Record Deleted",
                description: "An attendance record has been removed",
              });
            }
          } catch (error) {
            console.error('Error processing real-time attendance update:', error);
            toast({
              title: "Sync Error",
              description: "Failed to sync attendance data. Please refresh the page.",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up attendance sync real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return { attendanceLogs, setAttendanceLogs };
};
