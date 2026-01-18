package com.natalija.hotelapp.service;

import com.natalija.hotelapp.dto.reservation.ReservationRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.dto.reservation.ReservationSearchRequestDTO;
import java.util.List;

public interface ReservationService {

    ReservationResponseDTO createReservation(ReservationRequestDTO dto);
    ReservationResponseDTO getReservationById(Long id);
    List<ReservationResponseDTO> getReservationsByUserId(Long userId);
    List<ReservationResponseDTO> getAllReservations();
    void deleteReservation(Long reservationId);

    ReservationResponseDTO cancelReservation(Long id);
    ReservationResponseDTO approveReservation(Long reservationId);
    ReservationResponseDTO rejectReservation(Long reservationId);

    public List<ReservationResponseDTO> search(ReservationSearchRequestDTO request);

}
