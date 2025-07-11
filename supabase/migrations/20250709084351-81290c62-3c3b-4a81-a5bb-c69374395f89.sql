
-- Create leave types table
CREATE TABLE public.leave_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  annual_days INTEGER NOT NULL DEFAULT 0,
  requires_approval BOOLEAN NOT NULL DEFAULT true,
  carry_forward BOOLEAN NOT NULL DEFAULT false,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create holidays table
CREATE TABLE public.holidays (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('National', 'Company', 'Regional')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leave balances table
CREATE TABLE public.leave_balances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
  total_days INTEGER NOT NULL DEFAULT 0,
  used_days INTEGER NOT NULL DEFAULT 0,
  available_days INTEGER NOT NULL DEFAULT 0,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, leave_type_id, year)
);

-- Update the existing leave_requests table to match the service expectations
ALTER TABLE public.leave_requests 
ADD COLUMN IF NOT EXISTS employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS leave_type_id UUID REFERENCES leave_types(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS days INTEGER NOT NULL DEFAULT 1;

-- Update leave_requests to use the new structure
UPDATE public.leave_requests 
SET employee_id = user_id, 
    days = days_requested
WHERE employee_id IS NULL;

-- Enable RLS on new tables
ALTER TABLE public.leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_balances ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for leave_types
CREATE POLICY "Anyone can view leave types" ON public.leave_types FOR SELECT USING (true);
CREATE POLICY "Admins can manage leave types" ON public.leave_types FOR ALL USING (is_admin(auth.uid()));

-- Create RLS policies for holidays
CREATE POLICY "Anyone can view holidays" ON public.holidays FOR SELECT USING (true);
CREATE POLICY "Admins can manage holidays" ON public.holidays FOR ALL USING (is_admin(auth.uid()));

-- Create RLS policies for leave_balances
CREATE POLICY "Users can view own leave balances" ON public.leave_balances FOR SELECT USING (auth.uid() = employee_id);
CREATE POLICY "Admins can view all leave balances" ON public.leave_balances FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage leave balances" ON public.leave_balances FOR ALL USING (is_admin(auth.uid()));

-- Insert some default leave types
INSERT INTO public.leave_types (name, description, annual_days, requires_approval, carry_forward, color) VALUES
('Annual Leave', 'Yearly vacation leave', 21, true, true, '#10B981'),
('Sick Leave', 'Medical leave for illness', 10, false, false, '#EF4444'),
('Personal Leave', 'Personal time off', 5, true, false, '#8B5CF6'),
('Maternity Leave', 'Maternity/Paternity leave', 90, true, false, '#F59E0B');

-- Insert some sample holidays
INSERT INTO public.holidays (name, date, type, description) VALUES
('New Year''s Day', '2024-01-01', 'National', 'New Year celebration'),
('Independence Day', '2024-07-04', 'National', 'National Independence Day'),
('Christmas Day', '2024-12-25', 'National', 'Christmas celebration'),
('Company Foundation Day', '2024-06-15', 'Company', 'Company anniversary');
