import { Block } from '@/components/Block';
import { MenuDialog } from '@/components/MenuDialog';
import { Title } from '@/components/Title';
import { Article } from '@/types';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Backdrop, Box, Divider, Fade, IconButton, Menu, Typography, Zoom } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { format, fromUnixTime } from 'date-fns';
import { Fragment, MouseEvent, useState } from 'react';
import { ArticleRowEdit } from './ArticleRowEdit';
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
        <Fragment key={key}>
          <Title>{key}</Title>
          <Grid container spacing={1}>
            {articles[key].map(({ id, expirationDate, quantity }, index) => (
              <Fragment key={id}>
                <Zoom
                  in={idSelected === id}
                  style={{ transitionDelay: idSelected === id ? '200ms' : '0ms' }}
                >
                  <Box
                    sx={{
                      ...(idSelected !== id && { display: 'none' }),
                      background: '#08B7C4',
                      borderRadius: '10px',
                      zIndex: 1000,
                    }}
                  >
                    <ArticleRowEdit
                      id={id}
                      quantity={quantity}
                      expirationDate={expirationDate}
                      setIdSelected={setIdSelected}
                    />
                  </Box>
                </Zoom>
                <Fade in={idSelected !== id}>
                  <Grid
                    container
                    xs={12}
                    key={id}
                    sx={{ ...(idSelected === id && { display: 'none' }) }}
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
                        onClick={() => {
                          setIdSelected(id);
                        }}
                      >
                        <CreateIcon fontSize="inherit" />
                      </IconButton>
                      <MoreAction />
                    </Grid>
                  </Grid>
                </Fade>
                {articles[key].length !== index + 1 && (
                  <Grid xs={12}>
                    <Divider light />
                  </Grid>
                )}
              </Fragment>
            ))}
          </Grid>
        </Fragment>
      ))}
      {idSelected && (
        <Backdrop
          sx={{ color: '#fff', zIndex: () => 900 }}
          open={true}
          //onClick={handleClose}
        ></Backdrop>
      )}
    </Block>
  );
};
