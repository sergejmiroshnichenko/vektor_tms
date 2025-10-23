import './App.css';
import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { ServiceLogsTable } from 'components/ServiceLogsTable.tsx';
import { ServiceTypesFilter } from 'components/Filters/ServiceTypesFilter.tsx';
import { DateRangeFilter } from 'components/Filters/DateRangeFilter.tsx';
import { SearchFilter } from 'components/Filters/SearchFilter.tsx';

function App() {
  return (
    <section>
      <header>
        <div style={{ display: 'flex', gap: 50 }}>
          <Box display="flex" alignItems="center" gap={0.8}>
            <ConstructionIcon />
            <Typography fontSize={18}>Service Logs</Typography>
          </Box>
          <SearchFilter />
          <Box>
            <ServiceTypesFilter />
          </Box>
        </div>
        <Box>
          <DateRangeFilter />
        </Box>
      </header>
      <ServiceLogsTable />
    </section>
  );
}

export default App;
