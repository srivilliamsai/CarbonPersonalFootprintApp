package com.cpfa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpfa.entity.CarbonLog;

import java.util.List;
import com.cpfa.entity.User;

public interface CarbonLogRepository extends JpaRepository<CarbonLog, Integer> {
    List<CarbonLog> findByUser(User user);
}