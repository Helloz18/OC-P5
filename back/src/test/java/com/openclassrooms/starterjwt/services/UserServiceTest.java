package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user1 = new User();

    @BeforeEach
    public void createMockUser() {
        user1.setId(1L);
        user1.setEmail("user1@test.com");
        user1.setPassword("test!1234");
        user1.setLastName("last1");
        user1.setFirstName("first1");
    }

    @Test
    @DisplayName("delete by Id should call the repository.")
    public void testDeleteByIdShoudCallRepositoryWithCorrectId() {
        // Given
        Long id = 1L;
        doNothing().when(userRepository).deleteById(id);
        // When
        userService.delete(id);
        // Then
        verify(userRepository).deleteById(id);
    }

    @Test
    @DisplayName("find by Id with a valid Id should return a user.")
    public void whenFindByIdThenUserIsReturned() {
        // Given
        Long id = 1L;
        when(userRepository.findById(id)).thenReturn(Optional.ofNullable(user1));
        // When
        User userFound = userService.findById(id);
        // Then
        assertEquals("first1", userFound.getFirstName());
    }
}
