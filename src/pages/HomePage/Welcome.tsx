import { Block } from '@/components/Block';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';

import Logo from '../../sections/Logo.svg';
import { LocationList } from './LocationList';
import { PreferredCategories } from './PreferredCategories';
import { ProductListLast } from './ProductListLast';

function Welcome() {
  //const isPortrait = useOrientation();

  return (
    <>
      <FullSizeCenteredFlexBox flexDirection={'column'} sx={{ marginTop: -5 }}>
        <img src={Logo} alt="icon" width="200px" />
        <Block>
          <Title>Derniers ajouts</Title>
          <ProductListLast />
        </Block>
        <Block>
          <Title>Mes emplacements</Title>
          <LocationList />
        </Block>
        <Block>
          <Title>Catégories favorites</Title>
          <PreferredCategories />
        </Block>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Welcome;
