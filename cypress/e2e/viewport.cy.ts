describe('template spec', () => {
  it('passes', () => {
    cy.viewport('samsung-s10');
    cy.visit('http://localhost:5173/scan');
    /*cy.get('img#logo-pantryscan').should('be.visible');*/
    cy.get('div#box-container')
      .should('have.css', 'background')
      .and('include', 'sections/background2.jpg');
    cy.viewport(1280, 900);
    cy.get('div#box-container')
      .should('have.css', 'background')
      .and('not.include', 'sections/background2.jpg');
  });
});
