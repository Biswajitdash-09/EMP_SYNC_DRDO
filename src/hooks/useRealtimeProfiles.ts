
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  department: string | null;
  position: string | null;
  phone: string | null;
  is_active: boolean;
  avatar_url: string | null;
}

export const useRealtimeProfiles = (initialProfiles: Profile[] = []) => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const { toast } = useToast();

  useEffect(() => {
    setProfiles(initialProfiles);
  }, [initialProfiles]);

  useEffect(() => {
    console.log('Setting up real-time subscription for profiles');
    
    const channel = supabase
      .channel('profiles_realtime')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles' 
        },
        (payload) => {
          console.log('Profile change received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setProfiles(prev => [payload.new as Profile, ...prev]);
            
            toast({
              title: "New Profile Created",
              description: `Profile for ${payload.new.full_name || payload.new.email} has been created`,
            });
          } else if (payload.eventType === 'UPDATE') {
            setProfiles(prev => 
              prev.map(profile => 
                profile.id === payload.new.id ? payload.new as Profile : profile
              )
            );

            toast({
              title: "Profile Updated",
              description: `${payload.new.full_name || payload.new.email} profile has been updated`,
            });
          } else if (payload.eventType === 'DELETE') {
            setProfiles(prev => 
              prev.filter(profile => profile.id !== payload.old.id)
            );
            
            toast({
              title: "Profile Deleted",
              description: `Profile has been deleted`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up profiles real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return { profiles, setProfiles };
};
