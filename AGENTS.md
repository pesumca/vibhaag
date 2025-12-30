# AGENTS

## Project intent

Rebuild Vibhaag as a modern, production-ready college attendance and analytics platform on the MERN stack, with a React Native companion app. Keep the UI aesthetically strong but do not reuse the legacy theme.

## Target architecture

- Monorepo with shared TypeScript types.
- Web: React + TypeScript.
- API: Node.js + Express + TypeScript.
- DB: MongoDB.
- Mobile: React Native (likely Expo) + TypeScript.
- Docker Compose to orchestrate web, api, and mongo (mobile runs separately).

## Conventions

- TypeScript everywhere.
- Prefer minimal, well-documented environment variables.
- Keep commands reproducible; document in README.
- Keep assets and UI lightweight; avoid heavy theme dependencies.

## Repo layout (proposed)

- `apps/web`
- `apps/api`
- `apps/mobile`
- `packages/shared`
- `infra/docker`

## Open decisions

Confirm package manager, auth strategy, and scope of MVP features before implementation.

## Dos

- Always search online for latest stable versions before adding dependencies, always use best practices
- Commit small, logical changes with descriptive messages. Use brief commit messages.
- Add any required documentation under `docs/`
- Use the [Divio documentation system](https://docs.divio.com/documentation-system/) for structuring docs:
  - **Tutorials**: Learning-oriented (e.g., "Setting up the cluster").
  - **How-To Guides**: Problem-oriented (e.g., "How to add a worker node").
  - **Reference**: Information-oriented (e.g., "Version matrix").
  - **Explanation**: Understanding-oriented (e.g., "GitOps Workflow explanation").

## Don'ts

- Do not add inline comments to any files
- Do not use numeric bullet points in any documentation .md files. Use something like "Step 1", "Step 2", etc. instead.
- Do not hardcode versions without researching the latest stable release
