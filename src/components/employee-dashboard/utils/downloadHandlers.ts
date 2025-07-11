
import { useToast } from "@/hooks/use-toast";
import { generateCurrentPayslipContent, generatePayslipHistoryContent, generateTaxInformationContent } from './payslipContentGenerator';

export const createDownloadHandlers = (employee: any, toast: any) => {
  const downloadFile = (content: string, filename: string, successMessage: string) => {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded Successfully",
        description: successMessage,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadCurrentPayslip = (currentPayslip: any) => {
    const content = generateCurrentPayslipContent(employee, currentPayslip);
    const filename = `payslip_${currentPayslip.month}_${currentPayslip.year}_${employee.name.replace(/\s+/g, '_')}.txt`;
    const successMessage = `Current payslip for ${currentPayslip.month} ${currentPayslip.year} has been downloaded successfully.`;
    downloadFile(content, filename, successMessage);
  };

  const downloadHistoricalPayslip = (payslip: any) => {
    const content = generateCurrentPayslipContent(employee, payslip);
    const filename = `payslip_${payslip.month}_${payslip.year}_${employee.name.replace(/\s+/g, '_')}.txt`;
    const successMessage = `Payslip for ${payslip.month} ${payslip.year} has been downloaded successfully.`;
    downloadFile(content, filename, successMessage);
  };

  const downloadPayslipHistory = (payslips: any[], selectedYear: string) => {
    const content = generatePayslipHistoryContent(employee, payslips, selectedYear);
    const filename = `payslip_history_${selectedYear}_${employee.name.replace(/\s+/g, '_')}.txt`;
    const successMessage = `Payslip history for ${selectedYear} has been downloaded successfully.`;
    downloadFile(content, filename, successMessage);
  };

  const downloadTaxDocument = (docType: string, docName: string) => {
    const content = generateTaxInformationContent(docType, employee);
    const filename = `${docType}_${employee.name.replace(/\s+/g, '_')}.txt`;
    const successMessage = `${docName} has been downloaded successfully.`;
    downloadFile(content, filename, successMessage);
  };

  return {
    downloadCurrentPayslip,
    downloadHistoricalPayslip,
    downloadPayslipHistory,
    downloadTaxDocument
  };
};
