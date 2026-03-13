## Slack Clone

A full-stack Slack-style collaboration platform with real-time messaging, channels, and video features powered by Stream. This project is built as a learning-focused clone of Slack, showcasing modern web development practices and real-time communication patterns.

### Features

- **Workspace & channels**: Organize conversations into workspaces and channels (public or private).
- **Real-time messaging**: Instant message delivery with Stream-backed chat.
- **User authentication**: Secure auth and route protection, including backend middleware for guarding APIs.
- **Presence & typing indicators**: See who is online and when someone is typing (via Stream capabilities).
- **Media & file sharing**: Share rich content inside conversations (where supported by the Stream SDK).
- **Video / audio support**: Uses `@stream-io/video-react-sdk` for rich video experiences.

### Tech Stack

- **Frontend**
  - React (with modern hooks and component patterns)
  - Stream React & video SDKs for chat and calls
  - Modern styling with utility classes (`className`-based)

- **Backend**
  - Node.js + Express
  - Authentication middleware (e.g. Clerk-based auth) with route protection
  - Stream server-side integration for user and channel management
  - Environment-based configuration for API keys and secrets

### Getting Started

#### Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Stream account and API credentials
- Authentication provider credentials (e.g. Clerk) if you are using hosted auth

#### Installation

```bash
# From the project root
npm install

# If there is a dedicated backend folder
cd backend
npm install
```

#### Environment Variables

Create a `.env` file for the backend (and frontend if required) and configure:

- `PORT` – Port for the backend server (for example, `5001`)
- `STREAM_API_KEY`, `STREAM_SECRET`, `STREAM_APP_ID` – Stream credentials
- Auth provider keys/secrets as required by your setup

> Ensure that `.env` files are not committed to version control.

#### Running the App

From the backend directory:

```bash
npm run dev   # or nodemon / equivalent watch script
```

From the frontend directory (if present):

```bash
npm run dev   # or the appropriate start script
```

Then open the frontend URL in your browser (commonly `http://localhost:3000`).

### Project Structure (High-Level)

- `backend/` – Express server, auth middleware, and Stream server integration.
- `frontend/` (or similar) – React client using Stream SDKs for chat and video.
- `README.md` – Project overview and setup instructions (this file).

### Development Notes

- Use `className`-based styling (e.g. Tailwind-style utilities) instead of inline `style` objects.
- Authentication-sensitive routes should always go through the backend `protectRoute` middleware (or equivalent).
- When creating or deleting users/channels, remember to update both your database (if used) and Stream so data stays in sync.

### Roadmap / Ideas

- **Threads & replies**: Nested conversations inside channels.
- **Reactions & emojis**: React to individual messages.
- **Search**: Full-text search across channels and messages.
- **Notifications**: In-app and push notifications for mentions and DMs.

### License

This project is intended primarily for learning and personal experimentation. If you plan to use it in production, review all dependencies, security, and licensing requirements first.

