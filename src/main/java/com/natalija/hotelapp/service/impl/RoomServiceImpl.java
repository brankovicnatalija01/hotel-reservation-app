package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.room.RoomRequestDTO;
import com.natalija.hotelapp.dto.room.RoomResponseDTO;
import com.natalija.hotelapp.dto.room.RoomSearchRequestDTO;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.entity.RoomImage;
import com.natalija.hotelapp.enums.ValidationType;
import com.natalija.hotelapp.mapper.impl.RoomMapper;
import com.natalija.hotelapp.repository.*;
import com.natalija.hotelapp.service.RoomService;
import com.natalija.hotelapp.specification.RoomSpecification;
import com.natalija.hotelapp.validator.RoomValidator;
import com.natalija.hotelapp.validator.factory.RoomValidatorFactory;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final PropertyRepository propertyRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final AmenityRepository amenityRepository;
    private final RoomMapper roomMapper;
    private final RoomValidatorFactory roomValidatorFactory;

    @Override
    public List<RoomResponseDTO> getAllRooms() {
        return roomRepository.findAll()
                .stream()
                .map(roomMapper::toDto)
                .toList();
    }

    @Override
    public RoomResponseDTO getRoomById(Long roomId) throws EntityNotFoundException {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + roomId));
        return roomMapper.toDto(room);
    }

    @Override
    public List<RoomResponseDTO> getRoomsByRoomType(String roomTypeName) {
        String normalized = roomTypeName.trim();

        return roomRepository
                .findByRoomType_NameIgnoreCase(normalized)
                .stream()
                .map(roomMapper::toDto)
                .toList();
    }

    @Override
    public List<RoomResponseDTO> getRoomsByAmenities(List<String> amenities) {
        // normalize input (case-insensitive)
        List<String> normalizedAmenities = amenities.stream()
                .map(String::toLowerCase)
                .toList();

        List<Room> rooms = roomRepository.findRoomsWithAllAmenitiesIgnoreCase(normalizedAmenities, normalizedAmenities.size());

        return rooms.stream()
                .map(roomMapper::toDto)
                .toList();
    }

    @Override
    public List<RoomResponseDTO> search(RoomSearchRequestDTO request) {
        Specification<Room> specification = RoomSpecification.filter(request);

        return roomRepository.findAll(specification)
                .stream()
                .map(roomMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public RoomResponseDTO createRoom(RoomRequestDTO dto) {
        RoomValidator validator = roomValidatorFactory.createValidator(ValidationType.CREATE);
        validator.validate(dto);

        Room room = roomMapper.toEntity(dto);

        room.setProperty(propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new EntityNotFoundException("Property not found")));
        room.setRoomType(roomTypeRepository.findById(dto.getRoomTypeId())
                .orElseThrow(() -> new EntityNotFoundException("Room Type not found")));

        if (dto.getAmenityIds() != null && !dto.getAmenityIds().isEmpty()) {
            room.setAmenities(new HashSet<>(amenityRepository.findAllById(dto.getAmenityIds())));
        }

        if (dto.getImageUrls() != null && !dto.getImageUrls().isEmpty()) {
            for (String url : dto.getImageUrls()) {
                RoomImage img = new RoomImage();
                img.setUrl(url);
                img.setRoom(room);
                room.getImages().add(img);
            }
        }

        Room saved = roomRepository.save(room);
        roomRepository.flush();

        return roomMapper.toDto(saved);
    }

    @Override
    public RoomResponseDTO updateRoom(Long roomId, RoomRequestDTO dto) throws EntityNotFoundException {
        RoomValidator validator = roomValidatorFactory.createValidator(ValidationType.UPDATE);
        validator.validate(dto);

        // Fetch the existing room
        Room existingRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + roomId));

        // Set fields if present
        if (dto.getPropertyId() != null) existingRoom.setProperty(propertyRepository.findById(dto.getPropertyId()).get());
        if (dto.getRoomTypeId() != null) existingRoom.setRoomType(roomTypeRepository.findById(dto.getRoomTypeId()).get());
        if (dto.getRoomNumber() != null) existingRoom.setRoomNumber(dto.getRoomNumber());
        if (dto.getPricePerNight() != null) existingRoom.setPricePerNight(dto.getPricePerNight());
        if (dto.getDescription() != null) existingRoom.setDescription(dto.getDescription());
        if (dto.getAmenityIds() != null) existingRoom.setAmenities(new HashSet<>(amenityRepository.findAllById(dto.getAmenityIds())));
        if (dto.getImageUrls() != null) {
            existingRoom.getImages().clear(); // Remove old images
            List<RoomImage> newImages = dto.getImageUrls().stream()
                    .map(url -> {
                        RoomImage img = new RoomImage();
                        img.setUrl(url);
                        img.setRoom(existingRoom);
                        return img;
                    }).toList();
            existingRoom.getImages().addAll(newImages);
        }

        Room updatedRoom = roomRepository.save(existingRoom);
        return roomMapper.toDto(updatedRoom);
    }

    @Override
    public void deleteRoom(Long roomId) throws EntityNotFoundException {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + roomId));
        roomRepository.delete(room);
    }

}

