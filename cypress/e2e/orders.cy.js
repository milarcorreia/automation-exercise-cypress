import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

describe('Finalização de compra | Casos 15 e 16', () => {
  const home = new HomePage();
  const auth = new AuthPage();
  const products = new ProductsPage();
  const checkout = new CheckoutPage();

  it('TC15 | Cadastrar antes de finalizar a compra', () => {
    cy.makeTestUser().then((user) => {
      cy.registerUser(user);
      products.open().addFirstProductToCart();
      checkout.openCartAndCheckout(user).placeOrder();
      auth.deleteAccount();
    });
  });

  it('TC16 | Fazer login antes de finalizar a compra', () => {
    cy.makeTestUser().then((user) => {
      cy.provisionUser(user);
      home.visit();
      auth.open().login(user);
      products.open().addFirstProductToCart();
      checkout.openCartAndCheckout(user).placeOrder();
      auth.deleteAccount();
    });
  });
});
