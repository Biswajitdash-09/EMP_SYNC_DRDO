
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock } from 'lucide-react';

interface LeaveStatsCardsProps {
  pendingRequests: number;
  approvedThisMonth: number;
  totalHolidays: number;
}

const LeaveStatsCards = ({ 
  pendingRequests, 
  approvedThisMonth, 
  totalHolidays 
}: LeaveStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingRequests}</p>
              <p className="text-sm text-gray-600">Pending Requests</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{approvedThisMonth}</p>
              <p className="text-sm text-gray-600">Approved This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalHolidays}</p>
              <p className="text-sm text-gray-600">Holidays This Year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveStatsCards;
