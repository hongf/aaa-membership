import Box from '@mui/material/Box';

import { ReactNode } from 'react';
 
import { useNavigate  } from 'react-router-dom';
import { PageFooter } from './layoutComponent/PageFooter';
 
interface IProps {
  rightDrawer?: ReactNode;
}

export const DashboardLayout = (props: IProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100%' }}>
    

      <PageFooter />
    </Box>
  );
};

export default DashboardLayout;
