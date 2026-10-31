
export class ProductsPage {
  open() {
    cy.get('a[href="/products"]').first().click();
    cy.location('pathname').should('eq', '/products');
    cy.contains('h2', /all products/i).should('be.visible');

    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0);

    return this;
  }

  viewFirstProduct() {
    cy.get('.features_items .product-image-wrapper')
      .first()
      .contains('View Product')
      .click();

    cy.location('pathname')
      .should('match', /\/product_details\/\d+/);

    cy.get('.product-information').within(() => {
      cy.get('h2').should('not.be.empty');
      cy.get('p').should('contain.text', 'Category:');
      cy.get('span').should('contain.text', 'Rs.');
      cy.contains('Availability:').should('be.visible');
      cy.contains('Condition:').should('be.visible');
      cy.contains('Brand:').should('be.visible');
    });

    return this;
  }

  search(term) {
    cy.get('#search_product')
      .should('be.visible')
      .clear()
      .type(term);

    cy.get('#submit_search').click();

    cy.contains('h2', /searched products/i)
      .should('be.visible');

    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0);

    cy.get('.features_items .productinfo p')
      .should('have.length.greaterThan', 0)
      .then(($products) => {
        // Converte a coleção jQuery em array.
        const names = $products.toArray().map((product) =>
          product.textContent.trim().toLowerCase()
        );

        // Verifica que todos os produtos possuem nomes.
        names.forEach((name) => {
          expect(name).not.to.be.empty;
        });

        // Confirma a existência de produto relacionado.
        const matchingProducts = names.filter((name) =>
          name.includes(term.trim().toLowerCase())
        );

        expect(
          matchingProducts.length,
          'Produtos relacionados à pesquisa'
        ).to.be.greaterThan(0);
      });

    return this;
  }

  addFirstProductToCart() {
    cy.get('.features_items .product-image-wrapper')
      .first()
      .within(() => {
        cy.get('.productinfo a.add-to-cart').click();
      });

    cy.get('#cartModal').should('be.visible');

    cy.contains('#cartModal', 'Continue Shopping').click();

    return this;
  }
}
