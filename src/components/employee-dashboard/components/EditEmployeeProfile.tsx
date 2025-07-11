
/**
 * Edit Employee Profile Component
 * 
 * This is the main container component for editing employee profile information.
 * It manages the overall state and coordinates between different form sections.
 * 
 * Key Features:
 * - Toggle between view and edit modes
 * - Manage form data state for all profile sections
 * - Handle profile updates with database synchronization
 * - Coordinate multiple form components (personal info, emergency contact, profile image)
 * 
 * Architecture:
 * This component acts as a container that delegates specific form sections
 * to specialized components while maintaining the overall state.
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { DashboardEmployee } from '../hooks/useEmployeeDashboard';

// Import specialized form components
import { ProfileImageUpload } from './profile/ProfileImageUpload';
import { PersonalInformationForm } from './profile/PersonalInformationForm';
import { EmergencyContactForm } from './profile/EmergencyContactForm';

/**
 * Props interface for the EditEmployeeProfile component
 */
interface EditEmployeeProfileProps {
  employee: DashboardEmployee; // Current employee data
}

/**
 * Main Edit Employee Profile Component
 * 
 * Manages the editing interface for employee profile information,
 * including personal details, emergency contacts, and profile image.
 */
const EditEmployeeProfile = ({ employee }: EditEmployeeProfileProps) => {
  // Hook for showing toast notifications to user
  const { toast } = useToast();
  
  // State to track if we're in editing mode or viewing mode
  const [isEditing, setIsEditing] = useState(false);
  
  // State to track if we're currently saving changes
  const [loading, setLoading] = useState(false);
  
  // Form data state - holds all the editable employee information
  const [formData, setFormData] = useState({
    // Personal information fields
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    address: employee.address,
    
    // Emergency contact information fields
    emergencyContactName: employee.emergencyContact.name,
    emergencyContactPhone: employee.emergencyContact.phone,
    emergencyContactRelationship: employee.emergencyContact.relationship,
    
    // Profile image URL
    profilePictureUrl: employee.profilePictureUrl || ''
  });

  /**
   * Handle changes to form data
   * This function is passed to child components to update the main form state
   * 
   * @param updates - Partial object containing the fields to update
   */
  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({
      ...prev,    // Keep existing form data
      ...updates  // Apply the updates
    }));
  };

  /**
   * Handle saving the profile changes
   * This function validates and saves all form data to the database
   */
  const handleSave = async () => {
    try {
      setLoading(true); // Show loading state
      
      // Here you would typically make an API call to save the data
      // For now, we'll simulate a save operation
      console.log('💾 Saving profile data:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      // Exit editing mode
      setIsEditing(false);
      
    } catch (error) {
      // Handle any errors during save
      console.error('❌ Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  /**
   * Handle canceling the edit operation
   * Resets form data to original values and exits edit mode
   */
  const handleCancel = () => {
    // Reset form data to original employee data
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      emergencyContactName: employee.emergencyContact.name,
      emergencyContactPhone: employee.emergencyContact.phone,
      emergencyContactRelationship: employee.emergencyContact.relationship,
      profilePictureUrl: employee.profilePictureUrl || ''
    });
    
    // Exit editing mode
    setIsEditing(false);
  };

  return (
    <Card className="w-full">
      {/* Card Header with title and edit/save buttons */}
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Profile
            </CardTitle>
            <CardDescription>
              Update your personal information and emergency contact details
            </CardDescription>
          </div>
          
          {/* Action buttons - Edit/Save/Cancel */}
          <div className="flex gap-2">
            {!isEditing ? (
              // Show Edit button when not editing
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              // Show Save and Cancel buttons when editing
              <>
                <Button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Card Content with form sections */}
      <CardContent className="space-y-6">
        {/* Profile Image Upload Section */}
        <ProfileImageUpload
          currentImageUrl={formData.profilePictureUrl}
          employeeName={employee.name}
          isEditing={isEditing}
          onImageChange={(imageUrl) => handleFormDataChange({ profilePictureUrl: imageUrl })}
          loading={loading}
        />

        {/* Personal Information Form Section */}
        <PersonalInformationForm
          formData={{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
          }}
          isEditing={isEditing}
          onFormDataChange={handleFormDataChange}
          loading={loading}
        />

        {/* Emergency Contact Form Section */}
        <EmergencyContactForm
          formData={{
            emergencyContactName: formData.emergencyContactName,
            emergencyContactPhone: formData.emergencyContactPhone,
            emergencyContactRelationship: formData.emergencyContactRelationship
          }}
          isEditing={isEditing}
          onFormDataChange={handleFormDataChange}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default EditEmployeeProfile;
