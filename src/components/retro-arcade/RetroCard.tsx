import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// === RETRO CARD COMPONENT ===
// Production-level implementation with all states and variants

const retroCardVariants = cva(
  // Base styles
  [
    'relative overflow-hidden',
    'bg-retro-bg-secondary',
    'border-2 border-retro-border-neutral',
    'rounded-retro-lg',
    'transition-all duration-retro-normal ease-retro-out',
    'retro-pixel-border',
    'hover:shadow-retro-glow',
    'focus-within:shadow-retro-glow',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-retro-bg-secondary',
          'border-retro-border-neutral',
          'hover:border-retro-border-light',
        ],
        primary: [
          'bg-retro-bg-secondary',
          'border-retro-primary',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
        secondary: [
          'bg-retro-bg-secondary',
          'border-retro-secondary',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
        accent: [
          'bg-retro-bg-secondary',
          'border-retro-accent',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
        elevated: [
          'bg-retro-bg-elevated',
          'border-retro-border-light',
          'shadow-retro-lg',
          'hover:shadow-retro-xl',
        ],
        glass: [
          'bg-retro-bg-secondary/80',
          'backdrop-blur-sm',
          'border-retro-border-light/50',
          'hover:bg-retro-bg-secondary/90',
        ],
        neon: [
          'bg-retro-bg-secondary',
          'border-retro-primary',
          'shadow-retro-neon',
          'hover:shadow-retro-neon',
        ],
      },
      size: {
        sm: [
          'p-retro-4',
          'rounded-retro-base',
        ],
        md: [
          'p-retro-6',
          'rounded-retro-lg',
        ],
        lg: [
          'p-retro-8',
          'rounded-retro-xl',
        ],
        xl: [
          'p-retro-10',
          'rounded-retro-2xl',
        ],
      },
      state: {
        default: '',
        hover: [
          'hover:transform hover:scale-105',
          'hover:shadow-retro-glow',
        ],
        active: [
          'transform scale-95',
          'shadow-retro-pixel-lg',
        ],
        selected: [
          'border-retro-primary',
          'shadow-retro-pixel',
          'bg-retro-bg-secondary',
        ],
        disabled: [
          'opacity-50',
          'cursor-not-allowed',
          'hover:transform-none',
        ],
        loading: [
          'opacity-75',
          'cursor-wait',
        ],
      },
      animation: {
        none: '',
        float: 'hover:animate-retro-float',
        bounce: 'hover:animate-retro-bounce',
        glow: 'hover:animate-retro-glow',
        pulse: 'hover:animate-retro-pulse',
        glitch: 'hover:animate-retro-glitch',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:transform hover:scale-105',
          'active:transform active:scale-95',
          'focus:outline-none focus:ring-2 focus:ring-retro-accent focus:ring-offset-2 focus:ring-offset-retro-bg-primary',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
      animation: 'float',
      interactive: false,
    },
  }
);

export interface RetroCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof retroCardVariants> {
  title?: string;
  subtitle?: string;
  description?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const RetroCard = forwardRef<HTMLDivElement, RetroCardProps>(
  (
    {
      className,
      variant,
      size,
      state,
      animation,
      interactive,
      title,
      subtitle,
      description,
      header,
      footer,
      loading = false,
      disabled = false,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const currentState = loading ? 'loading' : disabled ? 'disabled' : state || 'default';
    const isInteractive = interactive || !!onClick;

    return (
      <div
        className={cn(
          retroCardVariants({
            variant,
            size,
            state: currentState,
            animation,
            interactive: isInteractive,
            className,
          })
        )}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {/* Header */}
        {(header || title) && (
          <div className="mb-retro-4">
            {header || (
              <div className="space-y-retro-2">
                {title && (
                  <h3 className="font-retro-primary text-retro-lg text-retro-text-primary">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="font-retro-body text-retro-sm text-retro-text-secondary">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="space-y-retro-4">
          {description && (
            <p className="font-retro-body text-retro-base text-retro-text-secondary">
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-retro-4 pt-retro-4 border-t border-retro-border-neutral">
            {footer}
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-retro-bg-primary/50 flex items-center justify-center">
            <div className="retro-spinner" />
          </div>
        )}

        {/* Retro Arcade Effects */}
        <div className="absolute inset-0 retro-scan-lines pointer-events-none" />
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-retro-lg shadow-retro-glow opacity-0 hover:opacity-100 transition-opacity duration-retro-normal pointer-events-none" />
      </div>
    );
  }
);

RetroCard.displayName = 'RetroCard';

export { RetroCard, retroCardVariants };
