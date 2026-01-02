package com.natalija.hotelapp.controller;

import com.natalija.hotelapp.dto.room.RoomRequestDTO;
import com.natalija.hotelapp.dto.room.RoomResponseDTO;
import com.natalija.hotelapp.dto.room.RoomSearchRequestDTO;
import com.natalija.hotelapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Get All Rooms
    @GetMapping
    public ResponseEntity<List<RoomResponseDTO>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    // 4Get Room by ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomResponseDTO> getRoom(@PathVariable Long id) {
        RoomResponseDTO room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    // Filter by Room Type
    @GetMapping("/filter/type")
    public ResponseEntity<List<RoomResponseDTO>> filterByRoomType(@RequestParam String type) {
        return ResponseEntity.ok(roomService.getRoomsByRoomType(type));
    }

    // Filter by Amenities
    @GetMapping("/filter/amenities")
    public ResponseEntity<List<RoomResponseDTO>> filterByAmenities(@RequestParam List<String> amenities) {
        return ResponseEntity.ok(roomService.getRoomsByAmenities(amenities));
    }

    @PostMapping("/search")
    public ResponseEntity<List<RoomResponseDTO>> searchRooms(@RequestBody RoomSearchRequestDTO request) {
        return ResponseEntity.ok(roomService.search(request));
    }

    // Create Room
    @PostMapping
    public ResponseEntity<RoomResponseDTO> createRoom(@RequestBody RoomRequestDTO dto) {
        RoomResponseDTO createdRoom = roomService.createRoom(dto);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    // Update Room
    @PutMapping("/{id}")
    public ResponseEntity<RoomResponseDTO> updateRoom(@PathVariable Long id, @RequestBody RoomRequestDTO dto) {
        RoomResponseDTO updatedRoom = roomService.updateRoom(id, dto);
        return ResponseEntity.ok(updatedRoom);
    }

    // Delete Room
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

}
