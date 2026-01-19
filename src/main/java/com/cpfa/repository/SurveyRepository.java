package com.cpfa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpfa.entity.Survey;

public interface SurveyRepository extends JpaRepository<Survey, Integer> {

	// Service to declare
}