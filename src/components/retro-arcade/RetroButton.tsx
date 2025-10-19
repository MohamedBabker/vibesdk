import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// === RETRO BUTTON COMPONENT ===
// Production-level implementation with all states and variants

const retroButtonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center',
    'font-retro-primary text-retro-text-primary',
    'border-2 border-retro-primary',
    'transition-all duration-retro-normal ease-retro-bounce',
    'focus:outline-none focus:ring-2 focus:ring-retro-accent focus:ring-offset-2 focus:ring-offset-retro-bg-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative overflow-hidden',
    'retro-pixel-border',
    'hover:shadow-retro-glow',
    'active:transform active:scale-95',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-retro-primary text-retro-text-inverse',
          'hover:bg-retro-primary-hover',
          'active:bg-retro-primary-active',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
        secondary: [
          'bg-retro-secondary text-retro-text-primary',
          'hover:bg-retro-secondary-hover',
          'active:bg-retro-secondary-active',
          'border-retro-secondary',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
        accent: [
          'bg-retro-accent text-retro-text-inverse',
          'hover:bg-retro-accent-hover',
          'active:bg-retro-accent-active',
          'border-retro-accent',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
        outline: [
          'bg-transparent text-retro-primary',
          'hover:bg-retro-primary hover:text-retro-text-inverse',
          'active:bg-retro-primary-active',
          'border-retro-primary',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
        ghost: [
          'bg-transparent text-retro-text-primary',
          'hover:bg-retro-bg-secondary',
          'active:bg-retro-bg-tertiary',
          'border-transparent',
          'hover:border-retro-primary',
        ],
        destructive: [
          'bg-retro-warning text-retro-text-inverse',
          'hover:bg-retro-warning-hover',
          'active:bg-retro-warning-active',
          'border-retro-warning',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
        success: [
          'bg-retro-success text-retro-text-inverse',
          'hover:bg-retro-success-hover',
          'active:bg-retro-success-active',
          'border-retro-success',
          'shadow-retro-pixel',
          'hover:shadow-retro-pixel-lg',
        ],
      },
      size: {
        sm: [
          'h-retro-button-sm px-retro-4 py-retro-2',
          'text-retro-sm font-retro-normal',
          'rounded-retro-base',
        ],
        md: [
          'h-retro-button-md px-retro-6 py-retro-3',
          'text-retro-base font-retro-medium',
          'rounded-retro-lg',
        ],
        lg: [
          'h-retro-button-lg px-retro-8 py-retro-4',
          'text-retro-lg font-retro-semibold',
          'rounded-retro-xl',
        ],
        xl: [
          'h-16 px-retro-10 py-retro-5',
          'text-retro-xl font-retro-bold',
          'rounded-retro-2xl',
        ],
        icon: [
          'h-retro-button-md w-retro-button-md',
          'p-0',
          'rounded-retro-base',
        ],
      },
      state: {
        default: '',
        loading: [
          'cursor-wait',
          'opacity-75',
        ],
        disabled: [
          'cursor-not-allowed',
          'opacity-50',
        ],
        error: [
          'border-retro-warning',
          'shadow-retro-pixel',
          'animate-retro-pulse',
        ],
        success: [
          'border-retro-success',
          'shadow-retro-pixel',
          'animate-retro-bounce',
        ],
      },
      animation: {
        none: '',
        bounce: 'hover:animate-retro-bounce',
        pulse: 'hover:animate-retro-pulse',
        glow: 'hover:animate-retro-glow',
        glitch: 'hover:animate-retro-glitch',
        float: 'hover:animate-retro-float',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      state: 'default',
      animation: 'bounce',
    },
  }
);

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
  children: React.ReactNode;
}

const RetroButton = forwardRef<HTMLButtonElement, RetroButtonProps>(
  (
    {
      className,
      variant,
      size,
      state,
      animation,
      loading = false,
      leftIcon,
      rightIcon,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const currentState = loading ? 'loading' : state || 'default';

    return (
      <button
        className={cn(
          retroButtonVariants({
            variant,
            size,
            state: currentState,
            animation,
            className,
          })
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="retro-spinner" />
          </div>
        )}

        {/* Content */}
        <div className={cn('flex items-center gap-retro-2', loading && 'opacity-0')}>
          {leftIcon && !loading && (
            <span className="flex-shrink-0">{leftIcon}</span>
          )}
          
          <span>
            {loading && loadingText ? loadingText : children}
          </span>
          
          {rightIcon && !loading && (
            <span className="flex-shrink-0">{rightIcon}</span>
          )}
        </div>

        {/* Retro Arcade Effects */}
        <div className="absolute inset-0 retro-scan-lines pointer-events-none" />
      </button>
    );
  }
);

RetroButton.displayName = 'RetroButton';

export { RetroButton, retroButtonVariants };
