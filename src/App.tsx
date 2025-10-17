import './App.css';
import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { ServiceLogsTable } from 'components/Table/Table.tsx';

function App() {
  return (
    <section>
      <Box display="flex" alignItems="center" gap={0.8}>
        <ConstructionIcon />
        <Typography fontSize={18}>Service Logs</Typography>
      </Box>
      <Box></Box>
      <ServiceLogsTable />
    </section>
  );
}

export default App;
