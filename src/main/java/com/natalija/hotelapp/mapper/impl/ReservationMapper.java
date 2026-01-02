package com.natalija.hotelapp.mapper.impl;

import com.natalija.hotelapp.dto.reservation.ReservationCreateRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.entity.User;
import com.natalija.hotelapp.enums.ReservationStatus;
import com.natalija.hotelapp.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper implements Mapper<ReservationCreateRequestDTO, ReservationResponseDTO, Reservation> {

    @Override
    public Reservation toEntity(ReservationCreateRequestDTO dto) {
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
        dto.setUserId(reservation.getUser().getId());

        return dto;
    }
}

