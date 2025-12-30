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

Seed sample data (run after containers are up):
```bash
docker compose exec api bun src/seed.ts
```

Open:
- Web: http://localhost:5173
- API: http://localhost:4000/health

Seeded credentials (demo logins):
- Admin: admin@vibhaag.dev / admin123
- Faculty: rhea@vibhaag.dev / faculty123
- Faculty: arjun@vibhaag.dev / faculty123
- Faculty: nisha@vibhaag.dev / faculty123
- Student: ira@vibhaag.dev / student123
- Student: meera@vibhaag.dev / student123

## Demo Walkthrough (Docker)
1) Start the stack:
```bash
docker compose up --build -d
```
2) Seed the database:
```bash
docker compose exec api bun src/seed.ts
```
3) Log in to the web app at http://localhost:5173
   - Use `admin@vibhaag.dev` / `admin123`
4) Explore:
   - Overview: attendance rate + sessions summary
   - Attendance: check in to a session and refresh recent activity
   - Timetable: seeded sessions are visible
   - Engagement: publish announcements, review leave requests, read feedback

If you want to re-seed from scratch, re-run the seed command. It clears existing data.

## Student Demo
1) Log in to the web app at http://localhost:5173
   - Use `ira@vibhaag.dev` / `student123`
2) Explore:
   - My Hub: overview with attendance rate + announcements
   - Schedule: personal timetable
   - My Attendance: check in to a session
   - Announcements: campus + batch updates
   - Leave Requests: submit a leave request
   - Session Feedback: rate a session

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

## Run Web + Mobile (No Physical Phone Required)
Web app:
```bash
docker compose up --build -d
```
Open http://localhost:5173

Mobile app in browser (Expo web):
```bash
bun --cwd apps/mobile install
bun --cwd apps/mobile run web
```
Then open the local Expo web URL (printed in the terminal).

Mobile app on a simulator:
- iOS Simulator (macOS): run `bun --cwd apps/mobile run ios`
- Android Emulator: run `bun --cwd apps/mobile run android`

For web/simulator, keep API URL as `http://localhost:4000`. If it fails, replace with your machine IP.

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
- Announcements with audience targeting
- Student attendance check-ins
- Leave requests with approvals
- Session feedback ratings
- Dockerized local stack

## Notes
This rebuild intentionally avoids the legacy theme while keeping a strong visual aesthetic.
