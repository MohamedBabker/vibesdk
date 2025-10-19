import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

// === RETRO INPUT COMPONENT ===
// Production-level implementation with all states and variants

const retroInputVariants = cva(
  // Base styles
  [
    'flex w-full h-retro-input',
    'px-retro-3 py-retro-2',
    'font-retro-body text-retro-text-primary',
    'bg-retro-bg-secondary',
    'border-2 border-retro-border-neutral',
    'rounded-retro-lg',
    'transition-all duration-retro-normal ease-retro-out',
    'focus:outline-none focus:ring-2 focus:ring-retro-accent focus:ring-offset-2 focus:ring-offset-retro-bg-primary',
    'focus:border-retro-accent',
    'placeholder:text-retro-text-tertiary',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative',
    'retro-pixel-border',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-retro-bg-secondary',
          'border-retro-border-neutral',
          'focus:border-retro-accent',
          'hover:border-retro-border-light',
        ],
        primary: [
          'bg-retro-bg-secondary',
          'border-retro-primary',
          'focus:border-retro-primary',
          'shadow-retro-pixel',
        ],
        secondary: [
          'bg-retro-bg-secondary',
          'border-retro-secondary',
          'focus:border-retro-secondary',
          'shadow-retro-pixel',
        ],
        accent: [
          'bg-retro-bg-secondary',
          'border-retro-accent',
          'focus:border-retro-accent',
          'shadow-retro-pixel',
        ],
      },
      size: {
        sm: [
          'h-8 px-retro-2 py-retro-1',
          'text-retro-sm',
          'rounded-retro-base',
        ],
        md: [
          'h-retro-input px-retro-3 py-retro-2',
          'text-retro-base',
          'rounded-retro-lg',
        ],
        lg: [
          'h-12 px-retro-4 py-retro-3',
          'text-retro-lg',
          'rounded-retro-xl',
        ],
      },
      state: {
        default: '',
        error: [
          'border-retro-warning',
          'focus:border-retro-warning',
          'focus:ring-retro-warning',
          'animate-retro-pulse',
        ],
        success: [
          'border-retro-success',
          'focus:border-retro-success',
          'focus:ring-retro-success',
        ],
        warning: [
          'border-yellow-500',
          'focus:border-yellow-500',
          'focus:ring-yellow-500',
        ],
        disabled: [
          'opacity-50',
          'cursor-not-allowed',
          'bg-retro-bg-tertiary',
        ],
      },
      animation: {
        none: '',
        glow: 'focus:shadow-retro-glow',
        pixel: 'focus:shadow-retro-pixel-lg',
        neon: 'focus:shadow-retro-neon',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
      animation: 'glow',
    },
  }
);

export interface RetroInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof retroInputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  isPassword?: boolean;
  loading?: boolean;
}

const RetroInput = forwardRef<HTMLInputElement, RetroInputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      animation,
      label,
      helperText,
      errorMessage,
      successMessage,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      isPassword = false,
      loading = false,
      type,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const inputType = isPassword && showPassword ? 'text' : type || (isPassword ? 'password' : 'text');
    
    const currentState = errorMessage ? 'error' : successMessage ? 'success' : state || 'default';
    
    const getStatusIcon = () => {
      if (loading) return <div className="retro-spinner w-4 h-4" />;
      if (errorMessage) return <AlertCircle className="w-4 h-4 text-retro-warning" />;
      if (successMessage) return <CheckCircle className="w-4 h-4 text-retro-success" />;
      return null;
    };

    return (
      <div className="w-full space-y-retro-2">
        {/* Label */}
        {label && (
          <label className="block text-retro-sm font-retro-medium text-retro-text-primary">
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-retro-3 top-1/2 transform -translate-y-1/2 text-retro-text-tertiary">
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            className={cn(
              retroInputVariants({
                variant,
                size,
                state: currentState,
                animation,
                className,
              }),
              leftIcon && 'pl-retro-10',
              (rightIcon || showPasswordToggle || getStatusIcon()) && 'pr-retro-10'
            )}
            type={inputType}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* Right Icons */}
          <div className="absolute right-retro-3 top-1/2 transform -translate-y-1/2 flex items-center gap-retro-2">
            {/* Password Toggle */}
            {showPasswordToggle && isPassword && (
              <button
                type="button"
                className="text-retro-text-tertiary hover:text-retro-text-primary transition-colors duration-retro-normal"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Custom Right Icon */}
            {rightIcon && !showPasswordToggle && !getStatusIcon() && (
              <span className="text-retro-text-tertiary">{rightIcon}</span>
            )}

            {/* Status Icon */}
            {getStatusIcon()}
          </div>

          {/* Retro Arcade Effects */}
          <div className="absolute inset-0 retro-scan-lines pointer-events-none" />
          
          {/* Focus Glow Effect */}
          {isFocused && (
            <div className="absolute inset-0 rounded-retro-lg shadow-retro-glow pointer-events-none" />
          )}
        </div>

        {/* Helper Text / Error Message */}
        {(helperText || errorMessage || successMessage) && (
          <div className="text-retro-sm">
            {errorMessage && (
              <p className="text-retro-warning flex items-center gap-retro-1">
                <AlertCircle className="w-3 h-3" />
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-retro-success flex items-center gap-retro-1">
                <CheckCircle className="w-3 h-3" />
                {successMessage}
              </p>
            )}
            {helperText && !errorMessage && !successMessage && (
              <p className="text-retro-text-tertiary">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

RetroInput.displayName = 'RetroInput';

export { RetroInput, retroInputVariants };
