package com.natalija.hotelapp.service;

import com.natalija.hotelapp.dto.auth.LoginRequest;
import com.natalija.hotelapp.dto.auth.LoginResponse;
import com.natalija.hotelapp.dto.auth.RegisterRequestDTO;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    void register(RegisterRequestDTO dto);
}
