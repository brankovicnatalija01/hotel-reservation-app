package com.natalija.hotelapp.mapper.impl;
import com.natalija.hotelapp.dto.roomType.RoomTypeRequestDTO;
import com.natalija.hotelapp.dto.roomType.RoomTypeResponseDTO;
import com.natalija.hotelapp.entity.RoomType;
import com.natalija.hotelapp.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class RoomTypeMapper implements Mapper<RoomTypeRequestDTO, RoomTypeResponseDTO, RoomType> {
    @Override
    public RoomType toEntity(RoomTypeRequestDTO roomTypeRequestDTO) {
        return null;
    }

    @Override
    public RoomTypeResponseDTO toDto(RoomType roomType) {
        RoomTypeResponseDTO dto = new RoomTypeResponseDTO();
        dto.setId(roomType.getId());
        dto.setName(roomType.getName());
        dto.setDescription(roomType.getDescription());
        dto.setCapacity(roomType.getCapacity());
        return dto;
    }
}
