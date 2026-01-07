package com.natalija.hotelapp.specification;

import com.natalija.hotelapp.dto.room.RoomSearchRequestDTO;
import com.natalija.hotelapp.entity.Amenity;
import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.enums.ReservationStatus;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class RoomSpecification {
    public static Specification<Room> filter(RoomSearchRequestDTO req) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // CAPACITY
            if (req.getCapacity() > 0) {
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("roomType").get("capacity"),
                                req.getCapacity()
                        )
                );
            }

            // PRICE RANGE
            if (req.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(
                        root.get("pricePerNight"), req.getMinPrice()));
            }

            if (req.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(
                        root.get("pricePerNight"), req.getMaxPrice()));
            }

            // AMENITIES (AND logic)
            if (req.getAmenities() != null && !req.getAmenities().isEmpty()) {

                Join<Room, Amenity> amenityJoin = root.join("amenities");

                Expression<String> normalizedAmenity =
                        cb.lower(
                                cb.function(
                                        "replace",
                                        String.class,
                                        amenityJoin.get("name"),
                                        cb.literal(" "),
                                        cb.literal("")
                                )
                        );

                predicates.add(
                        normalizedAmenity.in(
                                req.getAmenities().stream()
                                        .map(a -> a.toLowerCase().replace(" ", ""))
                                        .toList()
                        )
                );

                query.groupBy(root.get("id"));
                query.having(
                        cb.equal(
                                cb.countDistinct(amenityJoin.get("id")),
                                (long) req.getAmenities().size()
                        )
                );
            }

            // AVAILABILITY
            if (req.getCheckIn() != null && req.getCheckOut() != null) {

                Subquery<Long> sub = query.subquery(Long.class);
                Root<Reservation> res = sub.from(Reservation.class);

                sub.select(res.get("room").get("id"))
                        .where(
                                cb.and(
                                        cb.lessThan(res.get("checkInDate"), req.getCheckOut()),
                                        cb.greaterThan(res.get("checkOutDate"), req.getCheckIn()),

                                        res.get("status").in(
                                                ReservationStatus.PENDING,
                                                ReservationStatus.CONFIRMED
                                        )
                                )
                        );

                predicates.add(cb.not(root.get("id").in(sub)));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
