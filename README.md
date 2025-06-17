# Kids Story App

This project provides a simple full-stack application that generates illustrated kids stories with the help of OpenAI APIs.

## Backend

The backend is a small Express server located in the `backend` folder. It exposes a single `/generate-story` endpoint that accepts a prompt and an age group. It uses ChatGPT to create a short story split into pages and generates an illustration for each page using DALL·E.

### Setup

```
cd backend
cp .env.example .env # add your OPENAI_API_KEY
npm install
npm start
```

The server listens on port `3001` by default.

## Frontend

The frontend is a React app created with Vite in the `frontend` folder. It lets you enter a prompt, pick an age group and quickly try some example prompts. Generated pages with images are displayed in a responsive layout that works well on phones and tablets.

### Setup

```
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser while the backend is running.

## Age Groups

Stories can be generated for the following age ranges:

- **3‑5** – very short sentences and friendly language
- **6‑8** – simple vocabulary with small adventures
- **9‑12** – richer vocabulary and slightly more complex plots

## Deployment

The app is designed to work well on iPad and other mobile devices. It can later be wrapped with tools such as Capacitor or Expo to deploy to the iOS App Store.
