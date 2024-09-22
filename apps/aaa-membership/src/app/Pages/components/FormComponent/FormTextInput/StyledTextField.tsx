import { colors, styled, TextField, Theme } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';

const commonInputSx = (theme: Theme) => {
  return {
    '& .MuiOutlinedInput-root': {
      '&.Mui-disabled input': {
        background: colors.grey[300],
      },
    },
  };
};

export const StyledDateTextField = styled(DateField)(({ theme }) => {
  return commonInputSx(theme);
});

export const StyledTextField = styled(TextField)(({ theme }) => {
  return commonInputSx(theme);
});
