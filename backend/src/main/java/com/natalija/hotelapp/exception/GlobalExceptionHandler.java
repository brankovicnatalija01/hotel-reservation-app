package com.natalija.hotelapp.exception;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<Map<String, String>> buildResponse(String error, String message, HttpStatus status, String path) {
        Map<String, String> response = new HashMap<>();
        response.put("error", error);
        response.put("message", message);
        if (path != null) {
            response.put("path", path);
        }
        return new ResponseEntity<>(response, status);
    }

    // Handles ValidationException and returns a 400 Bad Request response with an error message.
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(ValidationException ex, HttpServletRequest request) {
        return buildResponse("Validation Error", ex.getMessage(), HttpStatus.BAD_REQUEST, request.getRequestURI());
    }

    // Handles EntityNotFoundException and returns a 404 Not Found response with an error message.
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEntityNotFoundException(EntityNotFoundException ex, HttpServletRequest request) {
        return buildResponse("Entity Not Found", ex.getMessage(), HttpStatus.NOT_FOUND, request.getRequestURI());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
        return buildResponse("Invalid JSON field", ex.getMessage(), HttpStatus.BAD_REQUEST, request.getRequestURI());
    }

    // Handles all other exceptions and returns a 500 Internal Server Error response
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex, HttpServletRequest request) {
        return buildResponse("Unexpected Error", ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, request.getRequestURI());
    }

}
