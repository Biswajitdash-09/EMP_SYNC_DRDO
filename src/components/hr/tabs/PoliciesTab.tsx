
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { CompanyPolicy } from '@/hooks/useCompanyPolicies';
import PolicyFilters from '../PolicyFilters';

interface PoliciesTabProps {
  policies: CompanyPolicy[];
  loading: boolean;
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: { category?: string; status?: string }) => void;
  onReset: () => void;
  onEditPolicy: (policy: CompanyPolicy) => void;
  onDeletePolicy: (policyId: string) => void;
}

const PoliciesTab = ({
  policies,
  loading,
  onSearch,
  onFilter,
  onReset,
  onEditPolicy,
  onDeletePolicy
}: PoliciesTabProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Company Policies & Handbook
        </CardTitle>
        <CardDescription>
          Manage company policies and employee handbook ({policies.length} policies)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PolicyFilters
          onSearch={onSearch}
          onFilter={onFilter}
          onReset={onReset}
        />
        
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {policies.map(policy => (
              <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <h4 className="font-medium text-gray-900">{policy.title}</h4>
                  <p className="text-sm text-gray-600">Category: {policy.category}</p>
                  <p className="text-xs text-gray-500">Last updated: {formatDate(policy.last_updated)}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    policy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEditPolicy(policy)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeletePolicy(policy.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PoliciesTab;
