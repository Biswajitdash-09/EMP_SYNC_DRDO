
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Calendar, MapPin } from 'lucide-react';

const ReportsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Absenteeism Reports & Analytics</CardTitle>
        <CardDescription>Generate comprehensive attendance and time tracking reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Quick Reports</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Daily Attendance Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Weekly Timesheet Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Monthly Attendance Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                Overtime Report
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Attendance Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Average Attendance Rate</span>
                <span className="font-medium text-green-600">94.5%</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Late Arrivals (This Month)</span>
                <span className="font-medium text-yellow-600">23</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Absenteeism Rate</span>
                <span className="font-medium text-red-600">5.5%</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Avg. Work Hours/Day</span>
                <span className="font-medium text-blue-600">8.2h</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsSection;
