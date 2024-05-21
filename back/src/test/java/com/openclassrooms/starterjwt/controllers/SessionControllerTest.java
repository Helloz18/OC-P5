package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.SessionDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.util.Date;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class SessionControllerTest {


    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithMockUser(roles = "USER")
    public void whenGetSessionByIdAndSessionIsNullThenNotFoundIsReturned() throws Exception {
        // Given
        Long id = 3L;
        // When Then
        mockMvc.perform(get("/api/session/" + id))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    @WithMockUser(roles = "USER")
    public void whenGetSessionByIdAndIdIsNotLongThenBadRequestIsReturned() throws Exception {
        // Given
        String id = "1L";
        // When Then
        mockMvc.perform(get("/api/session/" + id))
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    @Transactional // to have all operations in a unique transaction
    @Rollback // to rollback the modification done to the database
    @WithMockUser(roles="USER")
    public void whenCreateSession() throws Exception {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("session test");
        sessionDto.setTeacher_id(1L);
        sessionDto.setDate(new Date());
        sessionDto.setDescription("test");

        mockMvc.perform(post("/api/session")
                .contentType(APPLICATION_JSON)
                .content(mapper.writeValueAsString(sessionDto)))
                .andExpect(status().isOk());
    }
}
