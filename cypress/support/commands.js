import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';

/** Identidade única por teste/reexecução, sem credenciais pessoais. */
Cypress.Commands.add('makeTestUser', () => {
  const random = Math.random().toString(36).slice(2, 10);
  const name = `Teste Automatizado ${random}`;
  return cy.fixture('testData').then(({ password, shipping }) => ({
    name,
    firstName: 'Teste',
    lastName: `Automatizado ${random}`,
    email: `pos.${Date.now()}.${random}@example.com`,
    password,
    shipping,
  }));
});

/** Cria conta pelo fluxo de UI e deixa sessão autenticada. */
Cypress.Commands.add('registerUser', (user) => {
  new HomePage().visit();
  new AuthPage().open().register(user);
});

/** Pré-condição UI para testes que requerem uma conta, com logout. */
Cypress.Commands.add('provisionUser', (user) => {
  cy.registerUser(user);
  new AuthPage().logout();
});
