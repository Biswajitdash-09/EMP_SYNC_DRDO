
/**
 * Landing Navigation Component
 * Enhanced navigation with hover effects
 */

import RippleButton from "@/components/ui/ripple-button";
import { Users } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import VisitorCounter from './VisitorCounter';

interface LandingNavigationProps {
  onShowAuth: () => void;
  onShowEmployeeAuth: () => void;
}

const LandingNavigation = ({ onShowAuth, onShowEmployeeAuth }: LandingNavigationProps) => {
  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center hover:rotate-3 transition-transform duration-300">
                <Users className="w-6 h-6 text-white icon-bounce" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">EMP SYNC</span>
            </div>
            <div className="hidden md:block">
              <VisitorCounter />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <VisitorCounter />
            </div>
            <ThemeToggle />
            <RippleButton 
              onClick={onShowEmployeeAuth} 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105 transition-all duration-300"
            >
              Employee Login
            </RippleButton>
            <RippleButton 
              onClick={onShowAuth} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Admin Login
            </RippleButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
