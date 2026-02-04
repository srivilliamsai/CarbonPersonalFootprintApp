package com.cpfa.service;

import com.cpfa.entity.Leaderboard;
import com.cpfa.entity.User;
import com.cpfa.repository.LeaderboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaderboardService {

    @Autowired
    private LeaderboardRepository leaderboardRepository;

    public List<Leaderboard> getTopUsers() {
        // Fetch users sorted by score in descending order
        return leaderboardRepository.findAll(Sort.by(Sort.Direction.DESC, "score"));
    }

    public void updateUserScore(User user, double points) {
        // Find existing leaderboard entry for user or create new one
        // Note: Ideally we should have a findByUser method in Repository, but for now
        // we iterate or assume one entry per user
        // optimization: Add findByUser to Repository. For now, let's implement finding
        // by user manually or adding the method.
        // Let's add the method to Repository in a separate step or just assume we can
        // add it now.
        // Given I can't easily edit multiple files in one go without multi_replace,
        // I'll use logic here or do a quick find.

        // Actually, looking at the previous plan, I should make sure Repository has
        // what I need.
        // Step 2639 showed LeaderboardRepository extends JpaRepository<Leaderboard,
        // Integer> { } (empty body)

        // I will implement a rudimentary check here using findAll and filtering,
        // OR better, I should update the Repository first.
        // But since I am in write_to_file for Service, I'll stick to a simple
        // implementation
        // and identifying that I need to update Repository next.
        // Wait, I can iterate for now to avoid compilation error until I fix Repo.

        List<Leaderboard> allEntries = leaderboardRepository.findAll();
        Optional<Leaderboard> existingEntry = allEntries.stream()
                .filter(l -> l.getUser().getId() == user.getId())
                .findFirst();

        Leaderboard board;
        if (existingEntry.isPresent()) {
            board = existingEntry.get();
            board.setScore(board.getScore() + points);
        } else {
            board = new Leaderboard();
            board.setUser(user);
            board.setScore(points);
            board.setTeamName(user.getName() + "'s Team"); // Default team name
        }
        leaderboardRepository.save(board);
    }
}
