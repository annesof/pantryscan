import { Block } from '@/components/Block';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import useOrientation from '@/hooks/useOrientation';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Fab } from '@mui/material';
import { LocationList } from './LocationList';
import { PreferredCategories } from './PreferredCategories';
import { ProductListLast } from './ProductListLast';

function Welcome() {
  const isPortrait = useOrientation();

  return (
    <>
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <Block>
          <Title>Derniers ajouts</Title>
          <ProductListLast />
        </Block>
        <Block>
          <Title>Catégories favorites</Title>
          <PreferredCategories />
        </Block>
        <Block>
          <Title>Mes emplacements</Title>
          <LocationList />
        </Block>
      </FullSizeCenteredFlexBox>
      <Fab
        sx={{ color: 'common.white', position: 'absolute', right: 25 }}
        aria-label="scan"
        color="primary"
      >
        <QrCodeScannerIcon fontSize="large" />
      </Fab>
    </>
  );
}

export default Welcome;
