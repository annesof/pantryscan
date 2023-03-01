import { Block } from '@/components/Block';
import { FullSizeDecenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import { Article, Category, Product, UserProductPreferences } from '@/types';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Fab } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateProductPreferences } from './CreateProductPreferences';
import { ProductArticles } from './ProductArticles';
import { ProductHeader } from './ProductHeader';

const GET_PRODUCT_PREFERENCES_USER = gql`
  query getByProductAndUser($ean: String!, $idUser: Float!) {
    findByProductAndUser(ean: $ean, idUser: $idUser) {
      contentUnit {
        name
      }
      categories
      product {
        name
        brand
        imageSmallUrl
        quantity
        articles {
          id
          quantity
          expirationDate
          location {
            id
            name
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_CODE = gql`
  query getProduct($ean: String!) {
    findOneProduct(ean: $ean) {
      ean
      name
      brand
      imageSmallUrl
      quantity
    }
  }
`;
const ADD_PREFERENCES = gql`
  mutation createUserProductSettings(
    $productEan: String!
    $locationId: String!
    $userId: Float!
    $contentUnitId: Float!
    $categoryIds: String!
  ) {
    createUserProductSettings(
      createUserProductSettingsInput: {
        productEan: $productEan
        locationId: $locationId
        userId: $userId
        contentUnitId: $contentUnitId
        categoryIds: $categoryIds
      }
    ) {
      id
    }
  }
`;

const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    findAllCategories {
      id
      name
      color
    }
  }
`;

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
      <Fab
        sx={{ color: 'common.white', position: 'absolute', right: 5, bottom: -150 }}
        aria-label="scan"
        color="primary"
      >
        <AddCircleRoundedIcon fontSize="large" />
      </Fab>
    </>
  );
}

export default Welcome;
