package com.seatbooking.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AreaPricingService {
    private Map<String, Double> areaPrices = new HashMap<>();
    private Map<String, Integer> areaSeatRows = new HashMap<>();

    public AreaPricingService() {
        // Standard area: 10x10 seats, $10 per seat
        areaPrices.put("Standard", 10.0);
        areaSeatRows.put("Standard", 10);
        
        // Premium area: 8x8 seats, $15 per seat
        areaPrices.put("Premium", 15.0);
        areaSeatRows.put("Premium", 8);
        
        // VIP area: 6x6 seats, $25 per seat
        areaPrices.put("VIP", 25.0);
        areaSeatRows.put("VIP", 6);
        
        // Recliner area: 5x5 seats, $30 per seat
        areaPrices.put("Recliner", 30.0);
        areaSeatRows.put("Recliner", 5);
    }

    public double getPricePerSeat(String area) {
        return areaPrices.getOrDefault(area, 10.0);
    }

    public int getSeatRows(String area) {
        return areaSeatRows.getOrDefault(area, 10);
    }

    public int getSeatsPerRow(String area) {
        return getSeatRows(area); // Square layout
    }
}

