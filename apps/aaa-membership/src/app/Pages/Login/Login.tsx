import { Box, Button, Divider, useTheme } from '@mui/material';
import { APP_CONFIG } from '../../appConfig';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '../../schema/UserLoginSchema';
import { PageFooter } from '../../Layout/layoutComponent/PageFooter';
import { FormTextInput } from '../components/FormComponent/FormTextInput';
import { AAALogo } from '../components/Logo';

export const Login = () => {
  const theme = useTheme();
  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(userLoginSchema),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.primary.light,
        minHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '1.8em',
                columnGap: 1,
                color: theme.palette.primary.main,
              }}
            >
              <AAALogo size={36} />
              {APP_CONFIG.orgName}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: 3,
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 700,
                columnGap: 1,
                color: theme.palette.secondary.main,
              }}
            >
              Hi, welcome back
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                mt: 1,
                fontSize: '1em',
                columnGap: 1,
                color: theme.palette.grey[500],
              }}
            >
              Enter your credentials to continue
            </Box>
            <FormProvider {...methods}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 2,
                  px: 4,
                  mt: 4,
                }}
              >
                <Box>
                  <FormTextInput accessor="userName" label="User name" />
                </Box>
                <Box>
                  <FormTextInput
                    accessor="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Button variant="contained" size="large">
                  Sign in
                </Button>
                <Divider></Divider>

                <Button> Do not have account</Button>
              </Box>
            </FormProvider>
          </Box>
        </Box>
      </Box>
      <PageFooter />
    </Box>
  );
};
