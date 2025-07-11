
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TimeEntry } from '@/hooks/time-tracking/useTimeTrackingCore';
import { useRealtimeAttendanceSync } from '@/hooks/useRealtimeAttendanceSync';
import { attendanceService } from '@/services/attendanceService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import EditTimeEntryModal from './EditTimeEntryModal';
import AttendanceTableHeader from './AttendanceTable/AttendanceTableHeader';
import AttendanceTableBody from './AttendanceTable/AttendanceTableBody';

interface AttendanceTableProps {
  timeEntries: TimeEntry[];
  onEditEntry?: (entry: TimeEntry) => void;
  onDeleteEntry?: (entryId: string) => void;
  onViewDetails?: (entry: TimeEntry) => void;
}

const AttendanceTable = ({ timeEntries, onEditEntry, onDeleteEntry, onViewDetails }: AttendanceTableProps) => {
  const [selectedEntry, setSelectedEntry] = useState<TimeEntry | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLogs, setInitialLogs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { profile } = useAuth();

  // Use real-time sync for admin dashboard
  const { attendanceLogs } = useRealtimeAttendanceSync(initialLogs);

  // Check if user is admin
  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      loadAllAttendanceLogs();
    }
  }, [isAdmin]);

  const loadAllAttendanceLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading attendance logs for admin...');
      
      const logs = await attendanceService.getAllAttendanceRecords();
      setInitialLogs(logs);
      
      console.log(`✅ Loaded ${logs.length} attendance logs successfully`);
      
    } catch (error: any) {
      console.error('❌ Error loading attendance logs:', error);
      setError(error.message || 'Failed to load attendance logs');
      toast({
        title: "Error Loading Data",
        description: `Failed to load attendance logs: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadAllAttendanceLogs();
    if (!error) {
      toast({
        title: "Refreshed",
        description: "Attendance data has been refreshed.",
      });
    }
  };

  const formatTime = (time?: string) => {
    if (!time) return '-';
    return new Date(time).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleEditClick = (entry: TimeEntry) => {
    setSelectedEntry(entry);
    setIsEditModalOpen(true);
  };

  const handleSaveEntry = (updatedEntry: TimeEntry) => {
    onEditEntry?.(updatedEntry);
  };

  const handleDeleteEntry = (entryId: string) => {
    onDeleteEntry?.(entryId);
  };

  // Helper function to convert database status to TimeEntry status
  const convertToTimeEntryStatus = (dbStatus: string): "clocked-in" | "clocked-out" | "break" => {
    switch (dbStatus) {
      case 'active':
        return 'clocked-in';
      case 'completed':
        return 'clocked-out';
      case 'break':
        return 'break';
      default:
        return 'clocked-out';
    }
  };

  // Use real-time logs for admin, regular timeEntries for employees
  const displayData = isAdmin ? attendanceLogs.map(log => ({
    id: log.id,
    employeeId: log.employee_id,
    employeeName: log.employee_name || 'Unknown Employee',
    date: log.date,
    clockIn: log.clock_in ? formatTime(log.clock_in) : '',
    clockOut: log.clock_out ? formatTime(log.clock_out) : '',
    totalHours: log.total_hours || 0,
    overtime: log.overtime || 0,
    status: convertToTimeEntryStatus(log.status || 'completed'),
    project: log.project,
    description: log.notes
  })) : timeEntries;

  // Show error state if there's an error
  if (error && isAdmin) {
    return (
      <Card>
        <AttendanceTableHeader 
          isAdmin={isAdmin} 
          loading={loading} 
          onRefresh={handleRefresh} 
        />
        <CardContent>
          <div className="rounded-lg border p-8 text-center">
            <div className="text-red-600 mb-4">
              <h3 className="text-lg font-semibold">Error Loading Attendance Logs</h3>
              <p className="text-sm mt-2">{error}</p>
            </div>
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Retrying...' : 'Retry'}
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <AttendanceTableHeader 
          isAdmin={isAdmin} 
          loading={loading} 
          onRefresh={handleRefresh} 
        />
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Employee</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Clock In</TableHead>
                  <TableHead className="font-semibold">Clock Out</TableHead>
                  <TableHead className="font-semibold">Total Hours</TableHead>
                  <TableHead className="font-semibold">Overtime</TableHead>
                  <TableHead className="font-semibold">Project</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <AttendanceTableBody 
                displayData={displayData}
                loading={loading}
                isAdmin={isAdmin}
                onViewDetails={onViewDetails}
                onEditClick={handleEditClick}
              />
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditTimeEntryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        entry={selectedEntry}
        onSave={handleSaveEntry}
        onDelete={handleDeleteEntry}
      />
    </>
  );
};

export default AttendanceTable;
