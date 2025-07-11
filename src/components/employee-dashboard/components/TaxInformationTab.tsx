
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';
import { formatCurrency } from '../utils/payslipContentGenerator';

interface TaxInformationTabProps {
  onDownloadTaxDocument: (docType: string, docName: string) => void;
}

const TaxInformationTab = ({ onDownloadTaxDocument }: TaxInformationTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Tax Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Current Financial Year (2024-25)</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Tax Deducted (YTD)</span>
                <span className="font-medium">{formatCurrency(45000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Provident Fund (YTD)</span>
                <span className="font-medium">{formatCurrency(27000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance Premium (YTD)</span>
                <span className="font-medium">{formatCurrency(6000)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tax Documents</h4>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onDownloadTaxDocument('form16', 'Form 16 (2023-24)')}
              >
                <Download className="w-4 h-4 mr-2" />
                Form 16 (2023-24)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onDownloadTaxDocument('investment', 'Investment Declaration')}
              >
                <Download className="w-4 h-4 mr-2" />
                Investment Declaration
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onDownloadTaxDocument('salary', 'Salary Certificate')}
              >
                <Download className="w-4 h-4 mr-2" />
                Salary Certificate
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxInformationTab;
