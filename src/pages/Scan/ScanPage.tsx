import { Block } from '@/components/Block';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import { GET_PRODUCT_CODE } from '@/data/queries';
import useOrientation from '@/hooks/useOrientation';
import { useLazyQuery } from '@apollo/client';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScannerRounded';
import { Fab } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarcodeDetector } from './BarcodeDetector';
import { ScanManual } from './ScanManual';

function ScanPage() {
  const isPortrait = useOrientation();
  const [barcode, setBarcode] = useState<string>();
  const [manual, setManual] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const navigate = useNavigate();
  const [getProduct, { loading, error }] = useLazyQuery(GET_PRODUCT_CODE, {
    onCompleted: (data) => {
      onInfoFetched(data);
    },
  });

  const onProductFound = useCallback(
    (product: { ean: string }) => {
      if (product.ean === 'not-found') {
        return navigate(`/product/${product.ean}?code=${barcode}`);
      } else {
        return navigate(`/product/${product.ean}`);
      }
    },
    [barcode, navigate],
  );

  const onInfoFetched = useCallback(
    (data: { findOneProduct: { name: string; ean: string } }) => {
      if (data) {
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
      <Block sx={{ marginTop: '30px' }}>
        <Title>Scan de l&apos;article</Title> {loading && <p>Loading ...</p>}
        {!videoError && !manual && (
          <>
            <BarcodeDetector onDetect={setBarcode} onError={setVideoError} />{' '}
            <Fab
              sx={{ color: 'common.white', position: 'absolute', right: 5, bottom: -50 }}
              aria-label="scan"
              size="medium"
              color="primary"
              variant="extended"
              onClick={() => setManual(true)}
            >
              <QrCodeScannerIcon fontSize="large" />
            </Fab>
          </>
        )}
        {(videoError || manual) && <ScanManual error={videoError || !manual} />}
      </Block>
    </FullSizeCenteredFlexBox>
  );
}

export default ScanPage;
