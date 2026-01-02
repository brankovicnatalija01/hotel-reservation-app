package com.natalija.hotelapp.service;

import com.natalija.hotelapp.dto.reservation.ReservationCreateRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;

import java.util.List;

public interface ReservationService {

    ReservationResponseDTO createReservation(ReservationCreateRequestDTO dto);

    ReservationResponseDTO getReservationById(Long id);

    List<ReservationResponseDTO> getAllReservations();

    void cancelReservation(Long id);
}
