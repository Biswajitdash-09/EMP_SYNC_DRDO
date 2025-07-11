
/**
 * Dashboard Header Mobile Component
 * Handles mobile menu functionality and mobile-specific UI elements
 */

import { Search, Menu, X, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardHeaderNotifications from './DashboardHeaderNotifications';

interface DashboardHeaderMobileProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  companyName: string;
  setIsChatbotOpen: (isOpen: boolean) => void;
}

const DashboardHeaderMobile = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  companyName, 
  setIsChatbotOpen 
}: DashboardHeaderMobileProps) => {
  return (
    <>
      {/* Mobile Menu Toggle Button - single button for mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Menu Section - collapsible navigation for smaller screens */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden border-t border-white/20 dark:border-gray-700/30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg animate-slide-down z-50">
          <div className="p-4 space-y-4">
            {/* Company Name for Mobile - shown when menu is expanded */}
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {companyName}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin Dashboard
              </p>
            </div>

            {/* Mobile Search with enhanced styling */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-blue-500 transition-colors duration-300" />
              <Input
                placeholder="Search employees, reports..."
                className="
                  pl-10 w-full
                  glass backdrop-blur-sm
                  bg-white/50 dark:bg-gray-800/50
                  border border-white/30 dark:border-gray-700/30
                  focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                  focus:shadow-lg focus:shadow-blue-500/20
                  transition-all duration-300
                "
              />
            </div>

            {/* Mobile AI Chatbot Button */}
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-white/20 dark:hover:bg-gray-800/20"
              onClick={() => {
                setIsChatbotOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <Bot className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
              AI Assistant
            </Button>

            {/* Mobile Notifications Button */}
            <div className="sm:hidden">
              <DashboardHeaderNotifications />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeaderMobile;
