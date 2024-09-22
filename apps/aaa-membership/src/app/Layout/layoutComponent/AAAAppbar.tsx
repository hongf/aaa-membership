import { Box, Typography, useTheme } from '@mui/material';
import { AAALogo } from '../../Pages/components/Logo';
import { UiConfig } from '../UiConfig';

import { IconButton } from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

export const AAAAppbar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: 'white',
        display: 'flex',
        borderBottom: `${theme.palette.primary.main} 3px solid`,
      }}
    >
      <Box
        sx={{
          flex: 1,
          background: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 2,
          p: 1,
        }}
      >
        <Box sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
          <AAALogo size={101}></AAALogo>
        </Box>
        <Box sx={{ [theme.breakpoints.up('sm')]: { display: 'none' } }}>
          <AAALogo size={48}></AAALogo>
        </Box>
        <Box sx={{ [theme.breakpoints.down('md')]: { display: 'none' } }}>
          <Typography variant="body1" color="info">
            Supporting our Community since 1969
          </Typography>
          <Typography
            variant="h1"
            sx={{
              [theme.breakpoints.up('md')]: { my: 2 },
              [theme.breakpoints.only('md')]: { fontSize: '1.3rem' },
              [theme.breakpoints.down('sm')]: { fontSize: '1.0rem', my: 1 },
            }}
          >
            The Assyrian Australian Association
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          px: 2,
        }}
      >
        <Typography variant="h3" sx={{ flex: 1 }}>
          {UiConfig.appName}
        </Typography>
        <Typography variant="h4" color="primary">
          Welcome John Doe
        </Typography>
      </Box>
    </Box>
  );
};
