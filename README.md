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
- Web (direct): http://localhost:5173
- API (direct): http://localhost:4000/health
- Web (proxy): https://vibhaag.localhost
- API (proxy): https://api.vibhaag.localhost/health

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
2) First-time setup (choose one):
   - Quick demo data:
```bash
docker compose exec api bun src/seed.ts
```
   - Fresh school setup:
     - Open http://vibhaag.localhost (or http://localhost:5173)
     - Create the first admin account (bootstrap screen)
3) Log in to the web app at http://localhost:5173
   - Use `admin@vibhaag.dev` / `admin123` if seeded
3) Log in to the web app at http://localhost:5173
    - Use `admin@vibhaag.dev` / `admin123`
4) Explore:
   - Overview: attendance rate + sessions summary
   - Attendance: check in to a session and refresh recent activity
   - Timetable: seeded sessions are visible
   - Engagement: publish announcements, review leave requests, read feedback

If you want to re-seed from scratch, re-run the seed command. It clears existing data.

## Fresh Start (Reset Everything)
To wipe the database and start from scratch:
```bash
docker compose down -v
docker compose up --build -d
```
Then open http://vibhaag.localhost to create the first admin account.

## Admin Onboarding (Real School Flow)
1) Create the first admin account on the bootstrap screen.
2) Go to **People**:
   - Add faculty/staff one-by-one, or use the CSV import.
   - Add students with roll numbers and batch mapping.
3) Go to **Timetable**:
   - Create courses and sessions for each batch.
4) Go to **Engagement**:
   - Publish announcements.
   - Review leave requests.
   - Read student feedback.

### Bulk Import CSV (People)
Paste CSV in the People → Bulk Import panel with these headers:
```
name,email,role,departmentCode,batchName,rollNumber,password
```
Example:
```
Sam Rao,sam@school.edu,faculty,CSE,,,
Ira Sharma,ira@school.edu,student,CSE,CSE 2026,CSE26-014,student123
```
Notes:
- `departmentCode` maps to Department code (e.g., CSE, DM, BS).
- `batchName` maps to Batch name (e.g., CSE 2026).

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
Open https://vibhaag.localhost (or http://localhost:5173)

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

## Local Dev Domains (Caddy + HTTPS)
This setup includes a Caddy reverse proxy with HTTPS so you can use friendly local URLs:
- https://vibhaag.localhost
- https://api.vibhaag.localhost/health

`*.localhost` resolves automatically on most systems, so no hosts file edits are required.

### Trust the local HTTPS certificate
Caddy generates a local CA for HTTPS. To trust it:
```bash
docker compose exec caddy sh -c "cat /data/caddy/pki/authorities/local/root.crt" > ./caddy-local-ca.crt
```
Then install `./caddy-local-ca.crt` in your OS trust store and refresh the browser.
If you skip this, you can still use HTTPS but your browser will show a warning.

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
- Admin onboarding + staff/student directory management
- Bulk user import (CSV)
- Dockerized local stack

## Notes
This rebuild intentionally avoids the legacy theme while keeping a strong visual aesthetic.
