import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

import { Back } from './sections/Back';
import backgroundImage from './sections/background2.jpg';
import { BottomMenu } from './sections/BottomMenu';

const styles = {
  background: `url(${backgroundImage}) no-repeat  right bottom `,
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
        <Back />
        <Pages />
        <BottomMenu />
      </BrowserRouter>
    </div>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
