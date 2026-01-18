package com.natalija.hotelapp.mapper;

/**
 * @param <ReqDTO>
 * @param <ResDTO>
 * @param <Entity>
 */

public interface Mapper<ReqDTO, ResDTO, Entity>{
    Entity toEntity(ReqDTO dto);
    ResDTO toDto(Entity entity);

}
