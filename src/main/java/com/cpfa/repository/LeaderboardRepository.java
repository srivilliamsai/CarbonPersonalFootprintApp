package com.cpfa.repository;

import com.cpfa.entity.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaderboardRepository extends JpaRepository<Leaderboard, Integer> {
}
