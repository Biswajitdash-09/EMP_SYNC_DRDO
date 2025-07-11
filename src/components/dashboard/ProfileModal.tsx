
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Building, Mail, Phone, Calendar, MapPin, Camera, Save, Edit } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { adminProfileService, type AdminProfile } from '@/services/adminProfileService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate?: (profileData: any) => void;
  currentProfile?: AdminProfile | null;
  onReload?: () => void;
}

const ProfileModal = ({ isOpen, onClose, onProfileUpdate, currentProfile, onReload }: ProfileModalProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');
  
  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: 'System Administrator',
    department: 'IT Administration',
    joinDate: '2020-01-15',
    address: '',
    status: 'Active',
    lastLogin: new Date().toLocaleDateString(),
    permissions: ['Full System Access', 'User Management', 'Reports Access', 'Settings Management']
  });

  // Update local state when currentProfile changes
  useEffect(() => {
    if (currentProfile) {
      setProfileData({
        id: currentProfile.id || 'ADM001',
        name: currentProfile.full_name || 'Admin User',
        email: currentProfile.email || 'admin@company.com',
        phone: currentProfile.phone || '+1 234-567-8900',
        role: 'System Administrator',
        department: 'IT Administration',
        joinDate: '2020-01-15',
        address: currentProfile.address || '123 Admin St, Corporate City, CC 12345',
        status: 'Active',
        lastLogin: new Date().toLocaleDateString(),
        permissions: ['Full System Access', 'User Management', 'Reports Access', 'Settings Management']
      });
      setProfileImage(currentProfile.avatar_url || '/placeholder.svg');
    } else {
      // Set default values when no profile exists
      setProfileData({
        id: 'ADM001',
        name: 'Admin User',
        email: 'admin@company.com',
        phone: '+1 234-567-8900',
        role: 'System Administrator',
        department: 'IT Administration',
        joinDate: '2020-01-15',
        address: '123 Admin St, Corporate City, CC 12345',
        status: 'Active',
        lastLogin: new Date().toLocaleDateString(),
        permissions: ['Full System Access', 'User Management', 'Reports Access', 'Settings Management']
      });
      setProfileImage('/placeholder.svg');
    }
  }, [currentProfile]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      
      const imageUrl = await adminProfileService.uploadProfilePicture(file);
      setProfileImage(imageUrl);
      
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload profile picture.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      // Validate email
      if (profileData.email && !adminProfileService.validateEmail(profileData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        return;
      }

      // Validate phone
      if (profileData.phone && !adminProfileService.validatePhone(profileData.phone)) {
        toast({
          title: "Invalid Phone",
          description: "Please enter a valid phone number.",
          variant: "destructive"
        });
        return;
      }

      await adminProfileService.updateProfile({
        full_name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
        avatar_url: profileImage
      });

      if (onProfileUpdate) {
        onProfileUpdate({ 
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
          profileImage 
        });
      }

      if (onReload) {
        await onReload();
      }
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save profile changes.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            My Profile
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="ml-auto"
              disabled={loading}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </DialogTitle>
          <DialogDescription>
            View and manage your profile information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                />
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
                <p className="text-sm text-gray-600">
                  {isEditing ? 'Click the camera icon to upload a new profile picture' : 'Profile Picture'}
                </p>
                <p className="text-xs text-gray-500">
                  Supported: JPG, PNG, GIF (max 5MB)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{profileData.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{profileData.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Department:</span>
                  </div>
                  <p className="ml-6">{profileData.department}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Role:</span>
                  </div>
                  <p className="ml-6">{profileData.role}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Join Date:</span>
                  </div>
                  <p className="ml-6">{new Date(profileData.joinDate).toLocaleDateString()}</p>
                </div>
                
                <div className="space-y-2">
                  <span className="font-medium">Status:</span>
                  <div className="ml-6">
                    <Badge className="bg-green-100 text-green-800">
                      {profileData.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <span className="font-medium">Last Login:</span>
                <p className="ml-4">{profileData.lastLogin}</p>
              </div>
              
              <div className="space-y-2">
                <span className="font-medium">Permissions:</span>
                <div className="ml-4 flex flex-wrap gap-2">
                  {profileData.permissions.map((permission, index) => (
                    <Badge key={index} variant="outline">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
