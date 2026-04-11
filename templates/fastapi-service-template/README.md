# FastAPI Service Template

A production-ready FastAPI template with authentication, database integration, and testing.

## Features

- FastAPI with async support
- JWT authentication
- SQLAlchemy + PostgreSQL
- Pydantic v2 models
- Unit tests with pytest
- Docker support
- Environment-based configuration

## Quick Start

```bash
# Create new service from template
cp -r templates/fastapi-service-template /path/to/your-new-service

# Install dependencies
cd /path/to/your-new-service
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Run the service
uvicorn app.main:app --reload
```

API Endpoints

Method Endpoint Description
POST /auth/register User registration
POST /auth/login User login, returns JWT
GET /users/me Get current user profile
PUT /users/me Update current user profile
GET /health Health check

Project Structure

```
fastapi-service-template/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Settings and environment
│   ├── database.py          # Database connection
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py          # SQLAlchemy models
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── user.py          # Pydantic schemas
│   ├── api/
│   │   ├── __init__.py
│   │   ├── auth.py          # Authentication endpoints
│   │   └── users.py         # User endpoints
│   └── utils/
│       ├── __init__.py
│       └── security.py      # JWT and password hashing
├── tests/
│   ├── __init__.py
│   ├── test_auth.py
│   └── test_users.py
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

Part of Gebeta Sovereign Code Assistant
