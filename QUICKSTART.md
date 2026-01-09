# Quick Start Guide

## Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (or Docker)

## Quick Setup (5 minutes)

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
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

**Database connection error:**
- Make sure PostgreSQL is running
- Check DATABASE_URL in .env file

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

