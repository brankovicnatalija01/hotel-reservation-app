package com.natalija.hotelapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.natalija.hotelapp.dto.room.RoomRequestDTO;
import com.natalija.hotelapp.dto.room.RoomResponseDTO;
import com.natalija.hotelapp.dto.room.RoomSearchRequestDTO;
import com.natalija.hotelapp.service.RoomService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.natalija.hotelapp.security.JwtUtils;
import com.natalija.hotelapp.security.UserDetailsServiceImpl;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RoomController.class)
@AutoConfigureMockMvc(addFilters = false)
class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private RoomService roomService;
    @MockitoBean
    private UserDetailsServiceImpl userDetailsService;
    @MockitoBean
    private JwtUtils jwtUtils;

    private final ObjectMapper objectMapper = new ObjectMapper();


    @Test
    void getAllRooms_ShouldReturnList() throws Exception {
        List<RoomResponseDTO> rooms = Arrays.asList(new RoomResponseDTO(), new RoomResponseDTO());
        when(roomService.getAllRooms()).thenReturn(rooms);

        mockMvc.perform(get("/api/rooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2));
    }

    @Test
    void getRoom_ShouldReturnRoom() throws Exception {
        RoomResponseDTO room = new RoomResponseDTO();
        room.setId(1L);
        when(roomService.getRoomById(1L)).thenReturn(room);

        mockMvc.perform(get("/api/rooms/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void filterByRoomType_ShouldReturnFilteredList() throws Exception {
        List<RoomResponseDTO> rooms = List.of(new RoomResponseDTO());
        when(roomService.getRoomsByRoomType("DELUXE")).thenReturn(rooms);

        mockMvc.perform(get("/api/rooms/filter/type").param("type", "DELUXE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    @Test
    void filterByAmenities_ShouldReturnFilteredList() throws Exception {
        List<String> amenities = Arrays.asList("WiFi", "TV");
        when(roomService.getRoomsByAmenities(amenities)).thenReturn(List.of(new RoomResponseDTO()));

        mockMvc.perform(get("/api/rooms/filter/amenities").param("amenities", "WiFi,TV"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    @Test
    void searchRooms_ShouldReturnList() throws Exception {
        RoomSearchRequestDTO searchRequest = new RoomSearchRequestDTO();
        when(roomService.search(any(RoomSearchRequestDTO.class))).thenReturn(List.of(new RoomResponseDTO()));

        mockMvc.perform(post("/api/rooms/search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(searchRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    @Test
    void createRoom_ShouldReturnCreatedStatus() throws Exception {
        RoomRequestDTO request = new RoomRequestDTO();
        RoomResponseDTO response = new RoomResponseDTO();
        response.setId(10L);

        when(roomService.createRoom(any(RoomRequestDTO.class))).thenReturn(response);

        mockMvc.perform(post("/api/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(10));
    }

    @Test
    void updateRoom_ShouldReturnUpdatedRoom() throws Exception {
        RoomRequestDTO request = new RoomRequestDTO();
        RoomResponseDTO response = new RoomResponseDTO();
        response.setId(1L);

        when(roomService.updateRoom(eq(1L), any(RoomRequestDTO.class))).thenReturn(response);

        mockMvc.perform(put("/api/rooms/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void deleteRoom_ShouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/api/rooms/1"))
                .andExpect(status().isNoContent());
    }
}