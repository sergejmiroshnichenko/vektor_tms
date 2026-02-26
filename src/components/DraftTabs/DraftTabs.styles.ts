import { colors } from 'theme/colors.ts';
import { radius, sizes, transitions } from 'theme/constants.ts';

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  tab: {
    border: `1px solid ${colors.tabBorder}`,
    borderTopLeftRadius: radius.medium,
    borderTopRightRadius: radius.medium,
    position: 'relative',
    textTransform: 'none',
    pt: 0,
    transition: transitions.medium,
    minWidth: sizes.tabMinWidth,
    maxWidth: sizes.tabMaxWidth,
    '&:hover': {
      backgroundColor: colors.tabHoverBg,
    },
  },

  newBadge: {
    background: 'black',
    color: 'white',
    borderRadius: radius.small,
    fontSize: sizes.newBadge,
    p: 0.4,
    height: 'fit-content',
  },

  tabContent: {
    display: 'flex',
    width: '100%',
  },

  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.7,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    flex: 1,
    minWidth: 0,
    mt: 1,
    mr: 1,
  },

  titleText: {
    fontSize: sizes.titleText,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  closeIcon: {
    position: 'absolute',
    right: 3,
    top: 3,
    transition: transitions.fast,
    borderRadius: radius.circle,
    opacity: 0.8,
    '&:hover': {
      backgroundColor: colors.actionIconHover,
      opacity: 1,
    },
  },

  addIcon: {
    minWidth: sizes.iconSize,
    width: sizes.iconSize,
    padding: 0,
    minHeight: sizes.iconSize,
    ml: 0.5,
    borderRadius: radius.circle,
    transition: transitions.medium,
    opacity: 1,
    '&:hover': {
      backgroundColor: colors.actionIconHover,
    },
    '&.Mui-disabled': {
      opacity: 0.6,
    },
    '& .MuiTouchRipple-root': { display: 'none' },
  },
};
