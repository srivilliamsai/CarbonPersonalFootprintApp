# 🌿 Carbon Personal Footprint Application

A comprehensive full-stack web application designed to help users maximize their environmental impact through tracking, education, and gamification. Built as part of the Infosys Internship program.

## 🚀 Technology Stack

### Frontend
- **React.js**: Component-based UI architecture.
- **Vite**: Next-generation frontend tooling for blistering fast builds.
- **Tailwind CSS**: Utility-first CSS framework for modern, responsive aesthetics.
- **Dark Mode**: Fully integrated dark theme support.

### Backend
- **Spring Boot 3**: Robust Java-based framework for RESTful APIs.
- **Hibernate / JPA**: efficient ORM for database interactions.
- **Spring Security**: JWT-based stateless authentication (Access + Refresh Tokens).
- **Redis**: High-performance caching for heavy calculations and external API calls.
- **MySQL**: Relational database for persistent storage.

---

## ✨ Key Features

### � Dashboard & Analytics
- **Daily Logging**: Track footprints across Diet, Transport, and Energy categories.
- **Live Visuals**: Interactive charts showing weekly trends and daily breakdowns.
- **Smart Budget**: Real-time calculation of remaining daily carbon budget vs. the Paris Agreement goals.

### � Gamification
- **Leaderboards**: Compete globally or with friends to see who has the lowest footprint.
- **Badges**: Earn achievements like "Eco-Warrior" and "ZERO Hero" for consistent habits.
- **Eco Goals**: Set personalized challenges (e.g., "Meatless Mondays") to drive behavioral change.

### �️ Marketplace
- **Eco-Credits**: Earn currency by logging everyday and maintaining streaks.
- **Real Impact**: Redeem credits for planting trees or funding renewable energy projects.

### 🧠 Educational Hub
- **Smart Insights**: AI-driven tips tailored to reducing your specific emission spikes.
- **Resources**: In-app articles and guides on sustainable living strategies.

---

## 🛠️ Installation & Setup

### Prerequisites
- **Java 17** (JDK)
- **Node.js 20+** & **npm**
- **MySQL** (Port 3306)
- **Redis** (Port 6379)

### 1. Database Setup
1. Open your MySQL client.
2. Create the database: `CREATE DATABASE carboncalc;`
3. (Optional) Run `setup_db.sql` if you want to preload data, though the app will auto-generate schemas.
4. Update credentials in `src/main/resources/application.properties` if needed.

### 2. Backend Startup
```bash
# Terminal 1 - Root Directory
redis-server  # Start Redis if not running background service
./mvnw spring-boot:run
```
The backend API will launch at `http://localhost:8089`.

### 3. Frontend Startup
```bash
# Terminal 2 - Frontend Directory
cd frontend
npm install
npm run dev
```
The React app will launch at `http://localhost:5173`.

---

## 📂 Project Structure

```
CarbonPersonalFootprintApp/
├── .github/workflows/   # CI/CD Pipelines
├── src/main/java/       # Spring Boot Backend
│   ├── controller/      # REST Endpoints
│   ├── service/         # Business Logic
│   ├── repository/      # DB Access (JPA)
│   ├── entity/          # Data Models
│   └── config/          # JWT & Security Setup
├── frontend/            # React Frontend
│   ├── src/             
│   │   ├── Dashboard.jsx   # Core Analytics
│   │   ├── Marketplace.jsx # Redemption Store
│   │   ├── components/     # Reusable UI atoms
│   │   └── footer/         # Static Pages

```

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
**Infosys Internship Project** | 2026
