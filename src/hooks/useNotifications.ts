
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  time: string;
  unread: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'leave' | 'performance' | 'policy' | 'system' | 'payroll' | 'general';
  actionUrl?: string;
  metadata?: Record<string, any>;
}

// Mock real-time notification service
class NotificationService {
  private listeners: ((notification: Notification) => void)[] = [];
  private interval: NodeJS.Timeout | null = null;

  subscribe(callback: (notification: Notification) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  start() {
    // Simulate real-time notifications every 30 seconds
    this.interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new notification
        this.generateRandomNotification();
      }
    }, 30000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private generateRandomNotification() {
    const notifications = [
      {
        title: "New Leave Request",
        message: "John Doe has submitted a leave request for review",
        type: 'info' as const,
        category: 'leave' as const,
        priority: 'medium' as const
      },
      {
        title: "Payroll Processing Complete",
        message: "Monthly payroll has been processed successfully",
        type: 'success' as const,
        category: 'payroll' as const,
        priority: 'high' as const
      },
      {
        title: "System Maintenance",
        message: "Scheduled maintenance will begin at 11:00 PM tonight",
        type: 'warning' as const,
        category: 'system' as const,
        priority: 'medium' as const
      }
    ];

    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    const notification: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...randomNotification,
      time: this.getRelativeTime(new Date()),
      unread: true
    };

    this.listeners.forEach(listener => listener(notification));
  }

  private getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
}

const notificationService = new NotificationService();

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Leave Request Approved",
      message: "Your leave request for Dec 25-26 has been approved",
      time: "2 hours ago",
      unread: true,
      type: "success",
      priority: "high",
      category: "leave"
    },
    {
      id: "2", 
      title: "Performance Review Due",
      message: "Your quarterly performance review is due by Dec 31",
      time: "1 day ago",
      unread: true,
      type: "warning",
      priority: "high",
      category: "performance"
    },
    {
      id: "3",
      title: "New Policy Update",
      message: "Remote work policy has been updated. Please review.",
      time: "3 days ago",
      unread: false,
      type: "info",
      priority: "medium",
      category: "policy"
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    notificationService.start();
    
    const unsubscribe = notificationService.subscribe((newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
      
      // Show toast for high priority notifications
      if (newNotification.priority === 'high') {
        toast({
          title: newNotification.title,
          description: newNotification.message,
          variant: newNotification.type === 'error' ? 'destructive' : 'default'
        });
      }
    });

    return () => {
      notificationService.stop();
      unsubscribe();
    };
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, unread: false }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
  }, []);

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    const statusMatch = filter === 'all' || 
                       (filter === 'unread' && notification.unread) ||
                       (filter === 'read' && !notification.unread);
    
    const categoryMatch = categoryFilter === 'all' || notification.category === categoryFilter;
    
    return statusMatch && categoryMatch;
  });

  const unreadCount = notifications.filter(n => n.unread).length;
  const hasHighPriority = notifications.some(n => n.unread && n.priority === 'high');

  return {
    notifications: filteredNotifications,
    allNotifications: notifications,
    unreadCount,
    hasHighPriority,
    filter,
    categoryFilter,
    setFilter,
    setCategoryFilter,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  };
};
