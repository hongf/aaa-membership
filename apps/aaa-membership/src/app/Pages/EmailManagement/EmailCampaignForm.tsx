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
import { EmailSearch } from './EmailSearch';
import { emailCampaignSchema } from '../../schema/emailCampaignSchema';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SendIcon from '@mui/icons-material/Send';
import { RichTextInput } from '../components/FormComponent/RichTextInput';
import CancelIcon from '@mui/icons-material/Cancel';
import toast  from 'react-hot-toast';

interface IProps {
  cancelEditing: () => void;
}

export const EmailCampaignForm = (props: IProps) => {
  const { cancelEditing } = props;
  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(emailCampaignSchema),
  });
  const sendEmail = () => {
    toast.success('This email has been sent to 106 members.');
    setTimeout(() => cancelEditing(), 1000);
  };

  return (
    <FormProvider {...methods}>
      <Grid container columnSpacing={2} rowSpacing={1} mb={4}>
        <Grid size={{ xs: 12 }}>
          <FormTextInput accessor="subject" label="Subject" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <RichTextInput accessor="content" label="Context" rows={10} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <RichTextInput
            accessor="Comment"
            label="Comment (will not included in the email send to members)"
            rows={4}
          />
        </Grid>

        <Grid
          size={{ xs: 12 }}
          sx={{ display: 'flex', justifyContent: 'center', columnGap: 4 }}
        >
          <Button
            startIcon={<CancelIcon />}
            color="warning"
            variant="contained"
            onClick={cancelEditing}
          >
            Cancel
          </Button>
          <Button
            startIcon={<RemoveRedEyeIcon />}
            variant="contained"
            color="secondary"
            onClick={cancelEditing}
          >
            Preview
          </Button>
          <Button
            startIcon={<SendIcon />}
            color="warning"
            variant="contained"
            onClick={sendEmail}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
