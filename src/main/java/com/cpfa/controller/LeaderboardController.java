package com.cpfa.controller;

import com.cpfa.entity.Leaderboard;
import com.cpfa.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@org.springframework.web.bind.annotation.CrossOrigin(origins = "http://localhost:5173")
public class LeaderboardController {

    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping
    public List<Leaderboard> getLeaderboard() {
        return leaderboardService.getTopUsers();
    }
}
