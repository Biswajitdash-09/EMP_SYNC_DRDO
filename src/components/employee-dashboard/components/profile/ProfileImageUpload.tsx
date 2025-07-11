
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProfileImageUploadProps {
  profilePicture: string;
  employeeName: string;
  isEditing: boolean;
  onImageUpdate: (url: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ProfileImageUpload = ({
  profilePicture,
  employeeName,
  isEditing,
  onImageUpdate,
  loading,
  setLoading
}: ProfileImageUploadProps) => {
  const { toast } = useToast();
  const { profile } = useAuth();

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

      onImageUpdate(publicUrl);
      
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="relative">
      <Avatar className="h-20 w-20">
        <AvatarImage src={profilePicture} alt="Profile" />
        <AvatarFallback className="text-lg">
          {getInitials(employeeName)}
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
  );
};

export default ProfileImageUpload;
