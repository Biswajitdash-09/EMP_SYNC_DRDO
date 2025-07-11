
/**
 * Emergency Contact Form Component
 * 
 * This component handles the display and editing of an employee's emergency contact information.
 * Emergency contacts are crucial for workplace safety and HR purposes.
 * 
 * Key Features:
 * - Display emergency contact info in read-only mode
 * - Enable editing when isEditing is true
 * - Validate required emergency contact fields
 * - Responsive layout for different screen sizes
 * 
 * Form Fields:
 * - Contact Name: Full name of the emergency contact person
 * - Phone Number: Primary phone number to reach the contact
 * - Relationship: How the contact is related to the employee
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Interface defining the structure of emergency contact form data
 */
interface EmergencyContactFormData {
  emergencyContactName: string;         // Full name of emergency contact
  emergencyContactPhone: string;        // Phone number of emergency contact
  emergencyContactRelationship: string; // Relationship to employee (spouse, parent, etc.)
}

/**
 * Props interface for EmergencyContactForm component
 */
interface EmergencyContactFormProps {
  formData: EmergencyContactFormData;                                    // Current form data
  isEditing: boolean;                                                    // Whether form is in edit mode
  onFormDataChange: (updates: Partial<EmergencyContactFormData>) => void; // Callback for data changes
  loading: boolean;                                                      // Whether operations are in progress
}

/**
 * Emergency Contact Form Component
 * 
 * Renders form fields for employee's emergency contact information with conditional editing.
 */
export const EmergencyContactForm = ({ 
  formData, 
  isEditing, 
  onFormDataChange, 
  loading 
}: EmergencyContactFormProps) => {
  
  /**
   * Handle input field changes
   * Updates the parent component's form data when user types
   * 
   * @param field - The name of the field being updated
   * @param value - The new value for the field
   */
  const handleInputChange = (field: keyof EmergencyContactFormData, value: string) => {
    // Call the parent component's update function
    onFormDataChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="border-b pb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Emergency Contact
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Person to contact in case of emergency or urgent situations
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Emergency Contact Name Field */}
        <div className="space-y-2">
          <Label htmlFor="emergencyContactName" className="text-sm font-medium">
            Contact Name *
          </Label>
          {isEditing ? (
            // Editable input field
            <Input
              id="emergencyContactName"
              type="text"
              value={formData.emergencyContactName}
              onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
              disabled={loading}
              placeholder="Enter contact's full name"
              className="w-full"
              required // Mark as required field
            />
          ) : (
            // Read-only display
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
              {formData.emergencyContactName || 'Not specified'}
            </div>
          )}
        </div>

        {/* Emergency Contact Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="emergencyContactPhone" className="text-sm font-medium">
            Phone Number *
          </Label>
          {isEditing ? (
            // Editable phone input
            <Input
              id="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
              disabled={loading}
              placeholder="Enter contact's phone number"
              className="w-full"
              required // Mark as required field
            />
          ) : (
            // Read-only phone display
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
              {formData.emergencyContactPhone || 'Not specified'}
            </div>
          )}
        </div>

        {/* Emergency Contact Relationship Field */}
        <div className="space-y-2">
          <Label htmlFor="emergencyContactRelationship" className="text-sm font-medium">
            Relationship *
          </Label>
          {isEditing ? (
            // Editable relationship input
            <Input
              id="emergencyContactRelationship"
              type="text"
              value={formData.emergencyContactRelationship}
              onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
              disabled={loading}
              placeholder="e.g., Spouse, Parent, Sibling"
              className="w-full"
              required // Mark as required field
            />
          ) : (
            // Read-only relationship display
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
              {formData.emergencyContactRelationship || 'Not specified'}
            </div>
          )}
        </div>
      </div>

      {/* Help Text and Validation Info */}
      {isEditing && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <span className="text-red-500">*</span> Required fields
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            🚨 This information is used only for emergency situations and is kept confidential.
          </div>
        </div>
      )}

      {/* Emergency Contact Importance Notice */}
      {!isEditing && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Important:</strong> Keep your emergency contact information up to date. 
            This person will be contacted in case of workplace emergencies or urgent situations.
          </div>
        </div>
      )}
    </div>
  );
};
