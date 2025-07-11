
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AttendanceRecord {
  id: string;
  user_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
}

export const useRealtimeAttendance = (initialAttendance: AttendanceRecord[] = []) => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const { toast } = useToast();

  useEffect(() => {
    setAttendance(initialAttendance);
  }, [initialAttendance]);

  useEffect(() => {
    console.log('Setting up real-time subscription for attendance');
    
    const channel = supabase
      .channel('attendance_realtime')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'attendance' 
        },
        (payload) => {
          console.log('Attendance change received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setAttendance(prev => [payload.new as AttendanceRecord, ...prev]);
            
            toast({
              title: "New Attendance Record",
              description: `New attendance entry for ${payload.new.date}`,
            });
          } else if (payload.eventType === 'UPDATE') {
            setAttendance(prev => 
              prev.map(record => 
                record.id === payload.new.id ? payload.new as AttendanceRecord : record
              )
            );

            toast({
              title: "Attendance Updated",
              description: `Attendance record for ${payload.new.date} has been updated`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up attendance real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return { attendance, setAttendance };
};
