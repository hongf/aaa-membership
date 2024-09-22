import { Routes, Route } from 'react-router-dom';

import { aaaTheme } from './theme';
import { ThemeProvider } from '@mui/material';
import './app.module.scss';
import { Login } from './Pages/Login/Login';
import CssBaseline from '@mui/material/CssBaseline';

import { PageLayout } from './Layout/PageLayout';
import DashboardLayout from './Layout/DashboardLayout';
import { Unauthorised } from './Pages/Unauthorised';

export function App() {
  return (
    <ThemeProvider theme={aaaTheme}>
      <CssBaseline />
      <Routes>
        {/* Special standalone page */}
        <Route path="/login" element={<Login />} key={'login'} />
        <Route
          path="/unauthorise/*"
          element={<Unauthorised />}
          key={'unauthorise'}
        />
        {/* public standalone page, such as self registration, routes are defined in pageLayout*/}
        <Route
          path="/pages/*"
          element={<PageLayout />}
          key={'standalonePages'}
        />
        {/* all else treat as dashboard pages, routes are defined in dashboardLayout */}
        <Route
          path="/private/*"
          element={<DashboardLayout />}
          key={'dashboard'}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
