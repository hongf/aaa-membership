import { Box, Button, Divider, useTheme } from '@mui/material';

export const LoadingPage = () => {
  return (
    <Box
      id="login-container"
      sx={{
        width: '475px',
        maxWidth: '100%',
        background: 'white',
        borderRadius: 4,
        p: 2,
      }}
    >
      Loading...
    </Box>
  );
};
