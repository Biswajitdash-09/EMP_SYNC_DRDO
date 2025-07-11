
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePayrollData } from '@/hooks/usePayrollData';
import PayrollOverview from '@/components/payroll/PayrollOverview';
import SalaryComponents from '@/components/payroll/SalaryComponents';
import PayslipGeneration from '@/components/payroll/PayslipGeneration';
import TaxReports from '@/components/payroll/TaxReports';
import PayrollHistory from '@/components/payroll/PayrollHistory';

const PayrollSystem = () => {
  const navigate = useNavigate();
  const [processPayrollOpen, setProcessPayrollOpen] = useState(false);
  
  const {
    payrollData,
    salaryComponents,
    payrollSummary,
    loading,
    processing,
    processPayroll: handleProcessPayroll,
    updatePayrollRecord,
    updateSalaryComponent,
    refreshData
  } = usePayrollData();

  const handleProcessPayrollConfirm = async () => {
    await handleProcessPayroll();
    setProcessPayrollOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payroll data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')} className="bg-amber-500 hover:bg-amber-400">
                ← Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <h1 className="text-xl font-bold text-gray-900">Payroll System</h1>
              </div>
            </div>
            <Dialog open={processPayrollOpen} onOpenChange={setProcessPayrollOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={processing || payrollData.filter(emp => emp.status === 'Pending').length === 0}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  {processing ? 'Processing...' : 'Process Payroll'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Process Payroll</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to process the payroll for {payrollData.filter(emp => emp.status === 'Pending').length} pending employees? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setProcessPayrollOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleProcessPayrollConfirm} 
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : 'Process Payroll'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Salary Components</TabsTrigger>
            <TabsTrigger value="payslips">Payslips</TabsTrigger>
            <TabsTrigger value="taxes">Tax Reports</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PayrollOverview 
              payrollData={payrollData} 
              payrollSummary={payrollSummary}
              onUpdateRecord={updatePayrollRecord}
            />
          </TabsContent>

          <TabsContent value="components">
            <SalaryComponents 
              salaryComponents={salaryComponents} 
              setSalaryComponents={updateSalaryComponent} 
            />
          </TabsContent>

          <TabsContent value="payslips">
            <PayslipGeneration payrollData={payrollData} />
          </TabsContent>

          <TabsContent value="taxes">
            <TaxReports />
          </TabsContent>

          <TabsContent value="history">
            <PayrollHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PayrollSystem;
