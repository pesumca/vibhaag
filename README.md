# Vibhaag (Rebuild)
A modern college attendance, analytics, and timetable platform on the MERN stack, with a React Native companion app for faculty check-ins.

## Stack
- Web: React + Vite + TypeScript
- API: Node (Bun runtime) + Express + MongoDB + TypeScript
- Mobile: React Native (Expo)
- Infra: Docker Compose

## Quickstart (Docker Compose)
```bash
docker compose up --build
```

Seed sample data:
```bash
docker compose exec api bun src/seed.ts
```

Open:
- Web: http://localhost:5173
- API: http://localhost:4000/health

Seeded credentials:
- Admin: admin@vibhaag.dev / admin123
- Faculty: rhea@vibhaag.dev / faculty123

## Local Dev (Bun)
```bash
bun install
bun run dev
```

Run seeds locally:
```bash
bun run seed
```

## Mobile App (Expo)
```bash
bun --cwd apps/mobile install
bun --cwd apps/mobile run start
```

Update the API URL in the mobile app to point at your dev machine (e.g. http://192.168.0.42:4000).

## Services
- `apps/api`: REST API, auth, attendance, analytics
- `apps/web`: Dashboard UI
- `apps/mobile`: Faculty check-in app
- `packages/shared`: shared types and schemas

## Key Features
- Role-based login (admin/faculty/staff)
- Attendance check-in and check-out
- Timetable sessions
- Analytics summary for last 7 days
- Dockerized local stack

## Notes
This rebuild intentionally avoids the legacy theme while keeping a strong visual aesthetic.
