import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Box, Fab, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { LocationList } from './LocationList';
import { PreferredCategories } from './PreferredCategories';
import { ProductListLast } from './ProductListLast';

const Title = styled(Typography)({
  color: '#08B7C4',
  fontWeight: '700',
  fontSize: '1.9vh',
  lineHeight: '19px',
  marginBottom: '5px',
});

const Block = styled(Box)({
  background: 'rgba(251,247,229,0.8)',
  height: 'auto',
  width: '100%',
  borderRadius: '10px',
  padding: '15px',
  marginBottom: '10px',
});

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
