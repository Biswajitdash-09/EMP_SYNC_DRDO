
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from 'lucide-react';

interface ProfilePictureUploadProps {
  profilePicture: string;
  setProfilePicture: (url: string) => void;
  employeeName: string;
}

const ProfilePictureUpload = ({ 
  profilePicture, 
  setProfilePicture, 
  employeeName 
}: ProfilePictureUploadProps) => {
  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex flex-col items-center space-y-2">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profilePicture} alt="Profile preview" />
          <AvatarFallback className="text-lg">
            {employeeName ? getInitials(employeeName) : 'NE'}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Label htmlFor="profilePicture" className="cursor-pointer">
            <Button type="button" variant="outline" size="sm" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </span>
            </Button>
          </Label>
          {profilePicture && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={removeProfilePicture}
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          )}
        </div>
        <Input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureUpload}
          className="hidden"
        />
        <p className="text-xs text-gray-500 text-center">
          Upload a profile picture (max 5MB)
        </p>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
