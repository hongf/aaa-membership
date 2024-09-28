import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import ClassIcon from '@mui/icons-material/Class';
import { IMenuItem } from '../types';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SummarizeIcon from '@mui/icons-material/Summarize';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';


export const MENU_LIST: IMenuItem[] = [
  {
    route: '/dashboard',
    literal: 'Dashboard',
    Icon: DashboardIcon,
  },
  {
    route: '/dashboard/manage-member',
    literal: 'Manage member',
    Icon: ClassIcon,
    children: [
      {
        route: '/dashboard/manage-member',
        literal: 'Manage member',
        Icon: ClassIcon,
      },
    ],
  },
  {
    route: '/dashboard/report',
    literal: 'Reporting',
    Icon: SummarizeIcon,
  },
  {
    route: '/dashboard/email',
    literal: 'Email',
    Icon: ContactMailIcon,
  },
  {
    route: '/dashboard/events',
    literal: 'Events',
    Icon: EmojiEventsIcon,
  },

  {
    route: '/dashboard/setting',
    literal: 'System setting',
    Icon: SettingsSuggestIcon,
  },
];
