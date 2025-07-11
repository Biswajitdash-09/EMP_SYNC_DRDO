
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaveBalance {
  id: string;
  employee_id: string;
  employee_name?: string;
  leave_type_name?: string;
  total_days: number;
  used_days: number;
  available_days: number;
  year: number;
}

interface LeaveBalancesTableProps {
  leaveBalances: LeaveBalance[];
}

const LeaveBalancesTable = ({ leaveBalances }: LeaveBalancesTableProps) => {
  // Group balances by employee
  const groupedBalances = leaveBalances.reduce((acc, balance) => {
    const employeeName = balance.employee_name || 'Unknown';
    if (!acc[employeeName]) {
      acc[employeeName] = [];
    }
    acc[employeeName].push(balance);
    return acc;
  }, {} as Record<string, LeaveBalance[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedBalances).map(([employeeName, balances]) => (
        <div key={employeeName} className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h3 className="font-medium text-gray-900">{employeeName}</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Leave Type</TableHead>
                <TableHead>Total Days</TableHead>
                <TableHead>Used Days</TableHead>
                <TableHead>Available Days</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {balances.map((balance) => (
                <TableRow key={balance.id}>
                  <TableCell className="font-medium">{balance.leave_type_name || 'Unknown'}</TableCell>
                  <TableCell>{balance.total_days}</TableCell>
                  <TableCell>{balance.used_days}</TableCell>
                  <TableCell className="font-medium text-green-600">{balance.available_days}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div 
                          className="h-full bg-blue-500 rounded" 
                          style={{ 
                            width: `${balance.total_days > 0 ? (balance.available_days / balance.total_days) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {balance.total_days > 0 ? Math.round((balance.available_days / balance.total_days) * 100) : 0}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default LeaveBalancesTable;
