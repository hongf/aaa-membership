import { Box, useTheme } from '@mui/material';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingPage } from '../Pages/LoadingPage';
import { AAAAppbar } from './layoutComponent/AAAAppbar';
import { ErrorFallbackUi } from './layoutComponent/ErrorFallbackUi';
import { PageFooter } from './layoutComponent/PageFooter';
import { StandAlonePagesRouter } from './routes/StandAlonePagesRouter';

export const PageLayout = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.primary.light,
        minHeight: '100vh',
      }}
    >
      <AAAAppbar />
      <Box sx={{flex:1}}>
        <ErrorBoundary FallbackComponent={ErrorFallbackUi}>
          <Suspense fallback={<LoadingPage />}>
            <StandAlonePagesRouter />
          </Suspense>
        </ErrorBoundary>
      </Box>
      <PageFooter />
    </Box>
  );
}; 