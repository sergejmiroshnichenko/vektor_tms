import { Box, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  direction: 'row' | 'column';
}

export const Section = ({
  title,
  icon,
  action,
  children,
  direction,
}: SectionProps) => (
  <Box
    sx={{ mb: 2, background: 'white', borderRadius: '10px', padding: '20px' }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        pb: 2,
      }}>
      <Typography
        component="h3"
        sx={{
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
        {icon}
        {title}
      </Typography>

      {action && <Box>{action}</Box>}
    </Box>

    <Stack direction={direction} sx={{ '& > *': { flex: 1 } }}>
      {children}
    </Stack>
  </Box>
);
