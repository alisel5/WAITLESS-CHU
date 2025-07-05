# WAITLESS-CHU Frontend 🎨

This is the frontend React application for the WAITLESS-CHU smart queue management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:3001`

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Your Tasks (Frontend Developer)

### Week 1: Basic Setup & Components
- [ ] Set up React Router for navigation
- [ ] Create basic layout components
- [ ] Set up Tailwind CSS styling
- [ ] Create department selection page

### Week 2: Core Features
- [ ] Queue interface (join queue, view position)
- [ ] QR code generation and display
- [ ] Real-time position updates with Socket.io
- [ ] Ticket tracking page

### Week 3: Advanced Features
- [ ] QR code scanning functionality
- [ ] Notification system
- [ ] User dashboard
- [ ] Staff interface (call next patient)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── common/       # Common UI components
│   │   ├── queue/        # Queue-related components
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Landing page
│   │   ├── Queue.tsx     # Queue interface
│   │   ├── Ticket.tsx    # Ticket tracking
│   │   └── Staff.tsx     # Staff interface
│   ├── services/         # API service functions
│   │   ├── api.ts        # HTTP API calls
│   │   └── socket.ts     # Socket.io connection
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   └── App.tsx           # Main app component
├── public/               # Static files
├── package.json          # Dependencies
└── Dockerfile            # Container configuration
```

## 🔌 API Integration

### Backend API Endpoints
Your backend teammate has provided these endpoints:

```typescript
// Base URL: http://localhost:3001
const API_BASE = 'http://localhost:3001/api/queue';

// Queue Management
POST   /tickets                    // Create new ticket
GET    /tickets/:ticketId          // Get ticket details
POST   /tickets/qr                 // Get ticket by QR code
PATCH  /tickets/:ticketId          // Update ticket status
POST   /tickets/:ticketId/complete // Complete ticket
POST   /tickets/:ticketId/missed   // Handle missed ticket

// Department Operations
POST   /departments/:id/call-next  // Call next ticket
GET    /departments/:id/stats      // Get queue statistics

// User Operations
GET    /users/:userId/tickets      // Get user's active tickets
```

### Socket.io Events
```typescript
// Connect to backend
const socket = io('http://localhost:3001');

// Join department room for updates
socket.emit('join-department', departmentId);

// Join user room for personal notifications
socket.emit('join-user', userId);

// Track specific ticket
socket.emit('track-ticket', ticketId);

// Listen for updates
socket.on('ticket-updated', (data) => {
  // Handle ticket updates
});

socket.on('position-changed', (data) => {
  // Handle position changes
});
```

## 🎨 UI Components to Build

### 1. Department Selection
- List of available departments
- Queue statistics for each department
- Join queue button

### 2. Queue Interface
- Current position display
- Estimated wait time
- QR code display
- Real-time updates

### 3. Ticket Tracking
- QR code scanner
- Ticket details
- Position updates
- Notification settings

### 4. Staff Interface
- Call next patient button
- Current queue display
- Patient information
- Complete ticket button

## 🛠 Development Tools

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Dependencies Included
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Socket.io Client** for real-time updates
- **QR Code libraries** for generation and scanning
- **Lucide React** for icons
- **React Hot Toast** for notifications

## 🎨 Styling Guidelines

### Color Scheme
```css
/* Primary colors */
--primary: #3B82F6;    /* Blue */
--secondary: #10B981;  /* Green */
--accent: #F59E0B;     /* Amber */
--danger: #EF4444;     /* Red */

/* Background colors */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-dark: #1F2937;
```

### Component Examples
```tsx
// Button component
<Button variant="primary" onClick={handleClick}>
  Join Queue
</Button>

// Card component
<Card>
  <CardHeader>Department Name</CardHeader>
  <CardBody>
    <p>Current Position: 5</p>
    <p>Estimated Wait: 25 minutes</p>
  </CardBody>
</Card>
```

## 🔧 Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SOCKET_URL=http://localhost:3001
REACT_APP_QR_BASE_URL=http://localhost:3000/ticket
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🐳 Docker

```bash
# Build frontend container
docker build -t waitless-chu-frontend .

# Run with docker-compose (from root)
docker-compose up frontend
```

## 📱 Responsive Design

Make sure your components work on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚨 Important Notes

- **Backend Dependency**: Make sure the backend is running before testing frontend
- **CORS**: Backend is configured to accept requests from `http://localhost:3000`
- **Real-time**: Use Socket.io for live updates, not polling
- **Error Handling**: Always handle API errors gracefully
- **Loading States**: Show loading indicators for API calls

## 🔗 Backend Communication

Your backend teammate will provide:
1. Working API endpoints
2. Socket.io events documentation
3. Sample API responses
4. Error handling guidelines

Make sure to test the API integration thoroughly!

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)
- [React Router](https://reactrouter.com/docs/en/v6)

---

**Good luck! Your backend teammate has set up a solid foundation for you to build upon! 🚀** 