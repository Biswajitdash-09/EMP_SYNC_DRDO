
-- Drop the existing problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Create a security definer function to check admin role safely
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Recreate the policies using the security definer function
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = id OR public.is_admin(auth.uid())
  );

-- Also fix the employee_details policies
DROP POLICY IF EXISTS "Admins can view all employee details" ON public.employee_details;
DROP POLICY IF EXISTS "Admins can manage all employee details" ON public.employee_details;

CREATE POLICY "Admins can view all employee details" ON public.employee_details
  FOR SELECT USING (
    auth.uid() = user_id OR public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage all employee details" ON public.employee_details
  FOR ALL USING (
    auth.uid() = user_id OR public.is_admin(auth.uid())
  );
