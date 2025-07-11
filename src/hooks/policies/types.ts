
export interface CompanyPolicy {
  id: string;
  title: string;
  category: string;
  content: string | null;
  status: 'Active' | 'Inactive';
  last_updated: string | null;
  created_at: string | null;
}
