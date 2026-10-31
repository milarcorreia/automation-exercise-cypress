
export class CheckoutPage {
  openCartAndCheckout(user) {
    // Abre o carrinho pelo modal de produto adicionado.
    cy.get('#cartModal')
      .should('be.visible')
      .within(() => {
        cy.contains('a', 'View Cart').click();
      });

    // Confirma que o carrinho foi aberto.
    cy.location('pathname').should('eq', '/view_cart');

    // Verifica se há produtos no carrinho.
    cy.get('#cart_info_table tbody tr')
      .should('have.length.greaterThan', 0);

    // Prossegue para o checkout.
    cy.contains('Proceed To Checkout').click();

    // Valida as informações da compra.
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    // Confirma os dados do usuário.
    cy.get('#address_delivery')
      .should('contain.text', user.firstName);

    cy.get('#address_invoice')
      .should('contain.text', user.firstName);

    return this;
  }

  placeOrder() {
    cy.get('textarea[name="message"]')
      .type('Pedido de teste E2E — pós-graduação');

    cy.contains('a', 'Place Order').click();

    cy.location('pathname').should('eq', '/payment');

    cy.fixture('testData').then(({ payment }) => {
      // Dados fictícios para ambiente de treinamento.
      cy.get('[data-qa="name-on-card"]').type(payment.name);
      cy.get('[data-qa="card-number"]').type(payment.number, {
        log: false
      });
      cy.get('[data-qa="cvc"]').type(payment.cvc, {
        log: false
      });
      cy.get('[data-qa="expiry-month"]').type(payment.month);
      cy.get('[data-qa="expiry-year"]').type(payment.year);
      cy.get('[data-qa="pay-button"]').click();
    });

    cy.contains(
      /Congratulations! Your order has been confirmed!|Your order has been placed successfully!/i
    ).should('be.visible');

    return this;
  }
}
