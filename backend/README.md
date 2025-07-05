# WAITLESS-CHU Backend 🖥️

This is the backend API for the WAITLESS-CHU smart queue management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Redis

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. **Database setup**
   ```bash
   # Install PostgreSQL and create database
   # Run the schema.sql file in your PostgreSQL instance
   psql -U postgres -d waitless_chu -f database/schema.sql
   ```

4. **Start development server**
   ```bash
   npm run dev:server
   ```

## 📊 API Endpoints

### Health Check
- `GET /health` - Server health status

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

## 🔧 Development

### Scripts
- `npm run dev:server` - Start development server with hot reload
- `npm run build:server` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

### Project Structure
```
backend/
├── src/
│   ├── config/          # Database and Redis configuration
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript type definitions
│   └── server/          # Main server file
├── database/            # SQL schema and migrations
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
└── Dockerfile           # Container configuration
```

## 🧪 Testing API

### Using curl

```bash
# Health check
curl http://localhost:3001/health

# Create a ticket
curl -X POST http://localhost:3001/api/queue/tickets \
  -H "Content-Type: application/json" \
  -d '{"userId": "user-id", "departmentId": "dept-id"}'

# Get queue stats
curl http://localhost:3001/api/queue/departments/dept-id/stats
```

### Using Postman
Import the API endpoints into Postman for easier testing.

## 🔌 Real-time Features

The backend uses Socket.io for real-time communications:

- **Room Management**: Clients can join department and user rooms
- **Ticket Tracking**: Real-time ticket status updates
- **Notifications**: Live notifications for position changes

### Socket Events
- `join-department` - Join department room for updates
- `join-user` - Join user room for personal notifications
- `track-ticket` - Track specific ticket updates

## 🐳 Docker

```bash
# Build backend container
docker build -t waitless-chu-backend .

# Run with docker-compose (from root)
docker-compose up backend
```

## 📝 Environment Variables

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=waitless_chu
DB_USER=postgres
DB_PASSWORD=your_password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=24h

# QR Code Configuration
QR_CODE_BASE_URL=http://localhost:3000/ticket

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Notification Configuration
NOTIFICATION_CHECK_INTERVAL=30000
MISSED_QUEUE_TIMEOUT=300000
```

## 🎯 Your Tasks (Backend Developer)

1. **API Development** ✅ (Ready)
   - All endpoints are implemented
   - Business logic is complete
   - Real-time features working

2. **Database Management** ✅ (Ready)
   - Schema is set up
   - Sample data included
   - Indexes for performance

3. **Testing & Documentation** 🔄 (In Progress)
   - Test all endpoints
   - Document API responses
   - Performance testing

4. **Integration with Frontend** ⏳ (Waiting)
   - Frontend will connect to your APIs
   - Socket.io events for real-time updates
   - CORS configured for frontend

## 🚨 Important Notes

- **CORS**: Configured for `http://localhost:3000` (frontend)
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Security**: Helmet.js for security headers
- **Logging**: Console logging for development

## 🔗 Frontend Integration

Your teammate will connect to these endpoints:
- Base URL: `http://localhost:3001`
- Socket.io: `http://localhost:3001`
- API Prefix: `/api/queue`

Make sure these are working before your teammate starts frontend development! 