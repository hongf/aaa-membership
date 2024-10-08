import { Box, Button, Grid2 as Grid } from '@mui/material';

import { useState } from 'react';
import { EmailCampaignForm } from './EmailCampaignForm';

export const EmailCampaignFormContainer = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
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
          {!showForm && (
            <Button variant="contained" onClick={() => setShowForm(true)}>
              Start new Email Campaign
            </Button>
          )}
        </Box>
      </Grid>
      {showForm && <EmailCampaignForm  cancelEditing={()=>setShowForm(false)}/>}
    </>
  );
};
