import { useMediaQuery, useTheme, Drawer } from '@mui/material';

import { MenuItemsList } from './MenuItemsList';
import { useDrawerContext } from '../../context/drawer-context';

export const AAADrawer = () => {
  const { isOpened, toggleIsOpened, menu } = useDrawerContext();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Drawer
      variant={isLargeScreen ? 'permanent' : 'temporary'}
      open={!isLargeScreen && isOpened ? true : false}
      onClose={() => toggleIsOpened(!isOpened)}
      sx={{
        width: isOpened ? 280 : theme.spacing(7),

        overflow: 'auto',
        transition: isOpened
          ? theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            })
          : theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        '& .MuiDrawer-paper': {
          p: 1,
          position: 'static',
          overflowX: 'hidden',
        },
      }}
    >
      <MenuItemsList items={menu} />
    </Drawer>
  );
};
