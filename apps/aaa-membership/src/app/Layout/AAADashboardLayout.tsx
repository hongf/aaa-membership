import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router } from '@toolpad/core';
import { DashboardNavigationMenu } from './DashboardNavigationMenu';
import { aaaTheme, dashboardTheme } from '../theme';
import { AAALogo } from '../Pages/components/Logo';
import { UiConfig } from './UiConfig';
import { DashboardRouter } from './routes/DashboardRouter';
 
function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

export const AAADashboardLayout = () => {
  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    // preview-start
    <AppProvider
      navigation={DashboardNavigationMenu}
      branding={{
        logo: <AAALogo size={36}/>,
        title: UiConfig.organisation,
      }}
      router={router}
      theme={dashboardTheme}
    >
      <DashboardLayout>
        <DashboardRouter/> 
        {/* <DemoPageContent pathname={pathname} /> */}
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
};
