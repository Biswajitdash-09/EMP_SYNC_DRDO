
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plane } from 'lucide-react';

interface LeaveReportsSectionProps {
  pendingRequests: number;
  approvedThisMonth: number;
  totalLeaveTypes: number;
}

const LeaveReportsSection = ({ 
  pendingRequests, 
  approvedThisMonth, 
  totalLeaveTypes 
}: LeaveReportsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Quick Reports</h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Monthly Leave Summary
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="w-4 h-4 mr-2" />
              Employee Leave Balances
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plane className="w-4 h-4 mr-2" />
              Leave Trends Analysis
            </Button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Leave Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Pending Requests</span>
              <span className="font-medium text-yellow-600">{pendingRequests}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Approved This Month</span>
              <span className="font-medium text-green-600">{approvedThisMonth}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Total Leave Types</span>
              <span className="font-medium text-blue-600">{totalLeaveTypes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveReportsSection;
