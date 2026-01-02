package com.natalija.hotelapp.mapper;

/**
 * @param <Dto>
 * @param <Entity>
 */

public interface Mapper <Dto, Entity>{
    Entity toEntity(Dto dto);
    Dto toDto(Entity entity);

}
