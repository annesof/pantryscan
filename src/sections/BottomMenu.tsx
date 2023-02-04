import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import { useState } from 'react';

import { styled } from '@mui/material/styles';

import {
  BottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  Paper,
} from '@mui/material';

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  &.Mui-selected {
    color: black;
  },
  color: #74DDE4;
`);

export function BottomMenu() {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} />
        <BottomNavigationAction label="Articles" icon={<PhotoAlbumIcon />} />
        <BottomNavigationAction label="Profil" icon={<AccountBoxIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
