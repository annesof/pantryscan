import { gql } from '@apollo/client';

export const GET_PRODUCT_PREFERENCES_USER = gql`
  query getByProductAndUser($ean: String!, $idUser: Float!) {
    findByProductAndUser(ean: $ean, idUser: $idUser) {
      contentUnit {
        name
      }
      categories {
        id
        name
      }
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

export const GET_PRODUCTS = gql`
  query getLastProducts($fetchProductsArgs: FetchProductsArgs!) {
    findProducts(fetchProductsArgs: $fetchProductsArgs) {
      ean
      name
      brand
      imageSmallUrl
      quantity
      articles {
        location {
          id
        }
        quantity
      }
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

export const GET_ALL_PERSONAL_PRODUCT = gql`
  query findPersonalProducts($idUser: Float!) {
    findPersonalProducts(idUser: $idUser) {
      ean
      name
      imageSmallUrl
    }
  }
`;
