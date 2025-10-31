# 📸 Imageboard: The MERN Moodboard Platform



Imageboard is a full-stack MERN application that allows users to search for high-resolution images, curate them into public or private "moodboards," and discover collections created by other users. This project demonstrates a complete, secure authentication flow, complex data modeling, and a modern, responsive frontend.

---

### ✨ Demo GIFs



| Login & Auth | Image Search & Multi-Select |
| :---: | :---: |
| [Insert Login.gif] | [Insert Search.gif] |
| **Save & View Collections** | **Discover & Like** |
| [Insert Save.gif] | [Insert Discover.gif] |

---

### 🚀 Tech Stack

This project is built with a modern, scalable, and professional tech stack.

**Frontend:**
* ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
* ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
* ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
* ![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)
* ![Zustand](https://img.shields.io/badge/Zustand-000000?logo=zustand&logoColor=white) (State Management)
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)
* ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)

**Backend:**
* ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)
* ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
* ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)
* ![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?logo=passport&logoColor=white) (Google & GitHub OAuth 2.0)
* ![Unsplash API](https://img.shields.io/badge/Unsplash_API-000000?logo=unsplash&logoColor=white)

**Deployment:**
* ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white) (Frontend)
* ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white) (Backend)

---

### 🌟 Features

#### Core Functionality
* **Secure Authentication:** Full OAuth 2.0 flow with Passport.js, supporting Google and GitHub.
* **Cookie-Based Sessions:** Secure, persistent login using `express-session`.
* **Protected Routes:** Frontend and Backend routes are protected, redirecting unauthorized users.
* **Image Search:** Connects to the Unsplash API to search for high-resolution images.
* **User Search History:** Every user's search terms are logged and displayed on their private dashboard.
* **Top Searches:** A "Top Searches" banner on the homepage, aggregated from all users.

#### "Next Level" Features
* **Multi-Select:** A dynamic, client-side multi-select feature to batch-select images.
* **Collections (Moodboards):** Users can save their selected images as a "Collection" with a title and description.
* **Public vs. Private:** Collections can be set as **Public** (visible to all) or **Private** (visible only to the owner).
* **Discover Page:** A public "Discover" feed showing all public collections, sorted by popularity (likes).
* **Like System:** Users can "Like" and "Unlike" public collections.
* **Professional UI/UX:** Built with **Shadcn/ui** and **Tailwind CSS**, including loading skeletons, empty states, and toast notifications.

---

### 🔐 API Endpoints

All endpoints are prefixed with `/api`. Protected routes require an active session cookie.

| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | | | |
| `GET` | `/auth/google` | Public | Initiates Google OAuth login. |
| `GET` | `/auth/google/callback` | Public | Google redirect callback. |
| `GET` | `/auth/github` | Public | Initiates GitHub OAuth login. |
| `GET` | `/auth/github/callback`| Public | GitHub redirect callback. |
| `GET` | `/auth/current_user` | Public | Gets the currently logged-in user. |
| `GET` | `/auth/logout` | Public | Logs out the user and clears the session. |
| **Search** | | | |
| `POST` | `/search` | **Protected** | Submits a search term. Logs the search and returns Unsplash results. |
| `GET` | `/search/top` | **Protected** | Gets the 5 most popular search terms from all users. |
| **History** | | | |
| `GET` | `/history` | **Protected** | Gets the logged-in user's 20 most recent search terms. |
| **Collections** | | | |
| `POST` | `/collections` | **Protected** | Creates a new collection (moodboard). |
| `GET` | `/collections` | **Protected** | Gets all collections for the logged-in user. |
| `GET` | `/collections/:id` | Public / Private | Gets a single collection. (Publicly viewable if `isPublic: true`). |
| `PUT` | `/collections/:id` | **Protected** | Updates a collection (owner only). |
| `DELETE` | `/collections/:id` | **Protected** | Deletes a collection (owner only). |
| `POST` | `/collections/:id/like` | **Protected** | Toggles a "like" on a collection. |
| **Discover** | | | |
| `GET` | `/discover` | Public | Gets all collections where `isPublic: true`. |

---

### 🛠️ How to Run Locally

To run this project on your local machine, follow these steps:

**1. Clone the Repository**
```bash
git clone [https://github.com/](https://github.com/)[YOUR_GITHUB_USERNAME]/[YOUR_REPO_NAME].git
cd imageboard-project
2. Create .env.example files (Best Practice)

Create a file at server/.env.example:

Code snippet

# MongoDB Atlas Connection String
MONGO_URI=
# Server Port
PORT=8000
# Random string for cookie encryption
COOKIE_KEY=

# --- OAuth Keys ---
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# --- Unsplash ---
UNSPLASH_ACCESS_KEY=
3. Set Up the Backend

Bash

# Go to the server directory
cd server

# Create your local .env file
cp .env.example .env

# Install dependencies
npm install

# Fill in all the variables in your new .env file
# (Get keys from MongoDB Atlas, Google Cloud, GitHub, and Unsplash)
# (For local dev, CLIENT_URL must be http://localhost:5173)

# Run the backend server
npm run dev
4. Set Up the Frontend

Bash

# Open a new terminal. Go to the client directory
cd client

# Install dependencies
npm install

# Run the frontend server
npm run dev
The frontend will be running at http://localhost:5173. The backend will be running at http://localhost:8000.


