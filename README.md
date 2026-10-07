# Premium Full Stack Developer Portfolio

## Overview
This project contains a premium, modern portfolio website for Prasanna Kumar built with React + Vite + TypeScript on the frontend and Node.js + Express + MongoDB on the backend.

## Quick start
Install dependencies once from the project root:

```bash
npm install --prefix client
npm install --prefix server
```

Start the frontend:

```bash
npm start
```

It will be available at `http://localhost:5173`.

## Frontend
cd client
npm install
npm run dev

## Backend
cd server
npm install
node index.js

## Environment
Copy `server/.env.example` to `server/.env` and update the values before using the contact form or admin dashboard. MongoDB must be running locally, or `MONGO_URI` must point to a hosted database.

The default local admin login is `admin@example.com` / `admin123`. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `JWT_SECRET` in `server/.env` before deploying.

## Features
- Hero section with profile image and animated CTA
- About, skills, projects, experience, education, certifications, and contact sections
- Contact form submission stored in MongoDB and emailed via Nodemailer
- Admin dashboard with JWT login, message viewing, marking read, and deletion
