
/**
 * Dashboard Header Component
 * Main header for admin dashboard with improved mobile responsiveness and company branding
 * Features search functionality, notifications, theme toggle, and user profile management
 * Refactored into smaller components for better maintainability
 */

import { useState, useEffect } from 'react';
import DashboardHeaderLogoSection from './DashboardHeaderLogoSection';
import DashboardHeaderDesktopSearch from './DashboardHeaderDesktopSearch';
import DashboardHeaderActions from './DashboardHeaderActions';
import DashboardHeaderMobile from './DashboardHeaderMobile';
import AIChatbot from './AIChatbot';
import { getCompanySettings } from '@/services/companySettingsService';

/**
 * DashboardHeader Component
 * Responsive header with glassmorphism design and enhanced user interactions
 */
const DashboardHeader = () => {
  // State management for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Company branding configuration
  const [companyName, setCompanyName] = useState('EMP SYNC');
  
  // AI Chatbot visibility state
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  /**
   * Load company settings on component mount
   * Fetches company name from settings service for dynamic branding
   */
  useEffect(() => {
    const loadCompanySettings = async () => {
      try {
        const settings = await getCompanySettings();
        if (settings?.name) {
          setCompanyName(settings.name);
        }
      } catch (error) {
        console.error('Error loading company settings:', error);
        // Keep default company name on error
      }
    };

    loadCompanySettings();
  }, []);

  return (
    <>
      <header className="
        glass backdrop-blur-md
        bg-white/80 dark:bg-gray-900/80 
        border-b border-white/20 dark:border-gray-700/30 
        sticky top-0 z-50
        transition-all duration-300
        relative
      ">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Company Name Section */}
            <DashboardHeaderLogoSection companyName={companyName} />

            {/* Desktop Navigation and Search Section */}
            <DashboardHeaderDesktopSearch />

            {/* Right Side Actions Section */}
            <DashboardHeaderActions setIsChatbotOpen={setIsChatbotOpen} />

            {/* Mobile Components */}
            <DashboardHeaderMobile 
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              companyName={companyName}
              setIsChatbotOpen={setIsChatbotOpen}
            />
          </div>
        </div>
      </header>

      {/* AI Chatbot Modal */}
      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </>
  );
};

export default DashboardHeader;
