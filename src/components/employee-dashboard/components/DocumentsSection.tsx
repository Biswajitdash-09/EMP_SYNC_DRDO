
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, Eye, Trash2, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { employeeDashboardService } from '@/services/employeeDashboardService';

interface Document {
  id: string;
  document_name: string;
  document_type: string;
  file_url?: string;
  file_size?: number;
  upload_date: string;
  is_verified?: boolean;
}

const DocumentsSection = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories = [
    'Employment',
    'Identity', 
    'Education',
    'Medical',
    'Tax',
    'Other'
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await employeeDashboardService.getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      
      // Determine document type based on file type
      let documentType = 'Other';
      if (file.type.includes('pdf')) documentType = 'Employment';
      else if (file.type.includes('image')) documentType = 'Identity';
      
      const uploadedDoc = await employeeDashboardService.uploadDocument(file, documentType);
      
      // Refresh documents list
      await loadDocuments();
      
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
      
      // Clear the input
      event.target.value = '';
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (doc: Document) => {
    if (doc.file_url) {
      const link = document.createElement('a');
      link.href = doc.file_url;
      link.download = doc.document_name;
      link.target = '_blank';
      link.click();
      
      toast({
        title: "Download Started",
        description: `Downloading ${doc.document_name}`,
      });
    }
  };

  const handleDelete = async (docId: string) => {
    try {
      await employeeDashboardService.deleteDocument(docId);
      await loadDocuments();
      
      toast({
        title: "Document Deleted",
        description: "Document has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Employment': 'bg-blue-100 text-blue-800',
      'Identity': 'bg-green-100 text-green-800',
      'Education': 'bg-purple-100 text-purple-800',
      'Medical': 'bg-red-100 text-red-800',
      'Tax': 'bg-yellow-100 text-yellow-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          HR Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <Upload className="w-8 h-8 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium">Upload Document</p>
              <p className="text-sm text-gray-600">
                Upload important HR documents (PDF, JPG, PNG, DOC)
              </p>
            </div>
            <div>
              <Input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                id="document-upload"
                disabled={uploading}
              />
              <Button asChild disabled={uploading}>
                <label htmlFor="document-upload" className="cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Choose File'}
                </label>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              <p className="text-center py-4">Loading documents...</p>
            ) : documents.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No documents uploaded yet</p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{doc.document_name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{formatFileSize(doc.file_size)}</span>
                        <span>•</span>
                        <span>Uploaded: {new Date(doc.upload_date).toLocaleDateString()}</span>
                        {doc.is_verified && (
                          <>
                            <span>•</span>
                            <span className="text-green-600">Verified</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(doc.document_type)}>
                      {doc.document_type}
                    </Badge>
                    
                    <div className="flex gap-1">
                      {doc.file_url && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDownload(doc)}
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(doc.file_url, '_blank')}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(doc.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
