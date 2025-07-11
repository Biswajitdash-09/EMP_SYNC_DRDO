
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Upload } from 'lucide-react';
import { Employee } from '@/hooks/useEmployeeData';
import { useRef } from 'react';

interface DocumentsTabProps {
  selectedEmployee: Employee | null;
  onDocumentUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentsTab = ({ selectedEmployee, onDocumentUpload }: DocumentsTabProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Employee Documents
          {selectedEmployee && (
            <span className="text-sm font-normal text-gray-500">
              - {selectedEmployee.name}
            </span>
          )}
        </CardTitle>
        <CardDescription>Manage ID cards, contracts, and other important documents</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedEmployee ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedEmployee.documents.map((doc) => (
                <div key={doc.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <h5 className="font-medium">{doc.name}</h5>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                      <p className="text-xs text-gray-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedEmployee.documents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No documents uploaded for this employee.
              </div>
            )}
            
            <div className="mt-6">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={onDocumentUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={handleUploadClick}
                type="button"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Select an employee from the Overview tab to view their documents.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
