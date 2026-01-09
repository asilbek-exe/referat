# Language Learning & Student Motivation Platform

A modern full-stack web application for developing student motivation for independent learning through project-based tasks and educational technologies.

## Project Overview

This platform replaces the original Tkinter desktop application with a production-ready web application featuring:

- **Project-based learning tasks** - Students can select and complete language learning tasks
- **Progress tracking** - Visual progress bars and overall progress calculation
- **Resource access** - Curated learning resources (dictionaries, grammar, language exchange)
- **Admin panel** - Full CRUD operations for tasks, submissions, and resources
- **File submissions** - Students can submit PDF files or text content
- **Role-based access** - Separate interfaces for students and administrators

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── auth.py
│   │   │       │   ├── tasks.py
│   │   │       │   ├── submissions.py
│   │   │       │   ├── progress.py
│   │   │       │   └── resources.py
│   │   │       └── api.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   ├── security.py
│   │   │   └── dependencies.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── task.py
│   │   │   ├── submission.py
│   │   │   ├── progress.py
│   │   │   └── resource.py
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── task.py
│   │   │   ├── submission.py
│   │   │   ├── progress.py
│   │   │   └── resource.py
│   │   ├── db/
│   │   │   └── init_db.py
│   │   └── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── TaskDetail.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminTasks.tsx
│   │   │   ├── AdminSubmissions.tsx
│   │   │   └── AdminResources.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.ts
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Python 3.11-3.14 (3.11 or 3.12 recommended for best compatibility)
- Node.js 18+
- PostgreSQL 15+ (or use Docker)
- Docker and Docker Compose (optional)

**Note:** If you encounter build errors with Python 3.14, the requirements have been updated to use `psycopg` (v3) instead of `psycopg2-binary` for better compatibility.

### Installation

#### Option 1: Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd Nasiba-holajon
```

2. Start all services:
```bash
docker-compose up -d
```

3. Initialize the database:
```bash
docker-compose exec backend python -m app.db.init_db --create-admin
```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

#### Option 2: Manual Setup

**Backend:**

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. Initialize database:
```bash
python -m app.db.init_db --create-admin
```

6. Run the server:
```bash
uvicorn app.main:app --reload
```

**Frontend:**

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Default Admin Credentials

After running the database initialization script:

- **Username:** admin
- **Password:** admin123

**⚠️ IMPORTANT:** Change the admin password immediately after first login!

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user info

### Tasks
- `GET /api/v1/tasks` - Get all tasks
- `GET /api/v1/tasks/{id}` - Get task by ID
- `POST /api/v1/tasks` - Create task (admin only)
- `PUT /api/v1/tasks/{id}` - Update task (admin only)
- `DELETE /api/v1/tasks/{id}` - Delete task (admin only)

### Submissions
- `POST /api/v1/submissions/tasks/{id}/submit` - Submit task work
- `GET /api/v1/submissions/me` - Get my submissions
- `GET /api/v1/submissions/all` - Get all submissions (admin only)

### Progress
- `GET /api/v1/progress/me` - Get my progress
- `GET /api/v1/progress/me/overall` - Get overall progress
- `PUT /api/v1/progress/{user_id}/{task_id}` - Update progress (admin only)

### Resources
- `GET /api/v1/resources` - Get all resources
- `POST /api/v1/resources` - Create resource (admin only)
- `PUT /api/v1/resources/{id}` - Update resource (admin only)
- `DELETE /api/v1/resources/{id}` - Delete resource (admin only)

## Features

### Student Features
- View available project-based tasks
- See task details, instructions, and deadlines
- Submit work (PDF files or text)
- Track progress on each task
- View overall progress percentage
- Access learning resources
- Filter resources by category

### Admin Features
- Create, edit, and delete tasks
- View all student submissions
- Update student progress manually
- Manage learning resources
- Full CRUD operations on all entities

## Database Models

- **User** - User accounts with roles (student/admin)
- **Task** - Project-based learning tasks
- **Submission** - Student task submissions
- **Progress** - Progress tracking per user-task
- **Resource** - Learning resources (dictionaries, grammar, etc.)

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Server-side authorization checks
- CORS configuration
- File upload size limits

## Development

### Running Tests

Backend tests (when implemented):
```bash
cd backend
pytest
```

Frontend tests (when implemented):
```bash
cd frontend
npm test
```

### Code Quality

Backend:
```bash
cd backend
black .  # Format code
flake8 .  # Lint code
```

Frontend:
```bash
cd frontend
npm run lint
```

## Troubleshooting

### Python 3.14 Installation Issues

If you encounter build errors when installing dependencies with Python 3.14:

1. **Option 1 (Recommended):** Use Python 3.11 or 3.12 instead:
   ```bash
   # Create venv with specific Python version
   python3.12 -m venv venv
   ```

2. **Option 2:** The requirements have been updated to use `psycopg` (v3) which has better Python 3.14 support. Try installing again:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. **Option 3:** If psycopg still fails, you can use psycopg2-binary with a newer version:
   ```bash
   pip install psycopg2-binary --upgrade
   ```

### Database Connection Issues

- Ensure PostgreSQL is running: `pg_isready` or `brew services list` (macOS)
- Check DATABASE_URL format in `.env` file
- For psycopg 3, the connection string can use `postgresql://` or `postgresql+psycopg://`

### Port Already in Use

- Change ports in `docker-compose.yml` or kill the process using the port
- Backend: Default port 8000
- Frontend: Default port 3000

## Production Deployment

### Frontend (GitHub Pages)

The frontend is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Select **Source**: **GitHub Actions**

2. **Configure Repository Name** (if different):
   - Update `VITE_BASE_PATH` in `.github/workflows/deploy-frontend.yml`
   - Update `build:github` script in `frontend/package.json`

3. **Set API URL** (if backend is hosted):
   - Add secret `VITE_API_URL` in **Settings** → **Secrets and variables** → **Actions**
   - Set to your backend API URL (e.g., `https://your-api.com/api/v1`)

4. **Deploy**:
   - Push to `main` branch (auto-deploys)
   - Or manually trigger in **Actions** tab

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Backend

1. Set strong `SECRET_KEY` in environment variables
2. Use production database (not SQLite)
3. Configure proper CORS origins (include GitHub Pages URL)
4. Set up reverse proxy (nginx)
5. Use HTTPS
6. Configure file storage (S3, etc.)
7. Set up monitoring and logging

**Important**: Update backend CORS settings to allow your GitHub Pages domain:
```python
CORS_ORIGINS = [
    "https://yourusername.github.io",
    "https://yourusername.github.io/Nasiba-holajon"
]
```

## License

This project is proprietary software. All rights reserved.

## Authors

- Мулладжанова Насиба Азимджановна

## Acknowledgments

This project was converted from a Tkinter desktop application to a modern web platform while preserving all original functionality and improving user experience.

