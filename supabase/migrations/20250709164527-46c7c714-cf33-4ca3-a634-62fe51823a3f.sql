
-- Create attendance_logs table with proper structure
CREATE TABLE IF NOT EXISTS public.attendance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  clock_in TIMESTAMPTZ,
  clock_out TIMESTAMPTZ,
  total_hours DECIMAL(4,2) DEFAULT 0,
  project TEXT,
  status TEXT DEFAULT 'pending',
  overtime DECIMAL(4,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(employee_id, date) -- Prevent multiple entries per day per employee
);

-- Enable RLS
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Employees can view own attendance logs" 
ON public.attendance_logs 
FOR SELECT 
USING (auth.uid() = employee_id);

CREATE POLICY "Employees can insert own attendance logs" 
ON public.attendance_logs 
FOR INSERT 
WITH CHECK (auth.uid() = employee_id);

CREATE POLICY "Employees can update own attendance logs" 
ON public.attendance_logs 
FOR UPDATE 
USING (auth.uid() = employee_id);

CREATE POLICY "Admins can manage all attendance logs" 
ON public.attendance_logs 
FOR ALL 
USING (is_admin(auth.uid()));

-- Function to auto-calculate total hours and overtime
CREATE OR REPLACE FUNCTION calculate_attendance_hours()
RETURNS TRIGGER AS $$
BEGIN
  -- Only calculate if both clock_in and clock_out exist
  IF NEW.clock_in IS NOT NULL AND NEW.clock_out IS NOT NULL THEN
    -- Calculate total hours
    NEW.total_hours := EXTRACT(EPOCH FROM (NEW.clock_out - NEW.clock_in)) / 3600;
    
    -- Calculate overtime (anything over 8 hours)
    NEW.overtime := GREATEST(0, NEW.total_hours - 8);
    
    -- Update status to completed
    NEW.status := 'completed';
  ELSIF NEW.clock_in IS NOT NULL AND NEW.clock_out IS NULL THEN
    -- Employee clocked in but not out yet
    NEW.status := 'active';
    NEW.total_hours := 0;
    NEW.overtime := 0;
  END IF;
  
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-calculation
CREATE TRIGGER attendance_calculate_hours
  BEFORE INSERT OR UPDATE ON public.attendance_logs
  FOR EACH ROW
  EXECUTE FUNCTION calculate_attendance_hours();

-- Enable real-time for attendance_logs table
ALTER TABLE public.attendance_logs REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance_logs;
