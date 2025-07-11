
/**
 * Performance Table Component
 * Displays detailed employee performance data in tabular format
 * Shows scores, goal progress, review dates, and performance status
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star } from 'lucide-react';
import { PerformanceData } from '@/hooks/performance/usePerformanceCore';

interface PerformanceTableProps {
  data: PerformanceData[];
}

const PerformanceTable = ({ data }: PerformanceTableProps) => {
  /**
   * Determine badge color based on performance status
   * Color coding for quick visual assessment
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Exceeding': return 'bg-green-100 text-green-800';
      case 'On Track': return 'bg-blue-100 text-blue-800';
      case 'Needs Improvement': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Performance Monitoring</CardTitle>
        <CardDescription>Track individual and team performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Current Score</TableHead>
              <TableHead>Goal Progress</TableHead>
              <TableHead>Last Review</TableHead>
              <TableHead>Next Review</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((employee) => (
              <TableRow key={employee.id}>
                {/* Employee identification */}
                <TableCell className="font-medium">{employee.employee}</TableCell>
                
                {/* Department assignment */}
                <TableCell>{employee.department}</TableCell>
                
                {/* Performance rating with star icon */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{employee.currentScore}/5.0</span>
                  </div>
                </TableCell>
                
                {/* Goal completion progress bar */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={employee.goalProgress} className="w-20" />
                    <span className="text-sm">{employee.goalProgress}%</span>
                  </div>
                </TableCell>
                
                {/* Review scheduling dates */}
                <TableCell>{employee.lastReview}</TableCell>
                <TableCell>{employee.nextReview}</TableCell>
                
                {/* Performance status badge */}
                <TableCell>
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PerformanceTable;
