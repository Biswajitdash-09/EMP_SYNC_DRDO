
import { Card, CardContent } from "@/components/ui/card";

interface ScheduleStatsProps {
  todayCount: number;
  upcomingCount: number;
  totalHours: number;
}

const ScheduleStats = ({ todayCount, upcomingCount, totalHours }: ScheduleStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{todayCount}</div>
            <div className="text-sm text-gray-600">Today's Events</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{upcomingCount}</div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalHours}</div>
            <div className="text-sm text-gray-600">Hours Scheduled</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleStats;
