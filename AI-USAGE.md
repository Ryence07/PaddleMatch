# AI usage

## 1. How I used AI

### 2026-09-30 - GitHub Pages logout redirect

- **Tool:** ChatGPT
- **What I asked for:** Help fixing the logout redirect because logging out from the GitHub Pages deployment was going to the wrong `/login` path.
- **What it gave back:** Guidance for changing the logout redirect to use the Vite base URL so that the login page would open correctly under the `/PaddleMatch/` GitHub Pages path.
- **What I kept, what I changed, and why:** I applied the suggested redirect fix and tested the logout flow on the GitHub Pages deployment. I kept the base URL approach because it correctly handles the repository path used by the deployed application.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/a66faa7807c7e83dca3d49e9cad0a2e1fa9dfb4f

### 2026-09-26 - Authentication and match functionality

- **Tool:** ChatGPT
- **What I asked for:** Help adding individual user authentication and match functionality to PaddleMatch, including login, registration, protected API routes, match requests, accepting matches, and recording match results.
- **What it gave back:** Guidance and code suggestions for implementing authentication with player accounts, connecting the authenticated user to the match system, protecting API routes, and handling match requests and results.
- **What I kept, what I changed, and why:** I used the suggestions as a starting point and adapted them to my existing Express server, PostgreSQL database, and React frontend. I changed the implementation to use individual player accounts with password hashing and bearer session tokens. I also tested the match workflow and adjusted the code when needed.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/ff54e0c0a850fd82b12f8584d707c9ac72f58869

### 2026-09-23 - GitHub Pages routing

- **Tool:** ChatGPT
- **What I asked for:** Help fixing the React routing and deployment of PaddleMatch on GitHub Pages.
- **What it gave back:** Guidance for configuring the Vite base path and React Router so the application could work correctly under the GitHub Pages repository path.
- **What I kept, what I changed, and why:** I applied the suggested changes and tested the application through GitHub Pages. I kept the configuration that fixed the routing and allowed the pages to load correctly after deployment.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/7ee3c58a0f56161649b18518827f1131a2b04506

### 2026-09-23 - Frontend API authentication

- **Tool:** ChatGPT
- **What I asked for:** Help connecting authentication between the frontend and backend.
- **What it gave back:** Suggestions for handling authentication in the React frontend and sending authentication information when accessing protected API routes.
- **What I kept, what I changed, and why:** I adapted the suggestions to my existing API and frontend structure. I tested login and protected API requests and changed the code when necessary.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/c526d9b7956bb6eb20764ba6af3ff25667aa829b

### 2026-09-23 - Basic Auth protection

- **Tool:** ChatGPT
- **What I asked for:** Help adding authentication and protecting the backend API.
- **What it gave back:** Suggestions for authentication and protecting API routes from unauthorized access.
- **What I kept, what I changed, and why:** I used the suggestions as a starting point and adjusted the authentication implementation to fit my PaddleMatch backend and player data. I tested the protected routes before keeping the changes.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/5fcf8c29f4015d5304cb608a71bab7eccac6b32f

### 2026-09-23 - Express API and PostgreSQL connection

- **Tool:** ChatGPT
- **What I asked for:** Help connecting the PaddleMatch React frontend to the Express API and PostgreSQL database.
- **What it gave back:** Guidance and code suggestions for connecting the frontend to API endpoints and using database data in the application.
- **What I kept, what I changed, and why:** I adapted the suggestions to my existing Express server, PostgreSQL database, and React API structure. I tested the connection and changed the implementation when necessary.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/332cd2cdb710fd07a0dcb94b4eac8571bf8e0890

### 2026-09-20 - Player Match component

- **Tool:** ChatGPT
- **What I asked for:** Help creating the Player Match component and displaying player information in the application.
- **What it gave back:** Suggestions for the Player Match component structure, player information display, and layout.
- **What I kept, what I changed, and why:** I used the suggestions and modified the component to fit my existing project structure and design. I tested the player cards and adjusted the layout and styling to make them work properly.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/16998eda644fe849e2b9e5083886e70df4cb8520

### 2026-09-20 - PaddleMatch frontend

- **Tool:** ChatGPT
- **What I asked for:** Help developing the PaddleMatch React frontend, including the main pages, components, navigation, and layout.
- **What it gave back:** Code suggestions and guidance for organizing the React pages and components and implementing the PaddleMatch frontend.
- **What I kept, what I changed, and why:** I used the suggestions as a starting point and changed the code to match my PaddleMatch design and the professor-provided project template. I also tested the frontend and adjusted the code and styling when needed.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/77507958b7b37a16df2110225f3dc12c6fc2b0b6

## 2. Where the AI got it wrong

### Case 1 - Frontend dependency/build problem

- **What it gave me:** ChatGPT suggested changes for the frontend setup and dependencies while I was trying to get the PaddleMatch frontend to build correctly.
- **What was wrong with it:** The initial setup did not match the actual dependencies and project structure, which caused frontend build problems.
- **What I did instead:** I checked the project's actual dependencies and structure, fixed the frontend dependency/setup issues, and tested the build again.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/dca604f

### Case 2 - GitHub Pages routing

- **What it gave me:** The initial routing setup worked when running the application locally but did not fully account for the repository path used by GitHub Pages.
- **What was wrong with it:** The application had routing problems when opened through the GitHub Pages deployment because the project was hosted under `/final-project-template/` instead of the root `/` path.
- **What I did instead:** I changed the Vite base path and React Router configuration to use the deployment base path. I then rebuilt and tested the application on GitHub Pages.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/7ee3c58a0f56161649b18518827f1131a2b04506

### Case 3 - Initial authentication approach

- **What it gave me:** ChatGPT initially suggested using Basic Authentication as a simple way to protect the backend API.
- **What was wrong with it:** Basic Authentication was not suitable for the individual account system I wanted for PaddleMatch because the project needed separate player accounts, login, logout, and identification of the current user.
- **What I did instead:** I moved to individual player accounts with password hashing and bearer session tokens. I connected the frontend login system to the backend and used the authenticated player for protected features such as Player Match.
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/5fcf8c29f4015d5304cb608a71bab7eccac6b32f

## 3. Who wrote what

### Written by me

- **File:** client/src/pages/PaddleMatch.jsx
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/666a2f8a4867c2b2d19b8b0f709e97e9f4005bf3
- **What it does and why it is built this way:** I worked on the paddle display section of the Paddle Match page, including how the paddle information and images are shown. I used this structure to make the available paddles easier for users to view and compare.

### The AI-written part I understand best

- **File:** client/src/components/PlayerCard.jsx
- **Commit:** https://github.com/Ryence07/PaddleMatch/commit/16998eda644fe849e2b9e5083886e70df4cb8520
- **What it does and why we kept it:** The PlayerCard component displays a player's name, skill level, playing style, availability, wins, and losses. It also has a Match Up button that allows a user to send a match request. We kept it because it keeps the player information organized in a reusable card.
