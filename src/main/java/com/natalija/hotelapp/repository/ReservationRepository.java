package com.natalija.hotelapp.repository;

import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>, JpaSpecificationExecutor<Reservation> {

    @Query("""
        SELECT CASE WHEN COUNT(r.id) > 0 THEN true ELSE false END
        FROM Reservation r
        WHERE r.room.id = :roomId
          AND r.status IN ('PENDING', 'CONFIRMED')
          AND r.checkInDate < :checkOutDate
          AND r.checkOutDate > :checkInDate
    """)
    boolean isRoomAvailable(
            @Param("roomId") Long roomId,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate
    );

    List<Reservation> findByUserId(Long userId);
    List<Reservation> findAllByStatusAndCheckOutDateBefore(ReservationStatus status, LocalDate date);
}
