package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SessionService sessionService;

    private Session session1 = new Session();
    private Session session2 = new Session();

    @BeforeEach
    public void createMockSession() {
        Teacher teacher1 = new Teacher();
        teacher1.setId(1L);
        teacher1.setLastName("last1");
        teacher1.setFirstName("first1");
        session1.setId(1L);
        session1.setName("session test");
        session1.setTeacher(teacher1);
        session2.setId(2L);
        session2.setName("session test 2");
        session2.setTeacher(teacher1);
    }

    @Test
    public void testFindAllSessionShouldReturnListOfSessions() {
        // Given
        when(sessionRepository.findAll()).thenReturn(Arrays.asList(session1, session2));
        // When
        List<Session> sessions = sessionService.findAll();
        // Then
        assertEquals(2, sessions.size());
    }

    @Test
    public void testGetSessionByIdWithValidIdShouldReturnSession() {
        // Given
        when(sessionRepository.findById(1L)).thenReturn(Optional.ofNullable(session1));
        // When
        Session result = sessionService.getById(1L);
        // Then
        assertEquals("session test", result.getName());
    }

    @Test
    public void testGetSessionByIdWithInvalidIdShouldReturnNull() {
        // When
        Session result = sessionService.getById(3L);
        // Then
        assertNull(result);
    }

    @Test
    public void testCreateSessionShouldReturnSession() {
        // Given
        // When
        when(sessionRepository.save(session2)).thenReturn(session2);
        // Then
        Session result = sessionService.create(session2);
        assertEquals("session test 2", result.getName());
    }

    @Test
    public void testDeleteByIdShoudCallRepositoryWithCorrectId() {
        // Given
        Long id = 1L;
        doNothing().when(sessionRepository).deleteById(id);
        // When
        sessionService.delete(id);
        // Then
        verify(sessionRepository).deleteById(id);
    }

    @Test
    public void testParticipateWithNullSessionShouldReturnError() {
        NotFoundException exception =
        assertThrows(NotFoundException.class, () -> {
            sessionService.participate(3L, 1L);
        });
        assertEquals(NotFoundException.class, exception.getClass());
    }


}
