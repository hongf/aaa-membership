import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app/app';
import { AuthContextProvider } from './app/context/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
   </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
