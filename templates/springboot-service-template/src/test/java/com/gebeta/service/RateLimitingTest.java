package com.gebeta.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

@Disabled("Rate limiting not yet implemented in v1.0")
class RateLimitingTest {

    @Test
    @Disabled
    void testRateLimitLoginEndpoint() {
        // Login endpoint should be limited to 10 requests per minute
    }

    @Test
    @Disabled
    void testRateLimitRegisterEndpoint() {
        // Register endpoint should be limited to 10 requests per minute
    }
}