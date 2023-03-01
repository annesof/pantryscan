import { Block } from '@/components/Block';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import useOrientation from '@/hooks/useOrientation';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScannerRounded';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../../sections/Logo.svg';
import { LocationList } from './LocationList';
import { PreferredCategories } from './PreferredCategories';
import { ProductListLast } from './ProductListLast';

function Welcome() {
  const isPortrait = useOrientation();
  const navigate = useNavigate();
  return (
    <>
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <img src={Logo} alt="icon" width="65%" />
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
        sx={{ color: 'common.white', position: 'absolute', right: 5, bottom: -50 }}
        aria-label="scan"
        color="primary"
        onClick={() => navigate('/scan')}
      >
        <QrCodeScannerIcon fontSize="large" />
      </Fab>
    </>
  );
}

export default Welcome;
