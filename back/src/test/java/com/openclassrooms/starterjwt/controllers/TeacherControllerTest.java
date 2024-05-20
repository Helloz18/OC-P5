package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


@AutoConfigureMockMvc
@SpringBootTest
public class TeacherControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Mock
    private TeacherMapper teacherMapper;

    @Mock
    private TeacherService teacherService;

    @InjectMocks
    private TeacherController teacherController;

    @Test
    @WithMockUser(roles = "USER")
    public void whenGetTeacherByIdThenTeacherIsReturned() throws Exception {
        // Given
        Long id = 1L;
        // When Then
        mockMvc.perform(get("/api/teacher/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Margot"))
                .andReturn();
    }

    @Test
    @WithMockUser(roles = "USER")
    public void whenGetTeacherByIdButIdIsNotAlongThenReturnBadRequest() throws Exception {
        // Given
        String id = "1L";
        // When Then
        mockMvc.perform(get("/api/teacher/" + id))
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    @WithMockUser(roles = "USER")
    public void whenGetTeacherByIdButTeacherIsNullThenReturnNotFound() throws Exception {
        // Given
        Long id = 3L;
        // When Then
        mockMvc.perform(get("/api/teacher/" + id))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    @WithMockUser(roles = "USER")
    public void whenFindAllTeachersThenListOfTeachersIsReturned() throws Exception {
        mockMvc.perform(get("/api/teacher"))
                .andExpect(status().isOk())
                .andReturn();
    }
}