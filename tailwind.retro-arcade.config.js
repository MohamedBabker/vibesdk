/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // === RETRO ARCADE COLOR SYSTEM ===
      colors: {
        // Primary Colors
        'retro-primary': {
          DEFAULT: '#FF6B35',
          hover: '#E55A2B',
          active: '#CC4A1F',
          light: '#FF8A5B',
          dark: '#B8471F',
        },
        // Secondary Colors
        'retro-secondary': {
          DEFAULT: '#004E89',
          hover: '#003D6B',
          active: '#002C4D',
          light: '#1A6BA3',
          dark: '#003A5C',
        },
        // Accent Colors
        'retro-accent': {
          DEFAULT: '#00A8CC',
          hover: '#0091B3',
          active: '#007A9A',
          light: '#33B8D6',
          dark: '#0086A3',
        },
        // Neutral Colors
        'retro-dark': {
          DEFAULT: '#1A1A1A',
          hover: '#2A2A2A',
          active: '#0A0A0A',
        },
        'retro-light': {
          DEFAULT: '#FFFFFF',
          hover: '#F5F5F5',
          active: '#E5E5E5',
        },
        // Semantic Colors
        'retro-success': '#00FF00',
        'retro-warning': '#FF0000',
        'retro-info': '#00A8CC',
        'retro-error': '#FF0000',
        // Background Colors
        'retro-bg': {
          primary: '#1A1A1A',
          secondary: '#2A2A2A',
          tertiary: '#3A3A3A',
          elevated: '#4A4A4A',
        },
        // Text Colors
        'retro-text': {
          primary: '#FFFFFF',
          secondary: '#CCCCCC',
          tertiary: '#999999',
          disabled: '#666666',
          inverse: '#1A1A1A',
        },
        // Border Colors
        'retro-border': {
          primary: '#FF6B35',
          secondary: '#004E89',
          accent: '#00A8CC',
          neutral: '#666666',
          light: '#CCCCCC',
        },
      },

      // === RETRO ARCADE TYPOGRAPHY ===
      fontFamily: {
        'retro-primary': ['Press Start 2P', 'monospace'],
        'retro-secondary': ['Orbitron', 'sans-serif'],
        'retro-body': ['Roboto Mono', 'monospace'],
        'retro-display': ['Press Start 2P', 'monospace'],
      },

      fontSize: {
        'retro-xs': ['0.75rem', { lineHeight: '1.25' }],
        'retro-sm': ['0.875rem', { lineHeight: '1.375' }],
        'retro-base': ['1rem', { lineHeight: '1.5' }],
        'retro-lg': ['1.125rem', { lineHeight: '1.625' }],
        'retro-xl': ['1.25rem', { lineHeight: '1.5' }],
        'retro-2xl': ['1.5rem', { lineHeight: '1.25' }],
        'retro-3xl': ['1.875rem', { lineHeight: '1.25' }],
        'retro-4xl': ['2.25rem', { lineHeight: '1.25' }],
        'retro-5xl': ['3rem', { lineHeight: '1.25' }],
        'retro-6xl': ['3.75rem', { lineHeight: '1.25' }],
      },

      fontWeight: {
        'retro-normal': '400',
        'retro-medium': '500',
        'retro-semibold': '600',
        'retro-bold': '700',
      },

      letterSpacing: {
        'retro-tighter': '-0.05em',
        'retro-tight': '-0.025em',
        'retro-normal': '0em',
        'retro-wide': '0.025em',
        'retro-wider': '0.05em',
      },

      // === RETRO ARCADE SPACING ===
      spacing: {
        'retro-0': '0',
        'retro-1': '0.25rem',   // 4px
        'retro-2': '0.5rem',    // 8px
        'retro-3': '0.75rem',    // 12px
        'retro-4': '1rem',      // 16px
        'retro-5': '1.25rem',    // 20px
        'retro-6': '1.5rem',     // 24px
        'retro-8': '2rem',       // 32px
        'retro-10': '2.5rem',    // 40px
        'retro-12': '3rem',      // 48px
        'retro-16': '4rem',      // 64px
        'retro-20': '5rem',      // 80px
        'retro-24': '6rem',      // 96px
        'retro-32': '8rem',      // 128px
      },

      // === RETRO ARCADE BORDER RADIUS ===
      borderRadius: {
        'retro-none': '0',
        'retro-sm': '0.125rem',  // 2px
        'retro-base': '0.25rem', // 4px
        'retro-md': '0.375rem',  // 6px
        'retro-lg': '0.5rem',    // 8px
        'retro-xl': '0.75rem',   // 12px
        'retro-2xl': '1rem',     // 16px
        'retro-full': '9999px',
      },

      // === RETRO ARCADE SHADOWS ===
      boxShadow: {
        'retro-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'retro-base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'retro-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'retro-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'retro-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'retro-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        // Retro-specific shadows
        'retro-pixel': '2px 2px 0px #FF6B35',
        'retro-pixel-lg': '4px 4px 0px #FF6B35',
        'retro-glow': '0 0 10px #00A8CC',
        'retro-neon': '0 0 20px #FF6B35, 0 0 40px #FF6B35',
      },

      // === RETRO ARCADE ANIMATIONS ===
      animation: {
        'retro-bounce': 'retro-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'retro-pulse': 'retro-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'retro-glow': 'retro-glow 2s ease-in-out infinite alternate',
        'retro-glitch': 'retro-glitch 0.3s infinite',
        'retro-scan': 'retro-scan 2s linear infinite',
        'retro-float': 'retro-float 3s ease-in-out infinite',
      },

      keyframes: {
        'retro-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'retro-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'retro-glow': {
          '0%': { boxShadow: '0 0 5px #00A8CC' },
          '100%': { boxShadow: '0 0 20px #00A8CC, 0 0 30px #00A8CC' },
        },
        'retro-glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'retro-scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'retro-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      // === RETRO ARCADE TRANSITIONS ===
      transitionDuration: {
        'retro-fast': '100ms',
        'retro-normal': '200ms',
        'retro-slow': '400ms',
        'retro-slower': '600ms',
      },

      transitionTimingFunction: {
        'retro-linear': 'linear',
        'retro-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'retro-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'retro-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'retro-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'retro-pixel': 'steps(4, end)',
      },

      // === RETRO ARCADE Z-INDEX ===
      zIndex: {
        'retro-dropdown': '1000',
        'retro-sticky': '1020',
        'retro-fixed': '1030',
        'retro-modal-backdrop': '1040',
        'retro-modal': '1050',
        'retro-popover': '1060',
        'retro-tooltip': '1070',
        'retro-toast': '1080',
      },

      // === RETRO ARCADE COMPONENT SIZES ===
      height: {
        'retro-button-sm': '2rem',     // 32px
        'retro-button-md': '2.5rem',   // 40px
        'retro-button-lg': '3rem',     // 48px
        'retro-input': '2.5rem',       // 40px
      },

      width: {
        'retro-button-sm': '2rem',     // 32px
        'retro-button-md': '2.5rem',   // 40px
        'retro-button-lg': '3rem',     // 48px
      },

      // === RETRO ARCADE BREAKPOINTS ===
      screens: {
        'retro-sm': '640px',
        'retro-md': '768px',
        'retro-lg': '1024px',
        'retro-xl': '1280px',
        'retro-2xl': '1536px',
      },
    },
  },
  plugins: [
    // Custom plugin for retro arcade utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.retro-pixel-border': {
          border: '2px solid #FF6B35',
          boxShadow: '2px 2px 0px #FF6B35',
        },
        '.retro-pixel-border-lg': {
          border: '4px solid #FF6B35',
          boxShadow: '4px 4px 0px #FF6B35',
        },
        '.retro-glow': {
          boxShadow: '0 0 10px #00A8CC',
        },
        '.retro-neon': {
          boxShadow: '0 0 20px #FF6B35, 0 0 40px #FF6B35',
        },
        '.retro-scan-lines': {
          position: 'relative',
        },
        '.retro-scan-lines::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'linear-gradient(transparent 50%, rgba(0, 168, 204, 0.03) 50%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          zIndex: '1',
        },
        '.retro-glitch': {
          position: 'relative',
          animation: 'retro-glitch 0.3s infinite',
        },
        '.retro-arcade-theme': {
          colorScheme: 'dark',
          backgroundColor: '#1A1A1A',
          color: '#FFFFFF',
          fontFamily: 'Roboto Mono, monospace',
          lineHeight: '1.5',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
