
import React, { useState, forwardRef } from 'react';
import { Button, ButtonProps } from './button';

/**
 * RippleButton Component
 * Extends the standard Button component with an animated ripple effect
 * Creates a visual feedback when clicked by showing an expanding circle animation
 */
interface RippleButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, onClick, className, ...props }, ref) => {
    // State to manage active ripple animations
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    /**
     * Handle click event and create ripple effect
     * Calculates the click position relative to the button and creates a ripple
     */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      
      // Calculate ripple position relative to button
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Create new ripple with unique ID
      const newRipple = { x, y, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
      
      // Call original onClick handler if provided
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        className={`relative overflow-hidden ${className || ''}`}
        {...props}
      >
        {children}
        {/* Render active ripple animations */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              animation: 'ripple 0.6s linear',
            }}
          />
        ))}
      </Button>
    );
  }
);

RippleButton.displayName = 'RippleButton';

export default RippleButton;
