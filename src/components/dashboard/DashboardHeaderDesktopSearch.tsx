
/**
 * Dashboard Header Desktop Search Component
 * Handles the desktop search functionality with enhanced glassmorphism design
 */

import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const DashboardHeaderDesktopSearch = () => {
  return (
    <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
      <div className="relative w-full group">
        {/* Search icon with color transition */}
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-blue-500 transition-colors duration-300" />
        
        {/* Search input with glassmorphism design */}
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
            placeholder:text-gray-400 dark:placeholder:text-gray-500
          "
        />
        
        {/* Glow effect on focus for enhanced visual feedback */}
        <div className="
          absolute inset-0 rounded-md opacity-0 group-focus-within:opacity-100
          bg-gradient-to-r from-blue-500/10 to-purple-500/10
          transition-opacity duration-300 pointer-events-none
        " />
      </div>
    </div>
  );
};

export default DashboardHeaderDesktopSearch;
