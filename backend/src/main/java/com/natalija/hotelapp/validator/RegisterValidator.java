package com.natalija.hotelapp.validator;

import com.natalija.hotelapp.dto.auth.RegisterRequestDTO;
import com.natalija.hotelapp.exception.ValidationException;
import com.natalija.hotelapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@AllArgsConstructor
@Component
public class RegisterValidator implements Validator<RegisterRequestDTO>{
    private final UserRepository userRepository;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\+?[0-9]{8,15}$");
    private static final Pattern NAME_PATTERN = Pattern.compile("^[A-Za-z]{2,}$");

    @Override
    public void validate(RegisterRequestDTO dto) throws ValidationException {
        // EMAIL
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new ValidationException("Email is required");
        }
        String email = dto.getEmail().trim();
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new ValidationException("Email format is invalid");
        }
        if (userRepository.existsByEmail(email)) {
            throw new ValidationException("Email already exists");
        }

        // PASSWORD
        if (dto.getPassword() == null || dto.getPassword().length() < 6) {
            throw new ValidationException("Password must have at least 6 characters");
        }
        if (!dto.getPassword().matches(".*[A-Za-z].*")) {
            throw new ValidationException("Password must contain at least one letter");
        }
        if (!dto.getPassword().matches(".*\\d.*")) {
            throw new ValidationException("Password must contain at least one number");
        }

        // FIRST NAME
        if (dto.getFirstName() == null || dto.getFirstName().isBlank()) {
            throw new ValidationException("First name is required");
        }
        if (!NAME_PATTERN.matcher(dto.getFirstName()).matches()) {
            throw new ValidationException("First name must contain only letters and be at least 2 characters long");
        }

        // LAST NAME
        if (dto.getLastName() == null || dto.getLastName().isBlank()) {
            throw new ValidationException("Last name is required");
        }
        if (!NAME_PATTERN.matcher(dto.getLastName()).matches()) {
            throw new ValidationException("Last name must contain only letters and be at least 2 characters long");
        }

        // PHONE
        if (dto.getPhone() == null || dto.getPhone().isBlank()) {
            throw new ValidationException("Phone number is required");
        }
        if (!PHONE_PATTERN.matcher(dto.getPhone()).matches()) {
            throw new ValidationException("Phone number format is invalid");
        }
    }
}
