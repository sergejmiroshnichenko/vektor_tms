import { Box, Button } from '@mui/material';
import { setModalActive } from 'store/slices/serviceLogsSlice.ts';
import { useAppDispatch } from 'hooks/redux-hooks.ts';

export const EditActions = () => {
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button
        type="submit"
        form="service-log-form"
        variant="contained"
        size="small">
        UPDATE
      </Button>

      <Button
        size="small"
        color="primary"
        variant="text"
        onClick={() => dispatch(setModalActive(false))}>
        Close
      </Button>
    </Box>
  );
};
