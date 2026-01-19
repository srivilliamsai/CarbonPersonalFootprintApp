package com.cpfa.entity;

import java.time.LocalDate;

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

@Entity
@Table(name = "carbonlog")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarbonLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "carbonlogid", length = 11, unique = true, nullable = false)
	private int id;

	@Column(name = "date")
	private LocalDate date;

	@Column(name = "t-emission", length = 100)
	private double transportEmission;

	@Column(name = "f-emission", length = 100)
	private double foodEmission;

	@Column(name = "e-emission", length = 100)
	private double energyEmission;

	@Column(name = "total-emission", length = 100)
	private double totalEmission;
	
	@ManyToOne
	private User user;

}