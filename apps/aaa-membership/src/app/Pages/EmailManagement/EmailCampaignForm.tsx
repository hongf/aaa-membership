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
import { EmailSearch, MemberSearch } from './EmailSearch';
import { emailCampaignSchema } from '../../schema/emailCampaignSchema';
import { useState } from 'react';

export const EmailManagement = () => {
  const [showForm, setShowForm] = useState(false);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(emailCampaignSchema),
  });

  return (
    <FormProvider {...methods}>
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 1,
            mb: 2,
          }}
        >
          <Button variant="contained" onClick={() => setShowForm(true)}>
            Start new Email Campaign
          </Button>
        </Box>
      </Grid>
    </FormProvider>
  );
};
