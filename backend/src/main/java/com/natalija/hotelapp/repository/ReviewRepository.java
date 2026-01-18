package com.natalija.hotelapp.repository;

import com.natalija.hotelapp.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByReservation_Id(Long id);
    List<Review> findAllByReservation_Room_Id(Long roomId);
    List<Review> findAllByReservation_User_Id(Long userId);

    @Modifying
    @Query("DELETE FROM Review r WHERE r.id = :id")
    void deleteByIdCustom(@Param("id") Long id);
}
