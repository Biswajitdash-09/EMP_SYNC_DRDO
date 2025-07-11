
import { Search, Calendar, FileText, Users, BarChart3, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';

const DashboardHeaderSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Search items data
  const searchItems = [
    { title: "Employee Records", icon: Users, path: "/employees" },
    { title: "HR Management", icon: FileText, path: "/hr" },
    { title: "Payroll System", icon: BarChart3, path: "/payroll" },
    { title: "Leave Management", icon: Calendar, path: "/leave" },
    { title: "Performance Analytics", icon: BarChart3, path: "/performance" },
    { title: "Time Tracking", icon: Calendar, path: "/time-tracking" },
    { title: "Reports & Analytics", icon: BarChart3, path: "/reports" },
    { title: "System Settings", icon: Settings, path: "/settings" },
  ];

  const filteredItems = searchItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative hidden md:block">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search employees, reports..."
          className="pl-10 w-64 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
        />
      </div>
      
      {/* Search Dropdown */}
      {isSearchOpen && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <Command className="max-h-64">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages & Features">
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.path}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onSelect={() => {
                      window.location.href = item.path;
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default DashboardHeaderSearch;
