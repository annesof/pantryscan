/// <reference types="cypress" />

describe('scan redirects', () => {
  it('product preferences not found', () => {
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/4006985902304_ko');
    cy.interceptGql('getProduct', 'getProduct/4006985902304');
    cy.interceptGql('getAllCategories', 'getAllCategories/data');
    cy.interceptGql('getAllLocations', 'getAllLocations/data');
    cy.visit('http://localhost:5173/scan');
    cy.get('input').type('4006985902304').should('have.value', '4006985902304');
    cy.get('#send_code').click();
    cy.url().should('be.equals', 'http://localhost:5173/product/4006985902304');
    cy.get('h6').contains("L'Original - Cacao en poudre non sucré").should('be.visible');
    cy.get('input#categories').should('be.visible');
    cy.get('input#location').should('be.visible');
    cy.get('input#unit').should('be.visible');
  });
  it('product not found', () => {
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/25');
    cy.interceptGql('getProduct', 'getProduct/25');
    cy.visit('http://localhost:5173/scan');
    cy.get('input').type('25').should('have.value', '25');
    cy.get('#send_code').click();
    cy.url().should('be.equals', 'http://localhost:5173/product/25');
    cy.get('p#product_notfound').contains('Produit non trouvé').should('be.visible');
  });

  it('product preferences found', () => {
    cy.interceptGql('getByProductAndUser', 'getByProductAndUser/3250390105220');
    cy.visit('http://localhost:5173/scan');
    cy.get('input').type('3250390105220').should('have.value', '3250390105220');
    cy.get('#send_code').click();
    cy.url().should('be.equals', 'http://localhost:5173/product/3250390105220');
    cy.get('h6').contains('Confiture extra de fraises').should('be.visible');
  });
});
