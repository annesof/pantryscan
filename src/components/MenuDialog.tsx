import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog as BaseDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  MenuItem,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { ElementType, MouseEvent, ReactNode, useState } from 'react';

const BootstrapDialog = styled(BaseDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}

interface DialogProps {
  title: string;
  children?: ReactNode;
  action: { name: string; Icon: ElementType; handleAction?: any; label: string };
  onCloseMenu: any;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const MenuDialog = ({ title, children, action, onCloseMenu }: DialogProps) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    //onCloseMenu();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <action.Icon fontSize="small" />
        </ListItemIcon>
        {action.name}
      </MenuItem>
      <BootstrapDialog
        fullWidth={true}
        maxWidth={'md'}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent onClick={(e) => e.stopPropagation()}>{children}</DialogContent>
        <DialogActions>
          <Button
            sx={{ color: 'common.white' }}
            variant="contained"
            autoFocus
            onClick={handleClose}
          >
            {action.label}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
