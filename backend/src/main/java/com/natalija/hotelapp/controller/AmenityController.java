package com.natalija.hotelapp.controller;

import com.natalija.hotelapp.dto.amenity.AmenityResponseDTO;
import com.natalija.hotelapp.service.AmenityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
public class AmenityController {

    private final AmenityService amenityService;

    public AmenityController(AmenityService amenityService) {
        this.amenityService = amenityService;
    }


    @GetMapping
    public ResponseEntity<List<AmenityResponseDTO>> getAllAmenities() {
        return ResponseEntity.ok(amenityService.getAllAmenityNames());
    }
}

