package com.gebeta.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gebeta.service.dto.LoginRequest;
import com.gebeta.service.model.User;
import com.gebeta.service.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class RateLimitingTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass");

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private String testEmail;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        testEmail = "ratelimit@example.com";

        // Create a test user for login tests
        User user = new User();
        user.setEmail(testEmail);
        user.setPassword(passwordEncoder.encode("StrongPass123!"));
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Test
    void testRateLimitLoginEndpoint() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail(testEmail);
        request.setPassword("StrongPass123!");

        // Send 10 allowed requests
        for (int i = 0; i < 10; i++) {
            mockMvc.perform(post("/api/v1/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.access_token").isString());
        }

        // 11th request should be rate limited (429)
        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"));
    }

    @Test
    void testRateLimitRegisterEndpoint() throws Exception {
        // Send 5 allowed registration attempts
        for (int i = 0; i < 5; i++) {
            LoginRequest request = new LoginRequest();
            request.setEmail("test" + i + "@example.com");
            request.setPassword("StrongPass123!");

            mockMvc.perform(post("/api/v1/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.email").value("test" + i + "@example.com"));
        }

        // 6th attempt should be rate limited (429)
        LoginRequest blockedRequest = new LoginRequest();
        blockedRequest.setEmail("blocked@example.com");
        blockedRequest.setPassword("StrongPass123!");

        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(blockedRequest)))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"));
    }
}