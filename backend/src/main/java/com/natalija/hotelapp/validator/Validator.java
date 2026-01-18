package com.natalija.hotelapp.validator;

import com.natalija.hotelapp.exception.ValidationException;

public interface Validator <Dto>{
    void validate(Dto dto) throws ValidationException;
}
