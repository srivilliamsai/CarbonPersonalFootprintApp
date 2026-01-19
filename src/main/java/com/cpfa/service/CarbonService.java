package com.cpfa.service;

import org.springframework.stereotype.Service;

@Service
public class CarbonService {

	public double calculateEmission(String transport, String diet, double energy) {

		// Ternary Operations
		//			= Condition? true part : False Part	
		double t = transport.equals("car") ? 2.5 : 1.0;
		
		double f = diet.equals("nonveg") ? 2.0 : 1.0;
		
		double e = energy * 0.5;
		
		return t + f + e;  // Later we check this logic will work or not
	}
}