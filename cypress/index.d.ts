/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    interceptGql(operationName: string, response: string): Chainable<any>;
  }
}
