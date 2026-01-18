package com.natalija.hotelapp.validator;

import com.natalija.hotelapp.dto.reservation.ReservationRequestDTO;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.exception.ValidationException;
import com.natalija.hotelapp.repository.ReservationRepository;
import com.natalija.hotelapp.repository.RoomRepository;
import com.natalija.hotelapp.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@AllArgsConstructor
@Component
public class ReservationValidator implements Validator<ReservationRequestDTO> {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;

    @Override
    public void validate(ReservationRequestDTO dto) throws ValidationException {
        userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + dto.getUserId()));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + dto.getRoomId()));

        if (dto.getCheckInDate() == null || dto.getCheckOutDate() == null) {
            throw new ValidationException("Check-in and check-out dates are required");
        }

        LocalDate today = LocalDate.now();

        if (dto.getCheckInDate().isBefore(today)) {
            throw new ValidationException("Check-in date must be today or in the future");
        }

        if (!dto.getCheckOutDate().isAfter(today)) {
            throw new ValidationException("Check-out date must be in the future");
        }

        if (dto.getCheckOutDate().isBefore(dto.getCheckInDate())) {
            throw new ValidationException("Check-out date must be after check-in date");
        }

        long nights = ChronoUnit.DAYS.between(dto.getCheckInDate(), dto.getCheckOutDate());
        if (nights <= 0) {
            throw new ValidationException("Reservation must be at least 1 night");
        }

        // Check if the room is available
        boolean roomOccupied = reservationRepository.isRoomAvailable(
                dto.getRoomId(), dto.getCheckInDate(), dto.getCheckOutDate()
        );
        if (roomOccupied) {
            throw new ValidationException("Room " + room.getRoomNumber() + " is already booked for the selected dates");
        }
    }
}

