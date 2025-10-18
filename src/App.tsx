import './App.css';
import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { ServiceLogsTable } from 'components/ServiceLogsTable/ServiceLogsTable.tsx';
import { ServiceTypeFilter } from 'components/ServiceTypeFilter/ServiceTypeFilter.tsx';

function App() {
  return (
    <section>
      <header style={{ display: 'flex', gap: 350 }}>
        <Box display="flex" alignItems="center" gap={0.8}>
          <ConstructionIcon />
          <Typography fontSize={18}>Service Logs</Typography>
        </Box>
        <Box>
          <ServiceTypeFilter />
        </Box>
      </header>
      <ServiceLogsTable />
    </section>
  );
}

export default App;
