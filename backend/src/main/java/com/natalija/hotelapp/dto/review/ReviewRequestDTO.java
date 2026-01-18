package com.natalija.hotelapp.dto.review;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ReviewRequestDTO implements Serializable {
    private Integer rating;
    private String comment;
    private Long reservationId;
}
