import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Back = () => {
  const navigate = useNavigate();
  return (
    <IconButton aria-label="back" sx={{ color: 'white' }} size="large" onClick={() => navigate(-1)}>
      <ChevronLeftRoundedIcon fontSize="large" />
    </IconButton>
  );
};
