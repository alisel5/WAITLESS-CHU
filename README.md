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

## 📁 Project Structure

```
WAITLESS-CHU/
├── backend/              # Backend API
│   ├── config/           # Database and Redis config
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── types/            # TypeScript types
│   ├── server/           # Main server
│   ├── database/         # SQL schema
│   ├── package.json      # Backend dependencies
│   ├── Dockerfile        # Backend container
│   └── README.md         # Backend setup guide
│
├── frontend/             # Frontend React App
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
├── docker-compose.yml    # All services together
├── setup.sh             # Quick setup script
└── README.md            # This file
```

## 🛠 Tech Stack

### Backend
- **Node.js** + **TypeScript** + **Express**
- **PostgreSQL** for data persistence
- **Redis** for caching and real-time features
- **Socket.io** for real-time communications
- **QR Code generation** for digital tickets

### Frontend
- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Socket.io Client** for real-time updates
- **QR Code scanning** for ticket validation

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd waitless-chu

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

### Option 2: Local Development

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database settings
npm run dev:server
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📋 Prerequisites

- Node.js 18+
- Docker & Docker Compose (for containerized setup)
- PostgreSQL (if running locally)
- Redis (if running locally)

## 📊 API Endpoints

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

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

## 🎯 Core Features

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

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev:server    # Start with hot reload
npm test             # Run tests
npm run build        # Build for production
```

### Frontend Development
```bash
cd frontend
npm start            # Start development server
npm test             # Run tests
npm run build        # Build for production
```

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
# Build everything with Docker
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables

Create `.env` files in both backend and frontend directories with appropriate production values:

- Database credentials
- Redis connection
- JWT secrets
- API URLs

## 📱 User Roles

### Patients
- Create queue tickets
- Track position in real-time
- Receive notifications
- View ticket history

### Staff/Admin
- Call next patients
- Manage queues
- View department statistics
- Handle missed tickets

## 🔐 Security Features

- JWT authentication
- Password hashing
- Rate limiting
- CORS protection
- Input validation
- Secure headers

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in individual README files

---

**Built with ❤️ for better healthcare queue management**
