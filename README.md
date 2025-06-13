# ⏱️ Uptime Monitor

A full-stack uptime monitoring system, built with Node.js, Express, and Vue 3. It tracks the availability of web services in real time, using WebSockets for live updates, Auth0 for authentication, and a modern, responsive interface.

---

## 🚀 Features

- 🌐 Real-time monitoring with WebSockets  
- 📊 Interactive dashboard (Vue 3 + Vite)  
- 🗄️ Relational DB using Knex & Bookshelf  
- 📚 Swagger UI API documentation at `/docs`  
- 🔒 Secure authentication with Auth0  
- ⚙️ Scheduled uptime jobs  
- 📦 RESTful architecture with WebSocket support  

---

## 🛠️ Tech Stack

**Backend:**

- Node.js + Express  
- WebSocket (`ws`)  
- Knex.js + Bookshelf.js  
- dotenv-flow  
- Swagger UI  
- CORS, custom middleware  

**Frontend:**

- Vue 3 + Vite  
- Pinia  
- Auth0 SPA SDK  
- FlyonUI  
- DataTables, Dropzone, ApexCharts  

---

## 📦 Installation

> Requires Node.js 18+ and a PostgreSQL (or compatible) database.

Clone the repository and install dependencies:

```bash
git clone https://github.com/Lightino/uptime-monitor.git
cd uptime-monitor
npm install
```

Create a `.env` or `.env.development` file with the following:

```env
to do
```

---

## 🔧 Running the App

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build    # Builds the frontend
npm start        # Starts the server (serves API + built frontend)
```

---

## 🧪 API & Swagger

Once the server is running, visit:

```
http://localhost:3000/docs
```

All API routes are under `/api`.

---

## 📡 WebSocket Support

The backend includes a WebSocket server that pushes real-time monitoring data to connected clients. Dead connections are detected every 30 seconds via ping/pong.

---

## 📁 Project Structure

```
.
├── api/                 # Express route handlers
├── db/                  # DB setup with Knex & Bookshelf
├── jobs/                # Scheduled jobs (e.g., monitoring)
├── public/              # Static assets
├── src/                 # Vue 3 frontend source
├── dist/                # Production build of frontend
├── swagger.cjs          # Swagger API definition
├── main.js              # Frontend entry point
└── index.js             # Backend entry point
```

---

## 🔐 Authentication

Auth0 SPA SDK is configured in the frontend:

- **Domain:** `your Auth0 domain`  
- **Client ID:** `your Auth0 app client id`  
- Uses `localstorage` and refresh tokens  
- Auto-redirect on login  

---

## 📌 Roadmap

- [ ] Slack/Telegram alerts  
- [ ] Multi-user roles and permissions  
- [ ] Advanced logs and scheduled reports  
- [ ] Ping/TCP-based uptime tests  

---

## 📄 License

MIT — © [Lightino](https://github.com/Lightino)