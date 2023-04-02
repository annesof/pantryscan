import HomeIcon from '@mui/icons-material/HomeRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScannerRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import {
  BottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  Paper,
} from '@mui/material';

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  &.Mui-selected {
    font-weight: 600;
  },
`);

export function BottomMenu() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  //const match = useLocation();
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} onClick={() => navigate(`/`)} />
        <BottomNavigationAction
          label="Scan"
          icon={<QrCodeScannerIcon />}
          onClick={() => navigate(`/scan`)}
        />
        <BottomNavigationAction
          label="Recherche"
          icon={<PageviewRoundedIcon />}
          onClick={() => navigate(`/search`)}
        />
      </BottomNavigation>
    </Paper>
  );
}
