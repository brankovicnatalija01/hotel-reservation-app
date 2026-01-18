package com.natalija.hotelapp.service;

import com.natalija.hotelapp.dto.review.ReviewRequestDTO;
import com.natalija.hotelapp.dto.review.ReviewResponseDTO;

import java.util.List;

public interface ReviewService {
    ReviewResponseDTO createReview(ReviewRequestDTO dto);
    List<ReviewResponseDTO> getAllReviews();
    List<ReviewResponseDTO> getReviewsByUser(Long userId);
    List<ReviewResponseDTO> getReviewsByRoom(Long roomId);
    ReviewResponseDTO updateReview(Long reviewId, ReviewRequestDTO dto);
    void deleteReview(Long reviewId);
}
