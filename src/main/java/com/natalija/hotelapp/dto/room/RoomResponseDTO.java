package com.natalija.hotelapp.dto.room;

import lombok.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RoomResponseDTO implements Serializable {
    private Long id;
    private String roomNumber;
    private BigDecimal pricePerNight;
    private String description;

    //Property
    private Long propertyId;
    private String propertyName;

    // Room type
    private Long roomTypeId;
    private String roomTypeName;
    private String roomTypeDescription;
    private int roomTypeCapacity;

    // Amenities
    private List<String> amenities;
    private List<String> imageUrls;

}
