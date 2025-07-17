# WAITLESS-CHU Project Context Analysis

## 📋 Project Overview

**WAITLESS-CHU** is a Smart Queue Management System designed for CHU (Centre Hospitalier Universitaire) hospitals. It provides real-time queueing, QR code tickets, and notifications to streamline patient flow and reduce waiting times.

### Key Features
- **Real-time Queue Management**: Live updates on queue positions and wait times
- **QR Code Tickets**: Digital tickets with QR codes for easy tracking
- **Smart Notifications**: Real-time notifications for position updates and ticket calls
- **Missed Ticket Handling**: Automatic requeuing for first-time misses
- **Department Management**: Multiple hospital departments with individual queues
- **User Dashboard**: Personal ticket tracking and history
- **Staff Interface**: Tools for calling next patients and managing queues

## 🏗️ Architecture Overview

This is a **monorepo** structure with separate frontend and backend applications:

```
WAITLESS-CHU/
├── backend/              # Node.js + TypeScript + Express API
├── frontend/             # React + TypeScript + Tailwind CSS
├── docker-compose.yml    # Multi-service container orchestration
└── setup.sh             # Automated setup script
```

## 🖥️ Backend Architecture

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Cache/Real-time**: Redis
- **Real-time Communication**: Socket.io
- **Authentication**: JWT with bcryptjs
- **QR Code Generation**: qrcode library
- **Security**: Helmet, CORS, Rate limiting

### Database Schema
The PostgreSQL database includes:

1. **users** - User accounts (admin/user roles)
2. **departments** - Hospital departments with estimated service times
3. **queue_tickets** - Queue tickets with status tracking
4. **notifications** - User notifications system

Key relationships:
- Users can have multiple tickets
- Tickets belong to departments
- Notifications are linked to users and tickets

### API Structure
- **Auth Routes** (`/api/auth`): Login, registration, user management
- **Queue Routes** (`/api/queue`): Ticket management, department operations
- **Real-time**: Socket.io for live updates

### Key Backend Features
- Automatic position assignment in queues
- Real-time position updates via WebSocket
- QR code generation for each ticket
- Missed ticket handling (requeue first time, remove after repeated misses)
- Department-specific queue management

## 🎨 Frontend Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with responsive design
- **Routing**: React Router DOM v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **QR Code**: html5-qrcode for scanning, qrcode.react for display
- **UI Enhancements**: Framer Motion, React Hot Toast
- **Data Fetching**: React Query

### Component Structure
- **Layout Components**: Navbar, Sidebar, Layout wrapper
- **Page Components**: Landing, Dashboard, Queue management
- **Protected Routes**: Authentication-based route protection
- **Real-time Updates**: Socket.io integration for live data

### Key Frontend Features
- Responsive design for mobile and desktop
- Real-time queue position updates
- QR code scanning and generation
- User dashboard with ticket history
- Admin interface for queue management

## 🐳 Infrastructure & Deployment

### Docker Configuration
The project uses Docker Compose with four services:

1. **PostgreSQL** (port 5432)
   - Database with automatic schema initialization
   - Health checks and data persistence

2. **Redis** (port 6379)
   - Caching and real-time session management
   - Health checks and data persistence

3. **Backend** (port 3001)
   - Express API server
   - Depends on PostgreSQL and Redis
   - Development mode with hot reload

4. **Frontend** (port 3000)
   - React development server
   - Depends on backend service
   - Hot reload for development

### Environment Configuration
- Development: Hot reload for both frontend and backend
- Production: Optimized builds with security configurations
- Environment variables for database credentials and API URLs

## 🔄 Real-time Features

### Socket.io Implementation
- **Department Rooms**: Clients join department-specific rooms for queue updates
- **User Rooms**: Personal notification delivery
- **Ticket Tracking**: Real-time ticket status updates
- **Queue Position Updates**: Live position changes as queue moves

### Events Handled
- Position changes in queue
- Ticket called notifications
- Missed ticket alerts
- Queue statistics updates

## 🚀 Development Workflow

### Setup Process
1. **Docker Method**: `docker-compose up -d` (everything together)
2. **Local Development**: 
   - Backend: `npm run dev:server` (port 3001)
   - Frontend: `npm start` (port 3000)

### Key Scripts
- **Backend**: `npm run dev:server` for development with nodemon
- **Frontend**: `npm start` for React development server
- **Setup**: `./setup.sh` for automated project initialization

### Database Initialization
- Automatic schema creation via Docker
- Sample data includes departments and test users
- Default admin user: `admin@waitless-chu.com` (password: admin123)

## 📊 Data Flow

### Queue Management Flow
1. User creates ticket for specific department
2. System assigns position and generates QR code
3. Real-time updates via Socket.io as queue progresses
4. Staff calls next ticket in department
5. Patient responds or gets marked as missed
6. Automatic requeuing or removal based on missed count

### Authentication Flow
- JWT-based authentication
- Role-based access (user/admin)
- Protected routes on frontend
- API endpoint protection

## 🎯 Key Business Logic

### Queue Position Management
- Automatic position assignment based on current queue
- Real-time position updates as patients are served
- Estimated wait time calculation based on department service time

### Missed Ticket Handling
- First miss: Automatic requeuing at end of queue
- Subsequent misses: Ticket removal from queue
- Notification system for missed ticket alerts

### Department Operations
- Individual queues per department
- Estimated service times per department
- Queue statistics and analytics
- Staff interface for calling next patients

## 🔐 Security Features

- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configured for development/production
- **Helmet**: Security headers
- **Input Validation**: Express validator for API inputs
- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based auth

## 📱 User Experience Features

### For Patients
- Simple ticket creation process
- QR code ticket generation
- Real-time position tracking
- Mobile-responsive interface
- Push notifications for queue updates

### For Staff
- Queue management dashboard
- Call next patient functionality
- Department statistics
- Missed ticket management
- Admin controls for queue operations

This project represents a comprehensive, modern approach to hospital queue management with strong emphasis on real-time updates, user experience, and operational efficiency.