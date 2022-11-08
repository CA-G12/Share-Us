export const sx = {
  container: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  },
  editButton: {
    width: '100%',
    alignSelf: 'center',
    background: '#2A2A2A',
    boxShadow: '0px 1px 2px rgba(105, 81, 255, 0.05)',
    borderRadius: '8px',
    textTransform: 'capitalize',
    fontSize: '0.9rem',
    color: '#EEF3FF',
    '&:hover': {
      background: '#2A2A2A',
    },
  },
  heading: {
    color: 'rgba(42, 42, 42, 1)',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
}
