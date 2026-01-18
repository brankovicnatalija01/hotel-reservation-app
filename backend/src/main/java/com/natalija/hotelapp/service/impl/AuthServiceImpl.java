package com.natalija.hotelapp.service.impl;

import com.natalija.hotelapp.dto.auth.LoginRequest;
import com.natalija.hotelapp.dto.auth.LoginResponse;
import com.natalija.hotelapp.dto.auth.RegisterRequestDTO;
import com.natalija.hotelapp.entity.Role;
import com.natalija.hotelapp.entity.User;
import com.natalija.hotelapp.repository.RoleRepository;
import com.natalija.hotelapp.repository.UserRepository;
import com.natalija.hotelapp.security.JwtUtils;
import com.natalija.hotelapp.security.UserDetailsImpl;
import com.natalija.hotelapp.service.AuthService;
import com.natalija.hotelapp.validator.RegisterValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final RegisterValidator registerValidator;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;


    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        // 1. Authenticate user credentials using the AuthenticationManager
        // This will call UserDetailsServiceImpl.loadUserByUsername() internally
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        // 2. Set the authentication object in the Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Generate a secure JWT token for the user
        String jwt = jwtUtils.generateJwtToken(authentication);

        // 4. Safely extract UserDetailsImpl to avoid NullPointerException
        UserDetailsImpl userDetails = Optional.ofNullable(authentication.getPrincipal())
                .filter(principal -> principal instanceof UserDetailsImpl)
                .map(principal -> (UserDetailsImpl) principal)
                .orElseThrow(() -> new RuntimeException("Error: Could not retrieve user details from context."));

        // 5. Safely extract Role (adding ROLE_ prefix if needed)
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_USER");

        // 5. Build and return the response DTO
        return new LoginResponse(jwt, userDetails.getUsername(), role, userDetails.getId());
    }

    @Override
    public void register(RegisterRequestDTO dto) {
        registerValidator.validate(dto);
        Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new IllegalStateException("ROLE_USER not found"));

        User user = new User();
        user.setFirstName(dto.getFirstName().trim());
        user.setLastName(dto.getLastName().trim());
        user.setEmail(dto.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPhone(dto.getPhone().trim());
        user.setRole(userRole);

        userRepository.save(user);
    }
}
