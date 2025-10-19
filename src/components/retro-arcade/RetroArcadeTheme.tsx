import React, { createContext, useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { RetroAccessibilityProvider } from './RetroAccessibility';

// === RETRO ARCADE THEME CONTEXT ===
// Production-level theme system with complete customization

interface RetroArcadeThemeContextType {
  theme: 'retro-arcade';
  colorScheme: 'dark' | 'light' | 'auto';
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  spacing: 'compact' | 'normal' | 'relaxed';
  animations: 'full' | 'reduced' | 'none';
  pixelDensity: 'low' | 'medium' | 'high';
  scanLines: boolean;
  glitchEffects: boolean;
  neonGlow: boolean;
  setColorScheme: (scheme: 'dark' | 'light' | 'auto') => void;
  setFontSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  setSpacing: (spacing: 'compact' | 'normal' | 'relaxed') => void;
  setAnimations: (animations: 'full' | 'reduced' | 'none') => void;
  setPixelDensity: (density: 'low' | 'medium' | 'high') => void;
  setScanLines: (enabled: boolean) => void;
  setGlitchEffects: (enabled: boolean) => void;
  setNeonGlow: (enabled: boolean) => void;
}

const RetroArcadeThemeContext = createContext<RetroArcadeThemeContextType | null>(null);

export const useRetroArcadeTheme = () => {
  const context = useContext(RetroArcadeThemeContext);
  if (!context) {
    throw new Error('useRetroArcadeTheme must be used within a RetroArcadeThemeProvider');
  }
  return context;
};

// === RETRO ARCADE THEME PROVIDER ===
export interface RetroArcadeThemeProviderProps {
  children: React.ReactNode;
  defaultColorScheme?: 'dark' | 'light' | 'auto';
  defaultFontSize?: 'sm' | 'md' | 'lg' | 'xl';
  defaultSpacing?: 'compact' | 'normal' | 'relaxed';
  defaultAnimations?: 'full' | 'reduced' | 'none';
  defaultPixelDensity?: 'low' | 'medium' | 'high';
  defaultScanLines?: boolean;
  defaultGlitchEffects?: boolean;
  defaultNeonGlow?: boolean;
}

export const RetroArcadeThemeProvider = ({
  children,
  defaultColorScheme = 'dark',
  defaultFontSize = 'md',
  defaultSpacing = 'normal',
  defaultAnimations = 'full',
  defaultPixelDensity = 'medium',
  defaultScanLines = true,
  defaultGlitchEffects = false,
  defaultNeonGlow = true,
}: RetroArcadeThemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [spacing, setSpacing] = useState(defaultSpacing);
  const [animations, setAnimations] = useState(defaultAnimations);
  const [pixelDensity, setPixelDensity] = useState(defaultPixelDensity);
  const [scanLines, setScanLines] = useState(defaultScanLines);
  const [glitchEffects, setGlitchEffects] = useState(defaultGlitchEffects);
  const [neonGlow, setNeonGlow] = useState(defaultNeonGlow);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Color scheme
    root.setAttribute('data-theme', 'retro-arcade');
    root.setAttribute('data-color-scheme', colorScheme);
    
    // Font size
    root.setAttribute('data-font-size', fontSize);
    
    // Spacing
    root.setAttribute('data-spacing', spacing);
    
    // Animations
    root.setAttribute('data-animations', animations);
    
    // Pixel density
    root.setAttribute('data-pixel-density', pixelDensity);
    
    // Effects
    root.setAttribute('data-scan-lines', scanLines.toString());
    root.setAttribute('data-glitch-effects', glitchEffects.toString());
    root.setAttribute('data-neon-glow', neonGlow.toString());
    
    // Apply CSS custom properties
    root.style.setProperty('--retro-color-scheme', colorScheme);
    root.style.setProperty('--retro-font-size', fontSize);
    root.style.setProperty('--retro-spacing', spacing);
    root.style.setProperty('--retro-animations', animations);
    root.style.setProperty('--retro-pixel-density', pixelDensity);
    root.style.setProperty('--retro-scan-lines', scanLines.toString());
    root.style.setProperty('--retro-glitch-effects', glitchEffects.toString());
    root.style.setProperty('--retro-neon-glow', neonGlow.toString());
  }, [colorScheme, fontSize, spacing, animations, pixelDensity, scanLines, glitchEffects, neonGlow]);

  const value = {
    theme: 'retro-arcade' as const,
    colorScheme,
    fontSize,
    spacing,
    animations,
    pixelDensity,
    scanLines,
    glitchEffects,
    neonGlow,
    setColorScheme,
    setFontSize,
    setSpacing,
    setAnimations,
    setPixelDensity,
    setScanLines,
    setGlitchEffects,
    setNeonGlow,
  };

  return (
    <RetroArcadeThemeContext.Provider value={value}>
      <RetroAccessibilityProvider>
        {children}
      </RetroAccessibilityProvider>
    </RetroArcadeThemeContext.Provider>
  );
};

// === RETRO ARCADE THEME COMPONENT ===
export interface RetroArcadeThemeProps {
  children: React.ReactNode;
  className?: string;
}

export const RetroArcadeTheme = ({ children, className }: RetroArcadeThemeProps) => {
  const {
    colorScheme,
    fontSize,
    spacing,
    animations,
    pixelDensity,
    scanLines,
    glitchEffects,
    neonGlow,
  } = useRetroArcadeTheme();

  const themeClasses = cn(
    'retro-arcade-theme',
    `retro-color-scheme-${colorScheme}`,
    `retro-font-size-${fontSize}`,
    `retro-spacing-${spacing}`,
    `retro-animations-${animations}`,
    `retro-pixel-density-${pixelDensity}`,
    scanLines && 'retro-scan-lines',
    glitchEffects && 'retro-glitch-effects',
    neonGlow && 'retro-neon-glow',
    className
  );

  return (
    <div className={themeClasses}>
      {children}
    </div>
  );
};

// === RETRO ARCADE THEME SWITCHER ===
export interface RetroArcadeThemeSwitcherProps {
  className?: string;
}

export const RetroArcadeThemeSwitcher = ({ className }: RetroArcadeThemeSwitcherProps) => {
  const {
    colorScheme,
    fontSize,
    spacing,
    animations,
    pixelDensity,
    scanLines,
    glitchEffects,
    neonGlow,
    setColorScheme,
    setFontSize,
    setSpacing,
    setAnimations,
    setPixelDensity,
    setScanLines,
    setGlitchEffects,
    setNeonGlow,
  } = useRetroArcadeTheme();

  return (
    <div className={cn('space-y-retro-4 p-retro-6 bg-retro-bg-secondary rounded-retro-lg border-2 border-retro-primary', className)}>
      <h3 className="font-retro-primary text-retro-lg text-retro-text-primary">Theme Settings</h3>
      
      {/* Color Scheme */}
      <div className="space-y-retro-2">
        <label className="block text-retro-sm font-retro-medium text-retro-text-primary">
          Color Scheme
        </label>
        <select
          value={colorScheme}
          onChange={(e) => setColorScheme(e.target.value as 'dark' | 'light' | 'auto')}
          className="w-full px-retro-3 py-retro-2 bg-retro-bg-secondary border-2 border-retro-border-neutral rounded-retro-lg text-retro-text-primary focus:outline-none focus:ring-2 focus:ring-retro-accent"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      {/* Font Size */}
      <div className="space-y-retro-2">
        <label className="block text-retro-sm font-retro-medium text-retro-text-primary">
          Font Size
        </label>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value as 'sm' | 'md' | 'lg' | 'xl')}
          className="w-full px-retro-3 py-retro-2 bg-retro-bg-secondary border-2 border-retro-border-neutral rounded-retro-lg text-retro-text-primary focus:outline-none focus:ring-2 focus:ring-retro-accent"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>

      {/* Spacing */}
      <div className="space-y-retro-2">
        <label className="block text-retro-sm font-retro-medium text-retro-text-primary">
          Spacing
        </label>
        <select
          value={spacing}
          onChange={(e) => setSpacing(e.target.value as 'compact' | 'normal' | 'relaxed')}
          className="w-full px-retro-3 py-retro-2 bg-retro-bg-secondary border-2 border-retro-border-neutral rounded-retro-lg text-retro-text-primary focus:outline-none focus:ring-2 focus:ring-retro-accent"
        >
          <option value="compact">Compact</option>
          <option value="normal">Normal</option>
          <option value="relaxed">Relaxed</option>
        </select>
      </div>

      {/* Animations */}
      <div className="space-y-retro-2">
        <label className="block text-retro-sm font-retro-medium text-retro-text-primary">
          Animations
        </label>
        <select
          value={animations}
          onChange={(e) => setAnimations(e.target.value as 'full' | 'reduced' | 'none')}
          className="w-full px-retro-3 py-retro-2 bg-retro-bg-secondary border-2 border-retro-border-neutral rounded-retro-lg text-retro-text-primary focus:outline-none focus:ring-2 focus:ring-retro-accent"
        >
          <option value="full">Full</option>
          <option value="reduced">Reduced</option>
          <option value="none">None</option>
        </select>
      </div>

      {/* Effects */}
      <div className="space-y-retro-3">
        <h4 className="text-retro-sm font-retro-medium text-retro-text-primary">Effects</h4>
        
        <label className="flex items-center space-x-retro-2">
          <input
            type="checkbox"
            checked={scanLines}
            onChange={(e) => setScanLines(e.target.checked)}
            className="w-4 h-4 text-retro-primary bg-retro-bg-secondary border-2 border-retro-border-neutral rounded focus:ring-retro-accent"
          />
          <span className="text-retro-sm text-retro-text-primary">Scan Lines</span>
        </label>

        <label className="flex items-center space-x-retro-2">
          <input
            type="checkbox"
            checked={glitchEffects}
            onChange={(e) => setGlitchEffects(e.target.checked)}
            className="w-4 h-4 text-retro-primary bg-retro-bg-secondary border-2 border-retro-border-neutral rounded focus:ring-retro-accent"
          />
          <span className="text-retro-sm text-retro-text-primary">Glitch Effects</span>
        </label>

        <label className="flex items-center space-x-retro-2">
          <input
            type="checkbox"
            checked={neonGlow}
            onChange={(e) => setNeonGlow(e.target.checked)}
            className="w-4 h-4 text-retro-primary bg-retro-bg-secondary border-2 border-retro-border-neutral rounded focus:ring-retro-accent"
          />
          <span className="text-retro-sm text-retro-text-primary">Neon Glow</span>
        </label>
      </div>
    </div>
  );
};

export { RetroArcadeThemeProvider, useRetroArcadeTheme };
