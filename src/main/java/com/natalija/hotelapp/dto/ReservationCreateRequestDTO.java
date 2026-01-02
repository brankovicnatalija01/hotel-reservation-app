
package com.natalija.hotelapp.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ReservationCreateRequestDTO implements Serializable {

    @NotNull(message = "Room ID must not be null")
    Long roomId;

    @NotNull(message = "User ID must not be null")
    Long userId;

    @NotNull(message = "Check-in date must not be null")
    @Future(message = "Check-in date must be in the future")
    LocalDate checkInDate;

    @NotNull(message = "Check-out date must not be null")
    @Future(message = "Check-out date must be in the future")
    LocalDate checkOutDate;
}