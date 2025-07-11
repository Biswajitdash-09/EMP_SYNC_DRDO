
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NotificationFiltersProps {
  filter: 'all' | 'unread' | 'read';
  categoryFilter: string;
  unreadCount: number;
  onFilterChange: (filter: 'all' | 'unread' | 'read') => void;
  onCategoryFilterChange: (category: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationFilters = ({
  filter,
  categoryFilter,
  unreadCount,
  onFilterChange,
  onCategoryFilterChange,
  onMarkAllAsRead,
  onClearAll
}: NotificationFiltersProps) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'leave', label: 'Leave' },
    { value: 'performance', label: 'Performance' },
    { value: 'policy', label: 'Policy' },
    { value: 'system', label: 'System' },
    { value: 'payroll', label: 'Payroll' },
    { value: 'general', label: 'General' }
  ];

  return (
    <div className="p-3 border-b border-gray-200 dark:border-gray-700 space-y-3">
      {/* Status Filter */}
      <div className="flex items-center space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('all')}
          className="h-7"
        >
          All
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('unread')}
          className="h-7"
        >
          Unread
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-4 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
        <Button
          variant={filter === 'read' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('read')}
          className="h-7"
        >
          Read
        </Button>
      </div>

      {/* Category Filter and Actions */}
      <div className="flex items-center justify-between space-x-2">
        <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
          <SelectTrigger className="w-40 h-7">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex space-x-1">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkAllAsRead}
              className="h-7 text-xs"
            >
              Mark all read
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 text-xs text-red-600 hover:text-red-700"
          >
            Clear all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilters;
