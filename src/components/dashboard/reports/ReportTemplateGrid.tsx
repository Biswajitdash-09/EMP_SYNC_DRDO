
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';
import { ReportTemplate } from './reportTemplates';
import { getCategoryColor } from './reportUtils';

interface ReportTemplateGridProps {
  templates: ReportTemplate[];
  onGenerateReport: (templateId: number) => void;
}

const ReportTemplateGrid = ({ templates, onGenerateReport }: ReportTemplateGridProps) => {
  const handleGenerateClick = (templateId: number, event: React.MouseEvent) => {
    event.preventDefault();
    console.log('Generate report clicked for template:', templateId);
    onGenerateReport(templateId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Generate New Report</CardTitle>
        <CardDescription>
          Choose from available report templates to generate new reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-start gap-4">
                  <IconComponent className="w-8 h-8 text-blue-600 mt-1" />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{template.title}</h4>
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleGenerateClick(template.id, e)}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTemplateGrid;
