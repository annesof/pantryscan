import { Block } from '@/components/Block';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import useOrientation from '@/hooks/useOrientation';
import { gql, useLazyQuery } from '@apollo/client';
import { Box, useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan } from './Scan';

const GET_PRODUCT_CODE = gql`
  query getProduct($ean: String!) {
    findOneProduct(ean: $ean) {
      ean
      name
    }
  }
`;

function Scanner1() {
  const isPortrait = useOrientation();
  const [attempts, setAttempts] = useState(0);
  const [barcode, setBarcode] = useState(null);
  const scannerRef = useRef(null);
  const matches = useMediaQuery('(max-width:400px)');
  const constraints = { width: 320, height: 400 };

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
        setAttempts((prevState) => prevState + 1);
        const { findOneProduct } = data;
        if (findOneProduct && findOneProduct.name !== 'notfound') {
          onProductFound(findOneProduct);
        }
      }
    },
    [onProductFound],
  );

  useEffect(() => {
    if (attempts > 3) {
      onProductFound('notfound');
    }
  }, [attempts, onProductFound]);

  useEffect(() => {
    if (barcode !== null) {
      getProduct({ variables: { ean: barcode } });
    }
  }, [barcode, getProduct]);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  return (
    <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
      <Block>
        <Title>Scan de l'article{matches.toString()}</Title>
      </Block>
      <Box
        ref={scannerRef}
        sx={{
          paddingLeft: '10px',
          ...constraints,
        }}
      >
        <canvas
          className="drawingBuffer"
          style={{
            //display: 'none',
            position: 'absolute',
            top: '80px',
            //left: '10px',
            border: '3px solid green',
            ...constraints,
          }}
        />
      </Box>

      <Scan
        scannerRef={scannerRef}
        constraints={constraints}
        onDetected={(result: any) => setBarcode(result)}
      />
    </FullSizeCenteredFlexBox>
  );
}

export default Scanner1;
