<div align="center">

# 🔗 Webhook Node React

[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Um monorepo moderno para construir, capturar e gerenciar webhooks com uma API **Node.js** e frontend **React**. Projetado para prototipagem rápida, fluxo de trabalho amigável para desenvolvedores e uma UI limpa e responsiva.

**Backend:** TypeScript, Fastify, Drizzle ORM, PostgreSQL  
**Frontend:** React, Vite, TypeScript

</div>

---

## ✨ Funcionalidades

- **Captura e gestão de webhooks** – Crie, liste e inspecione payloads de webhooks facilmente.
- **Geração de código** – Gere código de handler para webhooks recebidos.
- **UI moderna** – Interface React responsiva e tematizável.
- **API type-safe** – Segurança de tipos de ponta a ponta com TypeScript e Drizzle ORM.
- **Banco de dados Dockerizado** – Desenvolvimento local com PostgreSQL via Docker Compose.
- **Estrutura monorepo** – Experiência unificada para API e web.

<br/>

## 🛠 Tecnologias

| Tecnologia                                         | Propósito                          |
| -------------------------------------------------- | ---------------------------------- |
| [Node.js](https://nodejs.org/)                     | Runtime do backend                 |
| [Fastify](https://www.fastify.io/)                  | Servidor de API                    |
| [Drizzle ORM](https://orm.drizzle.team/)           | Acesso ao banco de dados type-safe |
| [PostgreSQL](https://www.postgresql.org/)          | Banco de dados                     |
| [React](https://react.dev/)                        | UI do frontend                     |
| [Vite](https://vite.dev/)                          | Build tool do frontend             |
| [TypeScript](https://www.typescriptlang.org/)      | Tipagem estática                   |
| [Docker Compose](https://docs.docker.com/compose/) | Orquestração do banco local        |
| [Biome](https://biomejs.dev/)                      | Formatação e lint do código        |
| [pnpm](https://pnpm.io/)                           | Gerenciamento de pacotes monorepo  |

<br/>

## 🧠 Destaques Técnicos

- **Drizzle ORM** para migrações e queries SQL type-safe e sem "mágica".
- **Design API-first** – Todas operações de webhook expostas via endpoints REST.
- **Isolamento frontend/backend** – Desenvolva API e web juntos ou separadamente.
- **DB local instantâneo** – Um comando para subir o PostgreSQL com Docker Compose.
- **Formatação consistente** – Biome garante qualidade de código em todo o monorepo.

<br/>

## 📁 Estrutura do Projeto

```
├── api/                # Backend Node.js (Fastify, Drizzle, Postgres)
│   ├── src/
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   └── schema/
│   │   ├── routes/
│   │   ├── env.ts
│   │   └── server.ts
│   ├── drizzle.config.ts
│   ├── docker-compose.yml
│   └── package.json
│
├── web/                # Frontend React (Vite, TypeScript, Tanstack)
│   ├── src/
│   │   ├── components/
│   │   ├── http/
│   │   └── routes/
│   ├── index.html
│   └── package.json
│
├── pnpm-workspace.yaml
├── README.md
└── package.json
```

---

<br/>

## 🚀 Primeiros Passos

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [pnpm](https://pnpm.io/) como gerenciador de pacotes
- [Docker](https://www.docker.com/) (para Postgres local)

### Instalação

```sh
git clone https://github.com/seu-usuario/webhook-node-react.git
cd webhook-node-react
pnpm install
```

### Configuração do Banco de Dados

```sh
# Subir o Postgres com Docker
pnpm --filter api run db:up

# Rodar as migrações
pnpm --filter api db:migrate

# (Opcional) Popular banco
pnpm --filter api db:seed
```

### Desenvolvimento

```sh
# Iniciar API
pnpm --filter api dev

# Iniciar Web
pnpm --filter web dev
```

Ou rode ambos em paralelo:

```sh
pnpm --parallel --filter api dev --filter web dev
```

### Build de Produção

```sh
pnpm --filter api build
pnpm --filter web build
```

### Qualidade de Código

```sh
pnpm --filter api format
pnpm --filter web format
```

<br/>

## 👋🏻 Contact

For questions or suggestions:

- Email: guihenrique.bra@email.com
- LinkedIn: [linkedin.com/in/guilhermehe](https://linkedin.com/in/guilhermehe)
- GitHub: [github.com/guilhermehfr](https://github.com/guilhermehfr)

---
