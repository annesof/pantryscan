import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import { Header } from '@/sections/Header';
import Notifications from '@/sections/Notifications';
import Sidebar from '@/sections/Sidebar';
import SW from '@/sections/SW';
import backgroundImage from './sections/big_back.jpg';
import { BottomMenu } from './sections/BottomMenu';

const styles = {
  background: `url(${backgroundImage})  center bottom `,
  backgroundSize: 'cover',
  position: 'absolute' as const,
  width: '100%',
  height: '100%',
};

function App() {
  return (
    <div style={styles}>
      <CssBaseline />
      <Notifications />
      <SW />
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Pages />
        <BottomMenu />
      </BrowserRouter>
    </div>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
