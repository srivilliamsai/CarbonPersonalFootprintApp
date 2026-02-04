package com.cpfa.repository;

import com.cpfa.entity.MarketplaceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketplaceRepository extends JpaRepository<MarketplaceItem, Integer> {
}
