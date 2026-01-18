package com.natalija.hotelapp.validator.factory;

import com.natalija.hotelapp.enums.ValidationType;
import com.natalija.hotelapp.repository.AmenityRepository;
import com.natalija.hotelapp.repository.PropertyRepository;
import com.natalija.hotelapp.repository.RoomRepository;
import com.natalija.hotelapp.repository.RoomTypeRepository;
import com.natalija.hotelapp.validator.RoomValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RoomValidatorFactory {

    private final PropertyRepository propertyRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final AmenityRepository amenityRepository;
    private final RoomRepository roomRepository;

    public RoomValidator createValidator(ValidationType validationType) {
        return new RoomValidator(validationType, propertyRepository, roomTypeRepository, amenityRepository, roomRepository);
    }
}
