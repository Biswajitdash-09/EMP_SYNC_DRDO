
-- Create admin_profiles table for storing admin profile data
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on admin_profiles table
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_profiles table
CREATE POLICY "Users can view own admin profile" ON public.admin_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own admin profile" ON public.admin_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own admin profile" ON public.admin_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create storage bucket for admin profile pictures
INSERT INTO storage.buckets (id, name, public) 
VALUES ('admin-profiles', 'admin-profiles', true);

-- Create storage policies for admin profile pictures
CREATE POLICY "Admin can upload own profile pictures" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'admin-profiles' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admin can view own profile pictures" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'admin-profiles' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admin can update own profile pictures" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'admin-profiles' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admin can delete own profile pictures" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'admin-profiles' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to handle new admin user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_admin_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin User')
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create admin profile when user signs up
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_profile();
