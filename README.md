<div align="center">

  <div>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
    <br/>
    <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
    <img src="https://img.shields.io/badge/Shadcn/UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white"/>
    <img src="https://img.shields.io/badge/Zustand-18181B?style=for-the-badge&logo=zustand&logoColor=white"/>
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
  </div>

  <h2>Imagia</h2>

  <p>A full-stack MERN moodboard platform to search, collect, and share stunning high-resolution images.</p>

</div>


---

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Project Overview](#overview)  
2. 🔗 [Links](#links)  
3. 💡 [Features](#features)  
4. 🚀 [Next-Level Features](#next-level)  
5. 💻 [Tech Stack](#tech-stack)  
6. 📡 [API Endpoints](#api-endpoints)  
7. 📁 [Folder Structure](#folder-structure)  
8. 🤸 [Getting Started](#setup)  
9. 🔑 [Environment Variables](#env)

---

## ✨ <a name="overview">Project Overview</a>

**Imagia** is a full-stack MERN application (MongoDB, Express, React, Node.js) that goes beyond a simple image search.  
It allows users to search for high-resolution images via the Unsplash API, curate them into personal *moodboards* (called collections), and discover public collections created by other users.

---

## 🔗 <a name="links">Links</a>

- **Live Demo:** [https://imagia-self.vercel.app](https://imagia-self.vercel.app)  
- **GitHub Repository:** [https://github.com/sukijaa/Imagia](https://github.com/sukijaa/Imagia)

---

## 💡 <a name="features">Features</a>

This project includes all standard requirements for a MERN application, plus several advanced features to enhance the user experience.

### Core Functionality
- **Secure Authentication:** Full OAuth 2.0 flow with Passport.js, supporting Google and GitHub.  
- **Persistent Sessions:** Secure, cookie-based sessions using express-session so users stay logged in.  
- **Protected Routes:** Both frontend and backend routes are protected, redirecting unauthorized users.  
- **Unsplash API Integration:** Dynamically search for high-resolution images.  
- **Top Searches:** Homepage banner displays top 5 most frequent search terms across all users.

---

## 🚀 <a name="next-level">Next-Level Features</a>

- **Collections (Moodboards):** Save multi-selected images as a named *Collection* with title and description.  
- **Public vs. Private:** Collections can be Public (visible to all) or Private (owner-only).  
- **Discover Page:** A public feed of all user-created public collections, sorted by popularity (most likes).  
- **Like System:** Users can like/unlike collections, with real-time like count updates.  
- **User Dashboard:** View user’s Search History and their created Collections.  
- **Modern UI:** Built with TypeScript, Tailwind CSS, and Shadcn/ui for a polished responsive experience.  
- **Professional UX:** Includes skeletons, empty states, and toast notifications.  
- **Client-Side State:** Powered by Zustand for global state management.

---

## 💻 <a name="tech-stack">Tech Stack</a>

| Area | Technology |
|------|-------------|
| **Frontend** | React (Vite), TypeScript, Tailwind CSS, Shadcn/ui, Zustand, React Router, Axios |
| **Backend** | Node.js, Express, MongoDB (Mongoose), Passport.js, Express Session |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **APIs** | Unsplash API, Google OAuth 2.0, GitHub OAuth |

---

## 📡 <a name="api-endpoints">API Endpoints</a>

All protected endpoints require an active session cookie.

| Method | Endpoint | Protection | Description |
|--------|-----------|-------------|-------------|
| GET | `/api/auth/google` | Public | Initiates Google OAuth login |
| GET | `/api/auth/github` | Public | Initiates GitHub OAuth login |
| GET | `/api/auth/current_user` | Public | Gets the currently logged-in user |
| GET | `/api/auth/logout` | Public | Logs out the user |
| POST | `/api/search` | Protected | Submits a search term, logs it, returns Unsplash results |
| GET | `/api/search/top` | Protected | Gets 5 most popular search terms |
| GET | `/api/history` | Protected | Gets user's 20 most recent search terms |
| POST | `/api/collections` | Protected | Creates a new collection (moodboard) |
| GET | `/api/collections` | Protected | Gets all collections for the logged-in user |
| GET | `/api/collections/:id` | Public/Private | Gets a single collection |
| POST | `/api/collections/:id/like` | Protected | Toggles a like on a collection |
| DELETE | `/api/collections/:id` | Protected | Deletes a collection (owner only) |
| GET | `/api/discover` | Protected | Gets all public collections sorted by likes |

---

## 📁 <a name="folder-structure">Folder Structure</a>

```bash
/Imagia
├── client/         # React (Vite) Frontend
│   ├── src/
│   │   ├── components/  # Reusable components (Header, ImageCard, etc.)
│   │   ├── pages/       # All app pages (Home, Login, Dashboard, etc.)
│   │   ├── store/       # Zustand global state
│   │   ├── models/      # TypeScript interfaces
│   │   ├── main.tsx     # App entry
│   │   └── vercel.json  # Deployment config
│   └── package.json
└── server/         # Node.js (Express) Backend
    ├── src/
    │   ├── models/     # Mongoose schemas
    │   ├── routes/     # API routes
    │   ├── services/   # Passport.js logic
    │   ├── middleware/ # Auth middleware
    │   ├── types/      # Express types
    │   ├── server.ts   # Main Express setup
    │   └── db.ts       # MongoDB connection
    └── package.json
```

---

## 🤸 <a name="setup">Getting Started (Local Setup)</a>

### Prerequisites

Ensure you have the following installed:
* Git
* Node.js
* npm

### Steps:

**1. Clone the Repository:**

```bash
git clone https://github.com/sukijaa/Imagia.git
cd Imagia
```

**2. Setup the Backend:**
```bash
cd server
npm install
cp .env.example .env    # (Mac/Linux)
copy .env.example .env  # (Windows)
npm run dev
```

**3. Setup the Frontend:**
```bash
cd client
npm install
npm run dev
```

The app will run at http://localhost:5173.

---

## 🔑 <a name="env">Environment Variables</a>

Create a .env file in the /server directory and add:
```bash
# MongoDB Atlas Connection String
MONGO_URI=your_mongodb_connection_string

# Server Port
PORT=8000

# Cookie Encryption Secret
COOKIE_KEY=your_random_cookie_secret

# OAuth Keys
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Unsplash Access Key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# URLs for Local Development
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:8000
```

---

## 📸 <a name="screenshots">Screenshots</a>

Login Page:
<img src="assets/login.png" width="700"/>

Search and Multi-Select:
<img src="assets/search.png" width="700"/>

Collections Dashboard:
<img src="assets/collections.png" width="700"/>

Discover Page:
<img src="assets/discover.png" width="700"/>
