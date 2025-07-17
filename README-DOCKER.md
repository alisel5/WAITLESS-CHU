# 🐳 WAITLESS-CHU Docker Setup

This guide will help you get WAITLESS-CHU running with Docker in minutes!

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** installed and running
- **Git** (to clone the repository)

### 1. Start Docker Desktop
Make sure Docker Desktop is running on your machine.

### 2. Start the Application

**Option A: Using the Windows batch file (Recommended for Windows)**
```bash
# Double-click start.bat or run in PowerShell:
.\start.bat
```

**Option B: Using Docker Compose directly**
```bash
# Build and start all services
docker-compose up --build -d

# Check service status
docker-compose ps
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📊 Service Status

Check if all services are running:
```bash
docker-compose ps
```

You should see:
- `waitless_chu_postgres` - PostgreSQL database
- `waitless_chu_redis` - Redis cache
- `waitless_chu_backend` - Backend API server
- `waitless_chu_frontend` - Frontend React app

## 🔧 Development Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f redis
```

### Stop the Application
```bash
docker-compose down
```

### Restart a Specific Service
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Rebuild and Restart
```bash
docker-compose down
docker-compose up --build -d
```

## 🗄️ Database Access

### Connect to PostgreSQL
```bash
# Using Docker
docker exec -it waitless_chu_postgres psql -U postgres -d waitless_chu

# Using external client (pgAdmin, DBeaver, etc.)
Host: localhost
Port: 5432
Database: waitless_chu
Username: postgres
Password: postgres123
```

### Connect to Redis
```bash
# Using Docker
docker exec -it waitless_chu_redis redis-cli

# Using external client
Host: localhost
Port: 6379
```

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:3001/health
```

### Create a Ticket
```bash
curl -X POST http://localhost:3001/api/queue/tickets \
  -H "Content-Type: application/json" \
  -d '{"userId": "user-id", "departmentId": "dept-id"}'
```

### Get Queue Stats
```bash
curl http://localhost:3001/api/queue/departments/dept-id/stats
```

## 🔍 Troubleshooting

### Docker Desktop Not Running
```
Error: Docker is not running. Please start Docker Desktop first.
```
**Solution**: Start Docker Desktop and wait for it to be ready.

### Port Already in Use
```
Error: Port 3000/3001/5432/6379 is already in use
```
**Solution**: 
```bash
# Stop existing containers
docker-compose down

# Or change ports in docker-compose.yml
```

### Database Connection Issues
```
Error: Connection to PostgreSQL failed
```
**Solution**:
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart the database
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Frontend Not Loading
```
Error: Frontend not accessible
```
**Solution**:
```bash
# Check if frontend is running
docker-compose ps frontend

# Restart frontend
docker-compose restart frontend

# Check logs
docker-compose logs frontend
```

### Backend API Issues
```
Error: Backend API not responding
```
**Solution**:
```bash
# Check if backend is running
docker-compose ps backend

# Restart backend
docker-compose restart backend

# Check logs
docker-compose logs backend
```

## 🗂️ Project Structure

```
WAITLESS-CHU/
├── backend/              # Node.js + TypeScript API
│   ├── server/           # Main server file
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── config/           # Database & Redis config
│   ├── types/            # TypeScript types
│   ├── database/         # SQL schema
│   ├── Dockerfile        # Backend container
│   └── package.json      # Backend dependencies
├── frontend/             # React + TypeScript app
│   ├── src/              # React source code
│   ├── public/           # Static files
│   ├── Dockerfile        # Frontend container
│   └── package.json      # Frontend dependencies
├── docker-compose.yml    # All services together
├── start.bat            # Windows startup script
├── start.sh             # Linux/Mac startup script
└── env.example          # Environment template
```

## 🔄 Development Workflow

### Backend Development
1. The backend code is mounted as a volume, so changes are reflected immediately
2. Use `docker-compose logs -f backend` to see real-time logs
3. Restart with `docker-compose restart backend` if needed

### Frontend Development
1. The frontend code is mounted as a volume, so changes are reflected immediately
2. Use `docker-compose logs -f frontend` to see real-time logs
3. Restart with `docker-compose restart frontend` if needed

### Database Changes
1. Modify `backend/database/schema.sql`
2. Rebuild the database: `docker-compose down && docker-compose up -d`

## 🚀 Production Deployment

For production, you'll want to:
1. Use production Docker images
2. Set up proper environment variables
3. Configure SSL/TLS
4. Set up monitoring and logging
5. Use a production database

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. View service logs: `docker-compose logs [service-name]`
3. Restart services: `docker-compose restart [service-name]`
4. Rebuild everything: `docker-compose down && docker-compose up --build -d`

---

**Happy coding! 🎉** 