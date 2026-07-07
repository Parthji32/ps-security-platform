@echo off
title PS Website - Local Development Server
echo.
echo ========================================
echo   PS Website — Local Server
echo ========================================
echo.

REM Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/ (LTS version recommended)
    echo.
    pause
    exit /b
)

echo ✅ Node.js found: 
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo 📦 Installing dependencies (npm install)...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  .env file not found. Creating from template...
    copy .env.example .env
    echo.
    echo 📝 Created .env file. You can edit it later if needed.
    echo    (For now, email features are disabled)
    echo.
)

echo.
echo 🚀 Starting local development server...
echo.
echo 🌐 Opening http://localhost:3001 in your browser...
echo.
echo ✅ Server running! Press Ctrl+C to stop.
echo.

REM Start the server
call npm run dev

pause