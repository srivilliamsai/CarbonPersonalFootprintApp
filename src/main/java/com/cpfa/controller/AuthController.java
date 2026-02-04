package com.cpfa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cpfa.entity.User;
import com.cpfa.payload.AuthResponse;
import com.cpfa.service.AuthServices;
import com.cpfa.util.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

	@Autowired
	private AuthServices authService;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/register")
	public org.springframework.http.ResponseEntity<?> register(@RequestBody User u) {
		String result = authService.register(u);
		if ("User already registered".equals(result)) {
			return org.springframework.http.ResponseEntity.status(409).body(result);
		}
		return org.springframework.http.ResponseEntity.ok(result);
	}

	@PostMapping("/login")
	public org.springframework.http.ResponseEntity<?> login(@RequestBody User u) {
		User user = authService.login(u.getEmail(), u.getPassword());
		if (user != null) {
			String accessToken = jwtUtil.generateToken(user.getName());
			String refreshToken = jwtUtil.generateRefreshToken(user.getName());
			return org.springframework.http.ResponseEntity
					.ok(new AuthResponse(accessToken, refreshToken, user.getName()));
		}
		return org.springframework.http.ResponseEntity.status(401).body("Invalid Credentials");
	}

	@PostMapping("/refresh-token")
	public org.springframework.http.ResponseEntity<?> refreshToken(@RequestBody java.util.Map<String, String> request) {
		String refreshToken = request.get("refreshToken");
		if (refreshToken != null) {
			String username = jwtUtil.extractUsername(refreshToken);
			if (jwtUtil.validateToken(refreshToken, username)) {
				String newAccessToken = jwtUtil.generateToken(username);
				return org.springframework.http.ResponseEntity.ok(new java.util.HashMap<String, String>() {
					{
						put("accessToken", newAccessToken);
					}
				});
			}
		}
		return org.springframework.http.ResponseEntity.status(401).body("Invalid Refresh Token");
	}
}