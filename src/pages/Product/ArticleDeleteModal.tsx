import { DialogMenu } from '@/components/DialogMenu';
import { DELETE_ARTICLE } from '@/data/mutations';
import { GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';
import { useMutation } from '@apollo/client';
import ClearIcon from '@mui/icons-material/Clear';

import { useCallback } from 'react';
interface ArticleDeleteModalProps {
  onClose: () => void;
  ean: string;
  id: number;
}

export const ArticleDeleteModal = ({ onClose, ean, id }: ArticleDeleteModalProps) => {
  const [deleteArticle] = useMutation(DELETE_ARTICLE, {
    refetchQueries: [
      {
        query: GET_PRODUCT_PREFERENCES_USER,
        variables: { idUser: 1, ean },
      },
    ],
  });

  const onSubmit = useCallback(() => {
    deleteArticle({
      variables: {
        id: Number(id),
      },
    });
  }, [deleteArticle, id]);

  return (
    <DialogMenu
      title="Suppression"
      onCloseMenu={onClose}
      action={{
        name: 'Suppression',
        Icon: ClearIcon,
        label: 'ok',
        handleAction: onSubmit,
      }}
    >
      Etes vous sur de vouloir supprimer cet article ?
    </DialogMenu>
  );
};
