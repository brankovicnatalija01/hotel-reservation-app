package com.natalija.hotelapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.natalija.hotelapp.dto.reservation.ReservationRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.dto.reservation.ReservationSearchRequestDTO;
import com.natalija.hotelapp.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReservationController.class)
@AutoConfigureMockMvc(addFilters = false) // Skipping Security for tests
class ReservationControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReservationService reservationService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void createReservation_ShouldReturnCreated() throws Exception {
        ReservationRequestDTO requestDTO = new ReservationRequestDTO();
        ReservationResponseDTO responseDTO = new ReservationResponseDTO();
        responseDTO.setReservationId(1L);

        when(reservationService.createReservation(any(ReservationRequestDTO.class))).thenReturn(responseDTO);

        mockMvc.perform(post("/api/reservations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.reservationId").value(1));
    }

    @Test
    void getReservationById_ShouldReturnOk() throws Exception {
        ReservationResponseDTO responseDTO = new ReservationResponseDTO();
        responseDTO.setReservationId(1L);
        when(reservationService.getReservationById(1L)).thenReturn(responseDTO);

        mockMvc.perform(get("/api/reservations/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.reservationId").value(1));
    }

    @Test
    void getReservationsByUserId_ShouldReturnList() throws Exception {
        List<ReservationResponseDTO> list = List.of(new ReservationResponseDTO());
        when(reservationService.getReservationsByUserId(1L)).thenReturn(list);

        mockMvc.perform(get("/api/reservations/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    @Test
    void getAllReservations_ShouldReturnList() throws Exception {
        when(reservationService.getAllReservations()).thenReturn(List.of(new ReservationResponseDTO()));

        mockMvc.perform(get("/api/reservations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }

    @Test
    void deleteReservation_ShouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/api/reservations/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void approveReservation_ShouldReturnOk() throws Exception {
        ReservationResponseDTO response = new ReservationResponseDTO();
        response.setStatus("CONFIRMED");
        when(reservationService.approveReservation(1L)).thenReturn(response);

        mockMvc.perform(put("/api/reservations/approve/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CONFIRMED"));
    }

    @Test
    void cancelReservation_ShouldReturnOk() throws Exception {
        ReservationResponseDTO response = new ReservationResponseDTO();
        response.setStatus("CANCELLED");
        when(reservationService.cancelReservation(1L)).thenReturn(response);

        mockMvc.perform(put("/api/reservations/cancel/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CANCELLED"));
    }

    @Test
    void rejectReservation_ShouldReturnOk() throws Exception {
        ReservationResponseDTO response = new ReservationResponseDTO();
        response.setStatus("REJECTED");
        when(reservationService.rejectReservation(1L)).thenReturn(response);

        mockMvc.perform(put("/api/reservations/reject/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("REJECTED"));
    }

    @Test
    void searchReservations_ShouldReturnList() throws Exception {
        ReservationSearchRequestDTO searchRequest = new ReservationSearchRequestDTO();
        when(reservationService.search(any(ReservationSearchRequestDTO.class))).thenReturn(List.of(new ReservationResponseDTO()));

        mockMvc.perform(post("/api/reservations/search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(searchRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }
}