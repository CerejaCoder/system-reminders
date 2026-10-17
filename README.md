# Reminder System

Sistema web de gerenciamento de lembretes desenvolvido como projeto pessoal para praticar requisições HTTP com `fetch` e modularização em JavaScript.

## 🚀 Tecnologias

- **JavaScript** — lógica da aplicação e requisições HTTP com Fetch API.
- **Tailwind CSS v4** — estilização da interface.
- **daisyUI** — componentes visuais.
- **npm** — gerenciamento de dependências.

## ✨ Funcionalidades

- Autenticação e encerramento de sessão.
- Verificação da validade da sessão.
- Listagem e pesquisa de lembretes por título.
- Criação, edição e exclusão de lembretes.
- Exibição da data e do horário de criação.
- Notificações de sucesso e erro.
- Indicador da quantidade de lembretes ativos.
- Interface dinâmica com indicadores de carregamento.

## 📂 Estrutura do projeto

```text
├── controllers/
│   ├── user.js
│   └── reminder.js
├── pages/
│   ├── login/
│   │   ├── login.html
│   │   └── login.js
│   ├── cadastro/
│   │   ├── cadastro.html
│   │   └── cadastro.js
│   └── index/
│       ├── index.html
│       └── index.js
├── src/
│   └── input.css
├── .gitignore
├── example.configs.js
├── package.json
├── package-lock.json
└── README.md
```

### Organização dos diretórios e arquivos

- **`controllers/`**: contém as funções de comunicação com a API relacionadas aos usuários e lembretes.
- **`pages/`**: contém as páginas de login, cadastro e gerenciamento de lembretes, cada uma com seu respectivo HTML e JavaScript.
- **`src/input.css`**: arquivo de entrada utilizado pelo Tailwind CSS.
- **`example.configs.js`**: exemplo da estrutura de configuração necessária para executar o projeto.
- **`.gitignore`**: define os arquivos e diretórios que não devem ser versionados.

Os seguintes itens são ignorados pelo Git e devem existir ou ser gerados localmente:

- `node_modules/`: dependências instaladas pelo npm.
- `configs.js`: arquivo local com a configuração e a chave da API.
- `src/output.css`: arquivo CSS gerado pelo Tailwind CSS.

## ⚙️ Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/CerejaCoder/system-reminders.git
cd system-reminders
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a API

Crie o arquivo `configs.js` na raiz do projeto, seguindo a estrutura apresentada em `example.configs.js`, e configure a chave da API necessária.

### 4. Compile o CSS

Execute o comando abaixo para gerar o arquivo `src/output.css`:

```bash
npm run tailwind
```

### 5. Execute o projeto

Abra a aplicação utilizando um servidor local compatível com a estrutura do projeto.

## 🎯 Objetivo

Projeto desenvolvido para praticar consumo de APIs, requisições assíncronas, modularização em JavaScript e desenvolvimento de interfaces web.

---

Desenvolvido como projeto pessoal para fins de aprendizado e prática em desenvolvimento web.
