import { Block } from '@/components/Block';
import { Title } from '@/components/Title';
import { Article } from '@/types';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Backdrop, Divider, Fade, IconButton, Menu, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { format, fromUnixTime } from 'date-fns';
import { Fragment, MouseEvent, useState } from 'react';
import { ArticleDeleteModal } from './ArticleDeleteModal';
import { ArticleRowEdit } from './ArticleRowEdit';
import { ArticleSwitchModal } from './ArticleSwitchModal';

const MoreAction = ({ id, ean }: { id: number; ean: string }) => {
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
          //background: '#08B7C4',
          color: '#08B7C4',
          '&:hover': { background: '#08B7C4' },
        }}
        aria-label="more"
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
        <ArticleSwitchModal handleClose={handleClose} id={id} ean={ean} />
        <ArticleDeleteModal handleClose={handleClose} id={id} ean={ean} />
      </Menu>
    </>
  );
};

export const ProductArticles = ({
  articles,
  content,
  ean,
}: {
  articles: { [key: string]: Article[] };
  content: string;
  ean: string;
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
                <Fade
                  in={idSelected === id}
                  style={{ transitionDelay: idSelected === id ? '200ms' : '0ms' }}
                >
                  <ArticleRowEdit
                    id={id}
                    ean={ean}
                    quantity={quantity}
                    expirationDate={expirationDate}
                    setIdSelected={setIdSelected}
                    hidden={idSelected !== id}
                  />
                </Fade>
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
                          //background: '#08B7C4',
                          color: '#08B7C4',
                          '&:hover': { background: '#08B7C4' },
                        }}
                        aria-label="edit"
                        size="small"
                        onClick={() => {
                          setIdSelected(id);
                        }}
                      >
                        <CreateIcon fontSize="inherit" />
                      </IconButton>
                      <MoreAction id={id} ean={ean} />
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
      {idSelected && <Backdrop sx={{ color: '#fff', zIndex: () => 900 }} open={true} />}
    </Block>
  );
};
