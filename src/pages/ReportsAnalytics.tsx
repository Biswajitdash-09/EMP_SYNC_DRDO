
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DoughnutChart } from '@/components/charts/DoughnutChart';
import { usePayrollData } from '@/hooks/usePayrollData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

const ReportsAnalytics = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { payrollData, loading } = usePayrollData();
  const [realtimePayrollData, setRealtimePayrollData] = useState(payrollData);

  // Update local state when payroll data changes
  useEffect(() => {
    setRealtimePayrollData(payrollData);
  }, [payrollData]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('payroll_sync')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'payroll' 
      }, (payload) => {
        console.log('Payroll updated:', payload);
        toast({
          title: "Payroll Data Updated",
          description: "The payroll data has been refreshed with latest changes.",
        });
        // Trigger a refresh by updating the state
        window.location.reload();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  // Transform payroll data for the bar chart
  const barChartData = realtimePayrollData.map(item => ({
    name: item.employee_name,
    netPay: item.net_pay,
    deductions: item.deductions,
  }));

  // Transform payroll data for the doughnut chart
  const processedCount = realtimePayrollData.filter(item => item.status === 'Processed').length;
  const pendingCount = realtimePayrollData.filter(item => item.status === 'Pending').length;

  const doughnutChartData = [
    { name: 'Processed', value: processedCount },
    { name: 'Pending', value: pendingCount },
  ];

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBackToDashboard}
          className="mr-4 text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Payroll Reports & Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Net Pay vs Deductions Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Net Pay vs Deductions</CardTitle>
            <CardDescription>A comparison of net pay and deductions for each employee.</CardDescription>
          </CardHeader>
          <CardContent>
            {barChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="netPay" fill="#82ca9d" name="Net Pay" />
                  <Bar dataKey="deductions" fill="#e48383" name="Deductions" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No payroll data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payroll Status Doughnut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Status</CardTitle>
            <CardDescription>Distribution of payroll processing status.</CardDescription>
          </CardHeader>
          <CardContent>
            {doughnutChartData.some(item => item.value > 0) ? (
              <>
                <div className="h-[300px] w-full">
                  <DoughnutChart data={doughnutChartData} />
                </div>
                <div className="flex justify-center mt-4">
                  <div className="flex items-center mr-4">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span>Processed ({processedCount})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                    <span>Pending ({pendingCount})</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No payroll data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Payroll Data Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Detailed Payroll Data</h2>
        {realtimePayrollData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Employee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Base Salary</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Bonuses</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Deductions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Net Pay</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {realtimePayrollData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">{item.employee_name}</td>
                    <td className="py-3 px-4">${item.base_salary.toLocaleString()}</td>
                    <td className="py-3 px-4">${item.bonuses.toLocaleString()}</td>
                    <td className="py-3 px-4">${item.deductions.toLocaleString()}</td>
                    <td className="py-3 px-4">${item.net_pay.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Processed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg">No payroll data available</p>
            <p className="text-sm mt-2">Payroll records will appear here once they are created.</p>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {realtimePayrollData.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Employees</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{processedCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Processed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${realtimePayrollData.reduce((sum, item) => sum + item.net_pay, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Net Pay</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
