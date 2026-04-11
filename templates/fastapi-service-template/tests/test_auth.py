
"""
Tests for authentication endpoints.
"""

import pytest
from httpx import AsyncClient
from app.main import app


@pytest.mark.asyncio
async def test_register_user():
    """Test user registration."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/auth/register",
            json={
                "email": "test@example.com",
                "password": "testpassword123",
                "full_name": "Test User",
            },
        )
        assert response.status_code == 201
        assert response.json()["email"] == "test@example.com"


@pytest.mark.asyncio
async def test_login_user():
    """Test user login."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        # First register
        await client.post(
            "/api/v1/auth/register",
            json={
                "email": "login@example.com",
                "password": "testpassword123",
                "full_name": "Login User",
            },
        )
        
        # Then login
        response = await client.post(
            "/api/v1/auth/login",
            data={
                "username": "login@example.com",
                "password": "testpassword123",
            },
        )
        assert response.status_code == 200
        assert "access_token" in response.json()
