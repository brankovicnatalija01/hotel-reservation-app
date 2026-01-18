package com.natalija.hotelapp.controller;

import com.natalija.hotelapp.dto.reservation.ReservationRequestDTO;
import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.dto.reservation.ReservationSearchRequestDTO;
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
    public ResponseEntity<ReservationResponseDTO> createReservation(@Valid @RequestBody ReservationRequestDTO dto) {

        ReservationResponseDTO response = reservationService.createReservation(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}") // GET reservation by id
    public ResponseEntity<ReservationResponseDTO> getReservationById(@PathVariable Long id) {

        ReservationResponseDTO response = reservationService.getReservationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}") // GET reservations by userId
    public ResponseEntity<List<ReservationResponseDTO>> getReservationsByUserId(@PathVariable Long userId) {
        List<ReservationResponseDTO> reservations = reservationService.getReservationsByUserId(userId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping // GET all reservations
    public ResponseEntity<List<ReservationResponseDTO>> getAllReservations() {

        List<ReservationResponseDTO> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @DeleteMapping("/{id}")  // DELETE reservation
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/cancel/{id}") // ADMIN
    public ResponseEntity<ReservationResponseDTO> cancelReservation(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.cancelReservation(id));
    }
    @PutMapping("/approve/{id}") // ADMIN
    public ResponseEntity<ReservationResponseDTO> approveReservation(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.approveReservation(id));
    }

    @PutMapping("/reject/{id}") // ADMIN
    public ResponseEntity<ReservationResponseDTO> rejectReservation(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.rejectReservation(id));
    }

    @PostMapping("/search")
    public ResponseEntity<List<ReservationResponseDTO>> searchReservations(@RequestBody ReservationSearchRequestDTO request) {
        return ResponseEntity.ok(reservationService.search(request));
    }

}
