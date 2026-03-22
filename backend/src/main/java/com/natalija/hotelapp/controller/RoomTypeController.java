package com.natalija.hotelapp.controller;

import com.natalija.hotelapp.dto.roomType.RoomTypeResponseDTO;
import com.natalija.hotelapp.service.RoomTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {
    private final RoomTypeService roomTypeService;

    public RoomTypeService(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping
    public ResponseEntity<List<RoomTypeResponseDTO>> getAll() {
        return ResponseEntity.ok(roomTypeService.getAllRoomTypes());
    }
}
