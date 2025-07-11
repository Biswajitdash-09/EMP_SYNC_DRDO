
/**
 * Password Generator Utility
 * Generates strong, unique passwords for employees
 */

/**
 * Generate a strong, unique password based on employee ID
 */
export const generateStrongPassword = (employeeId: string): string => {
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  
  // Create a unique seed based on employee ID
  const seed = employeeId.replace('EMP', '');
  const numSeed = parseInt(seed) || 1;
  
  // Generate password components based on seed for consistency
  const upper = upperCase.charAt((numSeed * 7) % upperCase.length);
  const lower = lowerCase.charAt((numSeed * 11) % lowerCase.length);
  const num1 = numbers.charAt((numSeed * 13) % numbers.length);
  const num2 = numbers.charAt((numSeed * 17) % numbers.length);
  const special = specialChars.charAt((numSeed * 19) % specialChars.length);
  
  // Create a memorable but strong password
  const words = ['Secure', 'Strong', 'Power', 'Force', 'Prime', 'Elite', 'Max', 'Pro'];
  const word = words[(numSeed * 23) % words.length];
  
  return `${word}${upper}${lower}${num1}${num2}${special}${seed}`;
};
