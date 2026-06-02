# NeoKarir API Documentation

This documentation provides an overview of the available API endpoints in the NeoKarir backend service. All endpoints expect and return JSON format unless otherwise specified (e.g., file uploads). 

Endpoints that require authentication expect a valid Bearer token in the `Authorization` header (`Authorization: Bearer <token>`).

---

## Base Path
Routes are typically mounted at a base path (e.g., `/api` or `/api/v1`), followed by the specific route prefixes defined below.

---

## 1. Authentication (`/auth`)
Handles user registration, login, and session management.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/auth/register` | No | Register a new user account. Requires `email` and `password`. |
| `POST` | `/auth/login` | No | Authenticate user and receive an access token. Requires `email` and `password`. |
| `POST` | `/auth/change-password` | Yes | Change the password for the currently authenticated user. Requires `newPassword`. |
| `GET`  | `/auth/me` | Yes | Get the details of the currently authenticated user session. |

---

## 2. Profile Management (`/profile`)
Handles user profile information, settings, and avatars.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/profile/me` | Yes | Retrieve the current user's complete profile data. |
| `PUT`  | `/profile/me` | Yes | Create or update (upsert) the current user's profile data. |
| `GET`  | `/profile/me/score` | Yes | Retrieve the profile completeness score for the current user. |
| `POST` | `/profile/avatar` | Yes | Upload and update the user's avatar image. Expects `multipart/form-data` with `avatar` field. |

---

## 3. CV Management & Analysis (`/cv`)
Handles CV/Resume uploads, parsing, and AI-based analysis.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/cv/me` | Yes | Retrieve the stored CV data for the current user. |
| `PUT`  | `/cv/me` | Yes | Create or update (upsert) the stored CV data manually. |
| `POST` | `/cv/upload` | Yes | Upload a CV file for storage. Expects `multipart/form-data` with `file` field. |
| `POST` | `/cv/analyze` | Yes | Upload and run standard analysis on a CV file. Expects `multipart/form-data` with `file` field. |
| `POST` | `/cv/smart-analyze` | Yes | Upload and run advanced smart analysis on a CV file. Expects `multipart/form-data` with `file` field. |

---

## 4. Career Recommendations (`/recommendation`)
AI-driven career role recommendations and learning roadmaps based on user profile.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/recommendation/me` | Yes | List the previously generated career recommendations for the user. |
| `POST` | `/recommendation/generate` | Yes | Trigger the AI engine to generate new career recommendations. |
| `GET`  | `/recommendation/roadmap/:jobId` | Yes | Get a detailed learning roadmap to achieve a specific recommended job role. |

---

## 5. Job Matching (`/jobmatch`)
Matches user profiles against available job market listings.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/jobmatch/run` | Yes | Execute the job matching algorithm to find suitable job postings. |

---

## 6. Skill Gap Analysis (`/skillgap`)
Analyzes the gap between a user's current skills and their target career role.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/skillgap/me` | Yes | Retrieve the latest skill gap analysis results for the user. |
| `POST` | `/skillgap/analyze` | Yes | Trigger a new skill gap analysis against a specific target role or domain. |

---

## 7. AI Chat Assistant (`/chat`)
Endpoints for interacting with the NeoKarir AI career assistant.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/chat/` | Yes | List all chat sessions for the current user. |
| `POST` | `/chat/` | Yes | Create a new chat session. |
| `POST` | `/chat/:chatId/messages` | Yes | Send a message to an existing chat session and receive the AI's reply. |

---

## 8. Jobs Market & Trends (`/market`)
Provides access to job postings, market analytics, and AI trend forecasting.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/market/` | No | Get an overview of the current job market. |
| `GET`  | `/market/jobs` | Yes | List available job postings. |
| `GET`  | `/market/jobs/search` | Yes | Search job postings with query parameters. |
| `GET`  | `/market/jobs/:id` | Yes | Get detailed information for a specific job posting. |
| `GET`  | `/market/trend/domains` | Yes | Retrieve available domains for AI trend forecasting. |
| `POST` | `/market/trend/forecast` | Yes | Request AI-generated trend forecasting data for a specific domain. |

---
*Note: This documentation was auto-generated based on the defined routes in the application source code.*

---

## Setup & Installation

Follow these steps to run the API locally and connect it to the database and AI services.

### 1. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 2. Environment Variables
Copy the provided `.env.example` file to create your own `.env` file:
```bash
cp .env.example .env
```
Fill in the variables in your `.env` file:
- **Database & Auth (Supabase)**: Fill in `SUPABASE_URL`, `SUPABASE_KEY`, and `DATABASE_URL` with your Supabase project credentials. This API uses Prisma to connect to a PostgreSQL database hosted on Supabase.
- **AI Microservices**: Provide the URLs to your running AI services (`AI_SERVICE_1_URL`, `AI_SERVICE_2_URL`, etc.). The frontend and this API use these to route specific AI requests.

### 3. Database Initialization (Prisma)
Generate the Prisma client based on your schema:
```bash
npm run prisma:generate
```
If you need to push schema changes to your database, you can use Prisma migration commands (e.g., `npx prisma db push`). To view your data, run:
```bash
npm run prisma:studio
```

### 4. Running the Server
Start the development server with auto-reload (nodemon):
```bash
npm run dev
```
Or start it normally:
```bash
npm start
```
By default, the server will run on the `PORT` specified in your `.env` file (e.g., `http://localhost:5000`).
