package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
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
    @WithMockUser(roles = "USER")
    public void whenGetUserByIdButUserIsNullThenReturnNotFound() throws Exception {
        // Given
        Long id = 3L;
        // When Then
        mockMvc.perform(get("/api/user/" + id))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void whenDeleteUserByIdButUserIsConnectedThenReturnUnauthorized() throws Exception {
        // Given
        Long id = 1L;
        // When Then
        mockMvc.perform(delete("/api/user/" + id))
                .andExpect(status().isUnauthorized())
                .andReturn();
    }

    @Test
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
