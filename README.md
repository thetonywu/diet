# Animal Based AI

A conversational AI assistant for exploring the animal-based diet. Built with React + Vite on the frontend and a Python backend.

## Tech Stack

- **Frontend:** React, Vite
- **Auth:** Supabase (Google OAuth)
- **Icons:** Font Awesome
- **Backend:** Python (separate repo)

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io)
- A [Supabase](https://supabase.com) project with Google OAuth enabled

### Setup

```bash
pnpm install
```

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Notes

- Users can chat without signing in; a sign-in prompt appears after reaching the free message limit
- Chat history is stored in `localStorage` and persists across sessions
- Logging out does not clear chat history — use **Settings → Reset chat** to clear it
