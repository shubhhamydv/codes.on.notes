# Codes on Notes 🚀
### DSA Learning Platform — Full Stack Setup Guide

> LeetCode-style problems with visual explanations and downloadable Hinglish PDFs  
> Built with Next.js 14 · Prisma · PostgreSQL · NextAuth · Stripe · Cloudinary

---

## 📁 Project Structure

```
codes-on-notes/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts   ← NextAuth handler
│   │   │   └── register/route.ts        ← User signup
│   │   ├── problems/
│   │   │   ├── route.ts                 ← List / Create problems
│   │   │   └── [slug]/
│   │   │       ├── route.ts             ← Get / Edit / Delete problem
│   │   │       └── solve/route.ts       ← Mark solved + streak update
│   │   ├── bookmarks/route.ts           ← Toggle bookmarks
│   │   ├── execute/route.ts             ← Judge0 code execution
│   │   ├── roadmap/route.ts             ← DSA roadmap
│   │   ├── users/me/route.ts            ← User dashboard stats
│   │   ├── admin/upload/route.ts        ← PDF/image upload (Cloudinary)
│   │   └── stripe/
│   │       ├── checkout/route.ts        ← Create Stripe session
│   │       └── webhook/route.ts         ← Handle payment events
│   ├── problems/                        ← Problems page
│   ├── roadmap/                         ← Roadmap page
│   ├── playground/                      ← Code playground
│   ├── dashboard/                       ← User dashboard
│   ├── premium/                         ← Premium plans
│   └── admin/                           ← Admin dashboard
├── components/                          ← Reusable UI components
├── lib/
│   ├── prisma.ts                        ← Prisma client singleton
│   ├── auth.ts                          ← NextAuth config
│   ├── cloudinary.ts                    ← File upload helper
│   ├── stripe.ts                        ← Payment logic
│   └── streak.ts                        ← Streak tracking
├── prisma/
│   ├── schema.prisma                    ← Full database schema
│   └── seed.ts                          ← Seed data
├── middleware.ts                        ← Route protection
├── types/index.ts                       ← Shared TypeScript types
└── .env.example                         ← Environment variable template
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ → https://nodejs.org
- **PostgreSQL** v14+ → https://postgresql.org (or use Neon.tech free cloud DB)
- **npm** or **pnpm**

---

## 🚀 Step-by-Step Local Setup

### Step 1 — Clone & Install

```bash
# Clone the repo
git clone https://github.com/yourusername/codes-on-notes.git
cd codes-on-notes

# Install all dependencies
npm install
```

---

### Step 2 — Set Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Open `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `NEXTAUTH_SECRET` | Run: `openssl rand -base64 32` |
| `DATABASE_URL` | Your PostgreSQL connection string |
| `GOOGLE_CLIENT_ID/SECRET` | [console.cloud.google.com](https://console.cloud.google.com) |
| `GITHUB_ID/SECRET` | [github.com/settings/developers](https://github.com/settings/developers) |
| `CLOUDINARY_*` | [cloudinary.com](https://cloudinary.com) → Dashboard |
| `STRIPE_*` | [dashboard.stripe.com](https://dashboard.stripe.com) |
| `JUDGE0_API_KEY` | [rapidapi.com/judge0](https://rapidapi.com/judge0-official/api/judge0-ce) |

---

### Step 3 — Set Up PostgreSQL

**Option A: Local PostgreSQL**
```bash
# Create database
psql -U postgres
CREATE DATABASE codesonnotes;
\q

# Set in .env.local:
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/codesonnotes
```

**Option B: Neon (Free Cloud DB — Recommended)**
1. Go to [neon.tech](https://neon.tech) → Create account → New Project
2. Copy the connection string
3. Paste into `.env.local` as `DATABASE_URL`

---

### Step 4 — Run Database Migrations

```bash
# Push the schema to your database
npm run db:push

# OR for production-grade migrations:
npm run db:migrate
```

---

### Step 5 — Seed the Database

```bash
npm run db:seed
```

This creates:
- **Admin account**: `admin@codesonnotes.in` / `admin123`
- **Demo account**: `demo@codesonnotes.in` / `demo123`
- 13 topics, 2 sample problems, full roadmap structure, and sample resources

---

### Step 6 — Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔐 OAuth Setup (Optional but Recommended)

### Google OAuth
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create project → APIs & Services → Credentials → OAuth 2.0 Client
3. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret into `.env.local`

### GitHub OAuth
1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. New OAuth App → Homepage: `http://localhost:3000`
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret into `.env.local`

---

## 💳 Stripe Setup

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → Products
2. Create 3 products:
   - **FAANG DSA Sheet** → ₹499 one-time
   - **Blind 75 Visual Guide** → ₹349 one-time
   - **Full Access Bundle** → ₹999 one-time
3. Copy each product's Price ID into `.env.local`
4. For local webhook testing:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # Mac
# or download from: https://stripe.com/docs/stripe-cli

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook secret shown and add to .env.local
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🔧 Useful Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server

npm run db:push      # Sync schema to DB (dev only)
npm run db:migrate   # Create migration files
npm run db:studio    # Open Prisma Studio (visual DB editor)
npm run db:seed      # Seed the database
```

---

## 📊 Prisma Studio (Visual DB Editor)

```bash
npm run db:studio
```
Opens at http://localhost:5555 — view and edit all tables visually.

---

## 🌐 Deploy to Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourusername/codes-on-notes.git
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)

### Step 3 — Add Environment Variables
In Vercel dashboard → Settings → Environment Variables:
- Add all variables from `.env.example`
- Update `NEXTAUTH_URL` to your Vercel URL: `https://your-app.vercel.app`
- Update OAuth callback URLs to your Vercel domain

### Step 4 — Deploy
```bash
vercel --prod
```

### Step 5 — Run Migrations on Production
```bash
# One-time: run migrations against production DB
DATABASE_URL=your-production-db-url npx prisma migrate deploy
DATABASE_URL=your-production-db-url npx tsx prisma/seed.ts
```

---

## 📱 Admin Dashboard

Access at: `/admin` (requires ADMIN role)

**Features:**
- Add / Edit / Delete problems
- Upload PDFs to Cloudinary
- Manage topics and roadmap
- View all users
- Manage resources

Change user role to ADMIN:
```bash
# In Prisma Studio, or run:
npx prisma studio
# Find your user → change role to ADMIN
```

---

## 🗄️ Database Schema Overview

```
User ──────────── UserProblem (solved)
  │             └─ Bookmark
  │             └─ Streak
  │             └─ Submission
  │             └─ RoadmapProgress
  │
Problem ──────── Solution (per language)
  │             └─ Topic
  │             └─ pdfUrl (Cloudinary)
  │             └─ visualCode (sandboxed)
  │
RoadmapLevel ─── RoadmapTopic ─── Topic
Resource ──────── fileUrl (Cloudinary)
```

---

## 🧪 Test Credentials

After seeding:

| Role | Email | Password |
|---|---|---|
| Admin | admin@codesonnotes.in | admin123 |
| User | demo@codesonnotes.in | demo123 |

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `next-auth` | Authentication (Google, GitHub, Email) |
| `@prisma/client` | Database ORM |
| `bcryptjs` | Password hashing |
| `cloudinary` | PDF & image storage |
| `stripe` | Payments |
| `zod` | API input validation |
| `zustand` | Client state management |
| `framer-motion` | Animations |

---

## 🙋 Support

- Instagram: [@codes.on.notes](https://instagram.com/codes.on.notes)
- YouTube: [@codes.on.notes](https://youtube.com/@codes.on.notes)

Built with ❤️ for the DSA community.
