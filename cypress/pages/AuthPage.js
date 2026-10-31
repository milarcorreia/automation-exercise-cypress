import { HomePage } from './HomePage';

export class AuthPage {
  open() {
    cy.get('a[href="/login"]').click();
    cy.contains('New User Signup!').should('be.visible');
    cy.contains('Login to your account').should('be.visible');
    return this;
  }

  signupStep(user) {
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();
    cy.contains(/enter account information/i).should('be.visible');
    return this;
  }

  register(user) {
    this.signupStep(user);
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(user.password, { log: false });
    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('5');
    cy.get('[data-qa="years"]').select('1995');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(user.firstName);
    cy.get('[data-qa="last_name"]').type(user.lastName);
    const s = user.shipping;
    cy.get('[data-qa="company"]').type(s.company);
    cy.get('[data-qa="address"]').type(s.address1);
    cy.get('[data-qa="address2"]').type(s.address2);
    cy.get('[data-qa="country"]').select(s.country);
    cy.get('[data-qa="state"]').type(s.state);
    cy.get('[data-qa="city"]').type(s.city);
    cy.get('[data-qa="zipcode"]').type(s.zipcode);
    cy.get('[data-qa="mobile_number"]').type(s.mobile);
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    new HomePage().assertLoggedIn(user);
    return this;
  }

  login(user) {
    cy.contains('Login to your account').should('be.visible');
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password, { log: false });
    cy.get('[data-qa="login-button"]').click();
    new HomePage().assertLoggedIn(user);
    return this;
  }

  logout() {
    cy.get('a[href="/logout"]').click();
    cy.location('pathname').should('eq', '/login');
    cy.contains('Login to your account').should('be.visible');
    return this;
  }

  deleteAccount() {
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    return this;
  }
}
