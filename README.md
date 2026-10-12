# Vehicle Service Management System - Frontend

Modern, high-performance React application built with Vite and Vanilla CSS for managing vehicle service operations.

---

## 🛠️ Tech Stack
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Tailored Design System, Dark Mode & Glassmorphism)
- **Icons**: Lucide React
- **Deployment**: Vercel / Netlify / Render / Cloudflare Pages

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server (runs at http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🌐 Deploy to Cloud Providers

### Option 1: Deploy on Vercel (Recommended - 2 Minutes Setup)
1. Push this repository to GitHub (`vehicle-service-frontend`).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New** -> **Project**.
4. Import your `vehicle-service-frontend` repository.
5. In **Framework Preset**, ensure **Vite** is selected.
6. Under **Environment Variables**, add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your deployed backend URL (e.g. `https://vehicle-service-backend.onrender.com/api`)
7. Click **Deploy**. Vercel will build and give you a live HTTPS domain (`https://your-app.vercel.app`)!

---

### Option 2: Deploy on Netlify
1. Push this repository to GitHub.
2. Go to [netlify.com](https://netlify.com) and sign in.
3. Click **Add new site** -> **Import an existing project**.
4. Select GitHub and choose `vehicle-service-frontend`.
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Under **Environment variables**, add:
   - `VITE_API_BASE_URL` = `https://your-backend.onrender.com/api`
7. Click **Deploy site**.

---

### Option 3: Deploy on Render (Static Site)
1. Push this repository to GitHub.
2. In [render.com](https://render.com), click **New +** -> **Static Site**.
3. Connect your frontend repo.
4. Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://your-backend.onrender.com/api`
6. Click **Create Static Site**.

---

## ⚙️ Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL pointing to the backend API | `https://vehicle-backend.onrender.com/api` |
