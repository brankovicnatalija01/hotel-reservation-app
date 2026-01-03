
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
public class ReservationRequestDTO implements Serializable {
    Long roomId;
    Long userId;
    LocalDate checkInDate;
    LocalDate checkOutDate;
}