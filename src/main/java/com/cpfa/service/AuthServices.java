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
		userRepo.save(user);
		return "Registerd Successfully";   // HTTP Success Message, do not need any UI. 
	}
}