
import { useState } from 'react';
import { X, ExternalLink, Clock, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Notification } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: NotificationItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getCategoryLabel = () => {
    return notification.category.charAt(0).toUpperCase() + notification.category.slice(1);
  };

  const handleClick = () => {
    if (notification.unread) {
      onMarkAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank');
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  return (
    <div
      className={cn(
        "p-3 cursor-pointer transition-all duration-200 border-l-4 hover:bg-gray-50 dark:hover:bg-gray-800",
        notification.unread ? "bg-blue-50 dark:bg-blue-950/20 border-l-blue-500" : "border-l-transparent",
        notification.priority === 'high' && notification.unread && "border-l-red-500"
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between space-x-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          {/* Priority indicator */}
          {notification.priority === 'high' && (
            <div className={cn("w-2 h-2 rounded-full mt-2", getPriorityColor())} />
          )}
          
          {/* Type icon */}
          <div className="mt-1">
            {getTypeIcon()}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={cn(
                "text-sm font-medium truncate",
                notification.unread ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"
              )}>
                {notification.title}
              </h4>
              {notification.unread && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
              )}
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
              {notification.message}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{notification.time}</span>
                </div>
                
                <Badge variant="secondary" className="text-xs">
                  {getCategoryLabel()}
                </Badge>
                
                {notification.priority === 'high' && (
                  <Badge variant="destructive" className="text-xs">
                    High Priority
                  </Badge>
                )}
              </div>
              
              {notification.actionUrl && (
                <ExternalLink className="w-3 h-3 text-gray-400" />
              )}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        {isHovered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
