# Vibhaag

Vibhaag is a modern college attendance, analytics, and timetable platform. Built on the MERN stack with a React Native companion app.

## Tech Stack

- **Web**: React (v19.2) + Vite (v8) + TypeScript (v6)
- **API**: Express (v5.2) + Mongoose (v9.7) + Bun Runtime
- **Mobile**: React Native (0.85) + Expo (SDK 56)
- **Database**: MongoDB

## Quickstart (Docker Compose)

Start the database, web app, and API proxy:

```bash
docker compose up --build -d
```

Seed the database with sample data:

```bash
docker compose exec api bun src/seed.ts
```

Open:
- Web (direct): <http://localhost:5173>
- API (direct): <http://localhost:4000/health>
- Web (proxy): <http://vibhaag.localhost>
- API (proxy): <http://api.vibhaag.localhost/health>

### Demo Logins

- **Admin**: admin@vibhaag.dev / admin123
- **Faculty**: rhea@vibhaag.dev / faculty123
- **Student**: ira@vibhaag.dev / student123

---

## Local Development (Without Docker for Apps)

Step 1: Start MongoDB only using Docker:

```bash
docker compose up mongo -d
```

Step 2: Create env files.
Copy `.env.example` to `.env` in `apps/api` and `apps/web`.
For local API dev, set `MONGO_URL` in `apps/api/.env` to `mongodb://localhost:27017/vibhaag`.
For local Web dev, set `VITE_API_URL` in `apps/web/.env` to `http://localhost:4000`.

Step 3: Install dependencies:

```bash
bun install
```

Step 4: Seed local database:

```bash
bun run seed
```

Step 5: Run dev servers:

```bash
bun run dev
```

---

## Testing

Kindly ensure MongoDB is running before executing tests.

### Backend API Tests

Runs tests on a separate test database (`vibhaag_test`) to avoid wiping your dev data:

```bash
bun run test
```

### Frontend UI Visual Tests (Playwright)

Install browsers first:

```bash
bun run ui:install
```

Run visual tests against local dev servers:

```bash
API_BASE_URL=http://localhost:4000 UI_BASE_URL=http://localhost:5173 bun run test:ui
```

Update visual snapshots:

```bash
API_BASE_URL=http://localhost:4000 UI_BASE_URL=http://localhost:5173 bun run test:ui:update
```

---

## Mobile App (Expo)

Step 1: Install dependencies:

```bash
bun --cwd apps/mobile install
```

Step 2: Start Expo dev server:

```bash
bun --cwd apps/mobile run start
```

Step 3: Run Expo Web:

```bash
bun --cwd apps/mobile run web
```
