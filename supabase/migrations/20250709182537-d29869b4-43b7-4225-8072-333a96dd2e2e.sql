
-- Create company_settings table
CREATE TABLE public.company_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  website TEXT,
  industry TEXT,
  timezone TEXT,
  currency TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies - only admins can manage company settings
CREATE POLICY "Admins can view company settings"
  ON public.company_settings
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert company settings"
  ON public.company_settings
  FOR INSERT
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update company settings"
  ON public.company_settings
  FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete company settings"
  ON public.company_settings
  FOR DELETE
  USING (is_admin(auth.uid()));

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_company_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER company_settings_updated_at
  BEFORE UPDATE ON public.company_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_company_settings_updated_at();
