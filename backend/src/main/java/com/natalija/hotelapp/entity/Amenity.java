package com.natalija.hotelapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "amenities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

   // @ManyToMany(mappedBy = "amenities")
  //  private Set<Room> rooms;
}
