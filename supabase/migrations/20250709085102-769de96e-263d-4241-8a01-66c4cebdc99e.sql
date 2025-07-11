
-- Add RLS policies for leave_types and holidays to allow authenticated users to insert
CREATE POLICY "Allow insert for authenticated users" ON public.leave_types 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow insert for authenticated users" ON public.holidays 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create a function to seed leave balances for new employees
CREATE OR REPLACE FUNCTION public.seed_employee_leave_balances(employee_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert leave balances for all leave types for the new employee
  INSERT INTO public.leave_balances (employee_id, leave_type_id, total_days, used_days, available_days, year)
  SELECT 
    employee_uuid,
    lt.id,
    lt.annual_days,
    0,
    lt.annual_days,
    EXTRACT(YEAR FROM CURRENT_DATE)
  FROM public.leave_types lt
  ON CONFLICT (employee_id, leave_type_id, year) DO NOTHING;
END;
$$;

-- Create a trigger function to automatically seed balances when a profile is created
CREATE OR REPLACE FUNCTION public.handle_new_profile_leave_balance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Seed leave balances for the new profile
  PERFORM public.seed_employee_leave_balances(NEW.id);
  RETURN NEW;
END;
$$;

-- Create trigger to automatically seed leave balances for new profiles
DROP TRIGGER IF EXISTS on_profile_created_seed_balances ON public.profiles;
CREATE TRIGGER on_profile_created_seed_balances
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_profile_leave_balance();

-- Seed leave balances for existing profiles that don't have balances
DO $$
DECLARE
  profile_record RECORD;
BEGIN
  FOR profile_record IN 
    SELECT DISTINCT p.id 
    FROM public.profiles p 
    LEFT JOIN public.leave_balances lb ON p.id = lb.employee_id
    WHERE lb.employee_id IS NULL
  LOOP
    PERFORM public.seed_employee_leave_balances(profile_record.id);
  END LOOP;
END $$;
