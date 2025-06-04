# 🎮 Tic-Tac-Toe Multiplayer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.+-339933.svg?logo=node.js)](https://nodejs.org/)

A real-time multiplayer Tic-Tac-Toe game with WebSocket connectivity, built with React and Node.js.

![Game Screenshot](./screenshot.png) <!-- Add actual screenshot later -->

## ✨ Features

- **Real-time multiplayer gameplay** using WebSockets
- **Room-based system**: Create or join game rooms
- **Responsive UI**: Works on desktop and mobile
- **Player authentication**: Google/Facebook login + guest access
- **Game state tracking**: Win/loss/draw statistics
- **Game history**: View past matches

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm v8+
- WebSocket server (included)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe-multiplayer.git
   cd tic-tac-toe-multiplayer
   ```

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)


**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

📂 Project Structure
```
tic-tac-toe/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Route components
│   │   ├── services/      # API services
│   │   └── styles/        # CSS modules
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── controllers/       # Route handlers
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   ├── utils/             # Utilities
│   └── package.json
│
├── .gitignore
└── README.md
```

🛠️ Technologies Used
Frontend
React 18 (TypeScript)

Tailwind CSS

React Router

Socket.IO Client

Backend
Node.js + Express

Socket.IO

JSON Web Tokens (JWT)

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request
