
/**
 * 3D Animation Effects Components
 * Reusable 3D effect components for enhanced UI interactions
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  className,
  delay = 0 
}) => {
  return (
    <div 
      className={cn(
        "float transform-3d",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  speed?: 'slow' | 'fast';
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ 
  children, 
  className,
  speed = 'slow'
}) => {
  return (
    <div className={cn("perspective-2000", className)}>
      <div className={cn(
        "transform-3d",
        speed === 'slow' ? 'parallax-slow' : 'parallax-fast'
      )}>
        {children}
      </div>
    </div>
  );
};

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  variant = 'light'
}) => {
  return (
    <div className={cn(
      "rounded-xl backdrop-blur-xl border transform-3d hover-lift",
      variant === 'light' ? 'glass' : 'glass-dark',
      className
    )}>
      {children}
    </div>
  );
};

interface AnimatedIconProps {
  icon: React.ComponentType<any>;
  className?: string;
  animation?: 'bounce' | 'pulse' | 'wobble' | 'rotate';
  trigger?: 'hover' | 'always';
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  icon: IconComponent,
  className,
  animation = 'bounce',
  trigger = 'hover'
}) => {
  const animationClass = trigger === 'hover' 
    ? `group-hover:animate-${animation}` 
    : `animate-${animation}`;
    
  return (
    <IconComponent 
      className={cn(
        "transition-all duration-300",
        animationClass,
        className
      )} 
    />
  );
};

interface StaggeredGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  staggerDelay?: number;
}

export const StaggeredGrid: React.FC<StaggeredGridProps> = ({ 
  children, 
  className,
  columns = 3,
  staggerDelay = 0.1
}) => {
  const gridClass = `grid-cols-1 md:grid-cols-${Math.min(columns, 6)}`;
  
  return (
    <div className={cn("grid gap-6 perspective-1000", gridClass, className)}>
      {React.Children.map(children, (child, index) => (
        <div 
          key={index}
          className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}
          style={{ animationDelay: `${index * staggerDelay}s` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className,
  intensity = 'medium'
}) => {
  const tiltClass = intensity === 'light' ? 'hover-lift' : 
                   intensity === 'medium' ? 'hover-tilt' : 
                   'hover-tilt card-3d';
                   
  return (
    <div className={cn(
      "transform-3d transition-all duration-300 cursor-pointer",
      tiltClass,
      className
    )}>
      {children}
    </div>
  );
};
