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
import { ElementType, MouseEvent, ReactNode, useCallback, useState } from 'react';

const StyledDialog = styled(BaseDialog)(({ theme }) => ({
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
  action: {
    name: string;
    Icon: ElementType;
    handleAction?: () => void;
    label: string;
    disabled?: boolean;
  };
  onCloseMenu: () => void;
}

function StyledDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontSize: '14px' }} {...other}>
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

export const DialogMenu = ({ title, children, action }: DialogProps) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = (event: any, reason: string) => {
    event.stopPropagation();
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const onSubmit = useCallback(() => {
    if (action.handleAction) {
      action.handleAction();
    }
    setOpen(false);
  }, [action]);

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <action.Icon fontSize="small" />
        </ListItemIcon>
        {action.name}
      </MenuItem>
      <StyledDialog
        fullWidth
        maxWidth={'md'}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
      >
        <StyledDialogTitle id="dialog-title" onClose={() => setOpen(false)}>
          {title}
        </StyledDialogTitle>
        <DialogContent onClick={(e) => e.stopPropagation()}>{children}</DialogContent>
        <DialogActions>
          <Button
            sx={{ color: 'common.white' }}
            variant="contained"
            autoFocus
            disabled={action.disabled}
            onClick={onSubmit}
          >
            {action.label}
          </Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Annuler
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};
