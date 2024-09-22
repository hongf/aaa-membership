 
import { RouteObject, useRoutes } from 'react-router-dom';
import { MemberRegister } from '../../Pages/MemberRegister/MemberRegister';
 

// Todo add all standalone page route here
const routes: RouteObject[] = [
  {
    path: '/manage-member',
    element: <MemberRegister />,
  },
];

export const DashboardRouter = (): JSX.Element | null => {
  return useRoutes(routes);
};
