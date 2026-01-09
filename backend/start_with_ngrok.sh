#!/bin/bash
# Start backend with ngrok tunnel for HTTPS access

echo "🚀 Starting backend with ngrok tunnel..."
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed!"
    echo ""
    echo "Install it with:"
    echo "  brew install ngrok/ngrok/ngrok"
    echo ""
    echo "Or download from: https://ngrok.com/download"
    exit 1
fi

# Check if backend is already running
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8000 is already in use"
    echo "   Please stop the existing backend first"
    exit 1
fi

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

echo "📡 Starting backend server..."
# Start backend in background
uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

echo "🌐 Starting ngrok tunnel..."
echo ""
echo "Your HTTPS URL will appear below:"
echo "Copy it and set as VITE_API_URL in GitHub secrets"
echo "Format: https://YOUR_URL/api/v1"
echo ""
echo "Press Ctrl+C to stop both backend and ngrok"
echo ""

# Start ngrok
ngrok http 8000

# Cleanup when script exits
kill $BACKEND_PID 2>/dev/null

