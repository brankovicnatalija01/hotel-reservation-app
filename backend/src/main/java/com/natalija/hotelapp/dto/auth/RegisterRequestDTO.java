package com.natalija.hotelapp.dto.auth;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegisterRequestDTO implements Serializable {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
}
