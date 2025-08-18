# OFRASAT - Deployment Guide

## 🖥️ Local PC Setup

### Prerequisites
- Node.js 18+
- PostgreSQL (local installation)
- Git

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd ofrasat
npm install
```

### Step 2: Setup Local Database
```bash
# Install PostgreSQL locally
# Create database
createdb ofrasat
```

### Step 3: Environment Configuration
Create `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-local-secret-key
DATABASE_URL="postgresql://postgres:password@localhost:5432/ofrasat"
```

### Step 4: Initialize Database
```bash
npm run db:push
npm run db:seed
```

### Step 5: Start Development
```bash
npm run dev
```
**Access**: http://localhost:3000

---

## ☁️ Vercel Deployment

### Step 1: Database Setup
1. Create PostgreSQL database (Neon, Supabase, or Railway)
2. Get connection string

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Step 3: Environment Variables in Vercel
Add in Vercel Dashboard → Settings → Environment Variables:
```env
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=secure-production-secret
DATABASE_URL="postgresql://user:pass@host:5432/db"
```

### Step 4: Initialize Production Database
```bash
# After deployment, run once:
vercel env pull .env.local
npm run db:push
npm run db:seed
```

### Alternative: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/ofrasat)

**Note**: Add environment variables before first deployment

---

## 🔑 Default Login (Both Environments)
- **Email**: pangolongomo@gmail.com
- **Password**: buxrif-cudda9-ravsAc
- **Role**: SUPERADMIN
- **Dashboard**: `/dashboard`

## 🛠️ Available Commands
```bash
npm run dev              # Local development
npm run build            # Production build
npm run db:studio        # Database GUI
npm run db:push          # Push schema
npm run db:seed          # Seed data
npm run db:migrate       # Create migration
```

## 📊 Database Providers (for Vercel)
- **Neon**: https://neon.tech (Recommended)
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app
- **PlanetScale**: https://planetscale.com

## 🚨 Troubleshooting
- **Local**: Check PostgreSQL is running
- **Vercel**: Verify environment variables
- **Database**: Run `npm run db:studio` to inspect