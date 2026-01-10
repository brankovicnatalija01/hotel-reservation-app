package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.roomType.RoomTypeResponseDTO;
import com.natalija.hotelapp.mapper.impl.RoomTypeMapper;
import com.natalija.hotelapp.repository.RoomTypeRepository;
import com.natalija.hotelapp.service.RoomTypeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomTypeServiceImpl implements RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;
    private final RoomTypeMapper roomTypeMapper;

    @Override
    public List<RoomTypeResponseDTO> getAllRoomTypes() {
        return roomTypeRepository.findAll()
                .stream()
                .map(roomTypeMapper::toDto)
                .toList();
    }
}
