# Land Global Immigration

Production-ready MERN stack immigration consultancy website with a public marketing site and secure admin panel.

## Tech Stack

**Frontend:** React (Vite), React Router, Redux Toolkit, Axios, React Hook Form, Tailwind CSS, Framer Motion, React Helmet Async

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js 18+
- MongoDB Atlas connection string (required for Vercel)

## Local Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then edit MONGODB_URI / secrets
npm run seed
npm run dev
```

API: `http://localhost:5000`

### 2. Frontend

```bash
cd client
npm install --legacy-peer-deps
npm run dev
```

Site: `http://localhost:5173`

## Default Admin Credentials

- **URL:** `/admin/login`
- **Email:** `admin@landglobalimmigration.com`
- **Password:** `Admin@12345`

Change these before seeding production.

## Deploy to Vercel (Frontend + Backend)

Create **two** Vercel projects from the same GitHub repo.

### A) Backend project

1. [vercel.com/new](https://vercel.com/new) → import `landglobalimmigration`
2. **Root Directory:** `server`
3. Framework: Other
4. Environment variables:

| Name | Value |
|------|--------|
| `MONGODB_URI` | `mongodb+srv://...@cluster0....mongodb.net/land_global_immigration?retryWrites=true&w=majority` |
| `JWT_SECRET` | strong random secret |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | your frontend URL (set after frontend deploy, e.g. `https://xxx.vercel.app`) |
| `ADMIN_EMAIL` | admin email |
| `ADMIN_PASSWORD` | admin password |

5. Deploy → copy the API URL (e.g. `https://lgi-api.vercel.app`)
6. Confirm health: `https://YOUR-API.vercel.app/api/health`
7. From your PC (once): seed Atlas

```bash
cd server
# .env must use the same MONGODB_URI
npm run seed
```

**Atlas Network Access:** allow `0.0.0.0/0` (or Vercel IPs) so serverless can connect.

### B) Frontend project

1. Import the same repo again
2. **Root Directory:** `client`
3. Framework: Vite
4. Environment variables:

| Name | Value |
|------|--------|
| `VITE_API_URL` | `https://YOUR-API.vercel.app/api` |
| `VITE_UPLOAD_URL` | `https://YOUR-API.vercel.app` |

5. Deploy
6. Update backend `CLIENT_URL` to the frontend URL and redeploy backend

### Upload note

On Vercel, disk uploads go to `/tmp` and are **not permanent**. Prefer Unsplash/CDN URLs or add Cloudinary/S3 later for admin media uploads.

## Project Structure

```
client/   React frontend (Vercel project 1)
server/   Express API (Vercel project 2)
```
