package com.cpfa.config;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

	// Key
	private final String SECRET = "carbonSecretKey";
	private final long EXPIRATION = 1000 * 60 * 60;

	// Service for Generating Token
	public String generateToken(String email) {

		return Jwts.builder().setSubject(email).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
				.signWith(SignatureAlgorithm.HS256, SECRET).compact();
	
	} // Close Token service

	
	// Service for extracting Email
	public String extractEmail(String token) {
		 return Jwts.parser().setSigningKey(SECRET)
	                .parseClaimsJws(token).getBody().getSubject();
	}

}
