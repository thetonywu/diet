# Animal Based Diet Chatbot - Frontend

A React chat interface for the animal-based diet assistant with Google OAuth via Supabase.

## Setup

```bash
npm install
```

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (default: `http://localhost:8000`) |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## Run

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Auth Flow

1. User clicks "Sign in with Google" on the login page
2. Supabase handles the OAuth flow with Google
3. On success, the app receives a session with a JWT
4. All API calls include the JWT as a Bearer token

## Tech Stack

- React 19
- Vite 8
- Supabase Auth (`@supabase/supabase-js`)
- Vanilla CSS
