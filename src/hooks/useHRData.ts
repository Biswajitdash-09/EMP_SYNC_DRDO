
import { useState } from 'react';

export interface Policy {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  content: string;
  status: 'Active' | 'Draft' | 'Archived';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  author: string;
  status: 'Published' | 'Draft';
}

const initialPolicies: Policy[] = [
  {
    id: 'pol1',
    title: 'Employee Code of Conduct',
    category: 'Workplace Ethics',
    lastUpdated: '2024-01-15',
    content: 'Our code of conduct outlines the expected behavior and ethical standards for all employees.',
    status: 'Active'
  },
  {
    id: 'pol2',
    title: 'Remote Work Policy',
    category: 'Work Arrangement',
    lastUpdated: '2024-02-10',
    content: 'Guidelines for remote work arrangements, including expectations and requirements.',
    status: 'Active'
  },
  {
    id: 'pol3',
    title: 'Anti-Harassment Policy',
    category: 'Workplace Safety',
    lastUpdated: '2024-01-05',
    content: 'Zero tolerance policy for harassment and discrimination in the workplace.',
    status: 'Active'
  }
];

const initialAnnouncements: Announcement[] = [
  {
    id: 'ann1',
    title: 'Annual Performance Reviews Starting Next Month',
    content: 'All employees will participate in their annual performance review process starting next month.',
    date: '2024-06-15',
    priority: 'High',
    author: 'HR Team',
    status: 'Published'
  },
  {
    id: 'ann2',
    title: 'New Health Insurance Benefits Available',
    content: 'We are pleased to announce new health insurance options available to all employees.',
    date: '2024-06-10',
    priority: 'Medium',
    author: 'HR Team',
    status: 'Published'
  }
];

export const useHRData = () => {
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

  const addPolicy = (policy: Omit<Policy, 'id'>) => {
    const newId = `pol${policies.length + 1}`;
    setPolicies(prev => [...prev, { ...policy, id: newId }]);
  };

  const updatePolicy = (policyData: { id: string; [key: string]: any }) => {
    setPolicies(prev => prev.map(policy => 
      policy.id === policyData.id ? { ...policy, ...policyData } : policy
    ));
  };

  const deletePolicy = (id: string) => {
    setPolicies(prev => prev.filter(policy => policy.id !== id));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newId = `ann${announcements.length + 1}`;
    setAnnouncements(prev => [...prev, { ...announcement, id: newId }]);
  };

  const updateAnnouncement = (announcementData: { id: string; [key: string]: any }) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === announcementData.id ? { ...ann, ...announcementData } : ann
    ));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
  };

  return {
    policies,
    announcements,
    addPolicy,
    updatePolicy,
    deletePolicy,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
  };
};
