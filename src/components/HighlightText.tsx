import { Box } from '@mui/material';
import { colors } from 'theme/colors.ts';

export const HighlightText = (text: string, query: string) => {
  if (!query) return [text];

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(re);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <Box component="span" key={i} sx={{ backgroundColor: colors.highlight }}>
        {part}
      </Box>
    ) : (
      part
    ),
  );
};
