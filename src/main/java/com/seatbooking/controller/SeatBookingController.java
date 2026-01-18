package com.seatbooking.controller;

import com.seatbooking.model.Booking;
import com.seatbooking.model.Movie;
import com.seatbooking.model.User;
import com.seatbooking.service.EmailService;
import com.seatbooking.service.MovieService;
import com.seatbooking.service.SeatBookingService;
import com.seatbooking.service.AreaPricingService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
public class SeatBookingController {
    
    @Autowired
    private SeatBookingService seatBookingService;

    @Autowired
    private MovieService movieService;

    @Autowired
    private AreaPricingService areaPricingService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/")
    public String index() {
        return "redirect:/login";
    }

    @GetMapping("/seats")
    public String seatsPage(HttpSession session, Model model) {
        if (session.getAttribute("user") == null) {
            return "redirect:/login";
        }
        Integer movieId = (Integer) session.getAttribute("selectedMovieId");
        String area = (String) session.getAttribute("selectedArea");
        String showtime = (String) session.getAttribute("selectedShowtime");
        
        if (movieId == null || area == null || showtime == null) {
            return "redirect:/movies";
        }
        
        movieService.getMovieById(movieId).ifPresent(movie -> {
            model.addAttribute("selectedMovie", movie);
            model.addAttribute("selectedArea", area);
            model.addAttribute("selectedShowtime", showtime);
            model.addAttribute("pricePerSeat", areaPricingService.getPricePerSeat(area));
            model.addAttribute("seatSize", areaPricingService.getSeatRows(area));
        });
        
        return "seats";
    }

    @GetMapping("/api/seats")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getSeats(HttpSession session) {
        Integer movieId = (Integer) session.getAttribute("selectedMovieId");
        String area = (String) session.getAttribute("selectedArea");
        String showtime = (String) session.getAttribute("selectedShowtime");
        
        String key = generateKey(movieId, area, showtime);
        return ResponseEntity.ok(seatBookingService.getSeatStatus(key, area));
    }

    @PostMapping("/api/book")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> bookSeat(@RequestBody Map<String, Integer> request, HttpSession session) {
        Integer movieId = (Integer) session.getAttribute("selectedMovieId");
        String area = (String) session.getAttribute("selectedArea");
        String showtime = (String) session.getAttribute("selectedShowtime");
        
        if (movieId == null || area == null || showtime == null) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Session expired. Please select movie, area, and showtime again."));
        }
        
        Integer row = request.get("row");
        Integer seat = request.get("seat");
        
        if (row == null || seat == null) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Row and seat are required."));
        }
        
        String key = generateKey(movieId, area, showtime);
        return ResponseEntity.ok(seatBookingService.bookSeat(key, area, row, seat));
    }

    @PostMapping("/api/cancel")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> cancelBooking(@RequestBody Map<String, Integer> request, HttpSession session) {
        Integer movieId = (Integer) session.getAttribute("selectedMovieId");
        String area = (String) session.getAttribute("selectedArea");
        String showtime = (String) session.getAttribute("selectedShowtime");
        
        if (movieId == null || area == null || showtime == null) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Session expired. Please select movie, area, and showtime again."));
        }
        
        Integer row = request.get("row");
        Integer seat = request.get("seat");
        
        if (row == null || seat == null) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Row and seat are required."));
        }
        
        String key = generateKey(movieId, area, showtime);
        return ResponseEntity.ok(seatBookingService.cancelBooking(key, area, row, seat));
    }

    @PostMapping("/api/confirm-booking")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> confirmBooking(@RequestBody Map<String, Object> request, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer movieId = (Integer) session.getAttribute("selectedMovieId");
        String area = (String) session.getAttribute("selectedArea");
        String showtime = (String) session.getAttribute("selectedShowtime");
        
        if (user == null || movieId == null || area == null || showtime == null) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Session expired. Please login again."));
        }

        @SuppressWarnings("unchecked")
        List<Map<String, Integer>> seatsList = (List<Map<String, Integer>>) request.get("seats");
        
        if (seatsList == null || seatsList.isEmpty()) {
            return ResponseEntity.ok(Map.of("success", false, "message", "No seats selected."));
        }

        Movie movie = movieService.getMovieById(movieId).orElse(null);
        if (movie == null) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Movie not found."));
        }

        // Create booking
        Booking booking = new Booking();
        booking.setBookingId(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setUser(user);
        booking.setMovie(movie);
        booking.setArea(area);
        booking.setShowtime(showtime);
        
        List<Booking.SeatSelection> selectedSeats = new ArrayList<>();
        double totalPrice = 0;
        double pricePerSeat = areaPricingService.getPricePerSeat(area);
        
        for (Map<String, Integer> seatMap : seatsList) {
            Integer row = seatMap.get("row");
            Integer seat = seatMap.get("seat");
            if (row == null || seat == null) {
                return ResponseEntity.ok(Map.of("success", false, "message", "Invalid seat data. Row and seat are required."));
            }
            selectedSeats.add(new Booking.SeatSelection(row, seat));
            totalPrice += pricePerSeat;
        }
        
        booking.setSeats(selectedSeats);
        booking.setTotalPrice(totalPrice);

        // Send email
        emailService.sendBookingConfirmation(booking);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Booking confirmed! Confirmation email sent to " + user.getEmail(),
            "bookingId", booking.getBookingId(),
            "totalPrice", totalPrice
        ));
    }

    private String generateKey(Integer movieId, String area, String showtime) {
        if (movieId == null || area == null || showtime == null) {
            return "default";
        }
        return movieId + "_" + area + "_" + showtime;
    }
}

