// Professional Design System for StudentCrazyDeals
export const theme = {
  colors: {
    // Primary Brand Colors
    primary: '#6366F1', // Indigo
    primaryDark: '#4F46E5',
    primaryLight: '#818CF8',
    
    // Secondary Colors
    secondary: '#10B981', // Emerald
    secondaryDark: '#059669',
    secondaryLight: '#34D399',
    
    // Accent Colors
    accent: '#F59E0B', // Amber
    accentDark: '#D97706',
    accentLight: '#FBBF24',
    
    // Neutral Colors
    dark: '#0F172A',
    darkGray: '#1E293B',
    gray: '#64748B',
    lightGray: '#94A3B8',
    silver: '#CBD5E1',
    light: '#F1F5F9',
    lighter: '#F8FAFC',
    white: '#FFFFFF',
    
    // Status Colors
    success: '#22C55E',
    warning: '#EAB308',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)',
    gradientSecondary: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
    gradientAccent: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
    gradientDark: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    gradientHero: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 25%, #A855F7 50%, #EC4899 100%)',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    cardHover: '0 12px 24px rgba(0, 0, 0, 0.15)',
    button: '0 4px 14px rgba(99, 102, 241, 0.4)',
  },
  
  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    full: '9999px',
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default theme;
