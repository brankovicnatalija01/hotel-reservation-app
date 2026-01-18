package com.natalija.hotelapp.dto.roomType;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RoomTypeResponseDTO implements Serializable {
    private Long id;
    private String name;
    private int capacity;
    private String description;
}
