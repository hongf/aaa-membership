import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router, Navigation } from '@toolpad/core';

export const DashboardNavigationMenu: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'header',
    title: 'Membership management',
  },
  {
    segment: 'orders',
    title: 'Membership',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'manage-member',
    title: 'Financial report',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    segment: 'admin',
    title: 'System admin',
    icon: <LayersIcon />,
  },
];
