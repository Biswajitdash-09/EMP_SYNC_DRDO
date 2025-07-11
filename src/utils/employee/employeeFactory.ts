
/**
 * Employee Factory
 * Creates individual employee records with realistic data
 */

import { Employee } from '@/types/employee';
import { firstNames, lastNames, departments, roles, statuses, managers } from './employeeDataConstants';
import { generateStrongPassword } from './passwordGenerator';

/**
 * Array of placeholder profile pictures for employees
 * Uses Unsplash placeholder images for realistic profile photos
 */
const profilePictures = [
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face'
];

/**
 * Generate a single employee record with realistic data including strong login credentials
 * Now includes profile pictures for visual representation in the admin dashboard
 * @param index - The index number for generating unique employee data
 * @returns Complete employee object with all required fields
 */
export const createEmployee = (index: number): Employee => {
  // Generate unique employee ID with zero-padding for consistency
  const employeeId = `EMP${String(index + 1).padStart(3, '0')}`;
  
  // Generate realistic name combinations using predefined arrays
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index * 7) % lastNames.length];
  const fullName = `${firstName} ${lastName}`;
  
  // Assign department and role based on index for even distribution
  const department = departments[index % departments.length];
  const rolesList = roles[department as keyof typeof roles];
  const role = rolesList[(index * 3) % rolesList.length];
  
  // Ensure majority of employees are Active (80%), rest distributed among other statuses
  const status = index < 80 ? 'Active' : statuses[(index * 5) % statuses.length];
  
  // Generate realistic employment dates (join date within last 5 years)
  const joinYear = 2020 + (index % 5);
  const joinMonth = (index % 12) + 1;
  const joinDay = (index % 28) + 1;
  const joinDate = `${joinYear}-${joinMonth.toString().padStart(2, '0')}-${joinDay.toString().padStart(2, '0')}`;
  
  // Generate birth dates (ages 25-60 years old)
  const birthYear = 1970 + (index % 35);
  const birthMonth = ((index * 3) % 12) + 1;
  const birthDay = ((index * 7) % 28) + 1;
  const dateOfBirth = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
  
  // Generate consistent login credentials with company email format
  const baseEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
  const strongPassword = generateStrongPassword(employeeId);
  
  // Select profile picture based on index (cycles through available pictures)
  const profilePictureUrl = profilePictures[index % profilePictures.length];
  
  return {
    id: employeeId,
    name: fullName,
    email: baseEmail,
    phone: `+1-${Math.floor((index * 123) % 900) + 100}-${Math.floor((index * 456) % 900) + 100}-${Math.floor((index * 789) % 9000) + 1000}`,
    department,
    position: role,
    role,
    status,
    joinDate,
    profilePictureUrl, // Updated property name
    address: `${(index * 100) + 1} ${['Main St', 'Oak Ave', 'Pine Rd', 'Elm Dr', 'Cedar Ln'][index % 5]}, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][index % 5]}, ${['NY', 'CA', 'IL', 'TX', 'AZ'][index % 5]} ${10000 + (index * 123)}`,
    dateOfBirth,
    emergencyContact: {
      name: `${firstNames[(index + 10) % firstNames.length]} ${lastNames[(index + 5) % lastNames.length]}`,
      phone: `+1-${Math.floor((index * 321) % 900) + 100}-${Math.floor((index * 654) % 900) + 100}-${Math.floor((index * 987) % 9000) + 1000}`,
      relationship: ['Spouse', 'Parent', 'Sibling', 'Friend'][index % 4]
    },
    manager: managers[index % managers.length],
    baseSalary: 50000 + (index * 1000) + Math.floor((index * 17) % 50000),
    loginCredentials: {
      loginEmail: baseEmail,
      password: strongPassword,
      isActive: status === 'Active'
    },
    employmentHistory: [
      {
        title: role,
        department,
        startDate: joinDate,
        current: true
      }
    ],
    documents: []
  };
};
