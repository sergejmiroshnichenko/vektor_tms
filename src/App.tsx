import './App.css';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConstructionIcon from '@mui/icons-material/Construction';
import { ServiceLogsTable } from 'components/ServiceLogsTable.tsx';
import { ServiceTypesFilter } from 'components/Filters/ServiceTypesFilter.tsx';
import { DateRangeFilter } from 'components/Filters/DateRangeFilter.tsx';
import { SearchFilter } from 'components/Filters/SearchFilter.tsx';
import { ServiceLogsModal } from 'components/ServiceLogsModal.tsx';
import {
  setEditingLog,
  setModalActive,
} from 'store/slices/serviceLogsSlice.ts';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { addDraft } from 'store/slices/draftsSlice.ts';
import { getEmptyValues } from 'components/ServiceLogForm/FormInitialValues.ts';

function App() {
  const dispatch = useAppDispatch();
  const { modalActive } = useAppSelector(state => state.serviceLogs);

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          disableGutters
          sx={{
            gap: 5,
            flexWrap: 'wrap',
          }}>
          <Box display="flex" alignItems="center" gap={0.8}>
            <ConstructionIcon />
            <Typography
              component="h1"
              sx={{ fontSize: 18, fontWeight: 'bold' }}>
              Service Logs
            </Typography>
          </Box>
          <SearchFilter />
          <ServiceTypesFilter />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 'auto' }}
            onClick={() => {
              dispatch(setEditingLog(null));
              dispatch(addDraft({ draft: getEmptyValues() }));
              dispatch(setModalActive(true));
            }}>
            <AddIcon sx={{ fontSize: 20, mr: 1.2 }} /> ADD
          </Button>
        </Toolbar>
        <DateRangeFilter />
      </AppBar>
      <ServiceLogsTable />
      {modalActive && <ServiceLogsModal />}
    </Box>
  );
}

export default App;
