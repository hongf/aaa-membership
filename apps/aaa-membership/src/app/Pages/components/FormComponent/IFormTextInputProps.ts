import { InputProps } from '@mui/material';

export interface IFormInputProps extends InputProps, InputProps {
  label?: string;
  accessor: string;

}
