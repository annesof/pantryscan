import { Block } from '@/components/Block';
import { FullSizeDecenteredFlexBox } from '@/components/styled';
import {
  ADD_PREFERENCES,
  GET_ALL_CATEGORIES,
  GET_PRODUCT_CODE,
  GET_PRODUCT_PREFERENCES_USER,
} from '@/data/requests';
import useOrientation from '@/hooks/useOrientation';
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
  const isPortrait = useOrientation();
  const [product, setProduct] = useState<Product>();
  const [userProductPref, setUserProductPref] = useState<UserProductPreferences>();
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const { ean } = useParams();

  useQuery(GET_ALL_CATEGORIES, {
    onCompleted(data) {
      setCategoryList(data?.findAllCategories);
    },
  });

  const [getProduct] = useLazyQuery(GET_PRODUCT_CODE, {
    onCompleted: (data) => {
      setProduct(data?.findOneProduct);
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

  const productCategoryList = useMemo(() => {
    if (userProductPref && categoryList.length !== 0) {
      return categoryList.filter((element) => userProductPref.categories.includes(element.id));
    }
    return [];
  }, [userProductPref, categoryList]);

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

  return (
    <>
      <FullSizeDecenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <Block>
          {product && <ProductHeader product={product} categories={productCategoryList} />}
          {errorPreferences && product && (
            <CreateProductPreferences
              ean={product?.ean}
              savePreferences={savePreferences}
              categories={categoryList}
            />
          )}
          {userProductPref && Object.keys(articlesByLocation).length !== 0 && (
            <ProductArticles
              articles={articlesByLocation}
              content={userProductPref?.contentUnit?.name}
            />
          )}
        </Block>
      </FullSizeDecenteredFlexBox>
      <Box sx={{ position: 'absolute', bottom: -50, right: 16 }}>
        <ArticleAddModal userProductPref={userProductPref} />
      </Box>
    </>
  );
}

export default Welcome;
