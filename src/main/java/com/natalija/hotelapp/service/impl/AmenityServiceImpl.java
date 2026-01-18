package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.amenity.AmenityResponseDTO;
import com.natalija.hotelapp.mapper.impl.AmenityMapper;
import com.natalija.hotelapp.repository.AmenityRepository;
import com.natalija.hotelapp.service.AmenityService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class AmenityServiceImpl implements AmenityService {

    private final AmenityRepository amenityRepository;
    private final AmenityMapper amenityMapper;

    @Override
    public List<AmenityResponseDTO> getAllAmenityNames() {
        return amenityRepository.findAll().stream()
                .map(amenityMapper::toDto)
                .toList();
    }
}

