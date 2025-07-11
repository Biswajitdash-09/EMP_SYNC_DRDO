
/**
 * Dashboard Header Logo Section Component
 * Handles the logo and company name display
 */

import DashboardHeaderLogo from './DashboardHeaderLogo';

interface DashboardHeaderLogoSectionProps {
  companyName: string;
}

const DashboardHeaderLogoSection = ({ companyName }: DashboardHeaderLogoSectionProps) => {
  return (
    <div className="flex items-center space-x-4">
      <DashboardHeaderLogo />
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white animate-fade-in">
          {companyName}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 animate-fade-in stagger-1">
          Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default DashboardHeaderLogoSection;
