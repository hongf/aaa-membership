import Box from '@mui/material/Box';

import { ReactNode, useState } from 'react';

import { PageFooter } from './layoutComponent/PageFooter';
import { AAAAppbar } from './layoutComponent/AAAAppbar';
import { DashboardRouter } from './routes/DashboardRouter';

import React from 'react';

import { AAADrawer } from './layoutComponent/AAADrawer';
import { DrawerContextProvider } from '../context/drawer-context';

export const AAADashboardLayout = () => {
  const [pathname, setPathname] = useState('/dashboard');

  // Remove this const when copying and pasting into your project.

  return (
    // preview-start
    <DrawerContextProvider>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <AAAAppbar />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
          }}
        >
          <AAADrawer />
          <Box px={2}> 
            <DashboardRouter />
          </Box>
        </Box>

        <PageFooter />
      </Box>
    </DrawerContextProvider>
  );
};
