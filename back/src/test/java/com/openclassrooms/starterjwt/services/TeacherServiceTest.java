package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class TeacherServiceTest {

    @Mock
    private TeacherRepository teacherRepository;

    @InjectMocks
    private TeacherService teacherService;

    private Teacher teacher1 = new Teacher();
    private Teacher teacher2 = new Teacher();

    @BeforeEach
    public void createMockTeacher() {
        teacher1.setId(1L);
        teacher1.setLastName("last1");
        teacher1.setFirstName("first1");

        teacher2.setId(2L);
        teacher2.setLastName("last2");
        teacher2.setFirstName("first2");
    }

    @Test
    public void testFindByIdShouldReturnTeacher() {
        // Given
        Long id = 1L;
        when(teacherRepository.findById(id)).thenReturn(Optional.of(teacher1));
        // When
        Teacher result = teacherService.findById(id);
        // Then
        assertNotNull(result);
        assertEquals("first1", result.getFirstName());
    }

    @Test
    public void testFindByIdShouldReturnNullIfIdNotKnown() {
        // Given
        Long id = 3L;
        // When
        Teacher result = teacherService.findById(id);
        // Then
        assertNull(result);
    }

    @Test
    public void testFindAllShouldReturnListOfTeachers() {
        // Given
        when(teacherRepository.findAll()).thenReturn(Arrays.asList(teacher1, teacher2));
        // When
        List result = teacherService.findAll();
        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
    }
}
