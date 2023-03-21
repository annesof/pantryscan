import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ScanManual = ({ error }: { error: boolean }) => {
  //const [barcode, setBarcode] = useState<string>();
  const [barcodeInput, setBarcodeInput] = useState<string>();
  const navigate = useNavigate();

  return (
    <Box>
      <Stack spacing={3}>
        <Box>
          {error && (
            <>
              L&apos;appareil ne prend pas en charge l&apos;accès à la caméra
              <span role="img" aria-label="thinking-face">
                😟
              </span>
            </>
          )}
        </Box>
        <Box>Saisir le code barre ci-dessous</Box>
        <TextField
          label="Code barres"
          margin="normal"
          type="number"
          size="small"
          fullWidth
          sx={{ marginBottom: 4 }}
          onChange={(e) => setBarcodeInput(e.target.value)}
        />
        <Button
          sx={{ color: 'common.white' }}
          variant="contained"
          onClick={() => {
            barcodeInput && navigate(`/product/${barcodeInput}`);
          }}
        >
          Ok
        </Button>
      </Stack>
    </Box>
  );
};
