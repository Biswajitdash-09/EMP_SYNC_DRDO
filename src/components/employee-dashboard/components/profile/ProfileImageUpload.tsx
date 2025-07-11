
/**
 * Profile Image Upload Component
 * 
 * This component handles the employee's profile picture upload and display.
 * It provides a visual interface for users to view and update their profile image.
 * 
 * Key Features:
 * - Display current profile image or default avatar
 * - Upload new profile images (when editing is enabled)
 * - Show employee initials when no image is available
 * - Handle loading states during image operations
 * 
 * Design:
 * - Uses Avatar component for consistent image display
 * - Shows upload button only in editing mode
 * - Provides visual feedback during operations
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from 'lucide-react';

/**
 * Props interface for ProfileImageUpload component
 */
interface ProfileImageUploadProps {
  currentImageUrl: string;        // Current profile image URL
  employeeName: string;          // Employee name for generating initials
  isEditing: boolean;            // Whether component is in edit mode
  onImageChange: (imageUrl: string) => void; // Callback when image changes
  loading: boolean;              // Whether operations are in progress
}

/**
 * Profile Image Upload Component
 * 
 * Displays and manages the employee's profile picture with upload capability.
 */
export const ProfileImageUpload = ({ 
  currentImageUrl, 
  employeeName, 
  isEditing, 
  onImageChange, 
  loading 
}: ProfileImageUploadProps) => {
  
  /**
   * Generate initials from employee name
   * Takes the first letter of each word in the name
   * 
   * @param name - Full name of the employee
   * @returns String of initials (e.g., "John Doe" -> "JD")
   */
  const getInitials = (name: string) => {
    return name
      .split(' ')           // Split name into words
      .map(n => n[0])       // Take first letter of each word
      .join('')             // Join letters together
      .toUpperCase();       // Convert to uppercase
  };

  /**
   * Handle profile image upload
   * This would typically integrate with a file upload service
   * For now, it's a placeholder that simulates the upload process
   */
  const handleImageUpload = () => {
    // Create a file input element for image selection
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Only accept image files
    
    // Handle file selection
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real application, you would:
        // 1. Upload the file to a storage service (like Supabase Storage)
        // 2. Get the public URL of the uploaded image
        // 3. Call onImageChange with the new URL
        
        // For demonstration, we'll create a local URL
        const imageUrl = URL.createObjectURL(file);
        onImageChange(imageUrl);
        
        console.log('📸 Profile image selected:', file.name);
      }
    };
    
    // Trigger the file selection dialog
    input.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Image Display */}
      <div className="relative">
        {/* Avatar component with large size for profile display */}
        <Avatar className="w-32 h-32">
          {/* Show image if URL exists, otherwise show initials */}
          <AvatarImage 
            src={currentImageUrl} 
            alt={employeeName}
            className="object-cover" // Ensure image covers the entire avatar area
          />
          <AvatarFallback className="text-2xl font-bold bg-gray-200">
            {getInitials(employeeName)}
          </AvatarFallback>
        </Avatar>
        
        {/* Camera icon overlay when editing */}
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="w-8 h-8 text-white" />
          </div>
        )}
      </div>

      {/* Upload Button - only show when editing */}
      {isEditing && (
        <Button 
          variant="outline" 
          onClick={handleImageUpload}
          disabled={loading} // Disable during loading states
          className="flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          {currentImageUrl ? 'Change Photo' : 'Upload Photo'}
        </Button>
      )}

      {/* Employee Name Display */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {employeeName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Profile Picture
        </p>
      </div>
    </div>
  );
};
