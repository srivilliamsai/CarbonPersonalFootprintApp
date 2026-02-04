package com.cpfa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@org.springframework.cache.annotation.EnableCaching
public class CarbonPersonalFootprintAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarbonPersonalFootprintAppApplication.class, args);
	}

}