package com.natalija.hotelapp.mapper.impl;

import com.natalija.hotelapp.dto.reservation.ReservationRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper implements Mapper<ReservationRequestDTO, ReservationResponseDTO, Reservation> {

    @Override
    public Reservation toEntity(ReservationRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        Reservation reservation = new Reservation();
        reservation.setCheckInDate(dto.getCheckInDate());
        reservation.setCheckOutDate(dto.getCheckOutDate());

        return reservation;
    }

    @Override
    public ReservationResponseDTO toDto(Reservation reservation) {
        if (reservation == null) {
            return null;
        }

        ReservationResponseDTO dto = new ReservationResponseDTO();
        dto.setReservationId(reservation.getReservationId());
        dto.setCheckInDate(reservation.getCheckInDate());
        dto.setCheckOutDate(reservation.getCheckOutDate());
        dto.setStatus(reservation.getStatus().name());
        dto.setTotalPrice(reservation.getTotalPrice());
        dto.setRoomId(reservation.getRoom().getId());
        dto.setRoomNumber(reservation.getRoom().getRoomNumber());
        dto.setUserId(reservation.getUser().getId());
        dto.setUserFirstName(reservation.getUser().getFirstName());
        dto.setUserLastName(reservation.getUser().getLastName());

        return dto;
    }
}

