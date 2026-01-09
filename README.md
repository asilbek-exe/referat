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

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (or use Docker)
- Docker and Docker Compose (optional)

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

## Production Deployment

1. Set strong `SECRET_KEY` in environment variables
2. Use production database (not SQLite)
3. Configure proper CORS origins
4. Set up reverse proxy (nginx)
5. Use HTTPS
6. Configure file storage (S3, etc.)
7. Set up monitoring and logging

## License

This project is proprietary software. All rights reserved.

## Authors

- Мулладжанова Насиба Азимджановна

## Acknowledgments

This project was converted from a Tkinter desktop application to a modern web platform while preserving all original functionality and improving user experience.

