import { gql } from '@apollo/client';

export const GET_PRODUCT_PREFERENCES_USER = gql`
  query getByProductAndUser($ean: String!, $idUser: Float!) {
    findByProductAndUser(ean: $ean, idUser: $idUser) {
      contentUnit {
        name
      }
      categories
      location {
        id
        name
      }
      product {
        ean
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

export const GET_PRODUCT_CODE = gql`
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

export const GET_LAST_PRODUCTS = gql`
  query getLastProducts($fetchProductsArgs: FetchProductsArgs!) {
    findProducts(fetchProductsArgs: $fetchProductsArgs) {
      ean
      name
      brand
      imageSmallUrl
      quantity
    }
  }
`;

export const ADD_PREFERENCES = gql`
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

export const ADD_ARTICLES = gql`
  mutation createArticle(
    $eanProduct: String!
    $idLocation: String!
    $quantity: Float!
    $expirationDate: Timestamp
  ) {
    createArticle(
      createArticleInput: {
        eanProduct: $eanProduct
        idLocation: $idLocation
        quantity: $quantity
        expirationDate: $expirationDate
      }
    ) {
      id
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    findAllCategories {
      id
      name
      color
    }
  }
`;

export const GET_FAV_CATEGORIES = gql`
  query getCategories($id: Float!) {
    findOneUser(id: $id) {
      favoriteCategories {
        id
        name
        color
      }
    }
  }
`;

export const GET_ALL_UNITS = gql`
  query getAllUnits {
    findAllUnits {
      id
      name
    }
  }
`;

export const GET_ALL_LOCATIONS = gql`
  query getAllLocations {
    findAllLocations {
      id
      name
    }
  }
`;
