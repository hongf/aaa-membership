import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { Grid2 as Grid, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}
export const FormErrorMsg = (props: IProps): JSX.Element => {
  const { children } = props;

  return (
    <Grid
      container
      mt={0}
      sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}
      columnGap={1}
    >
      <Typography color="error" variant="body1">
        <ErrorOutlinedIcon color="error" />
      </Typography>
      <Typography color="primary" variant="body1">
        {typeof children === 'string' ? parse(children.toString()) : children}
      </Typography>
    </Grid>
  );
};
