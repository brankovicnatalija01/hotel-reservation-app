package com.natalija.hotelapp.dto.reservation;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ReservationSearchRequestDTO implements Serializable{
        private LocalDate checkInDate;
        private LocalDate checkOutDate;
        private String status;
        private String roomNumber;
        private String userFirstName;
        private String userLastName;

        // Optional combined filter: "FirstName LastName"
        private String fullName;
}
