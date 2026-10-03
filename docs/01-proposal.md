# Proposal

The submitted version is the Canvas answer for M6A1. This copy lives in the repository so the original plan and the current code can be kept together and updated as the project changes.

## App name

PaddleMatch

## What the app is for

PaddleMatch is a web app that helps beginner and recreational pickleball players find a suitable paddle based on their preferences and connect with other players who are looking for someone to play with.

## Who is it for

PaddleMatch is for beginner and recreational pickleball players who need help choosing a paddle or finding someone to play with.

When they open the app, they are trying to find a suitable paddle, discover compatible players, or check their player ranking.

## Sections or routes this app needs

| # | Section / route | What it is for |
| - | --- | --- |
| 1 | Home `/` | Introduces PaddleMatch and provides access to the main features of the application. |
| 2 | Paddle Match `/paddles` | Lets players enter their skill level, playing style, and budget to receive suitable paddle recommendations. |
| 3 | Player Match `/players` | Shows registered players and allows users to send and manage match requests. |
| 4 | Leaderboard `/leaderboard` | Displays players ranked by their points from completed matches. |

## State: what data does the app hold?

For the Paddle Match screen, the app manages the user's preferences and paddle recommendations. The application now also stores player account information, match requests, and match results through the backend and PostgreSQL database.

| Data | Shape (rough) | Who owns it (which component) | Changes when... |
| --- | --- | --- | --- |
| Player preferences | `{ skillLevel, playingStyle, budget }` | PaddleMatch | User changes or submits their preferences |
| Paddles | `[{ id, brand, model, price, description, weight, shape, power, control, spin }]` | PaddleMatch / API | Paddle data is loaded or filtered |
| Recommendations | `[{ id, matchScore }]` | PaddleMatch | User submits their preferences and receives recommendations |
| Selected paddle | `paddleId` | PaddleMatch | User selects a recommended paddle |
| Player account | `{ id, username, name, skillLevel, playingStyle, availability, wins, losses, points }` | Login / Player Match / API | User registers, logs in, or their match statistics change |
| Match requests | `[{ id, requester, opponent, status }]` | Player Match / API | User sends or accepts a match request |
| Match result | `{ matchId, winnerId }` | Player Match / API | A completed match is recorded |

## What each screen contains

For the most important screen, Paddle Match contains:

- Block 1: Short introduction explaining the paddle matching feature.
- Block 2: Preference form for skill level, playing style, and budget.
- Block 3: Recommended paddle cards showing basic paddle information and match percentage.
- Block 4: Paddle details modal showing its specifications, price, short description, match percentage, and why it was recommended.

The Player Match screen also contains player cards, player information, match requests, and controls for accepting and recording matches.

The Leaderboard screen contains player rankings based on points from completed matches.

## Content you need to gather

- Paddle information such as brand, model, price, weight, shape, power, control, spin, description, and images.
- Player information such as name, username, skill level, playing style, availability, wins, losses, and points.
- Paddle images and basic visual assets such as the PaddleMatch logo.
- Match data for player requests and completed matches.

## Hosting

The application is divided into three main hosted parts:

| Part | Hosting | Purpose |
| --- | --- | --- |
| Frontend | GitHub Pages | Hosts the React/Vite PaddleMatch web application. |
| API | Render | Hosts the Express backend and handles the application's API requests. |
| Database | Neon PostgreSQL | Stores player accounts, paddle data, sessions, match requests, and match results. |

The frontend and API are hosted separately because GitHub Pages is used for the frontend while the Express API requires a server environment.

## Demo mode

The project template originally included demo mode so the frontend could run using mock API data while the backend and database were still being developed.

PaddleMatch has now moved out of demo mode. The current application uses the real Express API hosted on Render and the PostgreSQL database hosted on Neon.

The deployed version does not rely on mock player, paddle, or match data.

## Authentication and security

The application now uses individual PaddleMatch player accounts instead of relying on a hardcoded player.

Players can register with their name, username, password, skill level, playing style, and availability. Login creates a session token that is used when accessing protected application features.

The deployed application also uses HTTP Basic Authentication as a private deployment gate. The deployment username and password are stored as environment variables on the hosting provider and are not stored in the public repository.

Database queries that use user input use parameterized queries, and server error responses do not expose stack traces or database connection details.

## Changes from the original proposal

The original M6A1 proposal focused on paddle recommendations, player matchmaking, and the leaderboard.

During development, the project was expanded to include:

- Individual player registration and login.
- PostgreSQL database storage.
- Session-based player authentication.
- Match request and acceptance workflow.
- Match result recording.
- Automatic updates to player wins, losses, and points.
- Database-based leaderboard data.
- Backend API deployment on Render.
- Frontend deployment on GitHub Pages.
- Private deployment authentication.

These changes were added as the frontend was connected to the backend and database.

## One risk

The original main risk was keeping the paddle matching feature simple but useful for recommendations. The app uses a simple preference-based matching system rather than a complex algorithm so that the feature stays manageable within the project scope.

As development continued, the main technical challenges shifted toward connecting the frontend to the backend, setting up PostgreSQL, implementing authentication, and deploying the complete application.

## Current status

The main features described in the original proposal have been implemented and connected to the backend and database.

PaddleMatch currently has a React/Vite frontend, Express API, PostgreSQL database, player accounts, paddle recommendations, player matchmaking, match tracking, and a leaderboard.