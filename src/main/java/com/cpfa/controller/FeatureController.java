package com.cpfa.controller;

import com.cpfa.entity.*;
import com.cpfa.repository.*;
import com.cpfa.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class FeatureController {

    @Autowired
    private GoalRepository goalRepo;
    @Autowired
    private BadgeRepository badgeRepo;

    @Autowired
    private MarketplaceRepository marketplaceRepo;
    @Autowired
    private TransactionRepository transactionRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JwtUtil jwtUtil;

    // --- Goals ---
    @GetMapping("/goals")
    public List<Goal> getUserGoals(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7));
        User user = userRepo.findByName(username);
        return goalRepo.findByUserId(user.getId());
    }

    @PostMapping("/goals")
    public Goal addGoal(@RequestHeader("Authorization") String token, @RequestBody Goal goal) {
        String username = jwtUtil.extractUsername(token.substring(7));
        User user = userRepo.findByName(username);
        goal.setUser(user);
        return goalRepo.save(goal);
    }

    // --- Badges ---
    @GetMapping("/badges")
    public List<Badge> getUserBadges(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7));
        User user = userRepo.findByName(username);
        return badgeRepo.findByUserId(user.getId());
    }

    // --- Marketplace ---
    @GetMapping("/marketplace")
    public List<MarketplaceItem> getMarketplaceItems() {
        return marketplaceRepo.findAll();
    }

    @PostMapping("/marketplace/buy")
    public ResponseEntity<?> buyItem(@RequestHeader("Authorization") String token,
            @RequestBody Transaction transaction) {
        String username = jwtUtil.extractUsername(token.substring(7));
        User user = userRepo.findByName(username);

        transaction.setUser(user);
        // Note: Real implementation would deduct points/credits here
        transactionRepo.save(transaction);

        return ResponseEntity.ok("Purchase successful");
    }
}
