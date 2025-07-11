
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, AlertTriangle, UserX, TrendingUp } from 'lucide-react';
import { AttendanceStats as AttendanceStatsType } from '@/hooks/time-tracking/useTimeTrackingCore';

interface AttendanceStatsProps {
  stats: AttendanceStatsType;
}

const AttendanceStats = ({ stats }: AttendanceStatsProps) => {
  const attendanceRate = Math.round((stats.presentToday / stats.totalEmployees) * 100);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Present Today</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.presentToday}</div>
          <p className="text-xs text-muted-foreground">
            Out of {stats.totalEmployees} employees ({attendanceRate}%)
          </p>
          <div className="mt-2">
            <div 
              className="h-2 bg-gray-200 rounded-full overflow-hidden"
            >
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${attendanceRate}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.lateArrivals}</div>
          <p className="text-xs text-muted-foreground">Arrived after 9:15 AM</p>
          <Badge variant="outline" className="mt-2 text-yellow-600 border-yellow-200">
            {Math.round((stats.lateArrivals / stats.totalEmployees) * 100)}% of workforce
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Absences</CardTitle>
          <UserX className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.absences}</div>
          <p className="text-xs text-muted-foreground">Unplanned absences</p>
          <Badge variant="outline" className="mt-2 text-red-600 border-red-200">
            {Math.round((stats.absences / stats.totalEmployees) * 100)}% absence rate
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Daily Hours</CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.avgWorkHours}h</div>
          <p className="text-xs text-muted-foreground">Hours per employee</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600">+0.2h from last week</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Hours</CardTitle>
          <Clock className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-indigo-600">{stats.weeklyHours}h</div>
          <p className="text-xs text-muted-foreground">Average this week</p>
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${(stats.weeklyHours / 40) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Target: 40h/week</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceStats;
