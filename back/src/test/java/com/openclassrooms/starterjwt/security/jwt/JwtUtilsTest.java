package com.openclassrooms.starterjwt.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class JwtUtilsTest {

    @Value("${oc.app.jwtSecret}")
    private String jwtSecret;

    @Value("${oc.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @InjectMocks
    private JwtUtils jwtUtils;

    private String token;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        // Inject the secret value into the tokenService
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", jwtSecret);

        // create a valid token
        token = Jwts.builder()
                .setSubject(("yoga@studio.com"))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    @Test
    public void testGetUserNameFromJwtToken() {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        assertEquals("yoga@studio.com", username);
    }

    @Nested
    @Tag("Test Validate token")
    @DisplayName("Test validate token when token is valid or invalid.")
    class TestValidateToken {

        @Test
        @DisplayName("test a valid token.")
        public void testValidateTokenWhenTokenIsOk() {
            boolean isValid = jwtUtils.validateJwtToken(token);
            assertEquals(true, isValid);
        }

        @Test
        @DisplayName("test a malformed token.")
        public void testValidateTokenWhenTokenIsInvalid() {
            String fakeToken="test.test.test";

            boolean isInvalid = jwtUtils.validateJwtToken(fakeToken);
            // Then
            assertEquals(false, isInvalid);

        }

        @Test
        @DisplayName("test an expired token.")
        public void testValidateTokenWhenTokenIsExpired() {
            String expiredToken = Jwts.builder()
                    .setSubject(("yoga@studio.com"))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + 1))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();

            boolean isInvalid = jwtUtils.validateJwtToken(expiredToken);

            assertEquals(false, isInvalid);
        }


        @Test
        @DisplayName("test an empty token.")
        public void testValidateTokenWhenClaimIsEmpty() {
            String emptyToken="";

            boolean isInvalid = jwtUtils.validateJwtToken(emptyToken);
            // Then
            assertEquals(false, isInvalid);
        }
    }
}
