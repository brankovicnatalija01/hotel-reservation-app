package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.enums.ReservationStatus;
import com.natalija.hotelapp.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationStatusUpdater {

    @Autowired
    private ReservationRepository reservationRepository;

    // Runs everyday at 00:00
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void updateExpiredReservations() {
        LocalDate today = LocalDate.now();

        // 1. Fetch all CONFIRMED reservations where the check-out date is before today and set their status to COMPLETED
        List<Reservation> confirmedToComplete = reservationRepository
                .findAllByStatusAndCheckOutDateBefore(ReservationStatus.CONFIRMED, today);

        confirmedToComplete.forEach(res -> res.setStatus(ReservationStatus.COMPLETED));

        // 2. Fetch all PENDING reservations that have passed their check-out date and mark them as EXPIRED
        List<Reservation> pendingToExpired = reservationRepository
                .findAllByStatusAndCheckOutDateBefore(ReservationStatus.PENDING, today);

        pendingToExpired.forEach(res -> res.setStatus(ReservationStatus.EXPIRED));

        reservationRepository.saveAll(confirmedToComplete);
        reservationRepository.saveAll(pendingToExpired);

        System.out.println("Statuses updated for " + (confirmedToComplete.size() + pendingToExpired.size()) + " reservations.");
    }
}