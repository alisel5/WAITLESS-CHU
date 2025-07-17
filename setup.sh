#!/bin/bash

echo "🚀 Setting up WAITLESS-CHU project..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created with Docker configuration."
else
    echo "✅ .env file already exists."
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build Docker images
echo "🐳 Building Docker images..."
docker-compose build

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Edit .env file with your database credentials"
echo "2. Start the application: docker-compose up -d"
echo "3. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:3001"
echo "   - Health Check: http://localhost:3001/health"
echo ""
echo "🔧 For development:"
echo "   - Backend: npm run dev:server"
echo "   - Frontend: cd client && npm start"
echo ""
echo "📚 Check README.md for more details!" 