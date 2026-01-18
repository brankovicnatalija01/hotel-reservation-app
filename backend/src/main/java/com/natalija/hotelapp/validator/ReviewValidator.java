package com.natalija.hotelapp.validator;


import com.natalija.hotelapp.dto.review.ReviewRequestDTO;
import com.natalija.hotelapp.entity.Reservation;
import com.natalija.hotelapp.enums.ReservationStatus;
import com.natalija.hotelapp.enums.ValidationType;
import com.natalija.hotelapp.exception.ValidationException;
import com.natalija.hotelapp.repository.ReservationRepository;
import com.natalija.hotelapp.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@AllArgsConstructor
public class ReviewValidator implements Validator<ReviewRequestDTO>{

    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;
    private final ValidationType validationType;


    @Override
    public void validate(ReviewRequestDTO dto) throws ValidationException {
        if(dto.getRating() != null) {
            if (dto.getRating() < 1 || dto.getRating() > 10) {
                throw new ValidationException("Rating must be between 1 and 10");
            }
        }

        // Validate comment length
        if(dto.getComment() != null) {
            if (dto.getComment().length() > 300) {
                throw new ValidationException("Comment cannot exceed 300 characters");
            }
        }

        if (validationType == ValidationType.CREATE) {
            validateCreate(dto);
        } else if (validationType == ValidationType.UPDATE) {
            validateUpdate(dto);
        }

    }

    private void validateUpdate(ReviewRequestDTO dto) {
        // At least one field must be provided
        if (dto.getRating() == null && dto.getComment() == null) {
            throw new ValidationException("At least one field (rating or comment) must be provided for update");
        }

        if (dto.getReservationId() != null) {
            throw new ValidationException("Reservation ID cannot be changed on update");
        }
    }

    private void validateCreate(ReviewRequestDTO dto) {

        // Rating must be provided
        if (dto.getRating() == null) {
            throw new ValidationException("Rating is required");
        }

        // Comment must be provided
        if (dto.getComment() == null || dto.getComment().isBlank()) {
            throw new ValidationException("Comment is required");
        }

        // Check if the reservation exists
        Reservation reservation = reservationRepository.findById(dto.getReservationId())
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with ID: " + dto.getReservationId()));

        // Check if the reservation is finished (checkOutDate <= today) and has status CONFIRMED
        if (reservation.getStatus() != ReservationStatus.CONFIRMED &&
                reservation.getCheckOutDate().isAfter(LocalDate.now())) {
            throw new ValidationException("Cannot review a reservation that is not finished or not confirmed");
        }

        // Check if user already added a review for this reservation
        boolean alreadyReviewed = reviewRepository.existsByReservation_Id(dto.getReservationId());
        if (alreadyReviewed) {
            throw new ValidationException("You have already submitted a review for this reservation");
        }
    }
}
