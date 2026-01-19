package com.cpfa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpfa.entity.CarbonLog;

public interface CarbonLogRepository extends JpaRepository<CarbonLog, Integer> {

}