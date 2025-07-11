
-- Create payroll table for storing payroll data
CREATE TABLE public.payroll (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  base_salary DECIMAL(10,2) NOT NULL DEFAULT 0,
  bonuses DECIMAL(10,2) NOT NULL DEFAULT 0,
  deductions DECIMAL(10,2) NOT NULL DEFAULT 0,
  net_pay DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Processed', 'Pending')),
  pay_period TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_payroll_employee_id ON public.payroll(employee_id);
CREATE INDEX idx_payroll_pay_period ON public.payroll(pay_period);
CREATE INDEX idx_payroll_status ON public.payroll(status);

-- Enable RLS on payroll table
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;

-- Create policies for payroll table (admin access only)
CREATE POLICY "Admins can view all payroll data" ON public.payroll
  FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert payroll data" ON public.payroll
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update payroll data" ON public.payroll
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete payroll data" ON public.payroll
  FOR DELETE USING (is_admin(auth.uid()));

-- Create salary_components table for managing salary structure
CREATE TABLE public.salary_components (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earning', 'deduction', 'benefit')),
  value TEXT NOT NULL,
  editable BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on salary_components table
ALTER TABLE public.salary_components ENABLE ROW LEVEL SECURITY;

-- Create policies for salary_components table
CREATE POLICY "Admins can manage salary components" ON public.salary_components
  FOR ALL USING (is_admin(auth.uid()));

-- Insert default salary components
INSERT INTO public.salary_components (name, type, value, editable) VALUES
-- Earnings
('Base Salary', 'earning', '100%', false),
('Performance Bonus', 'earning', 'Variable', true),
('Overtime', 'earning', '1.5x rate', true),
-- Deductions
('Federal Tax', 'deduction', '22%', true),
('State Tax', 'deduction', '5%', true),
('Health Insurance', 'deduction', '$250', true),
-- Benefits
('401(k) Match', 'benefit', '4%', true),
('Dental Insurance', 'benefit', '$45', true),
('Life Insurance', 'benefit', '$25', true);

-- Function to calculate net pay
CREATE OR REPLACE FUNCTION calculate_net_pay()
RETURNS TRIGGER AS $$
BEGIN
  NEW.net_pay = NEW.base_salary + NEW.bonuses - NEW.deductions;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate net pay
CREATE TRIGGER trigger_calculate_net_pay
  BEFORE INSERT OR UPDATE ON public.payroll
  FOR EACH ROW EXECUTE FUNCTION calculate_net_pay();
