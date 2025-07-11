
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, X } from 'lucide-react';
import { employeeDashboardService } from '@/services/employeeDashboardService';
import ProfileImageUpload from './profile/ProfileImageUpload';
import PersonalInformationForm from './profile/PersonalInformationForm';
import EmergencyContactForm from './profile/EmergencyContactForm';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

interface EditEmployeeProfileProps {
  employee: Employee;
  onUpdate: (updates: Partial<Employee>) => void;
}

const EditEmployeeProfile = ({ employee, onUpdate }: EditEmployeeProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(employee.profilePicture || '');
  
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    address: employee.address,
    emergencyContactName: employee.emergencyContact.name,
    emergencyContactPhone: employee.emergencyContact.phone,
    emergencyContactRelationship: employee.emergencyContact.relationship
  });

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Update profile in Supabase
      await employeeDashboardService.updateProfile({
        full_name: formData.name,
        phone: formData.phone,
        avatar_url: profilePicture
      });

      // Update employee details
      await employeeDashboardService.updateEmployeeDetails({
        address: formData.address,
        profile_picture_url: profilePicture,
        emergency_contact_name: formData.emergencyContactName,
        emergency_contact_phone: formData.emergencyContactPhone
      });

      const updates = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        profilePicture,
        emergencyContact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
          relationship: formData.emergencyContactRelationship
        }
      };

      onUpdate(updates);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      emergencyContactName: employee.emergencyContact.name,
      emergencyContactPhone: employee.emergencyContact.phone,
      emergencyContactRelationship: employee.emergencyContact.relationship
    });
    setProfilePicture(employee.profilePicture || '');
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Profile</CardTitle>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" disabled={loading}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" disabled={loading}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex items-center space-x-4">
          <ProfileImageUpload
            profilePicture={profilePicture}
            employeeName={formData.name}
            isEditing={isEditing}
            onImageUpdate={setProfilePicture}
            loading={loading}
            setLoading={setLoading}
          />
          <div>
            <p className="font-medium">{formData.name}</p>
            <p className="text-sm text-gray-600">{employee.id}</p>
          </div>
        </div>

        {/* Personal Information */}
        <PersonalInformationForm
          formData={formData}
          isEditing={isEditing}
          onFormDataChange={handleFormDataChange}
          loading={loading}
        />

        {/* Emergency Contact */}
        <EmergencyContactForm
          formData={formData}
          isEditing={isEditing}
          onFormDataChange={handleFormDataChange}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default EditEmployeeProfile;
