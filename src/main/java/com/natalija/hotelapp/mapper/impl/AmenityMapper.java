package com.natalija.hotelapp.mapper.impl;

import com.natalija.hotelapp.dto.amenity.AmenityRequestDTO;
import com.natalija.hotelapp.dto.amenity.AmenityResponseDTO;
import com.natalija.hotelapp.entity.Amenity;
import com.natalija.hotelapp.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class AmenityMapper implements Mapper<AmenityRequestDTO, AmenityResponseDTO, Amenity> {
    @Override
    public Amenity toEntity(AmenityRequestDTO amenityRequestDTO) {
        return null;
    }

    @Override
    public AmenityResponseDTO toDto(Amenity amenity) {
        AmenityResponseDTO dto = new AmenityResponseDTO();
        dto.setName(amenity.getName());
        return dto;
    }
}