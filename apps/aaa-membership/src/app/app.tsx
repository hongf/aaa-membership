import { Routes, Route } from 'react-router-dom';

import { aaaTheme } from './theme';
import { ThemeProvider } from '@mui/material';
import './app.module.scss';
import { Login } from './Pages/Login/Login';
import CssBaseline from '@mui/material/CssBaseline';

import { PageLayout } from './Layout/PageLayout';
import { AAADashboardLayout } from './Layout/AAADashboardLayout';

export function App() {
  return (
    <ThemeProvider theme={aaaTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} key={'login'} />

        <Route
          path="/pages/*"
          element={<PageLayout />}
          key={'standalonePages'}
        />

        <Route
          path="/dashboard/*"
          element={<AAADashboardLayout />}
          key={'dashboard'}
        />
        <Route path="/*" element={<Login />} key={'other'} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
