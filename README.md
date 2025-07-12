# 🎥 Hypercube

**Hypercube** is a video-sharing web platform built to explore media upload, playback, and user interaction features. It allows users to upload, browse, and watch videos with support for basic engagement tools like comments and likes.

> ⚠️ **Note:** This project is not actively maintained. Expect missing features, outdated dependencies, and limited support.

---

## 🚀 Features

- 🔍 Search for videos by title or keyword
- 📺 Video playback with fullscreen support
- ⬆️ Upload and manage video content
- 💬 Commenting system with basic moderation
- ❤️ Like/dislike videos
- 👤 User accounts and authentication
- 📱 Fully responsive layout (mobile/tablet/desktop)

---

## 🛠️ Tech Stack

- **Frontend**: React / Tailwind CSS
- **Backend**: Node.js / Express *(or Firebase functions)*
- **Authentication**: Firebase Auth *(or JWT-based login)*
- **Database**: Firestore / MongoDB
- **Storage**: Firebase Storage / AWS S3

---

## 📦 Setup

```bash
# Clone this repository
git clone https://github.com/Brave-Programmmer/hypercube.git
cd hypercube

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your Firebase or backend config

# Start development server
npm start
