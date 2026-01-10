package com.natalija.hotelapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HotelReservationApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(HotelReservationApplication.class, args);
	}

}
