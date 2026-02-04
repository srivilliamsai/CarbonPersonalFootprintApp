package com.cpfa.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CarbonInterfaceService {

    // Simulating external API calls (e.g., to Carbon Interface or ClimateIQ)
    // In a real app, this would use RestTemplate or WebClient to call:
    // https://www.carboninterface.com/api/v1/

    @Cacheable(value = "emissionFactors", key = "#activityType")
    public double getEmissionFactor(String activityType) {
        // Imitating network latency
        beSlow();

        Map<String, Double> factors = new HashMap<>();
        factors.put("car", 2.3); // kg CO2 per km
        factors.put("bus", 0.089);
        factors.put("train", 0.041);
        factors.put("flight", 0.15); // kg CO2 per km (short haul)
        factors.put("beef", 27.0); // kg CO2 per kg
        factors.put("chicken", 6.9);
        factors.put("vegetarian", 2.0);
        factors.put("electricity", 0.233); // kg CO2 per kWh (avg grid)

        return factors.getOrDefault(activityType.toLowerCase(), 0.0);
    }

    private void beSlow() {
        try {
            Thread.sleep(2000); // Sleep 2 seconds to prove caching works on 2nd call
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
