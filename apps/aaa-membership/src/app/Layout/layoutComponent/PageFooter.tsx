import { Box, useTheme } from '@mui/material';

export const PageFooter = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        p: 2,
        color: theme.palette.grey[600],
      }}
    >
      <Box>The Assyrian Australian Association</Box>
      <Box>@ Pi information</Box>
    </Box>
  );
};
