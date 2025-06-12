# Video Insight Summarizer

An AI-powered web app that allows users to paste a YouTube URL, fetch video metadata, and generate concise summaries using OpenAI — all while keeping a history of their summarized videos.

Live Frontend 👉 [https://yt-insight-summarizer.netlify.app](https://yt-insight-summarizer.netlify.app)  
Live Backend 👉 [https://yt-video-summarizer-f538.onrender.com](https://yt-video-summarizer-f538.onrender.com)

---

## 🔧 Tech Stack

- **Frontend:** React, Vite, TailwindCSS, React Router, TypeScript
- **Backend:** Node.js, Express, Mongoose (MongoDB), OpenAI API
- **Auth:** JWT-based auth (email & password)
- **Others:** YouTube Data API v3, Render (backend deployment), Netlify (frontend hosting)

---

## 🧪 User Flow

1.  **Register/Login** via email & password.
2.  Paste a **valid YouTube URL**
3.  Preview fetched video metadata.
4.  Click **Summarize** → loading spinner shown while OpenAI generates summary.
5.  Summary is stored and viewable in your **Past Summaries** page.
6.  **Login** with ADMIN credential to see **Admin Page**.

---

## 📁 Folder Structure (Key Parts)

```bash
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/=
│   │   ├── pages/
│   │   └── lib/api.ts
│   └── vite.config.ts
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
```

---

## ⚙️ Setup Instructions

### 🔐 Environment Variables

> Create a `.env` file in `backend/` using the structure below.

### 📦 `.env.example` (Backend)

```ini
MONGO_URI=<MONGO_DB_URI>
PORT=8080
YOUTUBE_API_KEY=<YOUR_YOUTUBE_API_KEY>
JWT_SECRET=<JWT_SECRET>
OPENAI_API_KEY=dummy
OPENAI_BASE_URL=<OPEN_AI_BASE_URL>
MODEL_NAME=<MODEL_NAME>
```

---

### 🛠 Local Setup

#### 1. Clone Repo

```bash
git clone https://github.com/SatyamSingh432/yt-video-summarizer.git
cd video-insight-summarizer
```

#### 2. Backend

```bash
cd backend
npm install
npm run dev
```

#### 3. Frontend

Change `baseURL` in `frontend/src/lib/api.ts` , then

```bash
cd frontend
npm install
npm run dev
```

Now visit `http://localhost:5173`

---

## 🧱 DB Migration & Models

- MongoDB Atlas (Mongoose)
- Models:

  - `User`: email, password (hashed), role (free/premium), summaries[]
  - `Summary`: user, title, text, createdAt

---

## 🧪 Testing (Manual)

- Login with test credentials
- Try invalid YouTube links
- Try logout and relogin — session should persist
- Visit `/dashboard` to verify history is paginated
- There is ADMIN seeded when server starts
  - Email :- `admin@admin.com` / Password: `admin@123`

---

## 🧑‍💻 Developer Notes

- Built in ~15 hours
- Simple, clear UI with a focus on UX
- Graceful handling of API errors (YouTube/OpenAI)
- Modular structure with clean separation of concerns

---

## 🚧 Roadmap

- Integrate paywall with Paddle
- Add OAuth (Google)
- Add transcript view alongside summaries
- Dockerize app

---

## 👨‍🔬 Author

**Satyam Singh**  
Software Developer | Email: `satyamrajput7239@gmail.com`  
GitHub: [@satyamrajput7239](https://github.com/satyamrajput7239)
