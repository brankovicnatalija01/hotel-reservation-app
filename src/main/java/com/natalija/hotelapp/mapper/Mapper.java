package com.natalija.hotelapp.mapper;

/**
 * @param <Dto>
 * @param <Entity>
 */

public interface Mapper<ReqDTO, ResDTO, Entity>{
    Entity toEntity(ReqDTO dto);
    ResDTO toDto(Entity entity);

}
