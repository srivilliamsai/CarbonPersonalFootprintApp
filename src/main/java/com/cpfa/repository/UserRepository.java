package com.cpfa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cpfa.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmail(String email); // A Service to find user by searching through email

	User findByName(String name);

	boolean existsByEmail(String email);
}