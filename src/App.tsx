import './App.css';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConstructionIcon from '@mui/icons-material/Construction';
import { ServiceLogsTable } from 'components/ServiceLogsTable/ServiceLogsTable.tsx';
import { ServiceTypesFilter } from 'components/Filters/ServiceTypesFilter.tsx';
import { DateRangeFilter } from 'components/Filters/DateRangeFilter.tsx';
import { SearchFilter } from 'components/Filters/SearchFilter.tsx';
import { ServiceLogsModal } from 'components/ServiceLogsModal/ServiceLogsModal.tsx';
import {
  setEditingLog,
  setModalActive,
  setServiceLogs,
} from 'store/slices/serviceLogsSlice.ts';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { addDraft, setDrafts } from 'store/slices/draftsSlice.ts';
import { getEmptyValues } from 'components/ServiceLogForm/FormDefaults.ts';
import { toDraftForm } from 'components/ServiceLogForm/FormConverts.ts';
import { useEffect } from 'react';
import { loadDrafts, loadServiceLogs } from './utils/storage.ts';

function App() {
  const dispatch = useAppDispatch();
  const { modalActive } = useAppSelector(state => state.serviceLogs);

  useEffect(() => {
    const drafts = loadDrafts();
    if (drafts.length) {
      dispatch(setDrafts(drafts));
    }

    const logs = loadServiceLogs();
    if (logs.length) {
      dispatch(setServiceLogs(logs));
    }
  }, [dispatch]);

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
              dispatch(addDraft({ draft: toDraftForm(getEmptyValues()) }));
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
