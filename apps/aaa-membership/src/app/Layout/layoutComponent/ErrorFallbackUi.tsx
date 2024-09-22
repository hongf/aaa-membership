import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Box, Typography } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
 

export const ErrorFallbackUi = ({
  error, 
}: FallbackProps): JSX.Element => {
  const resetErrorAction = (): void => {
    //Todo write back to backend?
    //resetErrorBoundary()
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <HeartBrokenIcon color="error" />
        <Typography variant="h3" sx={{ paddingLeft: 2 }}>
          Something went wrong! Please us.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', margin: 2 }}>
        <pre>{error.message}</pre>
        <button onClick={resetErrorAction}>Try again</button>
      </Box>
    </Box>
  );
};
