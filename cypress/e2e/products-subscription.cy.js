import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

describe('Produtos e assinatura | Casos 08, 09 e 10', () => {
  const home = new HomePage();
  const products = new ProductsPage();

  it('TC08 | Listar produtos e validar detalhes do primeiro', () => {
    home.visit();
    products.open().viewFirstProduct();
  });

  it('TC09 | Pesquisar produtos e conferir a relevância', () => {
    cy.fixture('testData').then(({ searchTerm }) => {
      home.visit();
      products.open().search(searchTerm);
    });
  });

  it('TC10 | Assinar newsletter pela home', () => {
    cy.makeTestUser().then((user) => {
      home.visit().subscribe(user.email);
    });
  });
});
