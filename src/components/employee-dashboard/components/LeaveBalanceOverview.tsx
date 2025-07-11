
/**
 * Leave Balance Overview Component
 * Displays employee's leave balances in card format
 */

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, AlertCircle, Clock } from 'lucide-react';

interface LeaveBalance {
  annual: number;
  sick: number;
  personal: number;
}

interface LeaveBalanceOverviewProps {
  leaveBalance: LeaveBalance;
}

const LeaveBalanceOverview = ({ leaveBalance }: LeaveBalanceOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Annual Leave</p>
              <p className="text-2xl font-bold">{leaveBalance.annual}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sick Leave</p>
              <p className="text-2xl font-bold">{leaveBalance.sick}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Personal Leave</p>
              <p className="text-2xl font-bold">{leaveBalance.personal}</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveBalanceOverview;
