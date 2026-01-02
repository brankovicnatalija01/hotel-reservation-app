package com.natalija.hotelapp.service;

import com.natalija.hotelapp.dto.ReservationCreateRequestDTO;
import com.natalija.hotelapp.dto.ReservationResponseDTO;

import java.util.List;

public interface ReservationService {

    ReservationResponseDTO createReservation(ReservationCreateRequestDTO dto);

    ReservationResponseDTO getReservationById(Long id);

    List<ReservationResponseDTO> getAllReservations();

    void cancelReservation(Long id);
}
