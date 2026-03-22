package com.natalija.hotelapp.mapper;

public interface Mapper<Q, R, E> {
    E toEntity(Q dto);
    R toDto(E entity);
}
