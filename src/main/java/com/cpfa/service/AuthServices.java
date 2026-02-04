package com.cpfa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cpfa.entity.User;
import com.cpfa.repository.UserRepository;

@Service
public class AuthServices {

	@Autowired
	private UserRepository userRepo;

	public String register(User user) {
		if (userRepo.existsByEmail(user.getEmail())) {
			return "User already registered";
		}
		userRepo.save(user);
		return "Registered Successfully";
	}

	public User login(String email, String password) {
		User user = userRepo.findByEmail(email);
		if (user != null && user.getPassword().equals(password)) {
			return user;
		}
		return null;
	}
}