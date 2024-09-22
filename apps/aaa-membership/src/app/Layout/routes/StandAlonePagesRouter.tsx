 
import { RouteObject, useRoutes } from 'react-router-dom';
import { MemberRegister } from '../../Pages/MemberRegister/MemberRegister';

// Todo add all standalone page route here
const routes: RouteObject[] = [
  {
    path: '/member-register',
    element: <MemberRegister />,
  },
];

export const StandAlonePagesRouter = (): JSX.Element | null => {
  return useRoutes(routes);
};
