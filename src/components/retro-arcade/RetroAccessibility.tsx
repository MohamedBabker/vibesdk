import React, { createContext, useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// === RETRO ACCESSIBILITY CONTEXT ===
// Production-level accessibility without compromising aesthetics

interface RetroAccessibilityContextType {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusVisible: boolean;
  setReducedMotion: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
  setScreenReader: (value: boolean) => void;
  setKeyboardNavigation: (value: boolean) => void;
  setFocusVisible: (value: boolean) => void;
}

const RetroAccessibilityContext = createContext<RetroAccessibilityContextType | null>(null);

export const useRetroAccessibility = () => {
  const context = useContext(RetroAccessibilityContext);
  if (!context) {
    throw new Error('useRetroAccessibility must be used within a RetroAccessibilityProvider');
  }
  return context;
};

// === RETRO ACCESSIBILITY PROVIDER ===
export interface RetroAccessibilityProviderProps {
  children: React.ReactNode;
}

export const RetroAccessibilityProvider = ({ children }: RetroAccessibilityProviderProps) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    // Detect user preferences
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mediaQueryHighContrast = window.matchMedia('(prefers-contrast: high)');
    const mediaQueryLargeText = window.matchMedia('(prefers-reduced-data: no-preference)');
    
    setReducedMotion(mediaQueryReducedMotion.matches);
    setHighContrast(mediaQueryHighContrast.matches);
    setLargeText(mediaQueryLargeText.matches);

    // Listen for changes
    const handleReducedMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const handleHighContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches);
    const handleLargeTextChange = (e: MediaQueryListEvent) => setLargeText(e.matches);

    mediaQueryReducedMotion.addEventListener('change', handleReducedMotionChange);
    mediaQueryHighContrast.addEventListener('change', handleHighContrastChange);
    mediaQueryLargeText.addEventListener('change', handleLargeTextChange);

    // Detect screen reader
    const detectScreenReader = () => {
      const hasScreenReader = 
        window.speechSynthesis ||
        'speechSynthesis' in window ||
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver');
      setScreenReader(hasScreenReader);
    };

    detectScreenReader();

    // Keyboard navigation detection
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setKeyboardNavigation(true);
        setFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setKeyboardNavigation(false);
      setFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      mediaQueryReducedMotion.removeEventListener('change', handleReducedMotionChange);
      mediaQueryHighContrast.removeEventListener('change', handleHighContrastChange);
      mediaQueryLargeText.removeEventListener('change', handleLargeTextChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const value = {
    reducedMotion,
    highContrast,
    largeText,
    screenReader,
    keyboardNavigation,
    focusVisible,
    setReducedMotion,
    setHighContrast,
    setLargeText,
    setScreenReader,
    setKeyboardNavigation,
    setFocusVisible,
  };

  return (
    <RetroAccessibilityContext.Provider value={value}>
      {children}
    </RetroAccessibilityContext.Provider>
  );
};

// === RETRO ACCESSIBILITY HOOK ===
export const useRetroAccessibilityClasses = () => {
  const {
    reducedMotion,
    highContrast,
    largeText,
    screenReader,
    keyboardNavigation,
    focusVisible,
  } = useRetroAccessibility();

  return {
    // Motion classes
    motion: cn(
      !reducedMotion && 'transition-all duration-retro-normal',
      reducedMotion && 'transition-none'
    ),
    
    // Animation classes
    animation: cn(
      !reducedMotion && 'animate-retro-bounce',
      reducedMotion && 'animate-none'
    ),
    
    // High contrast classes
    contrast: cn(
      highContrast && 'border-2 border-retro-primary',
      !highContrast && 'border-retro-border-neutral'
    ),
    
    // Large text classes
    text: cn(
      largeText && 'text-retro-lg',
      !largeText && 'text-retro-base'
    ),
    
    // Screen reader classes
    sr: cn(
      screenReader && 'sr-only',
      !screenReader && 'not-sr-only'
    ),
    
    // Focus classes
    focus: cn(
      focusVisible && 'focus:ring-2 focus:ring-retro-accent focus:ring-offset-2',
      !focusVisible && 'focus:outline-none'
    ),
    
    // Keyboard navigation classes
    keyboard: cn(
      keyboardNavigation && 'focus:outline-none focus:ring-2 focus:ring-retro-accent',
      !keyboardNavigation && 'focus:outline-none'
    ),
  };
};

// === RETRO ACCESSIBILITY COMPONENT ===
export interface RetroAccessibilityProps {
  children: React.ReactNode;
  className?: string;
  role?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaHidden?: boolean;
  tabIndex?: number;
}

export const RetroAccessibility = ({
  children,
  className,
  role,
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaHidden,
  tabIndex,
  ...props
}: RetroAccessibilityProps) => {
  const accessibilityClasses = useRetroAccessibilityClasses();

  return (
    <div
      className={cn(
        accessibilityClasses.motion,
        accessibilityClasses.contrast,
        accessibilityClasses.focus,
        accessibilityClasses.keyboard,
        className
      )}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-hidden={ariaHidden}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </div>
  );
};

// === RETRO SCREEN READER TEXT ===
export interface RetroScreenReaderTextProps {
  children: React.ReactNode;
  className?: string;
}

export const RetroScreenReaderText = ({ 
  children, 
  className 
}: RetroScreenReaderTextProps) => {
  return (
    <span className={cn('sr-only', className)}>
      {children}
    </span>
  );
};

// === RETRO FOCUS TRAP ===
export interface RetroFocusTrapProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export const RetroFocusTrap = ({ 
  children, 
  className, 
  active = true 
}: RetroFocusTrapProps) => {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};

// === RETRO ARIA LIVE REGION ===
export interface RetroAriaLiveProps {
  children: React.ReactNode;
  className?: string;
  politeness?: 'polite' | 'assertive' | 'off';
}

export const RetroAriaLive = ({ 
  children, 
  className, 
  politeness = 'polite' 
}: RetroAriaLiveProps) => {
  return (
    <div
      className={cn('sr-only', className)}
      aria-live={politeness}
      aria-atomic="true"
    >
      {children}
    </div>
  );
};

// === RETRO SKIP LINKS ===
export interface RetroSkipLinksProps {
  links: Array<{
    href: string;
    text: string;
  }>;
  className?: string;
}

export const RetroSkipLinks = ({ links, className }: RetroSkipLinksProps) => {
  return (
    <div className={cn('sr-only focus-within:not-sr-only', className)}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="block p-retro-2 bg-retro-primary text-retro-text-inverse focus:outline-none focus:ring-2 focus:ring-retro-accent"
        >
          {link.text}
        </a>
      ))}
    </div>
  );
};

export { RetroAccessibilityProvider, useRetroAccessibility };
