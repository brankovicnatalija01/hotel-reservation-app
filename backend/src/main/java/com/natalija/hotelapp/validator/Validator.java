package com.natalija.hotelapp.validator;

import com.natalija.hotelapp.exception.ValidationException;

public interface Validator<T> {
    void validate(T dto) throws ValidationException;
}
