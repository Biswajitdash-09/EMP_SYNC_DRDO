
/**
 * Main Dashboard Page Component
 * Central hub for the HR management system
 * Displays overview statistics, modules, and quick actions with enhanced UI animations
 */

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import ModulesGrid from '@/components/dashboard/ModulesGrid';
import RecentActivities from '@/components/dashboard/RecentActivities';
import QuickActions from '@/components/dashboard/QuickActions';
import AnimatedBackground from '@/components/ui/animated-background';
import ScrollReveal from '@/components/ui/scroll-reveal';

/**
 * Dashboard Component
 * Main administrative interface providing overview of all HR system functionality
 * Features animated backgrounds, scroll reveals, and responsive design
 */
const Dashboard = () => {
  // Track active module for navigation and state management
  const [activeModule, setActiveModule] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated Background Layer - provides visual ambiance */}
      <AnimatedBackground className="fixed inset-0 z-0" />
      
      {/* Main content layer with proper z-index stacking */}
      <div className="relative z-10">
        {/* Dashboard Header - contains navigation, search, and user controls */}
        <DashboardHeader />

        {/* Main dashboard content container with responsive padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Key performance indicators section with scroll reveal animation */}
          <ScrollReveal direction="up" delay={100}>
            <StatsCards />
          </ScrollReveal>

          {/* Main content grid layout - responsive design for different screen sizes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Primary modules section - takes up 2/3 of the space on large screens */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left" delay={200}>
                <ModulesGrid />
              </ScrollReveal>
            </div>

            {/* Secondary activities sidebar - takes up 1/3 of the space on large screens */}
            <div>
              <ScrollReveal direction="right" delay={300}>
                <RecentActivities />
              </ScrollReveal>
            </div>
          </div>

          {/* Quick action buttons section - provides shortcuts to common tasks */}
          <ScrollReveal direction="up" delay={400}>
            <QuickActions />
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
