
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceLog } from '@/services/attendanceService';

interface AttendanceStatsProps {
  attendanceLogs: AttendanceLog[];
}

const AttendanceStats = ({ attendanceLogs }: AttendanceStatsProps) => {
  const calculateTotalHours = (records: AttendanceLog[]) => {
    return records.reduce((total, record) => {
      return total + (record.total_hours || 0);
    }, 0);
  };

  const totalHours = calculateTotalHours(attendanceLogs);
  const lateEntries = attendanceLogs.filter(record => {
    if (!record.clock_in) return false;
    const clockInTime = new Date(record.clock_in);
    return clockInTime.getHours() > 9 || (clockInTime.getHours() === 9 && clockInTime.getMinutes() > 15);
  }).length;
  const earlyLogouts = attendanceLogs.filter(record => {
    if (!record.clock_out) return false;
    const clockOutTime = new Date(record.clock_out);
    return clockOutTime.getHours() < 17;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)}</p>
        <p className="text-sm text-gray-600">Total Hours</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-yellow-600">{lateEntries}</p>
        <p className="text-sm text-gray-600">Late Entries</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-orange-600">{earlyLogouts}</p>
        <p className="text-sm text-gray-600">Early Logouts</p>
      </div>
    </div>
  );
};

export default AttendanceStats;
