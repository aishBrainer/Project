#!/bin/bash

# Sales & Outreach System - Quick Start Script
# This script initializes and starts the system

echo "=================================="
echo "🚀 Sales & Outreach System Setup"
echo "=================================="
echo ""

# Check Node.js
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js v16+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi
echo ""

# Create data directory
echo "📂 Creating data directory..."
mkdir -p data
echo "✅ Data directory ready"
echo ""

# Check if database exists
if [ ! -f "data/sales.db" ]; then
    echo "🗄️  Database will be created on first run"
else
    echo "✅ Database exists at data/sales.db"
fi
echo ""

# Start server
echo "🌐 Starting server..."
echo ""
echo "=================================="
echo "Server starting on http://localhost:3000"
echo "Dashboard: http://localhost:3000"
echo "API: http://localhost:3000/api"
echo "=================================="
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
npm start
