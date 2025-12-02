export const styles = {
  tabs: {
    background: '#ccc',
    border: '1px solid lightgrey',
    height: '50px',
  },
  tab: {
    position: 'relative',
    width: '150px',
    textTransform: 'none',
    pt: 0,
    transition: '0.3s ease',
  },
  newBadge: {
    background: 'black',
    color: 'white',
    borderRadius: '4px',
    fontSize: '8px',
    p: '3px',
    height: 'fit-content',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    p: 0.3,
    transition: '0.2s',
    borderRadius: '50%',
    opacity: 0.8,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.07)',
      opacity: 1,
    },
  },
  addIcon: {
    minWidth: 28,
    width: 28,
    padding: 0,
    minHeight: 28,
    ml: 0.5,
    borderRadius: '50%',
    transition: '0.2s ease',
    opacity: 1,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.07)',
    },
    '&.Mui-disabled': {
      opacity: 0.6,
    },
    '& .MuiTouchRipple-root': { display: 'none' },
  },
};
