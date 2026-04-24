import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#1e2e35',
        'bg-dark': '#162028',
        fg: '#c8dde5',
        'fg-muted': '#7aaab8',
        accent: '#3aaac4',
        'accent-light': '#5aaec2',
        border: '#2e4a58',
        card: '#243840',
        'nav-bg': 'rgba(30, 46, 53, 0.92)',
      },
      fontFamily: {
        'serif-jp': ['"Noto Serif JP"', '"Times New Roman"', 'serif'],
        fell: ['"IM Fell English SC"', 'serif'],
      },
      keyframes: {
        scrollLine: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scaleY(1)',
            transformOrigin: 'top',
          },
          '50%': {
            opacity: '0.3',
            transform: 'scaleY(0.5)',
            transformOrigin: 'top',
          },
        },
        slideFromRight: {
          from: {
            transform: 'translateX(38%)',
            opacity: '0',
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideFromLeft: {
          from: {
            transform: 'translateX(-38%)',
            opacity: '0',
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        liveModalFadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        liveModalScaleIn: {
          from: {
            transform: 'scale(0.94)',
            opacity: '0',
          },
          to: {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        discFadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        discScaleIn: {
          from: {
            transform: 'translateY(12px) scale(0.97)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0) scale(1)',
            opacity: '1',
          },
        },
      },
      animation: {
        'scroll-line': 'scrollLine 1.6s ease-in-out infinite',
        'slide-from-right':
          'slideFromRight 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'slide-from-left':
          'slideFromLeft 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'live-modal-fade-in': 'liveModalFadeIn 0.18s ease',
        'live-modal-scale-in': 'liveModalScaleIn 0.2s ease',
        'disc-fade-in': 'discFadeIn 0.2s ease',
        'disc-scale-in': 'discScaleIn 0.22s cubic-bezier(0.22,1,0.36,1)',
      },
      screens: {
        sm: '640px',
        md: '1024px',
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(12px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
