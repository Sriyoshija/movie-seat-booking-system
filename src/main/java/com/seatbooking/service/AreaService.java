package com.seatbooking.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AreaService {
    
    public List<String> getAreas() {
        List<String> areas = new ArrayList<>();
        areas.add("Standard");
        areas.add("Premium");
        areas.add("VIP");
        areas.add("Recliner");
        return areas;
    }

    public List<String> getShowtimes() {
        List<String> showtimes = new ArrayList<>();
        showtimes.add("10:00 AM");
        showtimes.add("1:00 PM");
        showtimes.add("4:00 PM");
        showtimes.add("7:00 PM");
        showtimes.add("10:00 PM");
        return showtimes;
    }
}

