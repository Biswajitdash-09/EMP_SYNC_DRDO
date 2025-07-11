
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItem from './notifications/NotificationItem';
import NotificationFilters from './notifications/NotificationFilters';
import { cn } from '@/lib/utils';

const DashboardHeaderNotifications = () => {
  const {
    notifications,
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
  } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className={cn(
            "w-4 h-4 transition-colors",
            hasHighPriority && "text-red-500"
          )} />
          {unreadCount > 0 && (
            <span className={cn(
              "absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-medium",
              hasHighPriority ? "bg-red-500 animate-pulse" : "bg-blue-500"
            )}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-96 p-0">
        <DropdownMenuLabel className="flex items-center justify-between p-3 pb-0">
          <span className="font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="my-2" />
        
        {/* Filters */}
        <NotificationFilters
          filter={filter}
          categoryFilter={categoryFilter}
          unreadCount={unreadCount}
          onFilterChange={setFilter}
          onCategoryFilterChange={setCategoryFilter}
          onMarkAllAsRead={markAllAsRead}
          onClearAll={clearAllNotifications}
        />
        
        {/* Notifications List */}
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        
        {/* View All Link */}
        <div className="p-3">
          <Button 
            variant="ghost" 
            className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20"
            onClick={() => {
              // TODO: Navigate to full notifications page
              console.log('Navigate to notifications page');
            }}
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardHeaderNotifications;
