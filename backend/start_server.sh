#!/bin/bash
# Start backend server accessible from other devices on the network

echo "🚀 Starting backend server..."
echo ""
echo "To make this accessible from other devices:"
echo "1. Make sure you're on the same network (WiFi)"
echo "2. Find your IP address (shown below)"
echo "3. Update GitHub secret VITE_API_URL to: http://YOUR_IP:8000/api/v1"
echo ""

# Get local IP address
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    IP=$(hostname -I | awk '{print $1}')
else
    IP="YOUR_IP_HERE"
fi

if [ -z "$IP" ] || [ "$IP" == "" ]; then
    echo "⚠️  Could not detect IP address automatically"
    echo "   Please find it manually:"
    echo "   Mac: ifconfig | grep 'inet ' | grep -v 127.0.0.1"
    echo "   Linux: hostname -I"
    echo ""
else
    echo "📍 Your IP address: $IP"
    echo "   API URL: http://$IP:8000/api/v1"
    echo ""
fi

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Start server on all interfaces (0.0.0.0) so it's accessible from network
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

