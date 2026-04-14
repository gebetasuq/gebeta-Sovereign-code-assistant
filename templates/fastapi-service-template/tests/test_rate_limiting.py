"""
Rate limiting tests for authentication endpoints.
Verifies that login and register endpoints are properly rate limited.
"""

import pytest
from httpx import AsyncClient
from app.main import app


@pytest.mark.asyncio
async def test_rate_limit_login_endpoint():
    """Test that login endpoint is rate limited to 10 requests per minute per IP."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Register a user first (not rate limited for this test)
        await client.post(
            "/api/v1/auth/register",
            json={"email": "ratelimit@example.com", "password": "StrongPass123!"},
        )

        # Send 11 login attempts (10 allowed, 1 blocked)
        for i in range(10):
            response = await client.post(
                "/api/v1/auth/login",
                data={"username": "ratelimit@example.com", "password": "StrongPass123!"},
            )
            assert response.status_code == 200, f"Attempt {i+1} failed"

        # 11th attempt should be rate limited
        response = await client.post(
            "/api/v1/auth/login",
            data={"username": "ratelimit@example.com", "password": "StrongPass123!"},
        )
        assert response.status_code == 429
        assert "Retry-After" in response.headers


@pytest.mark.asyncio
async def test_rate_limit_register_endpoint():
    """Test that register endpoint is rate limited to 5 requests per 5 minutes per IP."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Send 6 registration attempts (5 allowed, 1 blocked)
        for i in range(5):
            response = await client.post(
                "/api/v1/auth/register",
                json={"email": f"test{i}@example.com", "password": "StrongPass123!"},
            )
            assert response.status_code == 201, f"Attempt {i+1} failed"

        # 6th attempt should be rate limited
        response = await client.post(
            "/api/v1/auth/register",
            json={"email": "blocked@example.com", "password": "StrongPass123!"},
        )
        assert response.status_code == 429
        assert "Retry-After" in response.headers