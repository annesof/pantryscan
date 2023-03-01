import { MenuDialog } from '@/components/MenuDialog';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

interface ArticleSwitchModalProps {
  handleClose: any;
}

export const ArticleSwitchModal = ({ handleClose }: ArticleSwitchModalProps) => {
  return (
    <MenuDialog
      title="Changement d'emplacement"
      onCloseMenu={handleClose}
      action={{ name: 'Transfert', Icon: CompareArrowsIcon, label: 'terminer' }}
    >
      DeleteModal
    </MenuDialog>
  );
};
