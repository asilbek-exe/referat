"""
Database initialization script
Creates tables and optionally creates an admin user
"""
from app.core.database import Base, engine, SessionLocal
from app.models.user import User, UserRole
from app.core.security import get_password_hash


def init_db():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")


def create_admin_user():
    """Create a default admin user"""
    db = SessionLocal()
    try:
        # Check if admin already exists
        admin = db.query(User).filter(User.username == "admin").first()
        if admin:
            print("Admin user already exists")
            return
        
        # Create admin user
        try:
            hashed_password = get_password_hash("admin123")
        except Exception as e:
            # Fallback: use bcrypt directly if passlib fails
            import bcrypt
            hashed_password = bcrypt.hashpw(
                "admin123".encode('utf-8'),
                bcrypt.gensalt()
            ).decode('utf-8')
        
        admin_user = User(
            email="admin@example.com",
            username="admin",
            full_name="Administrator",
            hashed_password=hashed_password,
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin_user)
        db.commit()
        print("Admin user created successfully!")
        print("Username: admin")
        print("Password: admin123")
        print("Please change the password after first login!")
    except Exception as e:
        print(f"Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    import sys
    
    init_db()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--create-admin":
        create_admin_user()

