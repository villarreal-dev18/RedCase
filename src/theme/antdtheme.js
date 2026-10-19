import { BorderBeam } from 'antd';
import { colors } from './tokens';

export const antdTheme = {
  token: {
    colorPrimary: colors.primary,
    colorBgBase: colors.bg,
    colorTextBase: colors.text,
    colorBorder: colors.border,
    borderRadius: 12,
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  components: {
    Segmented: {
      trackBg: colors.surface,
      itemColor: colors.textSecondary,
      itemHoverColor: colors.primary,
      itemSelectedBg: colors.primary,
      itemSelectedColor: colors.onPrimary,
    },
    Layout: {
      bodyBg: colors.bg,
      headerBg: 'transparent',
      headerHeight: 72,
      headerPadding: '0',
      headerBoxShadow: 'none',
    },
    Rate: {
      starColor: colors.primary,
    },
    Button: {
      fontWeight: 600,
      primaryShadow: '0 10px 24px rgba(214, 40, 40, 0.35)',
    },
    Menu: {
      itemBg: 'transparent',
      itemColor: colors.textSecondary,
      itemHoverColor: colors.primary,
      itemHoverBg: colors.section,
      itemSelectedColor: colors.primary,
      itemSelectedBg: colors.section,
      horizontalItemSelectedColor: colors.primary,
      horizontalItemSelectedBg: 'transparent',
      horizontalLineHeight: '72px',
      activeBarHeight: 0,
      activeBarBorderWidth: 0,
    },
  },
};