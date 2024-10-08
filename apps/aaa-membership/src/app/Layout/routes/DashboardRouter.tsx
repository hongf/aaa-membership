import { RouteObject, useLocation, useRoutes } from 'react-router-dom';
import { MemberRegister } from '../../Pages/MemberRegister/MemberRegister';
import { Box, Typography } from '@mui/material';
import { DashboardHome } from '../../Pages/DashboardHome';
import { EmailManagement } from '../../Pages/EmailManagement';
import { MemberReporting } from '../../Pages/MemberReporting';

// Todo add all standalone page route here
const routes: RouteObject[] = [
 
  {
    path: '/manage-member',
    element: <MemberRegister />,
  },
  {
    path: '/report',
    element: <MemberReporting />,
  },
  {
    path: '/email-management',
    element: <EmailManagement />,
  },
  {
    path: '/*',
    element: <DashboardHome />,
  },
];

export const DashboardRouter = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', p:1, flexDirection: 'column' }}> 
      {useRoutes(routes)}
    </Box>
  );
};
