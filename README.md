# Land Global Immigration

Production-ready MERN stack immigration consultancy website with a public marketing site and secure admin panel.

## Tech Stack

**Frontend:** React (Vite), React Router, Redux Toolkit, Axios, React Hook Form, Tailwind CSS, Framer Motion, React Helmet Async

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

## Setup

### 1. Backend

```bash
cd server
npm install
```

Create/update `.env` (a sample is already included):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/land_global_immigration
JWT_SECRET=your_strong_jwt_secret_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@landglobalimmigration.com
ADMIN_PASSWORD=Admin@12345
```

Seed default content and admin user:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

API runs at `http://localhost:5000`

### 2. Frontend

```bash
cd client
npm install --legacy-peer-deps
npm run dev
```

Website runs at `http://localhost:5173`

## Default Admin Credentials

- **URL:** `/admin/login`
- **Email:** `admin@landglobalimmigration.com`
- **Password:** `Admin@12345`

Change these in production via `.env` before seeding.

## Features

### Public Website
- Home, About, Services, Contact, Thank You pages
- Sticky responsive navigation
- Animated counters, testimonial slider, Framer Motion transitions
- Contact lead form with validation → saves to MongoDB → redirects to `/thank-you`
- WhatsApp floating button, back-to-top, SEO meta tags

### Admin Panel
- JWT authentication
- Dashboard stats
- Content Manager (Home / About / Contact)
- Services, Countries, Testimonials CRUD
- Lead Manager (view / delete)
- Media Manager (upload / replace / delete)

## Project Structure

```
client/   React frontend
server/   Express API + MongoDB models
```

## Production Notes

- Replace `JWT_SECRET` and admin credentials
- Set `CLIENT_URL` to your frontend domain
- Serve the Vite build behind HTTPS
- Point `MONGODB_URI` to a managed MongoDB instance
