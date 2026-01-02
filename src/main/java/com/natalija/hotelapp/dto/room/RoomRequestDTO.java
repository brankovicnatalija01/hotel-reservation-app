package com.natalija.hotelapp.dto.room;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RoomRequestDTO {
    private String roomNumber;
    private BigDecimal pricePerNight;
    private String description;
    private Long propertyId;
    private Long roomTypeId;
    private List<Long> amenityIds;
}
