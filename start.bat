@echo off
REM Sales & Outreach System - Windows Startup Script

echo.
echo ==================================
echo 🚀 Sales & Outreach System Setup
echo ==================================
echo.

REM Check Node.js
echo 📋 Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js v16+ from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Dependencies installed
    ) else (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies already installed
)
echo.

REM Create data directory
echo 📂 Creating data directory...
if not exist "data" mkdir data
echo ✅ Data directory ready
echo.

REM Check if database exists
if not exist "data\sales.db" (
    echo 🗄️ Database will be created on first run
) else (
    echo ✅ Database exists at data\sales.db
)
echo.

REM Start server
echo 🌐 Starting server...
echo.
echo ==================================
echo Server starting on http://localhost:3000
echo Dashboard: http://localhost:3000
echo API: http://localhost:3000/api
echo ==================================
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
call npm start

pause
