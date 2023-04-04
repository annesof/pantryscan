import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

import { Box, useMediaQuery } from '@mui/material';
import { Back } from './sections/Back';
import backgroundImage from './sections/background2.jpg';
import { BottomMenu } from './sections/BottomMenu';

const styles = (isXs: boolean) => {
  return {
    ...(isXs
      ? { background: `url(${backgroundImage}) no-repeat  right bottom ` }
      : { backgroundColor: '#0B3954' }),
    backgroundSize: 'cover',
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
  };
};

function App() {
  const matches = useMediaQuery('(max-width:480px)');
  return (
    <Box id="box-container" sx={styles(matches)}>
      <CssBaseline />
      <Notifications />
      <SW />
      <BrowserRouter>
        <Back />
        <Pages />
        <BottomMenu />
      </BrowserRouter>
    </Box>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
