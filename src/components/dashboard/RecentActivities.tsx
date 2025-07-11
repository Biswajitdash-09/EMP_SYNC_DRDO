
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from 'react';

const RecentActivities = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const recentActivities = [{
    action: "New employee onboarded",
    employee: "Sarah Johnson",
    time: "2 hours ago",
    type: "success"
  }, {
    action: "Leave request submitted",
    employee: "Mike Chen",
    time: "4 hours ago",
    type: "warning"
  }, {
    action: "Payroll processed",
    employee: "All Employees",
    time: "1 day ago",
    type: "info"
  }, {
    action: "Performance review completed",
    employee: "David Wilson",
    time: "2 days ago",
    type: "success"
  }, {
    action: "Policy update published",
    employee: "HR Department",
    time: "3 days ago",
    type: "info"
  }];

  if (isLoading) {
    return (
      <Card className="glass backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/30">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activities</CardTitle>
          <CardDescription>Latest system activities and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start space-x-3 p-3">
              <Skeleton className="w-2 h-2 rounded-full mt-2" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/30 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Recent Activities</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Latest system activities and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div 
            key={index} 
            className={`
              flex items-start space-x-3 p-3 rounded-lg
              glass backdrop-blur-sm
              bg-white/40 dark:bg-gray-800/40
              border border-white/20 dark:border-gray-700/20
              transition-all duration-500 hover:scale-[1.02] hover:shadow-lg
              animate-slide-up opacity-0
            `}
            style={{ 
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <div className={`
              w-3 h-3 rounded-full mt-2 transition-all duration-300
              ${activity.type === 'success' ? 'bg-green-500 shadow-lg shadow-green-500/30' : 
                activity.type === 'warning' ? 'bg-orange-500 shadow-lg shadow-orange-500/30' : 
                'bg-blue-500 shadow-lg shadow-blue-500/30'}
            `} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {activity.action}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {activity.employee}
              </p>
              <p className={`
                text-xs transition-all duration-500 opacity-70 hover:opacity-100
                ${activity.type === 'success' ? 'text-green-600 dark:text-green-400' : 
                  activity.type === 'warning' ? 'text-orange-600 dark:text-orange-400' : 
                  'text-blue-600 dark:text-blue-400'}
              `}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
