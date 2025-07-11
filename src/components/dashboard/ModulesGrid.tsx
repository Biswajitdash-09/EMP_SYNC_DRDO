
/**
 * Dashboard Modules Grid Component
 * Displays system modules in a responsive grid layout with enhanced animations
 * Each module represents a different section of the HR management system
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, BarChart3, Settings, Clock, FileText, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RippleButton from '@/components/ui/ripple-button';

/**
 * ModulesGrid Component
 * Renders a grid of interactive module cards with hover effects and navigation
 */
const ModulesGrid = () => {
  const navigate = useNavigate();

  /**
   * Module configuration array
   * Each module contains metadata for rendering and navigation
   */
  const modules = [{
    id: 'employees',
    title: 'Employee Records',
    description: 'Manage employee profiles and information',
    icon: Users,
    color: 'blue',
    gradient: 'from-blue-400 to-blue-600',
    bgGradient: 'from-blue-400/10 to-blue-600/10',
    route: '/employees'
  }, {
    id: 'hr',
    title: 'HR Management',
    description: 'HR policies and workflow management',
    icon: Building,
    color: 'green',
    gradient: 'from-green-400 to-green-600',
    bgGradient: 'from-green-400/10 to-green-600/10',
    route: '/hr'
  }, {
    id: 'payroll',
    title: 'Payroll System',
    description: 'Salary processing and management',
    icon: DollarSign,
    color: 'purple',
    gradient: 'from-purple-400 to-purple-600',
    bgGradient: 'from-purple-400/10 to-purple-600/10',
    route: '/payroll'
  }, {
    id: 'leave',
    title: 'Leave Management',
    description: 'Track and manage employee leaves',
    icon: Calendar,
    color: 'orange',
    gradient: 'from-orange-400 to-orange-600',
    bgGradient: 'from-orange-400/10 to-orange-600/10',
    route: '/leave'
  }, {
    id: 'performance',
    title: 'Performance Analytics',
    description: 'Employee performance monitoring',
    icon: BarChart3,
    color: 'red',
    gradient: 'from-red-400 to-red-600',
    bgGradient: 'from-red-400/10 to-red-600/10',
    route: '/performance'
  }, {
    id: 'time',
    title: 'Time Tracking',
    description: 'Attendance and time management',
    icon: Clock,
    color: 'indigo',
    gradient: 'from-indigo-400 to-indigo-600',
    bgGradient: 'from-indigo-400/10 to-indigo-600/10',
    route: '/time-tracking'
  }, {
    id: 'reports',
    title: 'Reports & Analytics',
    description: 'Comprehensive business reports',
    icon: FileText,
    color: 'cyan',
    gradient: 'from-cyan-400 to-cyan-600',
    bgGradient: 'from-cyan-400/10 to-cyan-600/10',
    route: '/reports'
  }, {
    id: 'settings',
    title: 'System Settings',
    description: 'Configure system preferences',
    icon: Settings,
    color: 'gray',
    gradient: 'from-gray-400 to-gray-600',
    bgGradient: 'from-gray-400/10 to-gray-600/10',
    route: '/settings'
  }];

  return (
    <TooltipProvider>
      <Card className="overflow-hidden glass backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/30">
        <CardHeader>
          <CardTitle className="text-xl animate-fade-in text-gray-900 dark:text-gray-100">System Modules</CardTitle>
          <CardDescription className="animate-fade-in stagger-1 text-gray-600 dark:text-gray-400">
            Access all employee management features
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Responsive grid container - 1 column on mobile, 2 on tablet and up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Tooltip key={module.id}>
                  <TooltipTrigger asChild>
                    <RippleButton
                      variant="outline"
                      className={`
                        group relative h-auto p-4 sm:p-6 w-full
                        glass backdrop-blur-sm
                        bg-white/40 dark:bg-gray-800/40
                        border border-white/30 dark:border-gray-700/40
                        transition-all duration-500 ease-out
                        hover:scale-[1.02] hover:shadow-2xl
                        hover:bg-white/60 dark:hover:bg-gray-800/60
                        animate-scale-in
                        overflow-hidden
                        flex items-center justify-start
                        text-left
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => navigate(module.route)}
                    >
                      {/* Background gradient overlay */}
                      <div className={`
                        absolute inset-0 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500
                        bg-gradient-to-br ${module.bgGradient}
                      `} />
                      
                      {/* Glow effect for enhanced visual feedback */}
                      <div className={`
                        absolute inset-0 opacity-0 group-hover:opacity-20
                        transition-opacity duration-500 blur-xl
                        bg-gradient-to-br ${module.gradient}
                        -z-10
                      `} />
                      
                      {/* Module content container with responsive layout */}
                      <div className="flex items-center space-x-3 sm:space-x-4 relative z-10 w-full">
                        {/* Icon container with responsive sizing */}
                        <div className={`
                          relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0
                          transition-all duration-500
                          group-hover:scale-110 group-hover:rotate-12
                          bg-gradient-to-br ${module.gradient}
                          shadow-lg group-hover:shadow-2xl
                        `}>
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:animate-pulse" />
                        </div>
                        
                        {/* Text content with responsive typography */}
                        <div className="flex-1 min-w-0">
                          <h3 className="
                            font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100
                            group-hover:text-transparent group-hover:bg-gradient-to-r 
                            group-hover:from-gray-900 group-hover:to-gray-600
                            dark:group-hover:from-gray-100 dark:group-hover:to-gray-300
                            group-hover:bg-clip-text
                            transition-all duration-300
                            truncate
                          ">
                            {module.title}
                          </h3>
                          <p className="
                            text-xs sm:text-sm text-gray-600 dark:text-gray-400 
                            group-hover:text-gray-700 dark:group-hover:text-gray-300
                            transition-colors duration-300
                            line-clamp-2
                          ">
                            {module.description}
                          </p>
                        </div>
                        
                        {/* Arrow indicator with responsive sizing */}
                        <div className="
                          w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0
                          bg-gray-100/60 dark:bg-gray-700/60
                          backdrop-blur-sm
                          flex items-center justify-center
                          group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600
                          transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
                        ">
                          <svg 
                            className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-300"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Shimmer effect for premium interaction feedback */}
                      <div className="
                        absolute inset-0 opacity-0 group-hover:opacity-100
                        transition-opacity duration-700
                        bg-gradient-to-r from-transparent via-white/20 to-transparent
                        -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]
                        transition-transform duration-1000
                      " />
                    </RippleButton>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900">
                    <p>Click to access {module.title}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ModulesGrid;
