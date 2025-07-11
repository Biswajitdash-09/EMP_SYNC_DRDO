
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';

interface ReportGenerationFormProps {
  templateTitle: string;
  params: {
    dateFrom: string;
    dateTo: string;
    department: string;
    employeeId: string;
  };
  onParamsChange: (params: any) => void;
  onGenerate: () => void;
  onCancel: () => void;
}

const ReportGenerationForm = ({ 
  templateTitle, 
  params, 
  onParamsChange, 
  onGenerate, 
  onCancel 
}: ReportGenerationFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate {templateTitle}</CardTitle>
        <CardDescription>Configure report parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateFrom">From Date</Label>
            <Input
              id="dateFrom"
              type="date"
              value={params.dateFrom}
              onChange={(e) => onParamsChange(prev => ({ ...prev, dateFrom: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="dateTo">To Date</Label>
            <Input
              id="dateTo"
              type="date"
              value={params.dateTo}
              onChange={(e) => onParamsChange(prev => ({ ...prev, dateTo: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="department">Department (Optional)</Label>
            <select
              id="department"
              value={params.department}
              onChange={(e) => onParamsChange(prev => ({ ...prev, department: e.target.value }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Departments</option>
              <option value="IT">IT Department</option>
              <option value="HR">HR Department</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <Label htmlFor="employeeId">Employee ID (Optional)</Label>
            <Input
              id="employeeId"
              value={params.employeeId}
              onChange={(e) => onParamsChange(prev => ({ ...prev, employeeId: e.target.value }))}
              placeholder="e.g., EMP001"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onGenerate}>
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportGenerationForm;
