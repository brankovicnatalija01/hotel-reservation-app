package com.natalija.hotelapp.specification;

import com.natalija.hotelapp.dto.reservation.ReservationSearchRequestDTO;
import com.natalija.hotelapp.entity.Reservation;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ReservationSpecification {

    private ReservationSpecification() {
        // Utility class - prevent instantiation
    }

    public static Specification<Reservation> filter(ReservationSearchRequestDTO req) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            addNamePredicates(req, root, cb, predicates);
            addStatusPredicate(req, root, cb, predicates);
            addRoomNumberPredicate(req, root, cb, predicates);
            addDatePredicates(req, root, cb, predicates);

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static void addNamePredicates(ReservationSearchRequestDTO req,
                                          Root<Reservation> root, CriteriaBuilder cb, List<Predicate> predicates) {
        if (req.getFullName() != null && !req.getFullName().isBlank()) {
            Expression<String> fullName = cb.concat(
                    cb.lower(root.get("user").get("firstName")),
                    cb.concat(" ", cb.lower(root.get("user").get("lastName"))));
            predicates.add(cb.like(fullName, "%" + req.getFullName().toLowerCase() + "%"));
        } else {
            addFirstNamePredicate(req, root, cb, predicates);
            addLastNamePredicate(req, root, cb, predicates);
        }
    }

    private static void addFirstNamePredicate(ReservationSearchRequestDTO req,
                                              Root<Reservation> root, CriteriaBuilder cb, List<Predicate> predicates) {
        if (req.getUserFirstName() != null && !req.getUserFirstName().isBlank()) {
            predicates.add(cb.like(cb.lower(root.get("user").get("firstName")),
                    "%" + req.getUserFirstName().toLowerCase() + "%"));
        }
    }

    private static void addLastNamePredicate(ReservationSearchRequestDTO req,
                                             Root<Reservation> root, CriteriaBuilder cb, List<Predicate> predicates) {
        if (req.getUserLastName() != null && !req.getUserLastName().isBlank()) {
            predicates.add(cb.like(cb.lower(root.get("user").get("lastName")),
                    "%" + req.getUserLastName().toLowerCase() + "%"));
        }
    }

    private static void addStatusPredicate(ReservationSearchRequestDTO req,
                                           Root<Reservation> root, CriteriaBuilder cb, List<Predicate> predicates) {
        if (req.getStatus() != null) {
            predicates.add(cb.equal(root.get("status"), req.getStatus()));
        }
    }

    private static void addRoomNumberPredicate(ReservationSearchRequestDTO req,
                                               Root<Reservation> root, CriteriaBuilder cb, List<Predicate> predicates) {
        if (req.getRoomNumber() != null && !req.getRoomNumber().isBlank()) {
            predicates.add(cb.equal(root.get("room").get("roomNumber"), req.getRoomNumber()));
        }
    }

    private static void addDatePredicates(ReservationSearchRequestDTO req,
                                          Root<Reservation> root, CriteriaBuilder cb, List<Predicate> predicates) {
        if (req.getCheckInDate() != null) {
            predicates.add(cb.lessThan(root.get("checkOutDate"), req.getCheckInDate()).not());
        }
        if (req.getCheckOutDate() != null) {
            predicates.add(cb.greaterThan(root.get("checkInDate"), req.getCheckOutDate()).not());
        }
    }
}

