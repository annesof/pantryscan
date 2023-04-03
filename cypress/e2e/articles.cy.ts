/// <reference types="cypress" />

describe('Articles management', () => {
  it('zero article - Add one', () => {
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304');
    cy.interceptGql('getAllLocations', 'getAllLocations/data');
    cy.interceptGql('createArticle', 'createArticle/16');

    cy.visit('http://localhost:5173/product/4006985902304');
    cy.url().should('be.equals', 'http://localhost:5173/product/4006985902304');
    cy.get('h6').contains("L'Original - Cacao en poudre non sucré").should('be.visible');

    cy.get('input#categories').should('not.exist');
    cy.get('button#add_location').should('be.visible').click();

    cy.get('button#ok').should('be.visible').should('be.disabled');

    cy.get('input#location').click();
    cy.contains('Placard haut')
      .should('be.visible')
      .and('have.class', 'MuiAutocomplete-option')
      .click();

    cy.get('input#quantity').type('1');

    cy.get('input#date').type('122024');

    cy.get('button#ok').should('be.visible').should('not.be.disabled').click();
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304_with_one_article');
    cy.contains('Placard haut').should('be.visible');
    cy.get('button#edit-16').should('be.visible').should('not.be.disabled');
  });
  it('one article - Add Location', () => {
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304_with_one_article');
    cy.interceptGql('getAllLocations', 'getAllLocations/data');
    cy.interceptGql('createArticle', 'createArticle/16');

    cy.visit('http://localhost:5173/product/4006985902304');
    cy.url().should('be.equals', 'http://localhost:5173/product/4006985902304');
    cy.get('h6').contains("L'Original - Cacao en poudre non sucré").should('be.visible');

    cy.get('input#categories').should('not.exist');
    cy.get('button#add_location').should('be.visible').click();

    cy.get('button#ok').should('be.visible').should('be.disabled');

    cy.get('input#location').click();
    cy.contains('Cellier').should('be.visible').and('have.class', 'MuiAutocomplete-option').click();

    cy.get('input#quantity').type('1');

    cy.get('input#date').type('122025');

    cy.get('button#ok').should('be.visible').should('not.be.disabled').click();
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304_with_two_article');
    cy.contains('Placard haut').should('be.visible');
    cy.contains('Cellier').should('be.visible');
    cy.get('button#edit-16').should('be.visible').should('not.be.disabled');
    cy.get('button#edit-17').should('be.visible').should('not.be.disabled');
  });

  it('one article - Update quantity', () => {
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304_with_one_article');
    cy.interceptGql('getAllLocations', 'getAllLocations/data');
    cy.interceptGql('updateArticle', 'updateArticle/16');

    cy.visit('http://localhost:5173/product/4006985902304');
    cy.url().should('be.equals', 'http://localhost:5173/product/4006985902304');
    cy.get('h6').contains("L'Original - Cacao en poudre non sucré").should('be.visible');

    cy.get('button#edit-16').should('be.visible').should('not.be.disabled').click();

    cy.get('input#quantity_editable').clear().type('2');
    cy.get('button#addOne').click();
    cy.get('input#quantity_editable').should('have.value', 3);
    cy.get('button#substractOne').click();
    cy.get('input#quantity_editable').should('have.value', 2);

    cy.get('input#expirationDate').should('be.visible').should('have.value', '12/2024');
    cy.get('input#expirationDate').clear().type('11/2025');
    cy.contains('nov.').click();

    //cy.get('input#expirationDate').click();

    /*cy.get('button#ok').should('be.visible').should('not.be.disabled').click();
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304_with_two_article');
    cy.contains('Placard haut').should('be.visible');
    cy.contains('Cellier').should('be.visible');
    cy.get('button#edit-16').should('be.visible').should('not.be.disabled');
    cy.get('button#edit-17').should('be.visible').should('not.be.disabled');*/
  });
});
