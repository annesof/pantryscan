import { Block } from '@/components/Block';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import { GET_PRODUCT_CODE } from '@/data/requests';
import useOrientation from '@/hooks/useOrientation';
import { useLazyQuery } from '@apollo/client';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeDetector from './BarcodeDetector';

function ScanPage() {
  const isPortrait = useOrientation();
  const [barcode, setBarcode] = useState<string>();
  const [videoError, setVideoError] = useState<boolean>(false);
  const navigate = useNavigate();
  const [getProduct, { loading, error }] = useLazyQuery(GET_PRODUCT_CODE, {
    onCompleted: (data) => {
      onInfoFetched(data);
    },
  });

  const onProductFound = useCallback(
    (product: any) => {
      if (product.ean === 'not-found') {
        return navigate(`/product/${product.ean}?code=${barcode}`);
      } else {
        return navigate(`/product/${product.ean}`);
      }
    },
    [barcode, navigate],
  );

  const onInfoFetched = useCallback(
    (data: any) => {
      if (data) {
        //setAttempts((prevState) => prevState + 1);
        const { findOneProduct } = data;
        if (findOneProduct && findOneProduct.name !== 'notfound') {
          onProductFound(findOneProduct);
        }
      }
    },
    [onProductFound],
  );

  useEffect(() => {
    if (barcode) {
      getProduct({ variables: { ean: barcode } });
    }
  }, [barcode, getProduct]);

  if (error) return <>`Error! ${error}`</>;

  return (
    <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
      <Block sx={{ marginTop: '70px' }}>
        <Title>Scan de l&apos;article</Title> {loading && <p>Loading ...</p>}
        {!videoError && <BarcodeDetector onDetect={setBarcode} onError={setVideoError} />}
        {videoError && (
          <Box>
            <Stack spacing={3}>
              <Box>
                L&apos;appareil ne prend pas en charge l&apos;accès à la caméra
                <span role="img" aria-label="thinking-face">
                  😟
                </span>
              </Box>
              <Box>Saisir le code barre ci-dessous</Box>
              <TextField
                label="Code barres"
                margin="normal"
                type="number"
                size="small"
                fullWidth
                sx={{ marginBottom: 4 }}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <Button
                sx={{ color: 'common.white' }}
                variant="contained"
                onClick={() => {
                  barcode && navigate(`/product/${barcode}`);
                }}
              >
                Ok
              </Button>
            </Stack>
          </Box>
        )}
      </Block>
    </FullSizeCenteredFlexBox>
  );
}

export default ScanPage;
