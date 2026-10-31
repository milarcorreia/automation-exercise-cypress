import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';

describe('Autenticação e cadastro | Casos 01 a 05', () => {
  const home = new HomePage();
  const auth = new AuthPage();

  it('TC01 | Cadastrar usuário e excluir conta', () => {
    cy.makeTestUser().then((user) => {
      cy.registerUser(user);
      auth.deleteAccount();
    });
  });

  it('TC02 | Login com credenciais válidas', () => {
    cy.makeTestUser().then((user) => {
      cy.provisionUser(user);
      home.visit();
      auth.open().login(user).deleteAccount();
    });
  });

  it('TC03 | Rejeitar login com credenciais inválidas', () => {
    cy.makeTestUser().then((user) => {
      home.visit();
      auth.open();
      cy.get('[data-qa="login-email"]').type(user.email);
      cy.get('[data-qa="login-password"]').type('SenhaIncorreta', { log: false });
      cy.get('[data-qa="login-button"]').click();
      cy.contains('Your email or password is incorrect!').should('be.visible');
    });
  });

  it('TC04 | Logout redireciona para login', () => {
    cy.makeTestUser().then((user) => {
      cy.provisionUser(user);
      home.visit();
      auth.open().login(user).logout();
      // Faz login novamente para limpar a conta de teste.
      auth.login(user).deleteAccount();
    });
  });

  it('TC05 | Bloquear cadastro com e-mail existente', () => {
    cy.makeTestUser().then((user) => {
      cy.provisionUser(user);
      home.visit();
      auth.open();
      cy.get('[data-qa="signup-name"]').type(user.name);
      cy.get('[data-qa="signup-email"]').type(user.email);
      cy.get('[data-qa="signup-button"]').click();
      cy.contains('Email Address already exist!').should('be.visible');
      // Remove conta criada como pré-condição.
      auth.login(user).deleteAccount();
    });
  });
});
