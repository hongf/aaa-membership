import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { FormTextInput } from '../components/FormComponent/FormTextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '../../schema/UserLoginSchema';

import { FromSelector } from '../components/FormComponent/FromSelector';
import { RefPersonTitle, RefCountry } from '../../context/refData';
import { MemberSearch } from './MemberSearch';

export const DashboardHome = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(userLoginSchema),
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        px: `0 !important`,
      }}
    >
      <Typography variant="h2">
        Dashboard (member management platform)
      </Typography>
      <FormProvider {...methods}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <MemberSearch />
        </Grid>
      </FormProvider>
    </Container>
  );
};
