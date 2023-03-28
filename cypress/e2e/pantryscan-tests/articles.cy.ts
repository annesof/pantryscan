/// <reference types="cypress" />
import { aliasQuery, aliasMutation, hasOperationName } from '../../utils/graphql-test-utils';

describe('add  preferences product', () => {
  it('product preferences not found', () => {
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304');
    cy.interceptGql('getProduct', 'getProduct/4006985902304');
    //cy.interceptGql('getAllCategories', 'getAllCategories/data');
    cy.interceptGql('getAllLocations', 'getAllLocations/data');
    //cy.interceptGql('createUserProductSettings', 'createUserProductSettings/4006985902304');

    cy.visit('http://localhost:5173/product/4006985902304');
    cy.url().should('be.equals', 'http://localhost:5173/product/4006985902304');
    cy.get('h6').contains("L'Original - Cacao en poudre non sucré").should('be.visible');

    cy.get('input#categories').should('not.exist');
    cy.get('button#add_location').should('be.visible').click();

    cy.get('button#ok').should('be.visible').should('be.disabled');

    //cy.get('.MuiButtonBase-root:nth-child(2) > [data-testid="ArrowDropDownIcon"] > path').click();
    cy.get('input#location').click();
    cy.contains('Placard haut')
      .should('be.visible')
      .and('have.class', 'MuiAutocomplete-option')
      .click();

    cy.get('input#quantity').type('1');

    cy.get('input#date').type('122024');

    cy.get('button#ok').should('be.visible').should('not.be.disabled').click();
  });
});
