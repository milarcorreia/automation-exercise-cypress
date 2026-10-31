# Trabalho de Conclusão — Automação Web com Cypress

**Disciplina:** Automação de Testes na Camada de Interface (Web)  
**Curso:** Pós-graduação em Automação de Testes  
**Professor:** Samuel Lucas

## Sobre o projeto

Projeto individual de automação de testes End-to-End (E2E) desenvolvido para a aplicação [Automation Exercise](https://automationexercise.com/test_cases), utilizando **Cypress**, **Page Object Model (POM)**, **comandos customizados**, **Mochawesome** e **GitHub Actions**.

O objetivo é automatizar os dez casos de teste solicitados no trabalho de conclusão, aplicando boas práticas de qualidade de software, organização de código, seletores adequados e integração contínua.

## Casos de teste automatizados

| ID | Caso oficial | Arquivo de teste |
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

## Tecnologias utilizadas

- Node.js e npm
- Cypress 14
- JavaScript
- Page Object Model (POM)
- Comandos customizados do Cypress
- `cypress-mochawesome-reporter`
- GitHub Actions


## Instalação

Pré-requisitos: Node.js e npm instalados.


Clone o repositório:

```bash
git clone https://github.com/milarcorreia/automation-exercise-cypress.git
```


Acesse o diretório:

```bash
cd automation-exercise-cypress
```

Instale as dependências:

```bash
npm ci
npx cypress install
```

**Observação:** `npm ci` requer o arquivo `package-lock.json` versionado no repositório.


## Execução dos testes

Execute a suíte completa em modo headless:

```bash
npm test
```

Abra a interface interativa do Cypress:

```bash
npm run cy:open
```

Execute utilizando o Google Chrome:

```bash
npm run test:chrome
```

Execute o Electron com interface gráfica:

```bash
npm run test:headed
```

## Pipeline GitHub Actions

O projeto utiliza integração contínua com **GitHub Actions**, por meio do workflow `.github/workflows/cypress.yml`.

A pipeline está configurada para os seguintes eventos:

- `push`
- `pull_request`
- `workflow_dispatch`

O workflow automatiza a instalação das dependências, a execução dos testes Cypress e a disponibilização dos relatórios gerados.

### Como consultar as evidências

1. Acesse a aba **Actions** do repositório.
2. Selecione o workflow **Cypress - Trabalho Final**.
3. Abra uma execução concluída.
4. Localize a seção **Artifacts**.
5. Baixe o artefato que contém os relatórios.
6. Extraia o arquivo e abra `index.html` no navegador.

O upload das evidências utiliza `if: always()`, permitindo disponibilizar os relatórios mesmo quando algum teste apresenta falha. A aprovação da suíte é determinada pelo resultado da execução dos testes.

## Boas práticas implementadas

- Testes organizados e independentes.
- Geração de usuários e e-mails únicos por cenário.
- Criação automatizada de pré-requisitos para autenticação.
- Modularização com Page Object Model.
- Utilização de comandos customizados para reutilização de código.
- Seletores baseados em atributos, IDs e elementos da aplicação.
- Não utilização de XPath.
- Proteção de dados sensíveis nos logs de digitação.
- Utilização de dados fictícios para pagamento.
- Ausência de esperas fixas com `cy.wait()` por duração.
- Limpeza de contas de teste ao término dos cenários bem-sucedidos.

### Limitação conhecida

A exclusão das contas de teste ocorre pelo fluxo da interface. Caso um teste falhe antes da etapa de limpeza, a conta criada poderá permanecer no ambiente de treinamento.

Como melhoria futura, poderá ser implementada uma rotina de limpeza por API.

## Estrutura do projeto

```text
automation-exercise-cypress/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── authentication.cy.js
│   │   ├── orders.cy.js
│   │   └── products-subscription.cy.js
│   ├── pages/
│   │   ├── AuthPage.js
│   │   ├── CheckoutPage.js
│   │   ├── HomePage.js
│   │   └── ProductsPage.js
│   ├── fixtures/
│   │   └── testData.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Resultados e evidências

### Execução local

A suíte completa foi executada utilizando Cypress com navegador Electron em modo headless.

| Indicador | Resultado |
|---|---|
| Total de testes | 10 |
| Testes aprovados | 10 |
| Testes com falha | 0 |
| Testes ignorados | 0 |
| Taxa de aprovação | 100% |
| Tempo total | 3min58s |

### Resultado por grupo de testes

| Grupo | Aprovados | Falhas |
|---|---|---|
| Autenticação e cadastro | 5 | 0 |
| Produtos e assinatura | 3 | 0 |
| Finalização de compra | 2 | 0 |
| **Total** | **10** | **0** |

### Execução no GitHub Actions

O workflow foi executado com sucesso na branch `main`, com geração e disponibilização de evidências por meio do Mochawesome.

[Visualizar execução no GitHub Actions](https://github.com/milarcorreia/automation-exercise-cypress/actions/runs/41158383752)

### Relatórios Mochawesome

Os relatórios HTML são gerados automaticamente pelo `cypress-mochawesome-reporter`.

Após a execução local, o relatório fica disponível em:

`cypress/reports/index.html`

No GitHub Actions, as evidências são disponibilizadas como artefatos da execução.

## Referências

- [Automation Exercise — Test Cases](https://automationexercise.com/test_cases)
- [Documentação oficial do Cypress](https://docs.cypress.io/)
- Orientações do professor Samuel Lucas sobre framework, modularização, relatórios e integração contínua.