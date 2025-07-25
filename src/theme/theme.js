import { createTheme } from '@mui/material/styles';

// 和風カラーパレット（茶色、灰色、オレンジの3色構成）
const colors = {
  primary: {
    main: '#5D4037', // 深い茶色（メイン）
    light: '#8D6E63', // 薄い茶色
    dark: '#3E2723', // 濃い茶色
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#757575', // グレー（補助色）
    light: '#BDBDBD', // 薄いグレー
    dark: '#424242', // 濃いグレー
    contrastText: '#FFFFFF'
  },
  accent: {
    main: '#FF8A65', // オレンジ（アクセント）
    light: '#FFAB91', // 薄いオレンジ
    dark: '#FF5722', // 濃いオレンジ
    contrastText: '#FFFFFF'
  },
  background: {
    default: '#FBF9F7', // アイボリー系の背景
    paper: '#FFFFFF'
  },
  text: {
    primary: '#3E2723', // 濃い茶色
    secondary: '#5D4037' // 茶色
  }
};

// Material-UI テーマ設定
export const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    text: colors.text,
    accent: colors.accent // カスタムカラー
  },
  typography: {
    fontFamily: [
      'Noto Sans JP',
      'Hiragino Kaku Gothic ProN',
      'Hiragino Sans',
      'Meiryo',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: colors.primary.main,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.primary.main,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: colors.primary.main,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: colors.primary.main,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      color: colors.text.primary,
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      color: colors.text.secondary,
      lineHeight: 1.5
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
          fontFamily: 'Noto Sans JP, Hiragino Kaku Gothic ProN, sans-serif'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(93, 64, 55, 0.2)'
          }
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.light} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(93, 64, 55, 0.1)',
          border: `1px solid ${colors.secondary.light}`,
          '&:hover': {
            boxShadow: '0 8px 24px rgba(93, 64, 55, 0.15)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500
        },
        filled: {
          backgroundColor: colors.accent.main,
          color: colors.accent.contrastText,
          '&:hover': {
            backgroundColor: colors.accent.dark
          }
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.secondary.light
        },
        bar: {
          background: `linear-gradient(90deg, ${colors.accent.main} 0%, ${colors.accent.dark} 100%)`,
          borderRadius: 4
        }
      }
    }
  }
});

export default theme;