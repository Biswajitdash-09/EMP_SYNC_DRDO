
/**
 * Animated Background Component
 * Creates floating shapes and gradient animations
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className,
  variant = 'light'
}) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Animated Gradient Background */}
      <div className={cn(
        "absolute inset-0 opacity-30",
        variant === 'light' 
          ? "bg-gradient-to-br from-sky-200 via-violet-200 to-cyan-200 dark:from-midnight-blue dark:via-indigo-900 dark:to-purple-900"
          : "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
      )} 
      style={{
        animation: 'gradient-shift 8s ease-in-out infinite',
        backgroundSize: '400% 400%'
      }} />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full opacity-20 blur-sm",
              variant === 'light' 
                ? "bg-gradient-to-r from-blue-300 to-violet-300 dark:from-blue-600 dark:to-violet-600"
                : "bg-gradient-to-r from-blue-500 to-violet-500"
            )}
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animation: `float-shape ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
