package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @Tag("testGetUserByIdMethod")
    class TestGetUserById {
        @Test
        @DisplayName("get a user with a valid Id.")
        @WithMockUser(roles = "USER")
        public void whenGetUserByIdThenUserIsReturned() throws Exception {
            // Given
            Long id = 1L;
            // When Then
            mockMvc.perform(get("/api/user/" + id))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.firstName").value("Admin"))
                    .andReturn();
        }
        @Test
        @DisplayName("get a user with an Id of the wrong type.")
        @WithMockUser(roles = "USER")
        public void whenGetUserdButIdIsNotAlongThenReturnBadRequest() throws Exception {
            // Given
            String id = "1L";
            // When Then
            mockMvc.perform(get("/api/user/" + id))
                    .andExpect(status().isBadRequest())
                    .andReturn();
        }

        @Test
        @DisplayName("get a user with an Id that doesn't exist.")
        @WithMockUser(roles = "USER")
        public void whenGetUserByIdButUserIsNullThenReturnNotFound() throws Exception {
            // Given
            Long id = 3L;
            // When Then
            mockMvc.perform(get("/api/user/" + id))
                    .andExpect(status().isNotFound())
                    .andReturn();
        }
    }

    @Nested
    @Tag("testDeleteUserMethod")
    class TestDeleteUserById {
        @Test
        @DisplayName("delete a user with a correct Id but is connected.")
        @WithMockUser(roles = "ADMIN")
        public void whenDeleteUserByIdButUserIsNotConnectedThenReturnUnauthorized() throws Exception {
            // Given
            Long id = 1L;
            // When Then
            mockMvc.perform(delete("/api/user/" + id))
                    .andExpect(status().isUnauthorized())
                    .andReturn();
        }

        @Test
        @DisplayName("delete a user with a correct Id.")
        @Transactional
        @Rollback
        @WithMockUser(username="yoga@studio.com", roles = {"ADMIN"})
        public void whenDeleteUserByIdThenReturnOk() throws Exception {
            // Given
            Long id = 1L;
            // When Then
            mockMvc.perform(delete("/api/user/" + id))
                    .andExpect(status().isOk())
                    .andReturn();
        }


        @Test
        @DisplayName("delete a user with an Id of the wrong type.")
        @WithMockUser(roles = "USER")
        public void whenDeleteUserByIdButIdIsNotAlongThenReturnBadRequest() throws Exception {
            // Given
            String id = "1L";
            // When Then
            mockMvc.perform(delete("/api/user/" + id))
                    .andExpect(status().isBadRequest())
                    .andReturn();
        }

        @Test
        @DisplayName("delte a user with an Id that doesn't exist.")
        @WithMockUser(roles = "USER")
        public void whenDeleteUserByIdButUserIsNullThenReturnNotFound() throws Exception {
            // Given
            Long id = 3L;
            // When Then
            mockMvc.perform(delete("/api/user/" + id))
                    .andExpect(status().isNotFound())
                    .andReturn();
        }
    }
}
