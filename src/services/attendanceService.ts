
import { supabase } from '@/integrations/supabase/client';

export interface AttendanceLog {
  id: string;
  employee_id: string;
  date: string;
  clock_in: string | null;
  clock_out: string | null;
  total_hours: number;
  project?: string;
  status: string;
  overtime: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  employee_name?: string; // Add this for admin view
}

export const attendanceService = {
  // Clock in for today with duplicate prevention
  async clockIn(project?: string, notes?: string): Promise<AttendanceLog> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const today = new Date().toISOString().split('T')[0];
    
    // Check if already clocked in today
    const { data: existingLog } = await supabase
      .from('attendance_logs')
      .select('*')
      .eq('employee_id', user.id)
      .eq('date', today)
      .maybeSingle();

    if (existingLog && existingLog.clock_in) {
      throw new Error('You have already clocked in today');
    }

    // If there's an existing log without clock_in, update it; otherwise create new
    if (existingLog && !existingLog.clock_in) {
      const { data, error } = await supabase
        .from('attendance_logs')
        .update({
          clock_in: new Date().toISOString(),
          project,
          notes,
          status: 'active'
        })
        .eq('id', existingLog.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('attendance_logs')
        .insert({
          employee_id: user.id,
          date: today,
          clock_in: new Date().toISOString(),
          project,
          notes,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  // Clock out for today with validation
  async clockOut(attendanceId: string): Promise<AttendanceLog> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Verify the attendance log belongs to the user and has a clock_in
    const { data: existingLog } = await supabase
      .from('attendance_logs')
      .select('*')
      .eq('id', attendanceId)
      .eq('employee_id', user.id)
      .maybeSingle();

    if (!existingLog) {
      throw new Error('Attendance record not found');
    }

    if (!existingLog.clock_in) {
      throw new Error('You must clock in before clocking out');
    }

    if (existingLog.clock_out) {
      throw new Error('You have already clocked out today');
    }

    const { data, error } = await supabase
      .from('attendance_logs')
      .update({
        clock_out: new Date().toISOString()
        // total_hours and status will be calculated by the database trigger
      })
      .eq('id', attendanceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get today's attendance for current user
  async getTodayAttendance(): Promise<AttendanceLog | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('attendance_logs')
      .select('*')
      .eq('employee_id', user.id)
      .eq('date', today)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Get attendance records for current user
  async getAttendanceRecords(limit = 30): Promise<AttendanceLog[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('attendance_logs')
      .select('*')
      .eq('employee_id', user.id)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Get all attendance records (admin only) - FIXED QUERY
  async getAllAttendanceRecords(): Promise<AttendanceLog[]> {
    console.log('🔍 Admin fetching all attendance logs...');
    
    try {
      // First, get all attendance logs
      const { data: attendanceLogs, error: attendanceError } = await supabase
        .from('attendance_logs')
        .select('*')
        .order('date', { ascending: false });

      if (attendanceError) {
        console.error('❌ Error fetching attendance logs:', attendanceError);
        throw attendanceError;
      }

      if (!attendanceLogs || attendanceLogs.length === 0) {
        console.log('📋 No attendance logs found');
        return [];
      }

      // Get unique employee IDs
      const employeeIds = [...new Set(attendanceLogs.map(log => log.employee_id))];
      
      // Fetch employee profiles separately
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', employeeIds);

      if (profilesError) {
        console.warn('⚠️ Could not fetch employee profiles:', profilesError);
        // Continue without employee names
      }

      // Map logs with employee names
      const logsWithNames = attendanceLogs.map(log => ({
        ...log,
        employee_name: profiles?.find(p => p.id === log.employee_id)?.full_name || 
                      profiles?.find(p => p.id === log.employee_id)?.email || 
                      'Unknown Employee'
      }));

      console.log(`✅ Successfully fetched ${logsWithNames.length} attendance logs`);
      return logsWithNames;

    } catch (error) {
      console.error('💥 Critical error in getAllAttendanceRecords:', error);
      throw error;
    }
  },

  // Update attendance record (admin only)
  async updateAttendanceRecord(id: string, updates: Partial<AttendanceLog>): Promise<AttendanceLog> {
    const { data, error } = await supabase
      .from('attendance_logs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete attendance record (admin only)
  async deleteAttendanceRecord(id: string): Promise<void> {
    const { error } = await supabase
      .from('attendance_logs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
