import React, { forwardRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, type VariantProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// === RETRO MOTION COMPONENT ===
// Production-level motion choreography with exact easings and durations

const retroMotionVariants = {
  // === ENTRANCE ANIMATIONS ===
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1], // retro-ease-out
    },
  },
  
  slideInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // retro-ease-out
    },
  },
  
  slideInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // retro-ease-out
    },
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // retro-ease-out
    },
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // retro-ease-out
    },
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
      duration: 0.2,
      ease: [0.68, -0.55, 0.265, 1.55], // retro-ease-bounce
    },
  },
  
  // === RETRO ARCADE SPECIFIC ANIMATIONS ===
  pixelBounce: {
    initial: { opacity: 0, scale: 0.5, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.5, y: -20 },
    transition: {
      duration: 0.4,
      ease: [0.68, -0.55, 0.265, 1.55], // retro-ease-bounce
    },
  },
  
  glitch: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      x: [0, -2, 2, -1, 1, 0],
      y: [0, 2, -2, 1, -1, 0],
    },
    exit: { opacity: 0 },
    transition: {
      duration: 0.3,
      ease: 'linear',
    },
  },
  
  neonGlow: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      boxShadow: [
        '0 0 0px #00A8CC',
        '0 0 10px #00A8CC',
        '0 0 20px #00A8CC',
        '0 0 10px #00A8CC',
        '0 0 0px #00A8CC',
      ],
    },
    exit: { opacity: 0, scale: 0.9 },
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1], // retro-ease-out
    },
  },
  
  scanLine: {
    initial: { opacity: 0, y: -100 },
    animate: { 
      opacity: 1, 
      y: 0,
      background: [
        'linear-gradient(90deg, transparent 0%, #00A8CC 50%, transparent 100%)',
        'linear-gradient(90deg, transparent 0%, #00A8CC 50%, transparent 100%)',
      ],
    },
    exit: { opacity: 0, y: 100 },
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1], // retro-ease-out
    },
  },
  
  // === HOVER ANIMATIONS ===
  hoverFloat: {
    whileHover: { 
      y: -5,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1], // retro-ease-out
      },
    },
  },
  
  hoverGlow: {
    whileHover: { 
      boxShadow: '0 0 20px #00A8CC',
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1], // retro-ease-out
      },
    },
  },
  
  hoverScale: {
    whileHover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1], // retro-ease-out
      },
    },
  },
  
  hoverPixel: {
    whileHover: { 
      x: [0, -1, 1, 0],
      y: [0, 1, -1, 0],
      transition: {
        duration: 0.1,
        ease: 'linear',
      },
    },
  },
  
  // === LOADING ANIMATIONS ===
  spin: {
    animate: { 
      rotate: 360,
      transition: {
        duration: 1,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  },
  
  pulse: {
    animate: { 
      scale: [1, 1.1, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        ease: [0.4, 0, 0.6, 1], // retro-ease-in-out
        repeat: Infinity,
      },
    },
  },
  
  bounce: {
    animate: { 
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55], // retro-ease-bounce
        repeat: Infinity,
      },
    },
  },
  
  // === STAGGER ANIMATIONS ===
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1], // retro-ease-out
      },
    },
  },
};

export interface RetroMotionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof retroMotionVariants> {
  animation?: keyof typeof retroMotionVariants;
  delay?: number;
  duration?: number;
  repeat?: number | 'infinite';
  children: React.ReactNode;
}

const RetroMotion = forwardRef<HTMLDivElement, RetroMotionProps>(
  (
    {
      className,
      animation = 'fadeIn',
      delay = 0,
      duration,
      repeat,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [delay]);

    const animationConfig = retroMotionVariants[animation];
    
    // Override duration if provided
    const finalConfig = duration ? {
      ...animationConfig,
      transition: {
        ...animationConfig.transition,
        duration,
      },
    } : animationConfig;

    return (
      <motion.div
        className={cn('', className)}
        ref={ref}
        initial={finalConfig.initial}
        animate={isVisible ? finalConfig.animate : finalConfig.initial}
        exit={finalConfig.exit}
        transition={finalConfig.transition}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

RetroMotion.displayName = 'RetroMotion';

// === RETRO MOTION CONTAINER ===
export interface RetroMotionContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}

const RetroMotionContainer = ({ 
  children, 
  className, 
  stagger = false 
}: RetroMotionContainerProps) => {
  return (
    <motion.div
      className={cn('', className)}
      initial="initial"
      animate="animate"
      variants={stagger ? retroMotionVariants.stagger : undefined}
    >
      {children}
    </motion.div>
  );
};

// === RETRO MOTION ITEM ===
export interface RetroMotionItemProps {
  children: React.ReactNode;
  className?: string;
}

const RetroMotionItem = ({ children, className }: RetroMotionItemProps) => {
  return (
    <motion.div
      className={cn('', className)}
      variants={retroMotionVariants.staggerItem}
    >
      {children}
    </motion.div>
  );
};

// === RETRO MOTION PRESENCE ===
export interface RetroMotionPresenceProps {
  children: React.ReactNode;
  className?: string;
}

const RetroMotionPresence = ({ children, className }: RetroMotionPresenceProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn('', className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { 
  RetroMotion, 
  RetroMotionContainer, 
  RetroMotionItem, 
  RetroMotionPresence,
  retroMotionVariants 
};
