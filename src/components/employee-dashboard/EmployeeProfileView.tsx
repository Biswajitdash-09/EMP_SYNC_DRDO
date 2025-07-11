
/**
 * Employee Profile View Component
 * Displays employee's personal and professional information
 */

import ProfileHeader from './components/ProfileHeader';
import ContactInformation from './components/ContactInformation';
import EmploymentDetails from './components/EmploymentDetails';
import { DashboardEmployee } from './hooks/useEmployeeDashboard';

interface EmployeeProfileViewProps {
  employee: DashboardEmployee;
}

const EmployeeProfileView = ({ employee }: EmployeeProfileViewProps) => {
  return (
    <div className="space-y-6">
      <ProfileHeader employee={employee} />
      <ContactInformation employee={employee} />
      <EmploymentDetails employee={employee} />
    </div>
  );
};

export default EmployeeProfileView;
