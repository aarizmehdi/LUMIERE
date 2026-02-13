/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        
        // Retaining previous custom colors just in case
        background: 'var(--bg-primary)',
        foreground: 'var(--text-primary)',
        primary: '#d4af37', // Accent Gold
        secondary: 'var(--bg-secondary)', // Secondary Background
        'premium-black': '#0a0a0a',
        'premium-charcoal': '#1a1a1a',
        'premium-silver': '#a0a0a0',
        'glass-bg': 'var(--glass-bg)',
        'glass-border': 'var(--glass-border)',
        'navbar-bg': 'var(--navbar-bg)',
        'footer-bg': 'var(--footer-bg)',
        'footer-text': 'var(--footer-text)',
        'card-bg': 'var(--card-bg)',
        'product-light': '#F2F0EB', // Premium Warm Beige
        'product-dark': '#141414', // Premium Deep Charcoal
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
