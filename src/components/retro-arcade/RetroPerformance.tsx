import React, { memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// === RETRO PERFORMANCE OPTIMIZATION ===
// Production-level performance without compromising aesthetics

// === RETRO VIRTUAL SCROLLING ===
export interface RetroVirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

export const RetroVirtualScroll = memo(({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  overscan = 5,
}: RetroVirtualScrollProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );
    return { start: Math.max(0, start - overscan), end };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={visibleRange.start + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

RetroVirtualScroll.displayName = 'RetroVirtualScroll';

// === RETRO LAZY LOADING ===
export interface RetroLazyLoadProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export const RetroLazyLoad = memo(({
  children,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  fallback,
}: RetroLazyLoadProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={elementRef} className={cn('', className)}>
      {isLoaded ? children : fallback}
    </div>
  );
});

RetroLazyLoad.displayName = 'RetroLazyLoad';

// === RETRO MEMOIZED COMPONENT ===
export interface RetroMemoProps {
  children: React.ReactNode;
  className?: string;
  dependencies?: any[];
}

export const RetroMemo = memo(({
  children,
  className,
  dependencies = [],
}: RetroMemoProps) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for dependencies
  if (prevProps.dependencies && nextProps.dependencies) {
    return prevProps.dependencies.every((dep, index) => 
      dep === nextProps.dependencies[index]
    );
  }
  return false;
});

RetroMemo.displayName = 'RetroMemo';

// === RETRO DEBOUNCED INPUT ===
export interface RetroDebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const RetroDebouncedInput = memo(({
  value,
  onChange,
  delay = 300,
  className,
  placeholder,
  disabled,
}: RetroDebouncedInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(localValue);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [localValue, onChange, delay]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  return (
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        'w-full px-retro-3 py-retro-2',
        'bg-retro-bg-secondary border-2 border-retro-border-neutral',
        'rounded-retro-lg text-retro-text-primary',
        'focus:outline-none focus:ring-2 focus:ring-retro-accent',
        'transition-all duration-retro-normal',
        className
      )}
    />
  );
});

RetroDebouncedInput.displayName = 'RetroDebouncedInput';

// === RETRO THROTTLED SCROLL ===
export interface RetroThrottledScrollProps {
  children: React.ReactNode;
  className?: string;
  onScroll?: (scrollTop: number) => void;
  throttle?: number;
}

export const RetroThrottledScroll = memo(({
  children,
  className,
  onScroll,
  throttle = 16, // ~60fps
}: RetroThrottledScrollProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const lastScrollTime = useRef(0);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current >= throttle) {
      const newScrollTop = e.currentTarget.scrollTop;
      setScrollTop(newScrollTop);
      onScroll?.(newScrollTop);
      lastScrollTime.current = now;
    }
  }, [onScroll, throttle]);

  return (
    <div
      className={cn('overflow-auto', className)}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
});

RetroThrottledScroll.displayName = 'RetroThrottledScroll';

// === RETRO PERFORMANCE MONITOR ===
export interface RetroPerformanceMonitorProps {
  children: React.ReactNode;
  className?: string;
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void;
}

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  frameRate: number;
}

export const RetroPerformanceMonitor = memo(({
  children,
  className,
  onPerformanceUpdate,
}: RetroPerformanceMonitorProps) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    frameRate: 0,
  });

  useEffect(() => {
    const startTime = performance.now();
    
    const measurePerformance = () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Memory usage (if available)
      const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;
      
      // Frame rate calculation
      let frameRate = 0;
      const measureFrameRate = () => {
        let frames = 0;
        const start = performance.now();
        
        const countFrames = () => {
          frames++;
          if (performance.now() - start < 1000) {
            requestAnimationFrame(countFrames);
          } else {
            frameRate = frames;
            setMetrics({ renderTime, memoryUsage, frameRate });
            onPerformanceUpdate?.({ renderTime, memoryUsage, frameRate });
          }
        };
        
        requestAnimationFrame(countFrames);
      };
      
      measureFrameRate();
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(measurePerformance);
    } else {
      setTimeout(measurePerformance, 0);
    }
  }, [onPerformanceUpdate]);

  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
});

RetroPerformanceMonitor.displayName = 'RetroPerformanceMonitor';

// === RETRO IMAGE OPTIMIZATION ===
export interface RetroOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  lazy?: boolean;
  placeholder?: string;
}

export const RetroOptimizedImage = memo(({
  src,
  alt,
  className,
  width,
  height,
  quality = 80,
  lazy = true,
  placeholder,
}: RetroOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Generate optimized src with quality parameter
  const optimizedSrc = useMemo(() => {
    if (src.includes('?')) {
      return `${src}&q=${quality}`;
    }
    return `${src}?q=${quality}`;
  }, [src, quality]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {placeholder && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-retro-bg-secondary animate-pulse" />
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-retro-normal',
          isLoaded ? 'opacity-100' : 'opacity-0',
          hasError && 'opacity-50'
        )}
        style={{
          willChange: 'transform, opacity',
          transform: 'translateZ(0)', // GPU acceleration
        }}
      />
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-retro-bg-secondary text-retro-text-tertiary">
          <span className="text-retro-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
});

RetroOptimizedImage.displayName = 'RetroOptimizedImage';

// === RETRO BUNDLE SPLITTING ===
export const RetroBundleSplitter = {
  // Lazy load components
  lazy: (importFn: () => Promise<any>) => {
    return React.lazy(importFn);
  },
  
  // Preload components
  preload: (importFn: () => Promise<any>) => {
    return importFn();
  },
  
  // Critical components
  critical: (Component: React.ComponentType<any>) => {
    return Component;
  },
};

export { RetroVirtualScroll, RetroLazyLoad, RetroMemo, RetroDebouncedInput, RetroThrottledScroll, RetroPerformanceMonitor, RetroOptimizedImage };
