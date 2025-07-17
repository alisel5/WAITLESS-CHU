@echo off
echo 🚀 Starting WAITLESS-CHU...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Build and start all services
echo 📦 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak >nul

REM Check if services are running
echo 🔍 Checking service status...
docker-compose ps

echo.
echo ✅ WAITLESS-CHU is starting up!
echo.
echo 🌐 Access the application:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:3001
echo    Health Check: http://localhost:3001/health
echo.
echo 📊 Monitor logs:
echo    docker-compose logs -f
echo.
echo 🛑 Stop the application:
echo    docker-compose down
echo.
pause 