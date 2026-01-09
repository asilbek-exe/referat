# Quick Start Guide

## Prerequisites
- Python 3.11-3.14 (3.11 or 3.12 recommended)
- Node.js 18+
- PostgreSQL 15+ (or Docker)

**Note:** Requirements updated for Python 3.14 compatibility using `psycopg` (v3)

## Quick Setup (5 minutes)

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install --upgrade pip

# For Python 3.14: Set environment variable for pydantic-core build
# (Python 3.11-3.13 don't need this)
if python --version | grep -q "3.14"; then
    export PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1
fi

pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your database URL

# Initialize database
python -m app.db.init_db --create-admin

# Run server
python run.py
# Or: uvicorn app.main:app --reload
```

Backend will run on: http://localhost:8000
API docs: http://localhost:8000/docs

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run on: http://localhost:3000

### 3. Default Login

**Admin:**
- Username: `admin`
- Password: `admin123`

**Student:**
- Register a new account from the registration page

## Using Docker (Alternative)

```bash
# Start all services
docker-compose up -d

# Initialize database
docker-compose exec backend python -m app.db.init_db --create-admin

# View logs
docker-compose logs -f
```

## Testing the Application

1. Open http://localhost:3000
2. Register a new student account
3. Login as admin (admin/admin123)
4. Create a task in Admin Panel
5. Switch to student account
6. View task, submit work, track progress

## Common Issues

**Python 3.14 build errors (pydantic-core):**
- PyO3 (used by pydantic-core) doesn't officially support Python 3.14 yet
- **Solution 1 (Recommended):** Use Python 3.11 or 3.12: `python3.12 -m venv venv`
- **Solution 2:** Set environment variable before installing:
  ```bash
  export PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1
  pip install -r requirements.txt
  ```
- Or use the helper script: `bash install_python314.sh`

**Database connection error (Connection refused):**
- **PostgreSQL is not running!** Start it using one of these methods:
  1. **Using Docker (Easiest):**
     ```bash
     docker-compose up -d db
     ```
  2. **Using Homebrew:**
     ```bash
     brew services start postgresql
     # Or for versioned: brew services start postgresql@15
     ```
  3. **Using helper script:**
     ```bash
     bash start_postgres.sh
     ```
  4. **Manual start:** Find your PostgreSQL data directory and run:
     ```bash
     pg_ctl -D /opt/homebrew/var/postgres start
     ```
- Verify PostgreSQL is running: `psql -U postgres -c 'SELECT version();'`
- Check DATABASE_URL in .env file matches your PostgreSQL setup

**Port already in use:**
- Change ports in docker-compose.yml or use different ports

**Module not found:**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

## Next Steps

- Change admin password immediately
- Add initial tasks and resources
- Configure production settings
- Set up proper file storage (S3, etc.)

