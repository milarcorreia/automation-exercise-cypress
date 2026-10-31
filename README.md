# Trabalho de Conclusão — Automação Web com Cypress

Projeto **individual** de automação E2E para [Automation Exercise](https://automationexercise.com/test_cases), usando **Cypress**, **Page Objects + comandos customizados**, **Mochawesome** e **GitHub Actions**.

## Casos do enunciado

| ID | Caso oficial | Spec |
|---|---|---|
| TC01 | Register User | `authentication.cy.js` |
| TC02 | Login User with correct email and password | `authentication.cy.js` |
| TC03 | Login User with incorrect email and password | `authentication.cy.js` |
| TC04 | Logout User | `authentication.cy.js` |
| TC05 | Register User with existing email | `authentication.cy.js` |
| TC08 | Verify All Products and product detail page | `products-subscription.cy.js` |
| TC09 | Search Product | `products-subscription.cy.js` |
| TC10 | Verify Subscription in home page | `products-subscription.cy.js` |
| TC15 | Place Order: Register before Checkout | `orders.cy.js` |
| TC16 | Place Order: Login before Checkout | `orders.cy.js` |

## Tecnologias

- Node.js 22 e npm
- Cypress 14
- `cypress-mochawesome-reporter`
- JavaScript, Page Object Model (POM), custom commands
- GitHub Actions

## Instalação

```bash
npm install
npx cypress install
```

**Importante:** o ambiente de montagem não conseguiu acessar o registro npm para gerar o `package-lock.json`. O workflow usa `npm install` para permitir a primeira execução. Após instalar localmente, faça commit do `package-lock.json` e, idealmente, troque o comando do workflow para `npm ci`, garantindo versões reproduzíveis.

## Executar

```bash
npm test               # modo headless - Electron
npm run cy:open        # modo interativo
npm run test:chrome    # Chrome instalado localmente
npm run test:headed    # Electron com janela
```

Para gerar relatório, execute os testes. Acesse `cypress/reports/` e abra o arquivo HTML no navegador.

## Pipeline GitHub Actions

O workflow `.github/workflows/cypress.yml` executa **somente** os casos do trabalho final, em eventos `push`, `pull_request` e `workflow_dispatch`.

1. Crie um repositório GitHub e envie **todos os arquivos do projeto**, e o `package-lock.json` gerado pela instalação.
2. Abra **Actions** > **Cypress - Trabalho Final** > execução.
3. Abra **Artifacts** e baixe `cypress-relatorios-<número>`.
4. Consulte o relatório HTML Mochawesome e as capturas/vídeos de falhas, quando gerados.

O upload de evidências usa `if: always()` mesmo quando um teste falha, **mas isso não equivale a aprovação da suíte**.

## Boas práticas

- Testes independentes com usuário e e-mail únicos por cenário.
- Cenários que precisam de conta válida criam o próprio pré-requisito via interface.
- Seletores `data-qa`, IDs e atributos presentes na aplicação; não usa XPath.
- Page Objects para ações de autenticação, produtos e checkout.
- Comandos customizados para provisionar dados.
- Senhas não aparecem no log de digitação.
- Cartão **fictício** usado somente no site de prática.
- Sem `cy.wait()` com duração fixa.
- Cleanup de conta ao término dos cenários de sucesso.

### Atenção ao cleanup

O cleanup é realizado pelo fluxo de UI **ao final de testes bem-sucedidos**. Se um teste falhar antes do cleanup, a conta gerada pode permanecer no site de treinamento. Uma solução futura é implementar cleanup via API de testes.

## Estrutura

```text
.github/workflows/cypress.yml
cypress/
  e2e/authentication.cy.js
  e2e/products-subscription.cy.js
  e2e/orders.cy.js
  pages/HomePage.js
  pages/AuthPage.js
  pages/ProductsPage.js
  pages/CheckoutPage.js
  support/commands.js
  support/e2e.js
  fixtures/testData.json
cypress.config.js
package.json
package-lock.json (gerado no primeiro npm install)
```

## Escopo e limitações da evidência

**Os 10 casos estão implementados em código, mas a suíte ainda precisa ser executada e depurada no ambiente de destino.** No ambiente de geração, não houve acesso ao site público nem ao registro npm; portanto, não é correto declarar aprovação dos testes ou da pipeline. Recomenda-se rodar localmente, corrigir qualquer diferença do DOM e comprovar a execução **verde** no GitHub Actions antes de enviar a URL ao professor.

## Referências

- [Test Cases oficiais](https://automationexercise.com/test_cases)
- [Cypress Docs](https://docs.cypress.io/)
- Orientações do professor Samuel Lucas: Cypress obrigatório; modularização obrigatória; `cypress-mochawesome-reporter`; evidência na pipeline.
