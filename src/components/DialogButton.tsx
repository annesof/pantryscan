import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog as BaseDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { ElementType, ReactNode } from 'react';

const StyledDialog = styled(BaseDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: 5,
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
  open: boolean;
  children?: ReactNode;
  action: {
    name: string;
    Icon?: ElementType;
    handleAction?: any;
    label: string;
    disabled: boolean;
  };
  setOpen: any;
}

function StyledDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontSize: '16px' }} {...other}>
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

export const DialogButton = ({ title, children, action, open, setOpen }: DialogProps) => {
  return (
    <>
      <StyledDialog
        fullWidth={true}
        maxWidth={'md'}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <StyledDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          {title}
        </StyledDialogTitle>
        <DialogContent sx={{ padding: 10 }} onClick={(e) => e.stopPropagation()}>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: 'common.white' }}
            variant="contained"
            autoFocus
            disabled={action.disabled}
            onClick={action.handleAction}
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
