
/**
 * Dashboard Header Actions Component
 * Handles the right-side action buttons including theme toggle, AI chatbot, notifications, and profile
 */

import { Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThemeToggle from '@/components/ThemeToggle';
import DashboardHeaderNotifications from './DashboardHeaderNotifications';
import DashboardHeaderProfile from './DashboardHeaderProfile';

interface DashboardHeaderActionsProps {
  setIsChatbotOpen: (isOpen: boolean) => void;
}

const DashboardHeaderActions = ({ setIsChatbotOpen }: DashboardHeaderActionsProps) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      
      {/* AI Chatbot Button */}
      <Button
        variant="ghost"
        size="icon"
        className="
          relative hover:bg-white/20 dark:hover:bg-gray-800/20 
          transition-all duration-300 hover:scale-110
        "
        onClick={() => setIsChatbotOpen(true)}
      >
        <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </Button>

      {/* Enhanced Notifications with proper dropdown */}
      <div className="hidden sm:block">
        <DashboardHeaderNotifications />
      </div>

      {/* User Profile Section */}
      <DashboardHeaderProfile />
    </div>
  );
};

export default DashboardHeaderActions;
