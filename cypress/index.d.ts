/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    interceptGql(operationName: string, response: string): Chainable<void>;
  }
}
