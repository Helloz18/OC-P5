package com.openclassrooms.starterjwt.security.services;


import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @Nested
    @Tag("Load by Username")
    @DisplayName("Verify return of loadUserByUsername() method.")
    class loadByUsernameTests {
        @Test
        public void givenUserWhenLoadUserByUsernameThenReturnCorrectUserDetails() {
            User user = new User();
            user.setEmail("yoga@studio.com");
            user.setFirstName("Admin");
            user.setLastName("Admin");
            user.setPassword("test!1234");
            when(userRepository.findByEmail("yoga@studio.com")).thenReturn(Optional.of(user));
            UserDetails userDetails = userDetailsService.loadUserByUsername("yoga@studio.com");
            assertEquals("test!1234", userDetails.getPassword());
        }

        @Test
        public void givenNotUserWhenLoadUserByUsernameThenReturnUserNotFound() {
            // Given When
            String email = "notuser@studio.com";
            // Configuration of the mock to find no user
            when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

            // Then
            UsernameNotFoundException exception =
                    assertThrows(UsernameNotFoundException.class, () -> {
                        userDetailsService.loadUserByUsername("notuser@studio.com");
                    });
            assertEquals("User Not Found with email: notuser@studio.com", exception.getMessage());
        }
    }

    @Test
    @Tag("Test equals method")
    @DisplayName("Test equals method")
    public void testEquals() {
        UserDetailsImpl user1 = new UserDetailsImpl(
                1L,
                "first@test.com",
                "first",
                "last",
                false,
                "test!12234");
        UserDetailsImpl user2 = new UserDetailsImpl(
                1L,
                "first@test.com",
                "first",
                "last",
                false,
                "test!12234");

        UserDetailsImpl user3 = null;

        assertTrue(user1.equals(user2));
        assertTrue(user1.equals(user1));
        assertFalse(user1.equals(user3));
    }
}
