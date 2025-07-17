#!/bin/bash

echo "🚀 Starting WAITLESS-CHU..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Build and start all services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "✅ WAITLESS-CHU is starting up!"
echo ""
echo "🌐 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   Health Check: http://localhost:3001/health"
echo ""
echo "📊 Monitor logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Stop the application:"
echo "   docker-compose down" 