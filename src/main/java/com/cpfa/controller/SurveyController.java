package com.cpfa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cpfa.entity.Survey;
import com.cpfa.repository.SurveyRepository;
import com.cpfa.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/survey")
@CrossOrigin(origins = "http://localhost:5173")
public class SurveyController {

	@Autowired
	private SurveyRepository surveyRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private com.cpfa.util.JwtUtil jwtUtil;

	@PostMapping("/save")
	public Survey save(@RequestHeader("Authorization") String token, @RequestBody Survey survey) {
		String username = jwtUtil.extractUsername(token.substring(7));
		com.cpfa.entity.User user = userRepo.findByName(username);
		survey.setUser(user);
		return surveyRepo.save(survey);
	}
}