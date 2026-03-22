package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.reservation.ReservationRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.dto.reservation.ReservationSearchRequestDTO;
import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.entity.User;
import com.natalija.hotelapp.enums.ReservationStatus;
import com.natalija.hotelapp.exception.ValidationException;
import com.natalija.hotelapp.mapper.impl.ReservationMapper;
import com.natalija.hotelapp.repository.ReservationRepository;
import com.natalija.hotelapp.repository.RoomRepository;
import com.natalija.hotelapp.repository.UserRepository;
import com.natalija.hotelapp.validator.ReservationValidator;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceImplTest {

    @Mock private ReservationRepository reservationRepository;
    @Mock private UserRepository userRepository;
    @Mock private RoomRepository roomRepository;
    @Mock private ReservationMapper reservationMapper;
    @Mock private ReservationValidator reservationValidator;

    @InjectMocks
    private ReservationServiceImpl reservationService;

    @Test
    void createReservation_Success() {
        ReservationRequestDTO dto = new ReservationRequestDTO();
        dto.setUserId(1L);
        dto.setRoomId(1L);
        dto.setCheckInDate(LocalDate.now().plusDays(1));
        dto.setCheckOutDate(LocalDate.now().plusDays(3)); // 2 nights

        Room room = new Room();
        room.setId(1L);
        room.setPricePerNight(new BigDecimal("100"));

        User user = new User();
        user.setId(1L);

        Reservation reservation = new Reservation();

        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(reservationMapper.toEntity(dto)).thenReturn(reservation);
        when(reservationRepository.save(any(Reservation.class))).thenReturn(reservation);
        when(reservationMapper.toDto(any())).thenReturn(new ReservationResponseDTO());

        reservationService.createReservation(dto);

        verify(reservationValidator).validate(dto);
        //  2 nights * 100 = 200
        assertEquals(new BigDecimal("200"), reservation.getTotalPrice());
        assertEquals(ReservationStatus.PENDING, reservation.getStatus());
    }

    @Test
    void createReservation_ShouldThrowException_WhenRoomNotAvailable() {
        ReservationRequestDTO dto = new ReservationRequestDTO();
        dto.setRoomId(1L);

        doThrow(new ValidationException("Room is not available for selected dates"))
                .when(reservationValidator).validate(dto);

        assertThrows(ValidationException.class, () -> reservationService.createReservation(dto));
        verify(reservationRepository, never()).save(any());
    }

    @Test
    void getReservationById_ThrowsException_WhenNotFound() {
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> reservationService.getReservationById(99L));
    }

    @Test
    void deleteReservation_Success() {
        Long id = 1L;
        Reservation res = new Reservation();
        res.setId(id);

        when(reservationRepository.findById(id)).thenReturn(Optional.of(res));
        reservationService.deleteReservation(id);
        verify(reservationRepository, times(1)).delete(res);
    }

    @Test
    void deleteReservation_ThrowsException_WhenNotFound() {
        when(reservationRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> reservationService.deleteReservation(1L));
    }
    @Test
    void approveReservation_Success() {
        Reservation res = new Reservation();
        res.setStatus(ReservationStatus.PENDING);
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(res));
        when(reservationRepository.save(any())).thenReturn(res);

        reservationService.approveReservation(1L);
        assertEquals(ReservationStatus.CONFIRMED, res.getStatus());
    }

    @Test
    void approveReservation_ThrowsException_WhenNotPending() {
        Reservation res = new Reservation();
        res.setStatus(ReservationStatus.CANCELLED);
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(res));

        assertThrows(ValidationException.class, () -> reservationService.approveReservation(1L));
    }

    @Test
    void cancelReservation_Success() {
        Reservation res = new Reservation();
        res.setStatus(ReservationStatus.PENDING);
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(res));
        when(reservationRepository.save(any())).thenReturn(res);

        reservationService.cancelReservation(1L);
        assertEquals(ReservationStatus.CANCELLED, res.getStatus());
    }

    @Test
    void rejectReservation_Success() {
        Reservation res = new Reservation();
        res.setStatus(ReservationStatus.PENDING);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(res));
        when(reservationRepository.save(any())).thenReturn(res);
        when(reservationMapper.toDto(any())).thenReturn(new ReservationResponseDTO());

        reservationService.rejectReservation(1L);

        assertEquals(ReservationStatus.REJECTED, res.getStatus());
        verify(reservationRepository).save(res);
    }

    @Test
    void search_ShouldReturnList() {
        ReservationSearchRequestDTO request = new ReservationSearchRequestDTO();
        Reservation res = new Reservation();
        List<Reservation> list = List.of(res);

        when(reservationRepository.findAll(any(Specification.class))).thenReturn(list);
        when(reservationMapper.toDto(res)).thenReturn(new ReservationResponseDTO());
        List<ReservationResponseDTO> results = reservationService.search(request);

        assertNotNull(results);
        assertEquals(1, results.size());
        verify(reservationRepository).findAll(any(Specification.class));
    }
}