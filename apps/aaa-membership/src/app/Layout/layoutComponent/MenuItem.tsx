import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { IMenuItem } from '../../schema/IMenuItem';

type Props = IMenuItem & {
  selected?: boolean;
  onClick?: () => void;
};

export const MenuItem: React.FC<Props> = ({
  route,
  literal,
  Icon,
  selected,
  onClick,
}) => {
  const link = (
    <ListItem
      button
      selected={selected}
      sx={{
        '&:hover': {
          backgroundColor: 'primary.light',
          color: 'common.black',
        },
        '*': { fontSize: '1.1em' },
        columnGap: 2,
      }}
      onClick={onClick}
    >
      <Icon /> {literal}
    </ListItem>
  );

  return route ? <Link to={route}>{link}</Link> : link;
};
