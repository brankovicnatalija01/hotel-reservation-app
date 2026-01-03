package com.natalija.hotelapp.specification;

import com.natalija.hotelapp.dto.reservation.ReservationResponseDTO;
import com.natalija.hotelapp.dto.reservation.ReservationSearchRequestDTO;
import com.natalija.hotelapp.entity.Reservation;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ReservationSpecification {
    public static Specification<Reservation> filter(ReservationSearchRequestDTO req) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Full name filter (firstName + " " + lastName)
            if (req.getFullName() != null && !req.getFullName().isBlank()) {
                Expression<String> fullNameExpression = cb.concat(
                        cb.lower(root.get("user").get("firstName")),
                        cb.concat(" ", cb.lower(root.get("user").get("lastName"))));

                predicates.add(cb.like(fullNameExpression, "%" + req.getFullName().toLowerCase() + "%"));
            } else {
                if (req.getUserFirstName() != null && !req.getUserFirstName().isBlank()) {
                    predicates.add(
                            cb.like(cb.lower(root.get("user").get("firstName")),
                                    "%" + req.getUserFirstName().toLowerCase() + "%"));
                }

                if (req.getUserLastName() != null && !req.getUserLastName().isBlank()) {
                    predicates.add(
                            cb.like(cb.lower(root.get("user").get("lastName")),
                                    "%" + req.getUserLastName().toLowerCase() + "%"));
                }
            }

            // Status filter
            if (req.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), req.getStatus()));
            }

            // Room number filter
            if (req.getRoomNumber() != null && !req.getRoomNumber().isBlank()) {
                predicates.add(cb.equal(root.get("room").get("roomNumber"), req.getRoomNumber()));
            }

            // Date range filter: overlapping reservations
            if (req.getCheckInDate() != null) {
                predicates.add(cb.lessThan(root.get("checkOutDate"), req.getCheckInDate()).not());
            }
            if (req.getCheckOutDate() != null) {
                predicates.add(cb.greaterThan(root.get("checkInDate"), req.getCheckOutDate()).not());
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

