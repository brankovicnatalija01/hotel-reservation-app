package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.reservation.ReservationRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.dto.reservation.ReservationSearchRequestDTO;
import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.enums.ReservationStatus;
import com.natalija.hotelapp.exception.ValidationException;
import com.natalija.hotelapp.mapper.impl.ReservationMapper;
import com.natalija.hotelapp.repository.ReservationRepository;
import com.natalija.hotelapp.repository.RoomRepository;
import com.natalija.hotelapp.repository.UserRepository;
import com.natalija.hotelapp.service.ReservationService;
import com.natalija.hotelapp.specification.ReservationSpecification;
import com.natalija.hotelapp.validator.ReservationValidator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationMapper reservationMapper;
    private final ReservationValidator reservationValidator;

    @Override
    public ReservationResponseDTO createReservation(ReservationRequestDTO dto) {
        reservationValidator.validate(dto);

        Reservation reservation = reservationMapper.toEntity(dto);
        reservation.setUser(userRepository.findById(dto.getUserId()).get());
        reservation.setRoom(roomRepository.findById(dto.getRoomId()).get());
        reservation.setStatus(ReservationStatus.PENDING);

        Optional<Room> room = roomRepository.findById(dto.getRoomId());
        BigDecimal totalPrice = room.get().getPricePerNight().multiply(BigDecimal.valueOf(ChronoUnit.DAYS.between(dto.getCheckInDate(), dto.getCheckOutDate())));
        reservation.setTotalPrice(totalPrice);

        Reservation saved = reservationRepository.save(reservation);
        return reservationMapper.toDto(saved);
    }

    @Override
    public ReservationResponseDTO getReservationById(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with ID: " + reservationId));
        return reservationMapper.toDto(reservation);
    }

    @Override
    public List<ReservationResponseDTO> getReservationsByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        return reservations.stream()
                .map(reservationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReservationResponseDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(reservationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + reservationId));
        reservationRepository.delete(reservation);
    }

    @Override
    public ReservationResponseDTO cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + reservationId));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new ValidationException("Reservation is already cancelled");
        }
        reservation.setStatus(ReservationStatus.CANCELLED);

        Reservation saved = reservationRepository.save(reservation);
        return reservationMapper.toDto(saved);
    }

    @Override
    public ReservationResponseDTO approveReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + reservationId));

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new ValidationException("Only PENDING reservations can be approved");
        }
        reservation.setStatus(ReservationStatus.CONFIRMED);

        Reservation saved = reservationRepository.save(reservation);
        return reservationMapper.toDto(saved);
    }

    @Override
    public ReservationResponseDTO rejectReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + reservationId));

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new ValidationException("Only PENDING reservations can be rejected");
        }
        reservation.setStatus(ReservationStatus.REJECTED);

        Reservation saved = reservationRepository.save(reservation);
        return reservationMapper.toDto(saved);
    }

    @Override
    public List<ReservationResponseDTO> search(ReservationSearchRequestDTO request) {
        Specification<Reservation> specification = ReservationSpecification.filter(request);

        return reservationRepository.findAll(specification)
                .stream()
                .map(reservationMapper::toDto)
                .toList();
    }
}
