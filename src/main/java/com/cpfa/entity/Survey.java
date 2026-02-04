package com.cpfa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "survey")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Survey {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "surveyid", length = 11, nullable = false, unique = true)
	private int id;

	@Column(name = "transportmode", length = 150)
	private String transportMode;

	@Column(name = "diettype", length = 100)
	private String dietType;

	@Column(name = "eusage")
	private double energyUsage;

	@Column(name = "frequency", columnDefinition = "json")
	private String frequency;

	@CreationTimestamp
	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	// Establish Foreign Key (JPA Mapping)
	@ManyToOne
	private User user;

}