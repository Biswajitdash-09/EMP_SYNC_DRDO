
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AttendanceLog } from '@/services/attendanceService';

export const useRealtimeAttendanceLogs = (initialLogs: AttendanceLog[] = []) => {
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>(initialLogs);
  const { toast } = useToast();

  useEffect(() => {
    setAttendanceLogs(initialLogs);
  }, [initialLogs]);

  useEffect(() => {
    console.log('Setting up real-time subscription for attendance logs');
    
    const channel = supabase
      .channel('attendance_logs_realtime')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'attendance_logs' 
        },
        (payload) => {
          console.log('Attendance log change received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setAttendanceLogs(prev => [payload.new as AttendanceLog, ...prev]);
            
            toast({
              title: "New Clock-In",
              description: `Employee clocked in at ${new Date(payload.new.clock_in).toLocaleTimeString()}`,
            });
          } else if (payload.eventType === 'UPDATE') {
            setAttendanceLogs(prev => 
              prev.map(log => 
                log.id === payload.new.id ? payload.new as AttendanceLog : log
              )
            );

            if (payload.new.clock_out && !payload.old.clock_out) {
              toast({
                title: "Clock-Out Recorded",
                description: `Employee clocked out at ${new Date(payload.new.clock_out).toLocaleTimeString()}`,
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
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up attendance logs real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return { attendanceLogs, setAttendanceLogs };
};
