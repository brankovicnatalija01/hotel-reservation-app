package com.natalija.hotelapp.mapper.impl;

import com.natalija.hotelapp.dto.review.ReviewRequestDTO;
import com.natalija.hotelapp.dto.review.ReviewResponseDTO;
import com.natalija.hotelapp.entity.Review;
import com.natalija.hotelapp.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper implements Mapper<ReviewRequestDTO, ReviewResponseDTO, Review> {
    @Override
    public Review toEntity(ReviewRequestDTO dto) {
        Review review = new Review();
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        return review;
    }

    @Override
    public ReviewResponseDTO toDto(Review review) {
        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setReviewId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setReservationId(review.getReservation().getId());
        dto.setUserId(review.getReservation().getUser().getId());
        dto.setUserFirstName(review.getReservation().getUser().getFirstName());
        dto.setUserLastName(review.getReservation().getUser().getLastName());
        dto.setRoomId(review.getReservation().getRoom().getId());
        dto.setRoomName(review.getReservation().getRoom().getRoomNumber());
        dto.setRoomType(review.getReservation().getRoom().getRoomType().getName());
        dto.setRoomTypeDescription(review.getReservation().getRoom().getRoomType().getDescription());
        return dto;
    }
}
