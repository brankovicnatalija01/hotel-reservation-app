package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.reservation.ReservationCreateRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.entity.User;
import com.natalija.hotelapp.enums.ReservationStatus;
import com.natalija.hotelapp.mapper.impl.ReservationMapper;
import com.natalija.hotelapp.repository.ReservationRepository;
import com.natalija.hotelapp.repository.RoomRepository;
import com.natalija.hotelapp.repository.UserRepository;
import com.natalija.hotelapp.service.ReservationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationMapper reservationMapper;

    @Override
    public ReservationResponseDTO createReservation(ReservationCreateRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (dto.getCheckOutDate().isBefore(dto.getCheckInDate())) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }

        Reservation reservation = reservationMapper.toEntity(dto);
        reservation.setUser(user);
        reservation.setRoom(room);
        reservation.setStatus(ReservationStatus.PENDING);

        long nights = ChronoUnit.DAYS.between(
                dto.getCheckInDate(), dto.getCheckOutDate());

        BigDecimal totalPrice = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        if (nights <= 0) {
            throw new RuntimeException("Reservation must be at least 1 night");
        }

        reservation.setTotalPrice(totalPrice);

        Reservation saved = reservationRepository.save(reservation);

        return reservationMapper.toDto(saved);
    }

    @Override
    public ReservationResponseDTO getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        return reservationMapper.toDto(reservation);
    }

    @Override
    public List<ReservationResponseDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(reservationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }
}
