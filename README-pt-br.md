<div align="center">

# 🔗 AI-Powered Webhook Handler Generator

[![Vercel Status](https://therealsujitk-vercel-badge.vercel.app/?app=webhook-handler-generator)](https://webhook-handler-generator.vercel.app/)
[![Render](https://img.shields.io/badge/render-live-brightgreen?style=flat&logo=render&logoColor=white)](https://ai-powered-webhook-handler-generator.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Um monorepo que simula eventos de webhook do Stripe e usa IA para gerar automaticamente handlers TypeScript tipados com base na estrutura do payload.

**Backend:** TypeScript · Fastify · Drizzle ORM · PostgreSQL  
**Frontend:** React · Vite · TypeScript

[Demo](https://webhook-handler-generator.vercel.app/) · [API](https://ai-powered-webhook-handler-generator.onrender.com) · [Reportar Bug](https://github.com/guilhermehfr/AI-Powered-Webhook-Handler-Generator/issues)

> ℹ️ **Nota:** O serviço da demo pode levar cerca de **30 segundos** para iniciar devido ao modo de repouso do plano gratuito da Render.

🌐 _[Read in english](README.md)_
</div>

---

## ✨ Funcionalidades

- **Simulação de webhooks do Stripe** – Eventos mock pré-carregados gerados com Faker para payloads realistas.
- **Geração de handlers com IA** – Selecione um evento e receba um handler TypeScript tipado gerado por um LLM com base no payload.
- **Syntax highlighting** – Código gerado exibido com highlighting via Shiki.
- **Documentação interativa da API** – Swagger + Scalar disponíveis diretamente no backend.
- **API type-safe** – Tipagem ponta a ponta com TypeScript, Zod e Drizzle ORM.
- **UI moderna** – Interface React responsiva com Tailwind CSS v4, Radix UI e TanStack Router.
- **Monorepo** – Experiência de desenvolvimento unificada com pnpm workspaces.

---

## 🛠 Stack

### Backend

| Tecnologia | Uso |
| --- | --- |
| [Fastify](https://www.fastify.io/) | Servidor da API |
| [Drizzle ORM](https://orm.drizzle.team/) | Acesso ao banco de dados |
| [Neon](https://neon.tech/) | PostgreSQL serverless |
| [Groq SDK](https://groq.com/) | Inferência LLM (geração de handlers) |
| [Faker](https://fakerjs.dev/) | Geração de payloads mock |
| [Zod](https://zod.dev/) | Validação e tipagem de schemas |
| [Swagger + Scalar](https://scalar.com/) | Documentação interativa da API |
| [Pino](https://getpino.io/) | Logging |
| [uuidv7](https://github.com/LiosK/uuidv7) | Geração de IDs |

### Frontend

| Tecnologia | Uso |
| --- | --- |
| [React 19](https://react.dev/) | Interface do usuário |
| [Vite](https://vite.dev/) | Build e dev server |
| [TanStack Router](https://tanstack.com/router) | Roteamento file-based |
| [TanStack Query](https://tanstack.com/query) | Gerenciamento de estado assíncrono |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização |
| [Radix UI](https://www.radix-ui.com/) | Componentes acessíveis |
| [Shiki](https://shiki.matsu.io/) | Syntax highlighting do código gerado |
| [Zod](https://zod.dev/) | Validação de dados |
| [date-fns](https://date-fns.org/) | Manipulação de datas |

### Tooling

| Tecnologia | Uso |
| --- | --- |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Biome](https://biomejs.dev/) | Formatação e linting |
| [pnpm](https://pnpm.io/) | Gerenciamento de pacotes |
| [Docker Compose](https://docs.docker.com/compose/) | Configuração de containers |

---

## 📁 Estrutura do Projeto
```
├── api/                        # Backend Fastify
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
├── web/                        # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── http/
│   │   └── routes/
│   ├── index.html
│   └── package.json
│
├── pnpm-workspace.yaml
└── package.json
```

---

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/)
- Um banco de dados [Neon](https://neon.tech/)
- Uma chave de API do [Groq](https://console.groq.com/)

### Instalação
```sh
git clone https://github.com/guilhermehfr/AI-Powered-Webhook-Handler-Generator.git
cd AI-Powered-Webhook-Handler-Generator
pnpm install
```

### Variáveis de Ambiente
```sh
cp api/.env.example api/.env
```

Preencha o `api/.env`:
```env
DATABASE_URL=postgresql://<user>:<password>@<host>.neon.tech/<dbname>?sslmode=require
GROQ_API_KEY=sua_chave_groq
```

### Banco de Dados
```sh
# Rodar migrations
pnpm --filter api db:migrate

# (Opcional) Popular o banco
pnpm --filter api db:seed
```

### Desenvolvimento
```sh
# API
pnpm --filter api dev

# Frontend
pnpm --filter web dev
```

Ou rodar ambos em paralelo:
```sh
pnpm --parallel --filter api dev --filter web dev
```

### Build
```sh
pnpm --filter api build
pnpm --filter web build
```

---

## 👋 Contato

- LinkedIn: [guilhermehe](https://linkedin.com/in/guilhermehe)
- GitHub: [guilhermehfr](https://github.com/guilhermehfr)