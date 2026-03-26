---
name: Workspace: webhook-node-react
description: "Workspace-level guidance for running, building, and DB workflows. Use when running or modifying api/ or web/."
applyTo: "api/**"
---

Run & develop

- API dev: `pnpm --filter api dev`
- Web dev: `pnpm --filter web dev`
- Start both (parallel): `pnpm --parallel --filter api dev --filter web dev`

Build & start

- API build: `pnpm --filter api build`
- Web build: `pnpm --filter web build`
- API start (production): `pnpm --filter api start`

Database (local dev)

- Start Postgres: `docker-compose -f api/docker-compose.yml up -d`
- Migrate: `pnpm --filter api db:migrate`
- Seed: `pnpm --filter api db:seed`
- Note: `api/drizzle.config.ts` reads `DATABASE_URL`; set env in `api/.env` or CI.

Project conventions

- Monorepo managed with `pnpm` workspaces (`api` = backend, `web` = frontend).
- Formatter: use `biome` where available via `pnpm --filter <pkg> format`.
- No tests configured in repo root; add package-level `test` scripts if needed.

Quick links

- API drizzle config: api/drizzle.config.ts
- API Docker compose: api/docker-compose.yml
- Workspaces: pnpm-workspace.yaml

If you'd like, I can also open a PR with this file, or refine sections (CI, env, or run scripts).
