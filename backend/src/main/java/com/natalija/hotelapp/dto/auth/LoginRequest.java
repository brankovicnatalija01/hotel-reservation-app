package com.natalija.hotelapp.dto.auth;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class LoginRequest implements Serializable {
    private String email;
    private String password;
}
