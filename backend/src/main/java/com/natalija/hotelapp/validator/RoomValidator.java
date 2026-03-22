package com.natalija.hotelapp.validator;

import com.natalija.hotelapp.dto.room.RoomRequestDTO;
import com.natalija.hotelapp.entity.Amenity;
import com.natalija.hotelapp.enums.ValidationType;
import com.natalija.hotelapp.exception.ValidationException;
import com.natalija.hotelapp.repository.AmenityRepository;
import com.natalija.hotelapp.repository.PropertyRepository;
import com.natalija.hotelapp.repository.RoomRepository;
import com.natalija.hotelapp.repository.RoomTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;


import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
public class RoomValidator implements Validator<RoomRequestDTO>{

    private final ValidationType validationType;
    private final PropertyRepository propertyRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final AmenityRepository amenityRepository;
    private final RoomRepository roomRepository;


    public RoomValidator(ValidationType validationType,
                         PropertyRepository propertyRepository,
                         RoomTypeRepository roomTypeRepository,
                         AmenityRepository amenityRepository,
                         RoomRepository roomRepository) {
        this.validationType = validationType;
        this.propertyRepository = propertyRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.amenityRepository = amenityRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public void validate(RoomRequestDTO dto) throws ValidationException {
        validatePropertyExists(dto);
        validateRoomTypeExists(dto);
        validateAmenitiesIfPresent(dto);
        validateRoomNumber(dto);
        validatePrice(dto);
        validateDescription(dto);

        if (validationType == ValidationType.CREATE) {
            validateCreate(dto);
        } else if (validationType == ValidationType.UPDATE) {
            validateUpdate(dto);
        }
    }

    private void validatePropertyExists(RoomRequestDTO dto) {
        if (dto.getPropertyId() != null &&
                propertyRepository.findById(dto.getPropertyId()).isEmpty()) {
            throw new EntityNotFoundException("Property not found with ID: " + dto.getPropertyId());
        }
    }

    private void validateRoomTypeExists(RoomRequestDTO dto) {
        if (dto.getRoomTypeId() != null &&
                roomTypeRepository.findById(dto.getRoomTypeId()).isEmpty()) {
            throw new EntityNotFoundException("RoomType not found with ID: " + dto.getRoomTypeId());
        }
    }

    private void validateAmenitiesIfPresent(RoomRequestDTO dto) {
        if (dto.getAmenityIds() != null && !dto.getAmenityIds().isEmpty()) {
            validateAmenities(dto.getAmenityIds());
        }
    }

    private void validateRoomNumber(RoomRequestDTO dto) {
        if (dto.getRoomNumber() != null && !dto.getRoomNumber().matches("\\d{3}")) {
            throw new ValidationException("Room number must be a 3-digit number");
        }
        if (dto.getRoomNumber() != null) {
            validateRoomNumberUniqueness(dto);
        }
    }

    private void validateRoomNumberUniqueness(RoomRequestDTO dto) {
        if (dto.getPropertyId() == null) {
            throw new ValidationException("Please provide property ID for updating a room");
        }
        if (roomRepository.existsByRoomNumberAndProperty_Id(dto.getRoomNumber(), dto.getPropertyId())) {
            throw new ValidationException("Room with room number " + dto.getRoomNumber() + " already exists in this property");
        }
    }

    private void validatePrice(RoomRequestDTO dto) {
        if (dto.getPricePerNight() != null && dto.getPricePerNight().compareTo(BigDecimal.ZERO) <= 0) {
            throw new ValidationException("Price per night must be greater than 0");
        }
    }

    private void validateDescription(RoomRequestDTO dto) {
        if (dto.getDescription() != null && dto.getDescription().length() > 100) {
            throw new ValidationException("Description cannot exceed 100 characters");
        }
    }

    private void validateUpdate(RoomRequestDTO dto) {
        if (dto.getRoomNumber() == null &&
                dto.getPricePerNight() == null &&
                dto.getDescription() == null &&
                dto.getRoomTypeId() == null &&
                dto.getPropertyId() == null &&
                (dto.getAmenityIds() == null || dto.getAmenityIds().isEmpty())) {
            throw new ValidationException("At least one field must be provided for updating a room");
        }
        if (dto.getRoomNumber() != null && dto.getRoomNumber().isBlank()) {
            throw new ValidationException("Room number cannot be empty");
        }
        if (dto.getDescription() != null && dto.getDescription().isBlank()) {
            throw new ValidationException("Description cannot be empty");
        }
    }

    private void validateCreate(RoomRequestDTO dto) {
        if (dto.getPropertyId() == null) {
            throw new ValidationException("Property ID is required for creating a room");
        }
        if (dto.getRoomTypeId() == null) {
            throw new ValidationException("RoomType ID is required for creating a room");
        }
        if (dto.getRoomNumber() == null || dto.getRoomNumber().isBlank()) {
            throw new ValidationException("Room number is required for creating a room");
        }
        if (dto.getPricePerNight() == null) {
            throw new ValidationException("Price per night is required for creating a room");
        }
        if (dto.getDescription() == null || dto.getDescription().isBlank()) {
            throw new ValidationException("Description is required for creating a room");
        }
    }

    private void validateAmenities(List<Long> amenityIds) {
        Set<Long> existingAmenityIds = new HashSet<>();
        for (Amenity a : amenityRepository.findAllById(amenityIds)) {
            existingAmenityIds.add(a.getId());
        }
        for (Long id : amenityIds) {
            if (!existingAmenityIds.contains(id)) {
                throw new EntityNotFoundException("Amenity not found with ID: " + id);
            }
        }
    }
}

