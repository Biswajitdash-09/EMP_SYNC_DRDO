
/**
 * Performance Statistics Cards Component
 * Displays key performance metrics in a grid layout
 * Shows averages, completion rates, and review status
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Target, Calendar, TrendingUp } from 'lucide-react';

// Interface for performance statistics data
interface PerformanceStatsCardsProps {
  averageScore: number;
  goalCompletionRate: number;
  pendingReviews: number;
  topPerformers: number;
}

const PerformanceStatsCards = ({ 
  averageScore, 
  goalCompletionRate, 
  pendingReviews, 
  topPerformers 
}: PerformanceStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Overall performance rating average */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Out of 5.0</p>
        </CardContent>
      </Card>

      {/* Goal achievement tracking */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{goalCompletionRate.toFixed(0)}%</div>
          <p className="text-xs text-muted-foreground">This quarter</p>
        </CardContent>
      </Card>

      {/* Pending review management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingReviews}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      {/* High performer identification */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topPerformers}</div>
          <p className="text-xs text-muted-foreground">Above 4.5 rating</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceStatsCards;
