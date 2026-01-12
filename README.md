# GigFlow — Mini Freelance Marketplace

A full-stack mini freelance marketplace platform (GigFlow) — Clients post gigs, Freelancers submit bids, and Clients hire freelancers. This repository contains both backend (Node/Express/MongoDB) and frontend (React + Vite + Tailwind CSS) implementations for the ServiceHive internship assignment.

---

## Project Overview

GigFlow lets users:
- Browse open gigs (public)
- Sign up / sign in (JWT stored in HttpOnly cookie)
- Authenticated users can post gigs and submit bids
- Gig owners can review bids and hire a freelancer
- Hiring is atomic: chosen bid becomes `hired`, other bids become `rejected`, and gig status becomes `assigned` (MongoDB transaction)

Bonus features implemented:
- Transactional hiring using MongoDB transactions to avoid race conditions
- Bid and gig updates are populated with user data

---

## Tech Stack

- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Frontend: React (Vite), Tailwind CSS
- State management: Redux Toolkit
- HTTP: Axios (withCredentials: true for cookie auth)
- Auth: JWT tokens in HttpOnly cookies

---

## Repo Structure

Top-level folders:

- backend/ — Express API
  - controllers/, models/, routes/, middleware/, config/
  - server.js (app entry)
- frontend/ — React app (Vite)
  - src/ with pages, components, store (Redux slices)

(See the workspace tree for full structure)

---

## Setup & Run (Windows)

Prerequisites:
- Node.js v16+
- npm
- MongoDB instance (local or cloud)

1. Clone repository

2. Backend setup

- Open terminal in `backend/`
- Copy example env and set values: create `.env` based on `.env.example` (see backend folder)
  - Required variables: MONGO_URI, JWT_SECRET, PORT (optional)
- Install dependencies:
  npm install
- Start server (dev):
  npm run dev

By default the backend listens on http://localhost:5000 (see server.js)

3. Frontend setup

- Open terminal in `frontend/`
- Copy frontend `.env.example` to `.env.local` and set VITE_API_URL (e.g. http://localhost:5000/api)
- Install dependencies:
  npm install
- Start dev server:
  npm run dev

Frontend will run (Vite) at http://localhost:5173 (or printed URL)

Notes:
- Axios is configured with withCredentials: true. Ensure backend CORS allows the frontend origin and credentials.

---

## Environment Variables

Backend (create `backend/.env`):

- MONGO_URI=your_mongo_connection_string
- JWT_SECRET=some_long_secret
- PORT=5000

Frontend (create `frontend/.env.local`):

- VITE_API_URL=http://localhost:5000/api

Also see `frontend/.env.example` and any `.env.example` files included.

---

## API Reference (used by frontend)

Auth
- POST /api/auth/register — register (returns user + sets cookie)
- POST /api/auth/login — login (returns user + sets cookie)
- POST /api/auth/logout — logout (clears cookie)
- GET  /api/auth/me — get current user (protected)

Gigs
- GET  /api/gigs — list open gigs (supports `?search=`)
- GET  /api/gigs/:id — get single gig by id
- POST /api/gigs — create new gig (protected)

Bids
- POST  /api/bids — submit a bid (protected)
- GET   /api/bids/:gigId — get all bids for a gig (protected; owner sees bids)
- PATCH /api/bids/:bidId/hire — hire logic (protected; transactional)

Notes:
- Protected endpoints require the JWT cookie. The frontend sends credentials with requests.

---

## Database Models (summary)

User
- name, email (unique), password (hashed)

Gig
- title, description, budget, ownerId (User ref), status (open | assigned)

Bid
- gigId (Gig ref), freelancerId (User ref), price, message, status (pending|hired|rejected)

---

## Important Implementation Details

- Authentication: JWT token is set as an HttpOnly cookie on register/login. Backend exposes `/auth/me` to retrieve current user.
- Hiring flow: Implemented using MongoDB transactions (session) so that marking the chosen bid as `hired`, rejecting other bids, and updating the gig status to `assigned` happen atomically.
- Frontend state: Redux Toolkit slices for auth, gigs, and bids include async thunks to call the backend and store results.
- Public browsing: Browsing gigs and gig details is available without authentication. Posting gigs or submitting bids requires sign-in.

---

## UX Notes / How to use

- Browse gigs at `/gigs` (public)
- Click a gig to view details; owner info and status are shown
- Sign up / Sign in to post gigs (`/create-gig`) or submit bids (Gig detail page)
- Dashboard (`/dashboard`) shows gigs you posted; clicking a gig lists bids and allows hiring

---
Note
---

Built for the ServiceHive Full Stack Internship Assignment — January 2026.
