import { Block } from '@/components/Block';
import { FullSizeDecenteredFlexBox } from '@/components/styled';
import { Title } from '@/components/Title';
import { ADD_PREFERENCES } from '@/data/mutations';
import { GET_ALL_CATEGORIES, GET_PRODUCT_CODE, GET_PRODUCT_PREFERENCES_USER } from '@/data/queries';
import { Article, Category, Product, UserProductPreferences } from '@/types';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleAddModal } from './ArticleAddModal';
import { CreateProductPreferences } from './CreateProductPreferences';
import { ProductArticles } from './ProductArticles';
import { ProductHeader } from './ProductHeader';

function Welcome() {
  const [product, setProduct] = useState<Product>();
  const [userProductPref, setUserProductPref] = useState<UserProductPreferences>();
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const { ean } = useParams();

  const [getProduct] = useLazyQuery(GET_PRODUCT_CODE, {
    onCompleted: (data) => {
      setProduct(data?.findOneProduct);
      data?.findOneProduct?.name !== 'notfound' && getCategories();
    },
  });
  const [getCategories] = useLazyQuery(GET_ALL_CATEGORIES, {
    onCompleted: (data) => {
      setCategoryList(data?.findAllCategories);
    },
  });
  const { error: errorPreferences } = useQuery(GET_PRODUCT_PREFERENCES_USER, {
    variables: { idUser: 1, ean },
    onCompleted: (data) => {
      setUserProductPref(data?.findByProductAndUser);
      setProduct(data?.findByProductAndUser.product);
    },
    onError: () => {
      getProduct({
        variables: { ean },
      });
    },
  });

  const articlesByLocation: { [key: string]: Article[] } = useMemo(() => {
    if (product && product.articles) {
      return product.articles.reduce((group: { [key: string]: Article[] }, article: Article) => {
        const { location } = article;
        group[location.name] = group[location.name] ?? [];
        group[location.name].push(article);
        return group;
      }, {});
    }
    return {};
  }, [product]);

  const [savePreferences] = useMutation(ADD_PREFERENCES, {
    refetchQueries: [{ query: GET_PRODUCT_PREFERENCES_USER, variables: { idUser: 1, ean } }],
  });

  const existingProduct = product && product.name !== 'notfound';

  const notFound = (
    <>
      <Title id="product_notfound">Produit non trouvé</Title>
      <Box>Veuillez scanner un autre code</Box>
    </>
  );

  return (
    <>
      <FullSizeDecenteredFlexBox>
        <Block>
          {existingProduct && (
            <ProductHeader product={product} categories={userProductPref?.categories} />
          )}
          {product && product.name === 'notfound' && notFound}
          {errorPreferences && existingProduct && (
            <CreateProductPreferences
              ean={product?.ean}
              savePreferences={savePreferences}
              categories={categoryList}
            />
          )}
          {userProductPref && Object.keys(articlesByLocation).length !== 0 && (
            <ProductArticles
              ean={userProductPref.product.ean}
              articles={articlesByLocation}
              content={userProductPref?.contentUnit?.name}
            />
          )}
        </Block>
      </FullSizeDecenteredFlexBox>
      {existingProduct && !errorPreferences && (
        <Box sx={{ position: 'fixed', top: 70, left: 16 }}>
          <ArticleAddModal userProductPref={userProductPref} />
        </Box>
      )}
    </>
  );
}

export default Welcome;
