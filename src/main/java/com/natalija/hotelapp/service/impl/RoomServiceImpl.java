package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.room.RoomRequestDTO;
import com.natalija.hotelapp.dto.room.RoomResponseDTO;
import com.natalija.hotelapp.dto.room.RoomSearchRequestDTO;
import com.natalija.hotelapp.entity.Amenity;
import com.natalija.hotelapp.entity.Property;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.entity.RoomType;
import com.natalija.hotelapp.mapper.impl.RoomMapper;
import com.natalija.hotelapp.repository.*;
import com.natalija.hotelapp.service.RoomService;
import com.natalija.hotelapp.specification.RoomSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final PropertyRepository propertyRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final AmenityRepository amenityRepository;
    private final RoomMapper roomMapper;

    @Override
    public List<RoomResponseDTO> getAllRooms() {
        return roomRepository.findAll()
                .stream()
                .map(roomMapper::toDto)
                .toList();
    }

    @Override
    public RoomResponseDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
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
    public RoomResponseDTO createRoom(RoomRequestDTO dto) {
        Room room = roomMapper.toEntity(dto);

        if (dto.getPropertyId() != null) {
            Property property = propertyRepository.findById(dto.getPropertyId())
                    .orElseThrow(() -> new RuntimeException("Property not found"));
            room.setProperty(property);
        }

        if (dto.getRoomTypeId() != null) {
            RoomType roomType = roomTypeRepository.findById(dto.getRoomTypeId())
                    .orElseThrow(() -> new RuntimeException("Room type not found"));
            room.setRoomType(roomType);
        }

        if (dto.getAmenityIds() != null && !dto.getAmenityIds().isEmpty()) {
            Set<Amenity> amenities = new HashSet<>(amenityRepository.findAllById(dto.getAmenityIds()));
            room.setAmenities(amenities);
        }

        Room saved = roomRepository.save(room);

        return roomMapper.toDto(saved);
    }

    @Override
    public RoomResponseDTO updateRoom(Long roomId, RoomRequestDTO dto) {
        Room existingRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + roomId));

        if (dto.getPropertyId() != null) {
            existingRoom.setProperty(
                    propertyRepository.findById(dto.getPropertyId())
                            .orElseThrow(() -> new RuntimeException("Property not found"))
            );
        }

        if (dto.getRoomTypeId() != null) {
            existingRoom.setRoomType(
                    roomTypeRepository.findById(dto.getRoomTypeId())
                            .orElseThrow(() -> new RuntimeException("Room type not found"))
            );
        }

        if (dto.getRoomNumber() != null)
            existingRoom.setRoomNumber(dto.getRoomNumber());

        if (dto.getPricePerNight() != null)
            existingRoom.setPricePerNight(dto.getPricePerNight());

        if (dto.getDescription() != null)
            existingRoom.setDescription(dto.getDescription());

        if (dto.getAmenityIds() != null) {
            existingRoom.setAmenities(new HashSet<>(amenityRepository.findAllById(dto.getAmenityIds()))
            );
        }
        Room updatedRoom = roomRepository.save(existingRoom);
        return roomMapper.toDto(updatedRoom);
    }

    @Override
    public void deleteRoom(Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
        roomRepository.delete(room);
    }

}

