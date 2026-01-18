package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.review.ReviewRequestDTO;
import com.natalija.hotelapp.dto.review.ReviewResponseDTO;
import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.entity.Review;
import com.natalija.hotelapp.enums.ValidationType;
import com.natalija.hotelapp.mapper.impl.ReviewMapper;
import com.natalija.hotelapp.repository.ReservationRepository;
import com.natalija.hotelapp.repository.ReviewRepository;
import com.natalija.hotelapp.repository.RoomRepository;
import com.natalija.hotelapp.repository.UserRepository;
import com.natalija.hotelapp.service.ReviewService;
import com.natalija.hotelapp.validator.ReviewValidator;
import com.natalija.hotelapp.validator.factory.ReviewValidatorFactory;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReviewMapper reviewMapper;
    private final ReviewValidatorFactory reviewValidatorFactory;

    @Override
    public ReviewResponseDTO createReview(ReviewRequestDTO dto) {
        ReviewValidator validator = reviewValidatorFactory.createValidator(ValidationType.CREATE);
        validator.validate(dto);
        Reservation reservation = reservationRepository.findById(dto.getReservationId()).get();

        Review review = reviewMapper.toEntity(dto);
        review.setReservation(reservation);

        Review saved = reviewRepository.save(review);
        return reviewMapper.toDto(saved);
    }

    @Override
    public List<ReviewResponseDTO> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(reviewMapper::toDto)
                .toList();
    }

    @Override
    public List<ReviewResponseDTO> getReviewsByUser(Long userId) {
        if (userRepository.findById(userId).isEmpty()) {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }
        List<Review> reviews = reviewRepository.findAllByReservation_User_Id(userId);
        return reviews.stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponseDTO> getReviewsByRoom(Long roomId) {
        if (roomRepository.findById(roomId).isEmpty()) {
            throw new EntityNotFoundException("Room not found with ID: " + roomId);
        }

        List<Review> reviews = reviewRepository.findAllByReservation_Room_Id(roomId);
        return reviews.stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewResponseDTO updateReview(Long reviewId, ReviewRequestDTO dto) {
        ReviewValidator validator = reviewValidatorFactory.createValidator(ValidationType.UPDATE);
        validator.validate(dto);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found with ID: " + reviewId));

        if (dto.getRating() != null) review.setRating(dto.getRating());
        if (dto.getComment() != null) review.setComment(dto.getComment());

        Review updated = reviewRepository.save(review);
        return reviewMapper.toDto(updated);
    }

    @Override
    @Transactional
    public void deleteReview(Long reviewId) {
        if (reviewRepository.findById(reviewId).isEmpty()) {
            throw new EntityNotFoundException("Review not found with ID: " + reviewId);
        }

        reviewRepository.deleteByIdCustom(reviewId);
    }
}
