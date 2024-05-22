package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
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

    @Nested
    @Tag("testGetTeacherByIdMethod")
    class TestGetTeacherById {
        @Test
        @DisplayName("get a teacher with a valid Id.")
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
        @DisplayName("get a teacher but with an Id of a wrong type.")
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
        @DisplayName("get a teacher that doesn't exist in the database.")
        @WithMockUser(roles = "USER")
        public void whenGetTeacherByIdButTeacherIsNullThenReturnNotFound() throws Exception {
            // Given
            Long id = 3L;
            // When Then
            mockMvc.perform(get("/api/teacher/" + id))
                    .andExpect(status().isNotFound())
                    .andReturn();
        }
    }

    @Test
    @Tag("testFindAllTeacherMethod")
    @DisplayName("find all teacher returns the right number of teachers in database.")
    @WithMockUser(roles = "USER")
    public void whenFindAllTeachersThenListOfTeachersIsReturned() throws Exception {
        mockMvc.perform(get("/api/teacher"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andReturn();
    }
}