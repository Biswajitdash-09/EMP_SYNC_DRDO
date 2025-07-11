
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';

interface OnboardingTabProps {
  onManageWorkflows: () => void;
}

const OnboardingTab = ({ onManageWorkflows }: OnboardingTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding & Offboarding Workflows</CardTitle>
        <CardDescription>Manage employee onboarding and offboarding processes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Onboarding Checklist</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Welcome email sent</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">IT equipment assigned</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Office tour completed</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">HR documentation signed</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Offboarding Checklist</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Exit interview scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">IT equipment returned</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Access revoked</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Final payroll processed</span>
              </div>
            </div>
          </div>
        </div>
        <Button className="w-full" variant="outline" onClick={onManageWorkflows}>
          <Settings className="w-4 h-4 mr-2" />
          Manage Workflows
        </Button>
      </CardContent>
    </Card>
  );
};

export default OnboardingTab;
