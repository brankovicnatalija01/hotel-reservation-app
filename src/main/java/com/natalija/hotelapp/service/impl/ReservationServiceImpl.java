package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.ReservationCreateRequestDTO;
import com.natalija.hotelapp.dto.ReservationResponseDTO;
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
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationMapper reservationMapper;

    public ReservationServiceImpl(ReservationRepository reservationRepository,
                                  UserRepository userRepository,
                                  RoomRepository roomRepository,
                                  ReservationMapper reservationMapper) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.reservationMapper = reservationMapper;
    }
    @Override
    public ReservationResponseDTO createReservation(ReservationCreateRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (dto.getCheckOutDate().isBefore(dto.getCheckInDate())) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }

        Reservation reservation =
                reservationMapper.toEntity(dto, user, room);

        long nights = ChronoUnit.DAYS.between(
                dto.getCheckInDate(), dto.getCheckOutDate());

        BigDecimal totalPrice = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        reservation.setTotalPrice(totalPrice);

        Reservation saved = reservationRepository.save(reservation);

        return reservationMapper.toResponseDto(saved);
    }

    @Override
    public ReservationResponseDTO getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        return reservationMapper.toResponseDto(reservation);
    }

    @Override
    public List<ReservationResponseDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(reservationMapper::toResponseDto)
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
