import { Box } from '@mui/material';
import logo from '../../../assets/aaa-logo.jpg';
import { APP_CONFIG } from '../../appConfig';

interface IProps {
  size?: number;
}
export const AAALogo = (props: IProps) => {
  const { size = 100 } = props;

  return (
    <Box
      component="img"
      src={logo}
      alt={APP_CONFIG.orgName}
      sx={{ width: size, height: size }}
    />
  );
};
