import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import Sidebar from '@/sections/Sidebar';
import SW from '@/sections/SW';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <>
      <CssBaseline />
      <Notifications />
      <HotKeys />
      <SW />
      <Auth0Provider
        domain="dev-0frjhnjrzz30fju5.us.auth0.com"
        clientId="yyxl1xtjt4SLzp0zjezvuBfg33DTBOF1"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Pages />
        </BrowserRouter>
      </Auth0Provider>
    </>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
