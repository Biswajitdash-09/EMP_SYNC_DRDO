
-- Create leave_types table
CREATE TABLE public.leave_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    annual_days INTEGER NOT NULL DEFAULT 0,
    requires_approval BOOLEAN NOT NULL DEFAULT true,
    carry_forward BOOLEAN NOT NULL DEFAULT false,
    color TEXT DEFAULT 'blue',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create leave_requests table  
CREATE TABLE public.leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reason TEXT,
    comments TEXT,
    reviewed_by UUID REFERENCES profiles(id),
    reviewed_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create leave_balances table
CREATE TABLE public.leave_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE RESTRICT,
    total_days INTEGER NOT NULL DEFAULT 0,
    used_days INTEGER NOT NULL DEFAULT 0,
    available_days INTEGER GENERATED ALWAYS AS (total_days - used_days) STORED,
    year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(employee_id, leave_type_id, year)
);

-- Create holidays table
CREATE TABLE public.holidays (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    date DATE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('National', 'Company', 'Regional')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leave_types
CREATE POLICY "Everyone can view leave types" ON public.leave_types FOR SELECT USING (true);
CREATE POLICY "Admins can manage leave types" ON public.leave_types FOR ALL USING (is_admin(auth.uid()));

-- RLS Policies for leave_requests
CREATE POLICY "Users can view own leave requests" ON public.leave_requests FOR SELECT USING (auth.uid() = employee_id);
CREATE POLICY "Admins can view all leave requests" ON public.leave_requests FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Users can insert own leave requests" ON public.leave_requests FOR INSERT WITH CHECK (auth.uid() = employee_id);
CREATE POLICY "Admins can manage all leave requests" ON public.leave_requests FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Users can update own pending requests" ON public.leave_requests FOR UPDATE USING (auth.uid() = employee_id AND status = 'pending');

-- RLS Policies for leave_balances
CREATE POLICY "Users can view own leave balances" ON public.leave_balances FOR SELECT USING (auth.uid() = employee_id);
CREATE POLICY "Admins can view all leave balances" ON public.leave_balances FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage leave balances" ON public.leave_balances FOR ALL USING (is_admin(auth.uid()));

-- RLS Policies for holidays
CREATE POLICY "Everyone can view holidays" ON public.holidays FOR SELECT USING (true);
CREATE POLICY "Admins can manage holidays" ON public.holidays FOR ALL USING (is_admin(auth.uid()));

-- Insert default leave types
INSERT INTO public.leave_types (name, description, annual_days, requires_approval, carry_forward, color) VALUES
('Vacation Leave', 'Annual vacation days', 25, true, true, 'blue'),
('Sick Leave', 'Medical leave', 15, false, false, 'green'),
('Personal Leave', 'Personal matters', 5, true, false, 'purple'),
('Maternity/Paternity', 'Family leave', 84, true, false, 'pink');

-- Insert default holidays
INSERT INTO public.holidays (name, date, type, description) VALUES
('Independence Day', '2024-07-04', 'National', 'National Holiday'),
('Labor Day', '2024-09-02', 'National', 'National Holiday'),
('Thanksgiving', '2024-11-28', 'National', 'National Holiday'),
('Christmas Day', '2024-12-25', 'National', 'National Holiday'),
('New Year''s Day', '2025-01-01', 'National', 'National Holiday'),
('Company Retreat', '2024-08-15', 'Company', 'Company Event');

-- Create function to update leave balances when request is approved
CREATE OR REPLACE FUNCTION update_leave_balance_on_approval()
RETURNS TRIGGER AS $$
BEGIN
    -- Only process if status changed to approved
    IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
        -- Update the leave balance
        UPDATE public.leave_balances 
        SET used_days = used_days + NEW.days,
            updated_at = now()
        WHERE employee_id = NEW.employee_id 
        AND leave_type_id = NEW.leave_type_id 
        AND year = EXTRACT(YEAR FROM NEW.start_date);
        
        -- If no balance record exists, create one
        IF NOT FOUND THEN
            INSERT INTO public.leave_balances (employee_id, leave_type_id, total_days, used_days, year)
            SELECT NEW.employee_id, NEW.leave_type_id, lt.annual_days, NEW.days, EXTRACT(YEAR FROM NEW.start_date)
            FROM public.leave_types lt
            WHERE lt.id = NEW.leave_type_id;
        END IF;
    END IF;
    
    -- If status changed from approved to something else, restore the balance
    IF OLD.status = 'approved' AND NEW.status != 'approved' THEN
        UPDATE public.leave_balances 
        SET used_days = GREATEST(0, used_days - NEW.days),
            updated_at = now()
        WHERE employee_id = NEW.employee_id 
        AND leave_type_id = NEW.leave_type_id 
        AND year = EXTRACT(YEAR FROM NEW.start_date);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for leave balance updates
CREATE TRIGGER trigger_update_leave_balance_on_approval
    AFTER UPDATE ON public.leave_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_leave_balance_on_approval();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.leave_types;
ALTER PUBLICATION supabase_realtime ADD TABLE public.leave_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.leave_balances;
ALTER PUBLICATION supabase_realtime ADD TABLE public.holidays;
