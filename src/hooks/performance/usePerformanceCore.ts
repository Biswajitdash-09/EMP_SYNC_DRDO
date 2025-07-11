
import { useState } from 'react';

export interface PerformanceData {
  id: string;
  employee: string;
  department: string;
  currentScore: number;
  goalProgress: number;
  lastReview: string;
  nextReview: string;
  status: 'Exceeding' | 'On Track' | 'Needs Improvement';
  manager: string;
  position: string;
}

const initialPerformanceData: PerformanceData[] = [
  {
    id: 'perf1',
    employee: 'John Smith',
    department: 'Engineering',
    currentScore: 4.2,
    goalProgress: 85,
    lastReview: '2024-03-15',
    nextReview: '2024-09-15',
    status: 'On Track',
    manager: 'Alice Johnson',
    position: 'Senior Developer'
  },
  {
    id: 'perf2',
    employee: 'Sarah Johnson',
    department: 'HR',
    currentScore: 4.7,
    goalProgress: 92,
    lastReview: '2024-02-20',
    nextReview: '2024-08-20',
    status: 'Exceeding',
    manager: 'CEO',
    position: 'HR Manager'
  },
  {
    id: 'perf3',
    employee: 'Mike Chen',
    department: 'Finance',
    currentScore: 3.8,
    goalProgress: 70,
    lastReview: '2024-04-10',
    nextReview: '2024-10-10',
    status: 'Needs Improvement',
    manager: 'Robert Davis',
    position: 'Financial Analyst'
  }
];

export const usePerformanceCore = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>(initialPerformanceData);

  const updatePerformanceScore = (employeeId: string, score: number) => {
    setPerformanceData(prev => prev.map(perf => 
      perf.id === employeeId ? { ...perf, currentScore: score } : perf
    ));
  };

  return {
    performanceData,
    updatePerformanceScore
  };
};
