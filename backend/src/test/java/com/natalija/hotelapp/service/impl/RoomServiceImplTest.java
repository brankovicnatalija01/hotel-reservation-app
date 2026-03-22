package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.room.RoomRequestDTO;
import com.natalija.hotelapp.dto.room.RoomResponseDTO;
import com.natalija.hotelapp.entity.*;
import com.natalija.hotelapp.repository.*;
import com.natalija.hotelapp.mapper.impl.RoomMapper;
import com.natalija.hotelapp.validator.RoomValidator;
import com.natalija.hotelapp.validator.factory.RoomValidatorFactory;
import com.natalija.hotelapp.enums.ValidationType;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoomServiceImplTest {

    @Mock private RoomRepository roomRepository;
    @Mock private PropertyRepository propertyRepository;
    @Mock private RoomTypeRepository roomTypeRepository;
    @Mock private RoomMapper roomMapper;
    @Mock private RoomValidatorFactory roomValidatorFactory;
    @Mock private RoomValidator roomValidator;

    @InjectMocks
    private RoomServiceImpl roomService;

    @BeforeEach
    void setUp() {
        lenient().when(roomValidatorFactory.createValidator(any(ValidationType.class))).thenReturn(roomValidator);
    }

    @Test
    void getRoomById_Success() {
        Room room = new Room();
        room.setId(1L);
        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));
        when(roomMapper.toDto(room)).thenReturn(new RoomResponseDTO());

        RoomResponseDTO result = roomService.getRoomById(1L);

        assertNotNull(result);
        verify(roomRepository).findById(1L);
    }

    @Test
    void getRoomById_ThrowsException_WhenNotFound() {
        when(roomRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> roomService.getRoomById(1L));
    }

    @Test
    void createRoom_Success() {
        RoomRequestDTO dto = new RoomRequestDTO();
        dto.setPropertyId(1L);
        dto.setRoomTypeId(1L);
        dto.setImageUrls(List.of("url1.jpg"));

        Room roomEntity = new Room();
        Property property = new Property();
        RoomType roomType = new RoomType();

        when(roomMapper.toEntity(dto)).thenReturn(roomEntity);
        when(propertyRepository.findById(1L)).thenReturn(Optional.of(property));
        when(roomTypeRepository.findById(1L)).thenReturn(Optional.of(roomType));
        when(roomRepository.save(any(Room.class))).thenReturn(roomEntity);
        when(roomMapper.toDto(any(Room.class))).thenReturn(new RoomResponseDTO());

        RoomResponseDTO result = roomService.createRoom(dto);

        assertNotNull(result);
        verify(roomValidator).validate(dto);
        verify(roomRepository).save(any(Room.class));
    }

    @Test
    void getRoomsByAmenities_Success() {
        List<String> inputAmenities = List.of("AC");
        List<Room> mockRooms = List.of(new Room());

        when(roomRepository.findRoomsWithAllAmenitiesIgnoreCase(anyList(), anyLong()))
                .thenReturn(mockRooms);
        when(roomMapper.toDto(any(Room.class))).thenReturn(new RoomResponseDTO());

        List<RoomResponseDTO> results = roomService.getRoomsByAmenities(inputAmenities);

        assertNotNull(results);
        assertEquals(1, results.size());

        verify(roomRepository).findRoomsWithAllAmenitiesIgnoreCase(
                List.of("ac"),
                1L
        );
    }

    @Test
    void deleteRoom_Success() {
        Room room = new Room();
        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));

        roomService.deleteRoom(1L);
        verify(roomRepository).delete(room);
    }

    @Test
    void deleteRoom_ThrowsException_WhenNotFound() {
        when(roomRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> roomService.deleteRoom(1L));
        verify(roomRepository, never()).delete(any(Room.class));
    }
}

