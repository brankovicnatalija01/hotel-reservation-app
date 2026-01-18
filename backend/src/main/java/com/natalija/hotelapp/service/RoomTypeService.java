package com.natalija.hotelapp.service;

import com.natalija.hotelapp.dto.roomType.RoomTypeResponseDTO;

import java.util.List;

public interface RoomTypeService {
    List<RoomTypeResponseDTO> getAllRoomTypes();
}
