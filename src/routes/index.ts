import BugReportIcon from '@mui/icons-material/BugReport';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/HomePage/Welcome')),
    path: '/',
    title: 'Welcome',
  },
  [Pages.Scan]: {
    component: asyncComponentLoader(() => import('@/pages/Scan/ScanPage')),
    path: '/scan',
    title: 'Scan',
  },
  [Pages.Product]: {
    component: asyncComponentLoader(() => import('@/pages/Product/Welcome')),
    path: '/product/:ean',
    title: 'Product',
  },
  [Pages.Search]: {
    component: asyncComponentLoader(() => import('@/pages/Search/Welcome')),
    path: '/search',
    title: 'Recherche',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
