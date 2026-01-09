#!/bin/bash
# Helper script to start PostgreSQL

echo "Attempting to start PostgreSQL..."

# Try different methods to start PostgreSQL
if command -v brew &> /dev/null; then
    # Try starting via brew services
    if brew services list | grep -q postgresql; then
        echo "Starting PostgreSQL via Homebrew services..."
        brew services start postgresql
    elif brew services list | grep -q postgresql@; then
        echo "Starting PostgreSQL via Homebrew services (versioned)..."
        brew services start $(brew services list | grep postgresql | awk '{print $1}')
    else
        echo "PostgreSQL service not found in Homebrew."
        echo "Trying to start manually..."
        
        # Try common PostgreSQL data directories
        for pgdata in /opt/homebrew/var/postgres /usr/local/var/postgres ~/Library/Application\ Support/Postgres/var-*; do
            if [ -d "$pgdata" ]; then
                echo "Found PostgreSQL data directory: $pgdata"
                pg_ctl -D "$pgdata" start
                exit 0
            fi
        done
        
        echo "Could not find PostgreSQL data directory."
        echo "Please start PostgreSQL manually or use Docker."
    fi
else
    echo "Homebrew not found. Please start PostgreSQL manually."
fi

echo ""
echo "To verify PostgreSQL is running:"
echo "  psql -U postgres -c 'SELECT version();'"
echo ""
echo "Or use Docker Compose:"
echo "  docker-compose up -d db"

