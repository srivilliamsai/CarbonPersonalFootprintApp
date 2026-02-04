package com.cpfa.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cpfa.entity.CarbonLog;
import com.cpfa.entity.User;
import com.cpfa.repository.CarbonLogRepository;
import com.cpfa.repository.UserRepository;
import com.cpfa.service.CarbonService;

@RestController
@RequestMapping("/api/carbon-logs")
@CrossOrigin(origins = "http://localhost:5173")
public class CarbonLogController {

	@Autowired
	private CarbonLogRepository carbonRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private CarbonService carbonService;

	@Autowired
	private com.cpfa.service.LeaderboardService leaderboardService;

	@PostMapping("/add")
	public CarbonLog add(@RequestBody CarbonLog carbon) {

		// Get currently logged-in user
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		User user = userRepo.findByName(username); // Assuming name is unique or used as proper lookup. Better if by
													// Email/ID, but AuthController uses Name/Email.

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		if (carbon.getDate() == null) {
			carbon.setDate(LocalDate.now());
		}

		double total = carbonService.calculateEmission(
				carbon.getTransportMode() != null ? carbon.getTransportMode() : "public",
				carbon.getDietType() != null ? carbon.getDietType() : "veg",
				carbon.getEnergyEmission());

		carbon.setTotalEmission(total);
		carbon.setUser(user); // Link log to user

		CarbonLog savedLog = carbonRepo.save(carbon);

		// Update Leaderboard Score (e.g., 10 points per log + 1 point per kg saved or
		// just simple addition)
		// For now, let's just add the emission value as "score" (or maybe inverse?
		// Lower emission is better?)
		// The prompt implementation_plan says "score corresponds to emission efficiency
		// or activity count".
		// Let's simplified: +10 points for logging, - totalEmission (penalize high
		// emission?)
		// OR just +10 points for activity. The UI shows "Points". Let's do simple: 10 +
		// (100 - emission) capped at 0?
		// Let's stick to: "Activity Score". +10 points for every log.
		leaderboardService.updateUserScore(user, 10.0);

		return savedLog;
	}

	@GetMapping("/history")
	public List<CarbonLog> getHistory() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		User user = userRepo.findByName(username);

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		return carbonRepo.findByUser(user);
	}
}