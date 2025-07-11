
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from 'lucide-react';
import { Employee } from '@/hooks/useEmployeeData';

interface PersonalDetailsTabProps {
  selectedEmployee: Employee | null;
}

const PersonalDetailsTab = ({ selectedEmployee }: PersonalDetailsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Personal Information & Emergency Contacts
          {selectedEmployee && (
            <span className="text-sm font-normal text-gray-500">
              - {selectedEmployee.name}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedEmployee ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Personal Details</h4>
              <div className="space-y-2">
                <div><strong>Full Name:</strong> {selectedEmployee.name}</div>
                <div><strong>Email:</strong> {selectedEmployee.email}</div>
                <div><strong>Phone:</strong> {selectedEmployee.phone}</div>
                <div><strong>Date of Birth:</strong> {selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth).toLocaleDateString() : 'N/A'}</div>
                <div><strong>Address:</strong> {selectedEmployee.address}</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Emergency Contact</h4>
              <div className="space-y-2">
                <div><strong>Contact Name:</strong> {selectedEmployee.emergencyContact.name || 'Not provided'}</div>
                <div><strong>Contact Phone:</strong> {selectedEmployee.emergencyContact.phone || 'Not provided'}</div>
                <div><strong>Relationship:</strong> {selectedEmployee.emergencyContact.relationship || 'Not provided'}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Select an employee from the Overview tab to view their personal details.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsTab;
