package com.natalija.hotelapp.service;

import com.natalija.hotelapp.dto.amenity.AmenityResponseDTO;
import java.util.List;

public interface AmenityService {
    List<AmenityResponseDTO> getAllAmenityNames();
}

