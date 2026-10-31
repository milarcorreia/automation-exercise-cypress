export class HomePage {
  visit() {
    cy.visit('/');
    cy.get('.features_items').should('be.visible');
    return this;
  }

  assertLoggedIn(user) {
    cy.get('.shop-menu').should('contain.text', `Logged in as ${user.name}`);
    cy.get('a[href="/delete_account"]').should('be.visible');
    return this;
  }

  subscribe(email) {
    cy.get('#footer').scrollIntoView().within(() => {
      cy.contains(/subscription/i).should('be.visible');
      // O ID "susbscribe_email" é assim escrito na aplicação original.
      cy.get('#susbscribe_email').type(email);
      cy.get('#subscribe').click();
      cy.contains('You have been successfully subscribed!').should('be.visible');
    });
    return this;
  }
}
