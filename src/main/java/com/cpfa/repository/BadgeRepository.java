package com.cpfa.repository;

import com.cpfa.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BadgeRepository extends JpaRepository<Badge, Integer> {
    List<Badge> findByUserId(int userId);
}
