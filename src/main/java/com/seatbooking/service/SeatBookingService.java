package com.seatbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SeatBookingService {
    @Autowired
    private AreaPricingService areaPricingService;
    
    // Store seats for different movie/area/showtime combinations
    private Map<String, boolean[][]> seatMap = new ConcurrentHashMap<>();
    private Map<String, Integer> areaSizes = new ConcurrentHashMap<>();

    private boolean[][] getSeats(String key, String area) {
        return seatMap.computeIfAbsent(key, k -> {
            int size = areaPricingService.getSeatRows(area);
            return new boolean[size][size];
        });
    }

    private int getAreaSize(String area) {
        return areaSizes.computeIfAbsent(area, k -> areaPricingService.getSeatRows(area));
    }

    public Map<String, Object> getSeatStatus(String key, String area) {
        Map<String, Object> response = new HashMap<>();
        boolean[][] seats = getSeats(key, area);
        int size = getAreaSize(area);
        boolean[][] seatStatus = new boolean[size][size];
        for (int i = 0; i < size; i++) {
            System.arraycopy(seats[i], 0, seatStatus[i], 0, size);
        }
        response.put("seats", seatStatus);
        response.put("size", size);
        response.put("pricePerSeat", areaPricingService.getPricePerSeat(area));
        return response;
    }

    public Map<String, Object> bookSeat(String key, String area, int row, int seat) {
        Map<String, Object> response = new HashMap<>();
        boolean[][] seats = getSeats(key, area);
        int size = getAreaSize(area);
        
        if (isValidSeat(row, seat, size)) {
            if (seats[row - 1][seat - 1]) {
                response.put("success", false);
                response.put("message", "Seat is already booked. Please choose another seat.");
            } else {
                seats[row - 1][seat - 1] = true;
                response.put("success", true);
                response.put("message", "Seat successfully booked.");
                response.put("price", areaPricingService.getPricePerSeat(area));
            }
        } else {
            response.put("success", false);
            response.put("message", "Invalid seat. Please enter a valid row and seat number (1-" + size + ").");
        }
        
        return response;
    }

    public Map<String, Object> cancelBooking(String key, String area, int row, int seat) {
        Map<String, Object> response = new HashMap<>();
        boolean[][] seats = getSeats(key, area);
        int size = getAreaSize(area);
        
        if (isValidSeat(row, seat, size)) {
            if (seats[row - 1][seat - 1]) {
                seats[row - 1][seat - 1] = false;
                response.put("success", true);
                response.put("message", "Booking successfully cancelled.");
            } else {
                response.put("success", false);
                response.put("message", "Seat is not booked. Please enter a valid seat number.");
            }
        } else {
            response.put("success", false);
            response.put("message", "Invalid seat. Please enter a valid row and seat number (1-" + size + ").");
        }
        
        return response;
    }

    private boolean isValidSeat(int row, int seat, int maxSize) {
        return row >= 1 && row <= maxSize && seat >= 1 && seat <= maxSize;
    }
}

