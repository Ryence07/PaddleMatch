# PaddleMatch

[![Made with AI](https://img.shields.io/badge/Made_with-AI_assistance-blue)](https://github.com/Ryence07/PaddleMatch/blob/5d1661681835693d47cfec947b957cbbbc2fa4e1/AI-USAGE.md)

PaddleMatch is a web application that helps pickleball players find suitable paddles and connect with other players based on their preferences. It provides paddle recommendations, player matchmaking, and a leaderboard using real data stored in a PostgreSQL database.

**Live site:** https://ryence07.github.io/PaddleMatch/  
**API:** [API link](https://final-project-template-ap0w.onrender.com)  
**Demo video:** [PaddleMatch Demo](https://drive.google.com/drive/folders/17jWYAvV4oCgVH8NHXdZHq_b09t4mJNYW?usp=sharing)

<img width="1366" height="901" alt="home-desktop" src="https://github.com/user-attachments/assets/2912ef88-9a63-48e6-9c1a-6dd4ef056ec3" />
<img width="1366" height="944" alt="signup-desktop" src="https://github.com/user-attachments/assets/db9e8d43-0267-48c5-a15e-5a798db65500" />
<img width="1366" height="769" alt="login-desktop" src="https://github.com/user-attachments/assets/133f5a15-1d74-4506-9b99-45e4cc491adb" />
<img width="1366" height="1393" alt="paddle-match-desktop" src="https://github.com/user-attachments/assets/74ca2855-ba26-444c-9c49-83dec500b539" />
<img width="1366" height="1435" alt="player-match-desktop" src="https://github.com/user-attachments/assets/6a853546-4622-4b23-bad1-69d795721576" />
<img width="1366" height="769" alt="leaderboard-desktop" src="https://github.com/user-attachments/assets/deefd844-9cdf-4944-b48c-da4b676b9d7b" />

---

## What it does

- Recommends paddles based on skill level, playing style, and budget
- Shows paddle details and information
- Allows users to create individual accounts
- Allows users to log in and log out
- Allows players to find other players based on their preferences
- Allows users to send match requests
- Allows players to accept match requests
- Allows players to record completed match results
- Automatically updates wins, losses, and points after a completed match
- Displays player rankings through the leaderboard

---

## Built with

React and Vite on the front end, Express and Node.js on the back end, and PostgreSQL using Neon for the database.

The frontend is deployed on GitHub Pages and the Express API is deployed on Render.

---

## Demo mode

The project originally used frontend sample data during development. The current version uses the real Express API and PostgreSQL database.

The client can still be configured to use the mock API for local frontend development by setting:

```env
VITE_USE_MOCK_API=true
```

When:

```env
VITE_USE_MOCK_API=false
```

the frontend connects to the Express API using `VITE_API_BASE_URL`.

The deployed version uses the real API.

---

## Running it yourself

### Frontend

From the project root:

```bash
cd client
npm install
npm run dev
```

The frontend runs at:

```
http://localhost:5173
```

### Backend

Open another terminal:

```bash
cd server
npm install
npm run dev
```

The Express API runs at:

```
http://localhost:3000
```

You can check if the API is running by opening:

```
http://localhost:3000/healthz
```

### Database

PaddleMatch uses PostgreSQL.

The production database is hosted using Neon. For local development, a PostgreSQL database can be used by providing a valid `DATABASE_URL`.

The database schema is located in:

```
server/db/schema.sql
```

The database contains tables for:

- players
- paddles
- matches
- sessions

---

## Environment variables

Do not commit real credentials or passwords. Use placeholder values in `.env.example`.

### Client

Create `client/.env`:

```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3000
```

| Name | Where | Purpose |
|------|-------|---------|
| VITE_USE_MOCK_API | Client | Controls whether the frontend uses mock data or the real API |
| VITE_API_BASE_URL | Client | URL of the Express API |

For the deployed application, `VITE_API_BASE_URL` points to the deployed Render API.

### Server

| Name | Where | Purpose |
|------|-------|---------|
| DATABASE_URL | Server | PostgreSQL connection string |
| CORS_ORIGINS | Server | Allowed frontend origins |
| NODE_ENV | Server | Server environment |
| PORT | Server | Port used by the server; provided by the hosting platform in production |
| APP_USERNAME | Server | Username for deployment Basic Authentication |
| APP_PASSWORD | Server | Password for deployment Basic Authentication |

Never place database passwords or other secrets in frontend `VITE_` variables because those values are included in the built frontend.

---

## Features and usage

### Paddle Match

Users can select their:

- Skill level
- Playing style
- Budget

The application uses these preferences to display suitable paddle recommendations.

Users can open a paddle's details to view additional information.

### Player Match

Users must be logged in to use the player matching features.

The Player Match page displays available players and information such as:

- Name
- Skill level
- Playing style
- Availability
- Wins
- Losses

A logged-in user can send a match request to another player.

A player can accept a pending match request.

After a match is completed, the result can be recorded. The application then updates the players' statistics.

The winner receives:

- +1 win
- +3 points

The losing player receives:

- +1 loss

### Leaderboard

The Leaderboard displays players using their stored statistics and points.

The information comes from the PostgreSQL database rather than hardcoded frontend data.

---

## API endpoints

### Authentication

| Method | Path | What it does |
|--------|------|---------------|
| POST | /api/auth/register | Creates a new player account |
| POST | /api/auth/login | Logs a player in and creates a session |
| GET | /api/auth/me | Returns the currently authenticated player |
| POST | /api/auth/logout | Logs the current player out |

### Health checks

| Method | Path | What it does |
|--------|------|---------------|
| GET | /healthz | Checks whether the API is running |
| GET | /readyz | Checks whether the API and database are ready |

### Application API

| Method | Path | What it does |
|--------|------|---------------|
| GET | /api/paddles | Gets available paddles |
| GET | /api/paddles/:id | Gets a specific paddle |
| GET | /api/players | Gets player information |
| GET | /api/players/:id | Gets a specific player |
| POST | /api/matches | Sends a match request |
| GET | /api/matches | Gets match requests for the authenticated player |
| POST | /api/matches/:id/accept | Accepts a match request |
| POST | /api/matches/:id/decline | Declines a match request |
| POST | /api/matches/:id/result | Records the result of a completed match |

Protected endpoints require an authenticated session.

---

## Deploying

### Client

The frontend is deployed to GitHub Pages using the existing GitHub Actions workflow.

Live site:

```
https://ryence07.github.io/PaddleMatch/
```

### API

The Express API is deployed on Render.

API:

```
https://final-project-template-ap0w.onrender.com
```

### Database

The PostgreSQL database is hosted using Neon.

The API connects to the database using the `DATABASE_URL` environment variable configured on the server.

---

## Project structure

```text
client/                         React frontend built with Vite
├── public/images/              Images and paddle assets
├── src/
│   ├── api/                    API and mock API files
│   ├── components/             Reusable UI components
│   ├── data/                   Frontend paddle and player data
│   ├── pages/                  Main application pages
│   ├── App.jsx                 Application routes
│   ├── main.jsx                React entry point
│   └── styles.css              Global styles
├── .env.example                Frontend environment variables
├── package.json                Frontend dependencies and scripts
└── vite.config.js              Vite configuration

server/                         Express backend and database
├── db/                         Database connection, schema, and seed files
├── .env.example                Backend environment variables
├── Dockerfile                  Container configuration
├── package.json                Backend dependencies and scripts
├── paddlesRepo.js              Paddle database operations
├── playersRepo.js              Player database operations
└── server.js                   Express server and API routes

docs/                           Project documentation
├── assets/                     Screenshots and design assets
├── 01-proposal.md              Project proposal
├── 02-mockup.md                UI mockups
├── 03-design-system.md         Design system
├── 04-weekly-reports.md        Weekly progress reports
├── 05-demo-video.md            Demo video information
├── 06-security-and-privacy.md  Security and privacy checklist
└── README.md                   Documentation guide

AI-USAGE.md
LICENSE
README.md
START-HERE.md
compose.yml
.env.example
.gitignore
```

---

## Architecture

PaddleMatch uses a three-part architecture.

The React and Vite frontend provides the user interface and communicates with the Express API. The Express backend handles authentication, player matching, paddle and player data, and match results. PostgreSQL stores the player, paddle, match, and session data.

```
React + Vite
     |
     v
Express API
     |
     v
PostgreSQL / Neon
```

The frontend is hosted on GitHub Pages, while the Express API is hosted on Render and the PostgreSQL database is hosted on Neon.

---

## Known issues and next steps

- The application is ready for final submission and demonstration.
- The deployed application has been tested with the main user and match workflows.
- Future improvements may include further testing and additional features.

---

## What I would do next

1. Continue improving PaddleMatch based on future testing and feedback.
2. Add more features or refinements if the project is continued after the course.
3. Maintain and update the application as needed.

---

## Author

Cortez, Ryence S.
CS-403 — 2215-6APSI
Holy Angel University

---

## AI use

This project was developed with assistance from ChatGPT for coding guidance, debugging, frontend development, backend/API development, authentication, and deployment troubleshooting. I reviewed, tested, and modified the suggestions to fit the PaddleMatch project.

**AI assistant:** ChatGPT — used throughout development for coding assistance, debugging, implementation guidance, and troubleshooting.

See [AI-USAGE.md](https://github.com/Ryence07/PaddleMatch/blob/5d1661681835693d47cfec947b957cbbbc2fa4e1/AI-USAGE.md) for the complete record of AI use, including what was changed, where AI suggestions were incorrect, and which parts I worked on myself.
