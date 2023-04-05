import { Block } from '@/components/Block';
import { FullSizeDecenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';

import Logo from '../../sections/Logo.svg';
import { LocationList } from './LocationList';
import { PreferredCategories } from './PreferredCategories';
import { ProductLastList } from './ProductLastList';

function Welcome() {
  return (
    <>
      <FullSizeDecenteredFlexBox flexDirection="column" sx={{ marginTop: -5 }}>
        <img src={Logo} alt="logo" id="logo-pantryscan" width="200px" />
        <Block>
          <Title>Derniers ajouts</Title>
          <ProductLastList />
        </Block>
        <Block>
          <Title>Mes emplacements</Title>
          <LocationList />
        </Block>
        <Block>
          <Title>Catégories favorites</Title>
          <PreferredCategories />
        </Block>
      </FullSizeDecenteredFlexBox>
    </>
  );
}

export default Welcome;
