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

export const MemberRegister = () => {
  const theme = useTheme();
  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(userLoginSchema),
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        my: 2,
      }}
    >
      <Typography variant="h2">Register yourself as a member</Typography>
      <FormProvider {...methods}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Grid size={{ xs: 12, md: 2 }}>
            <FromSelector
              accessor="title"
              label="Title"
              options={RefPersonTitle}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 5 }}>
            <FormTextInput accessor="firstName" label="First name" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 5 }}>
            <FormTextInput accessor="lastName" label="Surname" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextInput accessor="email" label="Email" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextInput accessor="telephone" label="Telephone/mobile" />
          </Grid>{' '}
          <Grid size={{ xs: 12 }}>
            <FormTextInput accessor="address" label="Address" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextInput
              accessor="dob"
              label="Date of birth(DD/MM/YYYY)"
              type="date"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FromSelector
              accessor="countryOfBirth"
              label="Country of birth"
              options={RefCountry}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextInput
              accessor="startDate"
              label="Start date"
              type="date"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormTextInput accessor="comment" label="Comment" rows="5" />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{display:'flex',justifyContent:'center'}}>
            <Button variant='contained'>Join as new member</Button>
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <pre>{JSON.stringify(methods.getValues(), null, 4)}</pre>
          </Grid> */}
        </Grid>
      </FormProvider>
    </Container>
  );
};
