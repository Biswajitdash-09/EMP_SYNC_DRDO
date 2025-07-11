import { useState, useMemo } from 'react';
import { usePerformanceCore } from './performance/usePerformanceCore';

export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  category: string;
  status: 'Active' | 'Completed' | 'Overdue';
  createdDate: string;
}

export interface Review {
  id: string;
  employeeId: string;
  employee: string;
  type: 'Self' | 'Peer' | 'Manager' | '360';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  completedDate?: string;
  score?: number;
  comments?: string;
}

export interface Feedback {
  id: string;
  fromEmployee: string;
  toEmployee: string;
  type: 'Positive' | 'Constructive' | 'Recognition';
  comments: string;
  date: string;
  isAnonymous: boolean;
}

export interface PerformanceHistory {
  id: string;
  employeeId: string;
  period: string;
  averageScore: number;
  goalCompletion: number;
  completedDate: string;
  reviewType: string;
}

const initialGoals: Goal[] = [
  {
    id: 'goal1',
    employeeId: 'perf1',
    title: 'Complete React Training',
    description: 'Finish advanced React course and implement learnings in current project',
    progress: 75,
    deadline: '2024-07-30',
    category: 'Technical Skills',
    status: 'Active',
    createdDate: '2024-06-01'
  },
  {
    id: 'goal2',
    employeeId: 'perf1',
    title: 'Lead Team Project',
    description: 'Successfully lead the Q3 product launch project',
    progress: 50,
    deadline: '2024-08-15',
    category: 'Leadership',
    status: 'Active',
    createdDate: '2024-05-15'
  },
  {
    id: 'goal3',
    employeeId: 'perf2',
    title: 'Improve Code Quality Metrics',
    description: 'Reduce bug reports by 30% through better testing practices',
    progress: 90,
    deadline: '2024-07-01',
    category: 'Quality',
    status: 'Active',
    createdDate: '2024-04-01'
  }
];

const initialReviews: Review[] = [
  {
    id: 'rev1',
    employeeId: 'perf1',
    employee: 'John Smith',
    type: 'Self',
    status: 'Pending',
    dueDate: '2024-07-15'
  },
  {
    id: 'rev2',
    employeeId: 'perf1',
    employee: 'John Smith',
    type: 'Manager',
    status: 'Pending',
    dueDate: '2024-07-15'
  },
  {
    id: 'rev3',
    employeeId: 'perf2',
    employee: 'Sarah Johnson',
    type: '360',
    status: 'In Progress',
    dueDate: '2024-07-20'
  }
];

const initialFeedback: Feedback[] = [
  {
    id: 'fb1',
    fromEmployee: 'Alice Johnson',
    toEmployee: 'John Smith',
    type: 'Positive',
    comments: 'Great work on the client presentation. Very well prepared and delivered.',
    date: '2024-06-26',
    isAnonymous: false
  },
  {
    id: 'fb2',
    fromEmployee: 'Robert Davis',
    toEmployee: 'Mike Chen',
    type: 'Constructive',
    comments: 'Consider improving documentation practices for better team collaboration.',
    date: '2024-06-21',
    isAnonymous: false
  }
];

const initialHistory: PerformanceHistory[] = [
  {
    id: 'hist1',
    employeeId: 'perf1',
    period: 'Q1 2024',
    averageScore: 4.3,
    goalCompletion: 89,
    completedDate: '2024-03-31',
    reviewType: 'Quarterly Review'
  },
  {
    id: 'hist2',
    employeeId: 'perf1',
    period: 'Q4 2023',
    averageScore: 4.1,
    goalCompletion: 85,
    completedDate: '2023-12-31',
    reviewType: 'Quarterly Review'
  }
];

export const usePerformanceData = () => {
  const { performanceData, updatePerformanceScore } = usePerformanceCore();
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [feedback, setFeedback] = useState<Feedback[]>(initialFeedback);
  const [history, setHistory] = useState<PerformanceHistory[]>(initialHistory);

  // Goal operations
  const addGoal = (goal: Omit<Goal, 'id' | 'createdDate'>) => {
    const newGoal: Goal = {
      ...goal,
      id: `goal${goals.length + 1}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const status = progress >= 100 ? 'Completed' : 
                      new Date(goal.deadline) < new Date() && progress < 100 ? 'Overdue' : 'Active';
        return { ...goal, progress, status };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  // Review operations
  const startReview = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, status: 'In Progress' } : review
    ));
  };

  const completeReview = (reviewId: string, score: number, comments: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { 
        ...review, 
        status: 'Completed',
        completedDate: new Date().toISOString().split('T')[0],
        score,
        comments
      } : review
    ));
  };

  const scheduleReview = (review: Omit<Review, 'id'>) => {
    const newReview: Review = {
      ...review,
      id: `rev${reviews.length + 1}`
    };
    setReviews(prev => [...prev, newReview]);
  };

  // Feedback operations
  const addFeedback = (feedbackData: Omit<Feedback, 'id' | 'date'>) => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `fb${feedback.length + 1}`,
      date: new Date().toISOString().split('T')[0]
    };
    setFeedback(prev => [...prev, newFeedback]);
  };

  // Statistics calculations
  const stats = useMemo(() => {
    const avgScore = performanceData.reduce((acc, emp) => acc + emp.currentScore, 0) / performanceData.length;
    const goalCompletionRate = goals.filter(g => g.status === 'Completed').length / goals.length * 100;
    const pendingReviews = reviews.filter(r => r.status === 'Pending').length;
    const topPerformers = performanceData.filter(emp => emp.currentScore >= 4.5).length;

    return {
      averageScore: avgScore,
      goalCompletionRate,
      pendingReviews,
      topPerformers
    };
  }, [performanceData, goals, reviews]);

  return {
    performanceData,
    goals,
    reviews,
    feedback,
    history,
    stats,
    updatePerformanceScore,
    addGoal,
    updateGoalProgress,
    deleteGoal,
    startReview,
    completeReview,
    scheduleReview,
    addFeedback
  };
};
