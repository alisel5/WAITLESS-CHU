# WAITLESS-CHU 🏥

Smart Queue Management System for CHU – Real-time queueing, QR code tickets, and notifications.

## 🚀 Features

- **Real-time Queue Management**: Live updates on queue positions and wait times
- **QR Code Tickets**: Digital tickets with QR codes for easy tracking
- **Smart Notifications**: Real-time notifications for position updates and ticket calls
- **Missed Ticket Handling**: Automatic requeuing for first-time misses, removal for repeated misses
- **Department Management**: Multiple hospital departments with individual queues
- **User Dashboard**: Personal ticket tracking and history
- **Staff Interface**: Tools for calling next patients and managing queues

## 📁 Project Structure (Monorepo)

```
WAITLESS-CHU/
├── backend/              # 🖥️ Backend API (Your part)
│   ├── src/
│   │   ├── config/       # Database and Redis config
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   ├── types/        # TypeScript types
│   │   └── server/       # Main server
│   ├── database/         # SQL schema
│   ├── package.json      # Backend dependencies
│   ├── Dockerfile        # Backend container
│   └── README.md         # Backend setup guide
│
├── frontend/             # 🎨 Frontend React App (Your teammate's part)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API calls
│   │   ├── types/        # Frontend types
│   │   └── utils/        # Utilities
│   ├── public/           # Static files
│   ├── package.json      # Frontend dependencies
│   ├── Dockerfile        # Frontend container
│   └── README.md         # Frontend setup guide
│
├── docker-compose.yml    # 🐳 All services together
├── setup.sh             # 🚀 Quick setup script
└── README.md            # This file
```

## 🛠 Tech Stack

### Backend (Your Part) 🖥️
- **Node.js** + **TypeScript** + **Express**
- **PostgreSQL** for data persistence
- **Redis** for caching and real-time features
- **Socket.io** for real-time communications
- **QR Code generation** for digital tickets

### Frontend (Your Teammate's Part) 🎨
- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Socket.io Client** for real-time updates
- **QR Code scanning** for ticket validation

## 🚀 Quick Start

### Option 1: Everything Together (Docker)

```bash
# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

### Option 2: Independent Development

#### Backend Development (You)
```bash
cd backend
npm install
cp ../env.example .env
# Edit .env with your database settings
npm run dev
```

#### Frontend Development (Your Teammate)
```bash
cd frontend
npm install
npm start
```

## 📋 Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- PostgreSQL (if running locally)
- Redis (if running locally)

## 🔧 Development Workflow

### For You (Backend) 🖥️
1. Work in the `backend/` folder
2. API endpoints are ready to use
3. Database schema is set up
4. Real-time features with Socket.io
5. Test with Postman or curl

### For Your Teammate (Frontend) 🎨
1. Work in the `frontend/` folder
2. React app is set up with TypeScript
3. All UI dependencies are installed
4. API service functions are ready
5. Real-time updates with Socket.io client

## 📊 API Endpoints (Backend)

### Queue Management
- `POST /api/queue/tickets` - Create new ticket
- `GET /api/queue/tickets/:ticketId` - Get ticket details
- `POST /api/queue/tickets/qr` - Get ticket by QR code
- `PATCH /api/queue/tickets/:ticketId` - Update ticket status
- `POST /api/queue/tickets/:ticketId/complete` - Complete ticket
- `POST /api/queue/tickets/:ticketId/missed` - Handle missed ticket

### Department Operations
- `POST /api/queue/departments/:departmentId/call-next` - Call next ticket
- `GET /api/queue/departments/:departmentId/stats` - Get queue statistics

### User Operations
- `GET /api/queue/users/:userId/tickets` - Get user's active tickets

## 🎯 Core Features Implementation

### 1. Queue Management
- Automatic position assignment
- Real-time position updates
- Estimated wait time calculation
- Smart requeuing for missed tickets

### 2. QR Code System
- Unique QR codes for each ticket
- QR code scanning for ticket validation
- Digital ticket tracking

### 3. Real-time Notifications
- Socket.io integration for live updates
- Position change notifications
- Ticket call notifications
- Missed ticket alerts

### 4. Department Management
- Multiple department support
- Individual queue management
- Department-specific settings

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 🚀 Deployment

### Production Build

```bash
# Build everything
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Team Workflow

### Daily Work
1. **You**: Work on backend features, API endpoints, database
2. **Your Teammate**: Work on frontend UI, components, user experience
3. **Communication**: Use the API endpoints as your contract

### Merging Strategy
1. **Backend First**: You complete API endpoints
2. **Frontend Integration**: Your teammate connects to your APIs
3. **Testing Together**: Test the full flow
4. **Deploy**: Use Docker Compose for final deployment

### Git Workflow
```bash
# You work on backend
git checkout -b feature/backend-queue-management
# ... work on backend
git push origin feature/backend-queue-management

# Your teammate works on frontend
git checkout -b feature/frontend-queue-interface
# ... work on frontend
git push origin feature/frontend-queue-interface

# Merge when ready
git checkout main
git merge feature/backend-queue-management
git merge feature/frontend-queue-interface
```

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ for better healthcare queue management**

### 🎯 19-Day Timeline

**Week 1 (Days 1-7): Setup & Core Backend**
- Day 1-2: Project setup, database, basic API
- Day 3-5: Queue management, QR codes, real-time features
- Day 6-7: Testing and documentation

**Week 2 (Days 8-14): Frontend Development**
- Day 8-10: Basic UI components, routing
- Day 11-13: Queue interface, QR scanning, real-time updates
- Day 14: Testing and UI polish

**Week 3 (Days 15-19): Integration & Polish**
- Day 15-17: Backend-Frontend integration, testing
- Day 18-19: Final testing, documentation, demo prep
