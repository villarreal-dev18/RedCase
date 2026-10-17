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
    Layout: {
      bodyBg: colors.bg,
      headerBg: colors.bg,
      headerHeight: 72,
      headerPadding: '0',
      headerBoxShadow: 'none',
      footerBg: 'transparent',
      footerPadding: 0,
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
    Button: {
      fontWeight: 600,
    },
  },
};