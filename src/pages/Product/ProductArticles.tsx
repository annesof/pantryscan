import { Block } from '@/components/Block';
import { MenuDialog } from '@/components/MenuDialog';
import { Title } from '@/components/Title';
import { Article } from '@/types';
import ClearIcon from '@mui/icons-material/Clear';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Backdrop,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { format, fromUnixTime } from 'date-fns';
import { MouseEvent, useState } from 'react';
import { ArticleSwitchModal } from './ArticleSwitchModal';

const MoreAction = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        sx={{
          background: '#08B7C4',
          color: 'white',
          '&:hover': { background: '#08B7C4' },
        }}
        aria-label="fingerprint"
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        //onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CompareArrowsIcon fontSize="small" />
          </ListItemIcon>
          Edition
        </MenuItem>
        <ArticleSwitchModal handleClose={handleClose} />
        <MenuDialog
          title="Nouvel article"
          onCloseMenu={handleClose}
          action={{ name: 'Suppression', Icon: ClearIcon, label: 'terminer' }}
        />
      </Menu>
    </>
  );
};

export const ProductArticles = ({
  articles,
  content,
}: {
  articles: { [key: string]: Article[] };
  content: string;
}) => {
  const [idSelected, setIdSelected] = useState<number>();
  return (
    <Block>
      {Object.keys(articles).map((key) => (
        <>
          <Title key={key}>{key}</Title>
          <Grid container spacing={1}>
            {articles[key].map(({ id, expirationDate, quantity }, index) => (
              <>
                <Grid
                  container
                  xs={12}
                  key={id}
                  sx={{
                    ...(idSelected !== id && { display: 'none' }),
                    background: '#08B7C4',
                    borderRadius: '10px',
                    zIndex: 2000,
                  }}
                >
                  <Grid xs={1} sx={{ textAlign: 'right' }}>
                    {quantity}
                  </Grid>
                  <Grid xs={2}>
                    <Typography variant="caption"> {content}</Typography>
                  </Grid>
                  <Grid xs={4} sx={{ textAlign: 'right' }}>
                    <Typography variant="caption">
                      {expirationDate &&
                        `exp. 
                      ${format(fromUnixTime(expirationDate / 1000), 'MMM yyyy')}`}
                    </Typography>
                  </Grid>
                  <Grid xs={1} />
                  <Grid xs={4} sx={{ textAlign: 'right' }}>
                    <IconButton
                      sx={{
                        background: '#08B7C4',
                        color: 'white',
                        '&:hover': { background: '#08B7C4' },
                      }}
                      aria-label="fingerprint"
                      size="small"
                      onClick={() => setIdSelected(undefined)}
                    >
                      <CreateIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xs={12}
                  key={id}
                  sx={{ ...(idSelected === id && { display: 'none' }) }}
                  //sx={{ background: 'red', borderRadius: '10px', zIndex: 2000 }}
                >
                  <Grid xs={1} sx={{ textAlign: 'right' }}>
                    {quantity}
                  </Grid>
                  <Grid xs={2}>
                    <Typography variant="caption"> {content}</Typography>
                  </Grid>
                  <Grid xs={4} sx={{ textAlign: 'right' }}>
                    <Typography variant="caption">
                      {expirationDate &&
                        `exp. 
                      ${format(fromUnixTime(expirationDate / 1000), 'MMM yyyy')}`}
                    </Typography>
                  </Grid>
                  <Grid xs={1} />
                  <Grid xs={4} sx={{ textAlign: 'right' }}>
                    <IconButton
                      sx={{
                        background: '#08B7C4',
                        color: 'white',
                        '&:hover': { background: '#08B7C4' },
                      }}
                      aria-label="fingerprint"
                      size="small"
                      onClick={() => setIdSelected(id)}
                    >
                      <CreateIcon fontSize="inherit" />
                    </IconButton>
                    <MoreAction />
                  </Grid>
                </Grid>
                {articles[key].length !== index + 1 && (
                  <Grid xs={12}>
                    <Divider light />
                  </Grid>
                )}
              </>
            ))}
          </Grid>
        </>
      ))}
      {idSelected && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => 1200 }}
          open={true}
          //onClick={handleClose}
        ></Backdrop>
      )}
    </Block>
  );
};
