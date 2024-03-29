import { gql } from '@apollo/client';

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
    $idUser: Float!
  ) {
    createArticle(
      createArticleInput: {
        eanProduct: $eanProduct
        idLocation: $idLocation
        quantity: $quantity
        expirationDate: $expirationDate
        idUser: $idUser
      }
    ) {
      id
    }
  }
`;

export const UPDATE_ARTICLES = gql`
  mutation updateArticle($id: Float!, $quantity: Float!, $expirationDate: Timestamp) {
    updateArticle(
      updateArticleInput: { id: $id, quantity: $quantity, expirationDate: $expirationDate }
    ) {
      boolean
    }
  }
`;

export const SWITCH_ARTICLE_LOCATION = gql`
  mutation switchArticleLocation($id: Float!, $quantity: Float!, $idLocation: String!) {
    switchArticleLocation(
      switchArticleInput: { id: $id, quantity: $quantity, idLocation: $idLocation }
    ) {
      id
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: Float!) {
    deleteArticle(id: $id)
  }
`;

export const ADD_PERSONAL_PRODUCT_PREFERENCES = gql`
  mutation createPersonalProductAndPreferences(
    $productEan: String!
    $locationId: String!
    $userId: Float!
    $contentUnitId: Float!
    $categoryIds: String!
    $name: String!
    $imageSmallUrl: String!
  ) {
    createPersonalProductAndPreferences(
      createPersonalProductUserProductSettingsInput: {
        productEan: $productEan
        locationId: $locationId
        userId: $userId
        contentUnitId: $contentUnitId
        categoryIds: $categoryIds
        name: $name
        image: $imageSmallUrl
      }
    ) {
      id
    }
  }
`;
