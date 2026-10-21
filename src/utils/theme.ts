export const COLORS = {
  // Primary — deep berry
  primary: '#713C4B',
  primaryLight: '#9B6574',
  primaryDark: '#5A2E3A',
  primaryFaint: '#F3E8EB',

  // Backgrounds — warm ivory
  background: '#F7F2EB',
  surface: '#FFFDFC',
  surfaceElevated: '#FFFEFA',

  // Warm neutral accents (replacing rose gold)
  roseGold: '#C88C79',
  roseGoldLight: '#E7D5CD',
  roseGoldFaint: '#F5EDEA',

  // Text — warm charcoal
  text: '#302B2A',
  textSecondary: '#756D69',
  textLight: '#A89E97',
  textOnPrimary: '#FFFFFF',

  // Borders — warm neutral
  border: '#E7DED5',
  borderLight: '#F0EAE3',

  // Phase colors — botanical editorial
  menstrual: '#B07A75',
  follicular: '#7E9E84',
  ovulatory: '#D4A882',
  luteal: '#C88C79',

  // Phase backgrounds (faint)
  menstrualFaint: '#F5EDEC',
  follicularFaint: '#EDF2EE',
  ovulatoryFaint: '#F5EDE4',
  lutealFaint: '#F5EAE5',

  // Functional
  white: '#FFFFFF',
  error: '#9E4A4A',
  success: '#5E8F65',
  warning: '#C49B6F',

  // Gradient endpoints
  gradientStart: '#E7DED5',
  gradientMid: '#F0EAE3',
  gradientEnd: '#F7F2EB',
};

export const FONT_FAMILY = {
  serif: 'DMSerifDisplay_400Regular',
};

export const FONTS = {
  regular: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  heading: {
    fontFamily: FONT_FAMILY.serif,
    fontSize: 28,
    fontWeight: '400' as const,
    color: COLORS.text,
    lineHeight: 36,
  },
  headingLarge: {
    fontFamily: FONT_FAMILY.serif,
    fontSize: 34,
    fontWeight: '400' as const,
    color: COLORS.text,
    lineHeight: 42,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: COLORS.text,
    lineHeight: 28,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.textLight,
  },
  label: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  display: {
    fontFamily: FONT_FAMILY.serif,
    fontSize: 38,
    fontWeight: '400' as const,
    color: COLORS.text,
    lineHeight: 46,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 26,
  xxl: 32,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#302B2A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#302B2A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#302B2A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 16,
    elevation: 6,
  },
};
