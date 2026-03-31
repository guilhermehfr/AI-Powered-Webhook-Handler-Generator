<div align="center">

# 🔗 Webhook Node React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern monorepo for building, capturing, and managing webhooks with a **Node.js** API and a **React** frontend. Designed for rapid prototyping, developer-friendly workflows, and a clean, responsive UI.

**Backend:** TypeScript, Fastify, Drizzle ORM, PostgreSQL  
**Frontend:** React, Vite, TypeScript

</div>

---

## ✨ Features

- **Webhook capture & management** – Easily create, list, and inspect webhook payloads.
- **Code generation** – Generate handler code for incoming webhooks.
- **Modern UI** – Responsive, themeable React interface.
- **Type-safe API** – End-to-end type safety with TypeScript and Drizzle ORM.
- **Dockerized database** – Local development with PostgreSQL via Docker Compose.
- **Monorepo structure** – Unified dev experience for API and web.

<br/>

## 🛠 Tech Stack

| Technology                                         | Purpose                      |
| -------------------------------------------------- | ---------------------------- |
| [Node.js](https://nodejs.org/)                     | Backend runtime              |
| [Fastify](https://www.fastify.io/)                  | API server                   |
| [Drizzle ORM](https://orm.drizzle.team/)           | Type-safe database access    |
| [PostgreSQL](https://www.postgresql.org/)          | Database                     |
| [React](https://react.dev/)                        | Frontend UI                  |
| [Vite](https://vite.dev/)                          | Frontend build tool          |
| [TypeScript](https://www.typescriptlang.org/)      | Static typing                |
| [Docker Compose](https://docs.docker.com/compose/) | Local database orchestration |
| [Biome](https://biomejs.dev/)                      | Code formatting & linting    |
| [pnpm](https://pnpm.io/)                           | Monorepo package management  |

<br/>

## 🧠 Technical Highlights

- **Drizzle ORM** for type-safe, zero-magic SQL migrations and queries.
- **API-first design** – All webhook operations exposed via REST endpoints.
- **Frontend/Backend isolation** – Develop API and web independently or together.
- **Instant local DB** – One command to spin up PostgreSQL with Docker Compose.
- **Consistent formatting** – Biome ensures code quality across the monorepo.

<br/>

## 📁 Project Structure

```
├── api/                # Node.js backend (Fastify, Drizzle, Postgres)
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
├── web/                # React frontend (Vite, TypeScript, Tanstack)
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

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) package manager
- [Docker](https://www.docker.com/) (for local Postgres)

### Installation

```sh
git clone https://github.com/your-username/webhook-node-react.git
cd webhook-node-react
pnpm install
```

### Database Setup

```sh
# Start Postgres in Docker
pnpm --filter api run db:up

# Run migrations
pnpm --filter api db:migrate

# (Optional) Seed database
pnpm --filter api db:seed
```

### Development

```sh
# Start API
pnpm --filter api dev

# Start Web
pnpm --filter web dev
```

Or run both in parallel:

```sh
pnpm --parallel --filter api dev --filter web dev
```

### Production Build

```sh
pnpm --filter api build
pnpm --filter web build
```

### Code Quality

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
