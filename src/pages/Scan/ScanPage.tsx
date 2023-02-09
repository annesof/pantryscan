import { Block } from '@/components/Block';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import useOrientation from '@/hooks/useOrientation';
import { gql, useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeDetector from './BarcodeDetector';

const GET_PRODUCT_CODE = gql`
  query getProduct($ean: String!) {
    findOneProduct(ean: $ean) {
      ean
      name
    }
  }
`;

function ScanPage() {
  const isPortrait = useOrientation();
  const [barcode, setBarcode] = useState<string>();
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

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  return (
    <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
      <Block>
        <Title>{barcode}</Title>
      </Block>

      <BarcodeDetector onDetect={setBarcode} />
    </FullSizeCenteredFlexBox>
  );
}

export default ScanPage;
