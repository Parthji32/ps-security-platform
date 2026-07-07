@echo off
cls
title PS Website - Static Server (NO Setup Required)

echo.
echo ╔════════════════════════════════════════════════╗
echo ║       PS WEBSITE - Quick Start Server          ║
echo ╚════════════════════════════════════════════════╝
echo.

REM Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ ERROR: Node.js is not installed!
    echo.
    echo Please install from: https://nodejs.org/
    echo Then come back and run this file again.
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.
echo Starting server...
echo.

REM Run the static server (no npm install needed!)
node server.js

pause
