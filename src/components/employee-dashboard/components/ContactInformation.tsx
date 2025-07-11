
/**
 * Contact Information Component
 * Displays employee's contact details and emergency contact information
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, UserCheck } from 'lucide-react';
import { DashboardEmployee } from '../hooks/useEmployeeDashboard';

interface ContactInformationProps {
  employee: DashboardEmployee;
}

const ContactInformation = ({ employee }: ContactInformationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{employee.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{employee.phone || 'Not provided'}</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
            <span className="text-sm">{employee.address}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <UserCheck className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{employee.emergencyContact.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{employee.emergencyContact.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <UserCheck className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Relationship: {employee.emergencyContact.relationship}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInformation;
