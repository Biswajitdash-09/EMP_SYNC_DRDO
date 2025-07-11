
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, X, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { employeeDashboardService } from '@/services/employeeDashboardService';
import { supabase } from '@/integrations/supabase/client';

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
  const { profile } = useAuth();
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Upload to Supabase Storage
      const userId = profile?.id;
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/profile.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('employee-files')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('employee-files')
        .getPublicUrl(fileName);

      setProfilePicture(publicUrl);
      
      toast({
        title: "Image uploaded",
        description: "Profile picture uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload profile picture.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profilePicture} alt="Profile" />
              <AvatarFallback className="text-lg">
                {getInitials(formData.name)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            )}
          </div>
          <div>
            <p className="font-medium">{formData.name}</p>
            <p className="text-sm text-gray-600">{employee.id}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={loading}
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded">{formData.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <p className="p-2 bg-gray-100 rounded text-gray-500">{formData.email} (Read-only)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={loading}
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded">{formData.phone}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={2}
                disabled={loading}
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded">{formData.address}</p>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyName">Name</Label>
              {isEditing ? (
                <Input
                  id="emergencyName"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                  disabled={loading}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{formData.emergencyContactName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Phone</Label>
              {isEditing ? (
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                  disabled={loading}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{formData.emergencyContactPhone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyRelationship">Relationship</Label>
              {isEditing ? (
                <Input
                  id="emergencyRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => setFormData({...formData, emergencyContactRelationship: e.target.value})}
                  disabled={loading}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{formData.emergencyContactRelationship}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditEmployeeProfile;
