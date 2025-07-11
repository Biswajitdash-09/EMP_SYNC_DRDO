
/**
 * Personal Information Form Component
 * 
 * This component handles the display and editing of an employee's personal information.
 * It includes fields for basic contact details like name, email, phone, and address.
 * 
 * Key Features:
 * - Display personal information in read-only mode
 * - Enable editing when isEditing is true
 * - Form validation and user input handling
 * - Responsive layout that works on different screen sizes
 * 
 * Form Fields:
 * - Full Name: Employee's complete name
 * - Email: Primary email address
 * - Phone: Contact phone number
 * - Address: Physical address
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Interface defining the structure of personal form data
 */
interface PersonalFormData {
  name: string;     // Employee's full name
  email: string;    // Primary email address
  phone: string;    // Contact phone number
  address: string;  // Physical address
}

/**
 * Props interface for PersonalInformationForm component
 */
interface PersonalInformationFormProps {
  formData: PersonalFormData;                              // Current form data
  isEditing: boolean;                                      // Whether form is in edit mode
  onFormDataChange: (updates: Partial<PersonalFormData>) => void; // Callback for data changes
  loading: boolean;                                        // Whether operations are in progress
}

/**
 * Personal Information Form Component
 * 
 * Renders form fields for employee's personal information with conditional editing.
 */
export const PersonalInformationForm = ({ 
  formData, 
  isEditing, 
  onFormDataChange, 
  loading 
}: PersonalInformationFormProps) => {
  
  /**
   * Handle input field changes
   * Updates the parent component's form data when user types
   * 
   * @param field - The name of the field being updated
   * @param value - The new value for the field
   */
  const handleInputChange = (field: keyof PersonalFormData, value: string) => {
    // Call the parent component's update function
    onFormDataChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="border-b pb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Personal Information
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Basic contact details and personal information
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Full Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          {isEditing ? (
            // Editable input field
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={loading}
              placeholder="Enter your full name"
              className="w-full"
            />
          ) : (
            // Read-only display
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
              {formData.name}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          {isEditing ? (
            // Editable email input
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={loading}
              placeholder="Enter your email address"
              className="w-full"
            />
          ) : (
            // Read-only email display
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
              {formData.email}
            </div>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          {isEditing ? (
            // Editable phone input
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={loading}
              placeholder="Enter your phone number"
              className="w-full"
            />
          ) : (
            // Read-only phone display
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
              {formData.phone || 'Not provided'}
            </div>
          )}
        </div>

        {/* Address Field - spans full width */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Address
          </Label>
          {isEditing ? (
            // Editable textarea for address
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={loading}
              placeholder="Enter your complete address"
              className="w-full min-h-[80px]"
              rows={3}
            />
          ) : (
            // Read-only address display
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border min-h-[80px]">
              {formData.address || 'Not provided'}
            </div>
          )}
        </div>
      </div>

      {/* Help Text */}
      {isEditing && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          💡 Make sure your contact information is up to date for important communications.
        </div>
      )}
    </div>
  );
};
