
-- Create the company_policies table
CREATE TABLE public.company_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on the table
ALTER TABLE public.company_policies ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read policies"
ON public.company_policies
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert policies"
ON public.company_policies
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update policies"
ON public.company_policies
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete policies"
ON public.company_policies
FOR DELETE
USING (auth.role() = 'authenticated');

-- Create an index for better performance
CREATE INDEX idx_company_policies_status ON public.company_policies(status);
CREATE INDEX idx_company_policies_category ON public.company_policies(category);

-- Insert some sample data
INSERT INTO public.company_policies (title, category, content, status) VALUES
('Employee Code of Conduct', 'Workplace Ethics', 'Our code of conduct outlines the expected behavior and ethical standards for all employees.', 'Active'),
('Remote Work Policy', 'Work Arrangement', 'Guidelines for remote work arrangements, including expectations and requirements.', 'Active'),
('Anti-Harassment Policy', 'Workplace Safety', 'Zero tolerance policy for harassment and discrimination in the workplace.', 'Active');
