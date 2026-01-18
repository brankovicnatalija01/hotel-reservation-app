package com.natalija.hotelapp.validator.factory;

import com.natalija.hotelapp.enums.ValidationType;
import com.natalija.hotelapp.repository.ReservationRepository;
import com.natalija.hotelapp.repository.ReviewRepository;
import com.natalija.hotelapp.validator.ReviewValidator;
import com.natalija.hotelapp.validator.RoomValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ReviewValidatorFactory {

    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;

    public ReviewValidator createValidator(ValidationType validationType) {
        return new ReviewValidator(reservationRepository, reviewRepository, validationType);
    }
}
