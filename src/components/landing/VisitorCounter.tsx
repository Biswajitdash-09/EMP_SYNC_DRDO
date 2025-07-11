
/**
 * Visitor Counter Component
 * Displays dynamic visitor count in the navigation
 */

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Get stored visitor count or initialize
    const storedCount = localStorage.getItem('visitor-count');
    const initialCount = storedCount ? parseInt(storedCount, 10) : Math.floor(Math.random() * 1000) + 500;
    
    // Increment visitor count
    const newCount = initialCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem('visitor-count', newCount.toString());

    // Simulate dynamic updates every 30 seconds
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const updated = prev + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem('visitor-count', updated.toString());
        return updated;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
      <Eye className="w-4 h-4" />
      <span className="font-medium">{visitorCount.toLocaleString()}</span>
      <span className="hidden sm:inline">visitors</span>
    </div>
  );
};

export default VisitorCounter;
