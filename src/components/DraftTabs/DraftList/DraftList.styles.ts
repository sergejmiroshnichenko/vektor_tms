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
    '&:hover': {
      transform: 'scale(1.03)',
    },
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
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    p: 0,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
      opacity: 1,
    },
  },
  addIcon: {
    minWidth: 48,
    width: 48,
    padding: 0,
    transition: '0.3s ease',
    opacity: 1,
    '&:hover': {
      /**/
    },
    '&.Mui-disabled': {
      opacity: 0.8,
    },
  },
};
