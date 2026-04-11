"""
Rate limiting tests (v2.0).
Currently skipped until rate limiting is implemented.
"""

import pytest

@pytest.mark.skip(reason="Rate limiting not yet implemented in v1.0")
@pytest.mark.asyncio
async def test_rate_limit_login_endpoint():
    """Test that login endpoint is rate limited to 10 requests per minute."""
    pass

@pytest.mark.skip(reason="Rate limiting not yet implemented in v1.0")
@pytest.mark.asyncio
async def test_rate_limit_register_endpoint():
    """Test that register endpoint is rate limited to 10 requests per minute."""
    pass
