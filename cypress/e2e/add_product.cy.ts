/// <reference types="cypress" />

describe('add  preferences product', () => {
  it('product preferences not found', () => {
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304_ko');
    cy.interceptGql('getProduct', 'getProduct/4006985902304');
    cy.interceptGql('getAllCategories', 'getAllCategories/data');
    cy.interceptGql('getAllLocations', 'getAllLocations/data');
    cy.interceptGql('getAllUnits', 'getAllUnits/data');
    cy.interceptGql('createUserProductSettings', 'createUserProductSettings/4006985902304');

    cy.visit('http://localhost:5173/product/4006985902304');
    cy.url().should('be.equals', 'http://localhost:5173/product/4006985902304');
    cy.get('h6').contains("L'Original - Cacao en poudre non sucré").should('be.visible');

    cy.get('input#categories').should('be.visible');
    cy.get('#location').should('be.visible');
    cy.get('#unit').should('be.visible');
    cy.get('button#next').should('be.visible').should('be.disabled');

    cy.get('input#categories').type('Petit Dej').should('have.value', 'Petit Dej');
    cy.get('#categories-option-0').click();
    cy.get('input#categories').click();
    cy.get('#categories-option-3').click();

    //cy.get('.MuiButtonBase-root:nth-child(2) > [data-testid="ArrowDropDownIcon"] > path').click();
    cy.get('#location').click();
    cy.contains('Cellier').should('be.visible').and('have.class', 'MuiMenuItem-root').click();

    cy.get('#unit').click();
    cy.contains('boîte(s)').should('be.visible').and('have.class', 'MuiMenuItem-root').click();

    cy.get('button#next').should('be.visible').should('not.be.disabled').click();

    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304');
  });
});
