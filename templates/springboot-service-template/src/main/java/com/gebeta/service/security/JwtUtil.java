package com.gebeta.service.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JWT Utility class for token generation, validation, and extraction.
 * Follows Gebeta Sovereign Coding Rules:
 * - Security: Tokens are signed with HMAC-SHA256
 * - Quality: Clear method names and logging
 */
@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration}")
    private Long expiration;

    /**
     * Generate a JWT token for a user.
     *
     * @param email the user's email (subject)
     * @return signed JWT token
     */
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

        logger.debug("Generated token for user: {}", email);
        return token;
    }

    /**
     * Generate a JWT token with a custom expiration offset (for testing).
     * Used to test expired token handling.
     *
     * @param email the user's email (subject)
     * @param expirationOffsetMillis offset from current time (negative for expired)
     * @return signed JWT token with custom expiration
     */
    public String generateTokenWithExpiration(String email, long expirationOffsetMillis) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationOffsetMillis);

        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

        logger.debug("Generated token for user: {} with custom expiration: {}", email, expiryDate);
        return token;
    }

    /**
     * Extract email (subject) from a JWT token.
     *
     * @param token JWT token
     * @return email address from token
     * @throws ExpiredJwtException if token is expired
     * @throws MalformedJwtException if token is malformed
     */
    public String extractEmail(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        
        String email = claims.getSubject();
        logger.debug("Extracted email from token: {}", email);
        return email;
    }

    /**
     * Validate a JWT token (signature and expiration).
     *
     * @param token JWT token
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            logger.debug("Token validated successfully");
            return true;
        } catch (ExpiredJwtException e) {
            logger.warn("Token expired: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.warn("Malformed token: {}", e.getMessage());
        } catch (SignatureException e) {
            logger.warn("Invalid signature: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warn("Token claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    /**
     * Extract expiration date from a JWT token.
     *
     * @param token JWT token
     * @return expiration date
     */
    public Date extractExpiration(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration();
    }

    /**
     * Check if a token is expired.
     *
     * @param token JWT token
     * @return true if expired, false otherwise
     */
    public boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        boolean expired = expiration.before(new Date());
        if (expired) {
            logger.debug("Token expired at: {}", expiration);
        }
        return expired;
    }
}