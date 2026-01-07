package com.natalija.hotelapp.dto.amenity;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AmenityResponseDTO implements Serializable {
    private String name;
}
