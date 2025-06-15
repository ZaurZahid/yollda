module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Plus Jakarta Sans', 'sans-serif'],
        'secondary': ['Idol', 'serif'],
      },
   fontSize: {
        // Responsive heading sizes
        'h1-responsive': ['clamp(2.5rem, 5vw, 3.75rem)', { lineHeight: '1.2', fontWeight: '700' }], // 40px mobile, 60px tablet, 60px desktop
        'h2-responsive': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.3', fontWeight: '600' }], // 32px mobile, 48px tablet, 48px desktop
        'h3-responsive': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.4', fontWeight: '600' }], // 24px mobile, 36px tablet, 36px desktop
        'h4-responsive': ['clamp(1.25rem, 2.5vw, 1.875rem)', { lineHeight: '1.4', fontWeight: '500' }], // 20px mobile, 30px tablet, 30px desktop
        'h5-responsive': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.5', fontWeight: '500' }], // 18px mobile, 24px tablet, 24px desktop
        'h6-responsive': ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.5', fontWeight: '500' }], // 16px mobile, 20px tablet, 20px desktop
        
        // Responsive body text sizes
        'p-responsive': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6', fontWeight: '400' }], // 16px mobile, 18px tablet, 18px desktop
        'p-large-responsive': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.6', fontWeight: '400' }], // 18px mobile, 20px tablet, 20px desktop
        'p-small-responsive': ['clamp(0.875rem, 1.25vw, 1rem)', { lineHeight: '1.6', fontWeight: '400' }], // 14px mobile, 16px tablet, 16px desktop
        
        // Responsive span/label sizes
        'span-responsive': ['clamp(0.875rem, 1.25vw, 1rem)', { lineHeight: '1.5', fontWeight: '400' }], // 14px mobile, 16px tablet, 16px desktop
        'span-large-responsive': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.5', fontWeight: '400' }], // 16px mobile, 18px tablet, 18px desktop
        'span-small-responsive': ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.5', fontWeight: '400' }], // 12px mobile, 14px tablet, 14px desktop
        
        // Responsive button sizes
        'button-responsive': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.4', fontWeight: '500' }], // 16px mobile, 18px tablet, 18px desktop
        'button-large-responsive': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.4', fontWeight: '600' }], // 18px mobile, 20px tablet, 20px desktop
        'button-small-responsive': ['clamp(0.875rem, 1.25vw, 1rem)', { lineHeight: '1.4', fontWeight: '500' }], // 14px mobile, 16px tablet, 16px desktop
        
        // Responsive input sizes
        'input-responsive': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.5', fontWeight: '400' }], // 16px mobile, 18px tablet, 18px desktop
        'input-large-responsive': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.5', fontWeight: '400' }], // 18px mobile, 20px tablet, 20px desktop
        'input-small-responsive': ['clamp(0.875rem, 1.25vw, 1rem)', { lineHeight: '1.5', fontWeight: '400' }], // 14px mobile, 16px tablet, 16px desktop
        
        // Legacy responsive sizes (keeping for backward compatibility)
        'responsive': ['clamp(1rem, 2.5vw, 1.5rem)', '1.6'],
        'responsive-lg': ['clamp(1.25rem, 3vw, 2rem)', '1.4'],
        'responsive-xl': ['clamp(1.5rem, 4vw, 3rem)', '1.2'],
      },
      colors: {
        'dark-gray': '#6B7280',
        'green-dark': '#083426',
        'light-green': '#21D654',
        // background: 'hsl(var(--background))',
        // foreground: 'hsl(var(--foreground))',
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },
        // popover: {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))',
        // },
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // secondary: {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))',
        // },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))',
        // },
        // destructive: {
        //   DEFAULT: 'hsl(var(--destructive))',
        //   foreground: 'hsl(var(--destructive-foreground))',
        // },
        // border: 'hsl(var(--border))',
        // input: 'hsl(var(--input))',
        // ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(33, 214, 84, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(33, 214, 84, 0.6)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
    },
  },
  plugins: [],
};
