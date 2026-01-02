package com.natalija.hotelapp.controller;

import com.natalija.hotelapp.dto.reservation.ReservationCreateRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping // Create Reservation
    public ResponseEntity<ReservationResponseDTO> createReservation(@Valid @RequestBody ReservationCreateRequestDTO dto) {

        ReservationResponseDTO response = reservationService.createReservation(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}") // GET reservation by id
    public ResponseEntity<ReservationResponseDTO> getReservationById(@PathVariable Long id) {

        ReservationResponseDTO response = reservationService.getReservationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping // GET all reservations
    public ResponseEntity<List<ReservationResponseDTO>> getAllReservations() {

        List<ReservationResponseDTO> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @DeleteMapping("/{id}") // CANCEL reservation
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {

        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }
}
