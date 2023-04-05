import { useCallback, useEffect, useRef } from 'react';

import { Alert, Button } from '@mui/material';

import type { SnackbarKey } from 'notistack';
import { useRegisterSW } from 'virtual:pwa-register/react';

import useNotifications from '@/store/notifications';

// TODO (Suren): this should be a custom hook :)
function SW() {
  const [, notificationsActions] = useNotifications();
  const notificationKey = useRef<SnackbarKey | null>(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notificationKey.current) {
      notificationsActions.close(notificationKey.current);
    }
  }, [setOfflineReady, setNeedRefresh, notificationsActions]);

  useEffect(() => {
    if (offlineReady) {
      notificationsActions.push({
        options: {
          autoHideDuration: 4500,
          content: <Alert severity="success">App is ready to work offline.</Alert>,
        },
      });
    } else if (needRefresh) {
      notificationKey.current = notificationsActions.push({
        message: 'Nouveau contenu disponible.',
        options: {
          variant: 'warning',
          persist: true,
          action: (
            <>
              <Button onClick={() => updateServiceWorker(true)}>Rechargement</Button>
              <Button onClick={close}>Fermer</Button>
            </>
          ),
        },
      });
    }
  }, [close, needRefresh, offlineReady, notificationsActions, updateServiceWorker]);

  return null;
}

export default SW;
