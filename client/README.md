<div align="center">
  <h1><img src="https://project-management-gs.vercel.app/favicon.ico" width="20" height="20" alt="project-management Favicon">
   project-management</h1>
  <p>
    An open-source project management platform built with ReactJS and Tailwind CSS.
  </p>
  <p>
    <a href="https://github.com/GreatStackDev/project-management/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/GreatStackDev/project-management?style=for-the-badge" alt="License"></a>
    <a href="https://github.com/GreatStackDev/project-management/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome"></a>
    <a href="https://github.com/GreatStackDev/project-management/issues"><img src="https://img.shields.io/github/issues/GreatStackDev/project-management?style=for-the-badge" alt="GitHub issues"></a>
  </p>
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 📝 Features <a name="-features"></a>

- **Multiple Workspaces:** Allow multiple workspaces to be created, each with its own set of projects, tasks, and members.
- **Project Management:** Manage projects, tasks, and team members.
- **Analytics:** View project analytics, including progress, completion rate, and team size.
- **Task Management:** Assign tasks to team members, set due dates, and track task status.
- **User Management:** Invite team members, manage user roles, and view user activity.

## 🛠️ Tech Stack <a name="-tech-stack"></a>

### Frontend
- **Framework:** ReactJS + Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** Lucide React for icons
- **State Management:** Redux Toolkit
- **Authentication:** Clerk

### Backend
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma v7
- **Authentication:** Clerk Express
- **Serverless Functions:** Inngest (webhooks)

## 🚀 Getting Started <a name="-getting-started"></a>

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- Clerk account

### 1. Clone and Install

```bash
# Install client dependencies
cd client
npm install --legacy-peer-deps

# Install server dependencies
cd ../server
npm install
```

### 2. Environment Variables

Create `.env` files:

**Client (`client/.env`):**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

**Server (`server/.env`):**
```env
NODE_ENV=development
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret

# Neon PostgreSQL
DATABASE_URL="postgresql://..."  # Pooled connection
DIRECT_URL="postgresql://..."    # Direct connection for Prisma CLI

# Inngest
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_signing_key
```

### 3. Database Setup

```bash
cd server
npx prisma db push
npx prisma generate
```

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Inngest Dev Server: http://localhost:5000/api/inngest

---

## 🌐 Deployment <a name="-deployment"></a>

### Vercel (Recommended)

**Frontend:**
1. Connect your GitHub repo to Vercel
2. Set framework preset to **Vite**
3. Add environment variable: `VITE_CLERK_PUBLISHABLE_KEY`
4. Deploy

**Backend:**
1. Create separate Vercel project for `server/` folder
2. Set all server environment variables
3. Add webhook URL in Clerk dashboard: `https://your-api.vercel.app/api/inngest`

### Environment Variables for Production

| Variable | Frontend | Backend | Description |
|----------|----------|---------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | ✅ | ❌ | Clerk public key |
| `CLERK_SECRET_KEY` | ❌ | ✅ | Clerk secret key |
| `CLERK_WEBHOOK_SECRET` | ❌ | ✅ | Webhook verification |
| `DATABASE_URL` | ❌ | ✅ | Neon pooled URL |
| `DIRECT_URL` | ❌ | ✅ | Neon direct URL |
| `INNGEST_EVENT_KEY` | ❌ | ✅ | Inngest events |
| `INNGEST_SIGNING_KEY` | ❌ | ✅ | Inngest signing |

---

## 🤝 Contributing <a name="-contributing"></a>

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for more details on how to get started.

---

## 📜 License <a name="-license"></a>

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.
