package com.natalija.hotelapp.mapper.impl;

import com.natalija.hotelapp.dto.room.RoomRequestDTO;
import com.natalija.hotelapp.dto.room.RoomResponseDTO;
import com.natalija.hotelapp.entity.Amenity;
import com.natalija.hotelapp.entity.Room;
import com.natalija.hotelapp.entity.RoomImage;
import com.natalija.hotelapp.mapper.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RoomMapper implements Mapper<RoomRequestDTO, RoomResponseDTO, Room> {

    @Override
    public Room toEntity(RoomRequestDTO dto) {
        if (dto == null) return null;

        Room room = new Room();
        room.setRoomNumber(dto.getRoomNumber());
        room.setPricePerNight(dto.getPricePerNight());
        room.setDescription(dto.getDescription());

        return room;
    }

    @Override
    public RoomResponseDTO toDto(Room room) {
        if (room == null) {
            return null;
        }

        RoomResponseDTO dto = new RoomResponseDTO();
        dto.setId(room.getId());
        dto.setRoomNumber(room.getRoomNumber());
        dto.setPricePerNight(room.getPricePerNight());
        dto.setDescription(room.getDescription());

        dto.setPropertyId(room.getProperty().getId());
        dto.setPropertyName(room.getProperty().getName());

        dto.setRoomTypeId(room.getRoomType().getId());
        dto.setRoomTypeName(room.getRoomType().getName());
        dto.setRoomTypeDescription(room.getRoomType().getDescription());
        dto.setRoomTypeCapacity(room.getRoomType().getCapacity());

        dto.setAmenities(
                room.getAmenities().stream().map(Amenity::getName).toList()
        );

        if (room.getImages() != null) {
            dto.setImageUrls(
                    room.getImages().stream()
                            .map(RoomImage::getUrl)
                            .toList()
            );
        }

        return dto;
    }
}
