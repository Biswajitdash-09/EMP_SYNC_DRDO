
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, DollarSign, Calendar, FileText, BarChart3, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'add-employee',
      title: 'Add Employee',
      description: 'Onboard new team members',
      icon: UserPlus,
      color: 'blue',
      gradient: 'from-blue-400 to-blue-600',
      route: '/quick-actions'
    },
    {
      id: 'process-payroll',
      title: 'Process Payroll',
      description: 'Monthly salary processing',
      icon: DollarSign,
      color: 'green',
      gradient: 'from-green-400 to-green-600',
      route: '/quick-actions'
    },
    {
      id: 'leave-requests',
      title: 'Leave Requests',
      description: 'Review pending applications',
      icon: Calendar,
      color: 'orange',
      gradient: 'from-orange-400 to-orange-600',
      route: '/quick-actions'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Business intelligence reports',
      icon: FileText,
      color: 'purple',
      gradient: 'from-purple-400 to-purple-600',
      route: '/quick-actions'
    },
    {
      id: 'performance-review',
      title: 'Performance Review',
      description: 'Employee evaluations',
      icon: BarChart3,
      color: 'red',
      gradient: 'from-red-400 to-red-600',
      route: '/quick-actions'
    }
  ];

  return (
    <Card className="mt-8 overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <CardTitle className="text-lg animate-fade-in">Quick Actions</CardTitle>
            <CardDescription className="animate-fade-in stagger-1">
              Frequently used actions for faster workflow
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/quick-actions')}
            className="
              flex items-center space-x-2 transition-all duration-300
              hover:scale-105 hover:shadow-lg hover-lift
              group
              w-full sm:w-auto
            "
          >
            <span className="group-hover:animate-pulse">View All</span>
            <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Responsive grid: 1 column on mobile, 2 on small tablets, 3 on tablets, 5 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 perspective-2000">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div key={action.id} className="group transform-3d">
                <Button 
                  variant="outline" 
                  className={`
                    h-auto p-4 sm:p-6 flex flex-col items-center space-y-3 sm:space-y-4 w-full
                    transition-all duration-500 ease-out
                    hover:border-transparent hover:shadow-2xl
                    hover-tilt card-3d
                    animate-flip-in stagger-${Math.min(index + 1, 6)}
                    bg-gradient-to-br from-white to-gray-50 
                    dark:from-gray-800 dark:to-gray-900
                    hover:from-gray-50 hover:to-white
                    dark:hover:from-gray-700 dark:hover:to-gray-800
                    relative overflow-hidden
                  `}
                  onClick={() => navigate(action.route)}
                >
                  {/* Background Glow Effect */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-10 
                    transition-opacity duration-500
                    bg-gradient-to-br ${action.gradient} blur-xl
                  `} />
                  
                  {/* Icon Container with responsive sizing */}
                  <div className={`
                    relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center
                    transition-all duration-500 transform-3d
                    group-hover:scale-125 group-hover:rotate-12
                    bg-gradient-to-br ${action.gradient}
                    shadow-lg group-hover:shadow-xl
                    z-10
                  `}>
                    {/* Icon Glow */}
                    <div className={`
                      absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-75
                      transition-opacity duration-500 blur-md
                      bg-gradient-to-br ${action.gradient}
                    `} />
                    
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 group-hover:animate-pulse" />
                  </div>
                  
                  {/* Content with responsive typography */}
                  <div className="text-center z-10 relative">
                    <div className="
                      text-sm font-medium text-gray-900 dark:text-gray-100
                      group-hover:text-transparent group-hover:bg-gradient-to-r
                      group-hover:from-gray-900 group-hover:to-gray-600
                      dark:group-hover:from-gray-100 dark:group-hover:to-gray-300
                      group-hover:bg-clip-text
                      transition-all duration-300
                    ">
                      {action.title}
                    </div>
                    <div className="
                      text-xs text-gray-500 dark:text-gray-400 mt-1
                      group-hover:text-gray-600 dark:group-hover:text-gray-300
                      transition-colors duration-300
                      hidden sm:block
                    ">
                      {action.description}
                    </div>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    -skew-x-12 group-hover:animate-pulse
                  " />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
