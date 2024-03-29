import { Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import routes from '.';

function Pages() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 'auto',
        width: '100%',
      }}
    >
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    </Box>
  );
}

export default Pages;
