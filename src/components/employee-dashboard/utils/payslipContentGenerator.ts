
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Helper function to safely convert unknown values to numbers
const safeNumber = (value: unknown): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const generateCurrentPayslipContent = (employee: any, currentPayslip: any) => {
  // Safely calculate total deductions
  const totalDeductions = currentPayslip?.deductions 
    ? Object.values(currentPayslip.deductions)
        .filter((amount): amount is number => typeof amount === 'number')
        .reduce((sum: number, amount: number) => sum + amount, 0)
    : 0;
  
  return `
==============================================
            EMPLOYEE PAYSLIP
==============================================

Employee: ${employee?.name || 'N/A'}
Employee ID: ${employee?.id || 'N/A'}
Pay Period: ${currentPayslip?.month || 'N/A'} ${currentPayslip?.year || 'N/A'}
Generated on: ${new Date().toLocaleDateString()}
Status: ${currentPayslip?.status || 'N/A'}

==============================================
                EARNINGS
==============================================

Basic Salary:                ${formatCurrency(safeNumber(currentPayslip?.basicSalary))}
House Rent Allowance:        ${formatCurrency(safeNumber(currentPayslip?.allowances?.hra))}
Transport Allowance:         ${formatCurrency(safeNumber(currentPayslip?.allowances?.transport))}
Medical Allowance:           ${formatCurrency(safeNumber(currentPayslip?.allowances?.medical))}
Other Allowances:            ${formatCurrency(safeNumber(currentPayslip?.allowances?.other))}
                            ──────────────────
GROSS SALARY:               ${formatCurrency(safeNumber(currentPayslip?.grossSalary))}

==============================================
                DEDUCTIONS
==============================================

Income Tax:                  ${formatCurrency(safeNumber(currentPayslip?.deductions?.tax))}
Provident Fund:              ${formatCurrency(safeNumber(currentPayslip?.deductions?.providentFund))}
Insurance Premium:           ${formatCurrency(safeNumber(currentPayslip?.deductions?.insurance))}
Other Deductions:            ${formatCurrency(safeNumber(currentPayslip?.deductions?.other))}
                            ──────────────────
TOTAL DEDUCTIONS:           ${formatCurrency(totalDeductions)}

==============================================
                NET SALARY
==============================================

NET PAY:                    ${formatCurrency(safeNumber(currentPayslip?.netSalary))}

==============================================

This payslip is generated electronically and is valid without signature.

© ${new Date().getFullYear()} Company Payroll System
    `;
};

export const generatePayslipHistoryContent = (employee: any, payslips: any[], selectedYear: string) => {
  let content = `
==============================================
          PAYSLIP HISTORY REPORT
==============================================

Employee: ${employee?.name || 'N/A'}
Employee ID: ${employee?.id || 'N/A'}
Year: ${selectedYear}
Generated on: ${new Date().toLocaleDateString()}

==============================================
            PAYSLIP SUMMARY
==============================================

`;

  if (Array.isArray(payslips)) {
    payslips.forEach((payslip, index) => {
      const payslipTotal = payslip?.allowances 
        ? Object.values(payslip.allowances)
            .filter((amount): amount is number => typeof amount === 'number')
            .reduce((sum: number, amount: number) => sum + amount, 0)
        : 0;
      
      const payslipDeductions = payslip?.deductions 
        ? Object.values(payslip.deductions)
            .filter((amount): amount is number => typeof amount === 'number')
            .reduce((sum: number, amount: number) => sum + amount, 0)
        : 0;
      
      content += `
${index + 1}. ${payslip?.month || 'N/A'} ${payslip?.year || 'N/A'}
   Pay Period ID: ${payslip?.id || 'N/A'}
   Basic Salary: ${formatCurrency(safeNumber(payslip?.basicSalary))}
   Total Allowances: ${formatCurrency(payslipTotal)}
   Total Deductions: ${formatCurrency(payslipDeductions)}
   Net Salary: ${formatCurrency(safeNumber(payslip?.netSalary))}
   Status: ${payslip?.status || 'N/A'}
   ──────────────────────────────────────────

`;
    });

    const totalNetPay = payslips.reduce((sum, payslip) => sum + safeNumber(payslip?.netSalary), 0);
    const avgNetPay = payslips.length > 0 ? totalNetPay / payslips.length : 0;

    content += `
==============================================
              YEARLY SUMMARY
==============================================

Total Payslips: ${payslips.length}
Total Net Pay (YTD): ${formatCurrency(totalNetPay)}
Average Monthly Pay: ${formatCurrency(avgNetPay)}

==============================================

This report contains historical payroll data for the specified period.
All amounts are in USD.

© ${new Date().getFullYear()} Company Payroll System
    `;
  }

  return content;
};

export const generateTaxInformationContent = (docType: string, employee: any) => {
  if (docType === 'form16') {
    return `
==============================================
              FORM 16 (2023-24)
==============================================

Employee: ${employee?.name || 'N/A'}
Employee ID: ${employee?.id || 'N/A'}
PAN: ABCDE1234F
Financial Year: 2023-24
Assessment Year: 2024-25
Generated on: ${new Date().toLocaleDateString()}

==============================================
            INCOME DETAILS
==============================================

Gross Total Income:          ${formatCurrency(900000)}
Less: Deductions under Chapter VI-A
  - Section 80C:             ${formatCurrency(150000)}
  - Section 80D:             ${formatCurrency(25000)}
  - Total Deductions:        ${formatCurrency(175000)}

Taxable Income:              ${formatCurrency(725000)}

==============================================
            TAX COMPUTATION
==============================================

Tax on Taxable Income:       ${formatCurrency(112500)}
Less: Tax Deducted at Source: ${formatCurrency(120000)}

Refund Due:                  ${formatCurrency(7500)}

==============================================
          TDS DEDUCTION SUMMARY
==============================================

April 2023:                  ${formatCurrency(10000)}
May 2023:                    ${formatCurrency(10000)}
June 2023:                   ${formatCurrency(10000)}
July 2023:                   ${formatCurrency(10000)}
August 2023:                 ${formatCurrency(10000)}
September 2023:              ${formatCurrency(10000)}
October 2023:                ${formatCurrency(10000)}
November 2023:               ${formatCurrency(10000)}
December 2023:               ${formatCurrency(10000)}
January 2024:                ${formatCurrency(10000)}
February 2024:               ${formatCurrency(10000)}
March 2024:                  ${formatCurrency(10000)}

Total TDS:                   ${formatCurrency(120000)}

==============================================

This is a computer generated Form 16 and does not require signature.

© ${new Date().getFullYear()} Company Tax Department
      `;
  } else if (docType === 'investment') {
    return `
==============================================
         INVESTMENT DECLARATION
==============================================

Employee: ${employee?.name || 'N/A'}
Employee ID: ${employee?.id || 'N/A'}
Financial Year: 2024-25
Submitted on: ${new Date().toLocaleDateString()}

==============================================
        SECTION 80C INVESTMENTS
==============================================

Employee Provident Fund:     ${formatCurrency(108000)}
Public Provident Fund:       ${formatCurrency(42000)}
Life Insurance Premium:      ${formatCurrency(0)}
ELSS Mutual Funds:          ${formatCurrency(0)}
NSC/FD:                     ${formatCurrency(0)}

Total Section 80C:          ${formatCurrency(150000)}
Maximum Limit:              ${formatCurrency(150000)}
Eligible Amount:            ${formatCurrency(150000)}

==============================================
        SECTION 80D INVESTMENTS
==============================================

Health Insurance Premium:    ${formatCurrency(25000)}
Medical Expenditure:         ${formatCurrency(0)}

Total Section 80D:          ${formatCurrency(25000)}
Maximum Limit:              ${formatCurrency(50000)}
Eligible Amount:            ${formatCurrency(25000)}

==============================================
              SUMMARY
==============================================

Total Declared Investment:   ${formatCurrency(175000)}
Tax Savings:                ${formatCurrency(54250)}

==============================================

Declaration: I hereby declare that the information provided above is true and correct.

Employee Signature: _________________
Date: ${new Date().toLocaleDateString()}

© ${new Date().getFullYear()} Company HR Department
      `;
  } else {
    return `
==============================================
            SALARY CERTIFICATE
==============================================

Employee: ${employee?.name || 'N/A'}
Employee ID: ${employee?.id || 'N/A'}
Department: Technology
Designation: Software Developer
Date of Joining: January 1, 2022
Generated on: ${new Date().toLocaleDateString()}

==============================================
          SALARY STRUCTURE
==============================================

Basic Salary (Monthly):     ${formatCurrency(75000)}
HRA (Monthly):              ${formatCurrency(22500)}
Transport Allowance:        ${formatCurrency(2000)}
Medical Allowance:          ${formatCurrency(1500)}
Other Allowances:           ${formatCurrency(1000)}

Gross Salary (Monthly):     ${formatCurrency(102000)}
Gross Salary (Annual):      ${formatCurrency(102000 * 12)}

==============================================
            DEDUCTIONS
==============================================

Income Tax (Monthly):       ${formatCurrency(15000)}
Provident Fund (Monthly):   ${formatCurrency(9000)}
Insurance (Monthly):        ${formatCurrency(2000)}

Net Salary (Monthly):       ${formatCurrency(75500)}
Net Salary (Annual):        ${formatCurrency(75500 * 12)}

==============================================

This certificate is issued at the request of the employee for official purposes.

Authorized Signatory
HR Department

© ${new Date().getFullYear()} Company HR Department
      `;
  }
};
