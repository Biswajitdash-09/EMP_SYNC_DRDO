
-- Create the main employees table
CREATE TABLE public.employees (
  employee_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  department text,
  role text,
  status text DEFAULT 'Active',
  join_date date DEFAULT CURRENT_DATE,
  address text,
  date_of_birth date,
  profile_picture_url text,
  manager text,
  base_salary numeric DEFAULT 0,
  login_access boolean DEFAULT true,
  login_email text,
  login_password text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create emergency contacts table
CREATE TABLE public.employee_emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES public.employees(employee_id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text,
  relationship text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create employment history table
CREATE TABLE public.employee_employment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES public.employees(employee_id) ON DELETE CASCADE,
  title text NOT NULL,
  department text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  current boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create documents table for employees
CREATE TABLE public.employee_documents (
  document_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES public.employees(employee_id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  size text,
  upload_date date DEFAULT CURRENT_DATE,
  file_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_employment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for employees table
CREATE POLICY "Allow authenticated users to view employees" ON public.employees
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert employees" ON public.employees
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update employees" ON public.employees
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete employees" ON public.employees
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for emergency contacts
CREATE POLICY "Allow authenticated users to manage emergency contacts" ON public.employee_emergency_contacts
  FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for employment history
CREATE POLICY "Allow authenticated users to manage employment history" ON public.employee_employment_history
  FOR ALL USING (auth.role() = 'authenticated');

-- Create RLS policies for employee documents
CREATE POLICY "Allow authenticated users to manage employee documents" ON public.employee_documents
  FOR ALL USING (auth.role() = 'authenticated');

-- Enable realtime for the employees table
ALTER TABLE public.employees REPLICA IDENTITY FULL;
ALTER TABLE public.employee_emergency_contacts REPLICA IDENTITY FULL;
ALTER TABLE public.employee_employment_history REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.employees;
ALTER PUBLICATION supabase_realtime ADD TABLE public.employee_emergency_contacts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.employee_employment_history;
