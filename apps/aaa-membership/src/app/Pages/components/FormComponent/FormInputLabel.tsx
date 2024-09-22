import { Typography } from '@mui/material';
import { IFormInputProps } from './IFormTextInputProps';

export const FormInputLabel = (props: IFormInputProps) => {
  return props.label ? <Typography>{props.label}</Typography> : <></>;
};
