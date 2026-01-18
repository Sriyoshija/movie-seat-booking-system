package com.seatbooking.controller;

import com.seatbooking.service.AreaService;
import com.seatbooking.service.MovieService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AreaController {

    @Autowired
    private AreaService areaService;

    @Autowired
    private MovieService movieService;

    @GetMapping("/areas")
    public String areasPage(HttpSession session, Model model) {
        if (session.getAttribute("user") == null) {
            return "redirect:/login";
        }
        Integer movieId = (Integer) session.getAttribute("selectedMovieId");
        if (movieId == null) {
            return "redirect:/movies";
        }
        
        movieService.getMovieById(movieId).ifPresent(movie -> 
            model.addAttribute("selectedMovie", movie)
        );
        model.addAttribute("areas", areaService.getAreas());
        model.addAttribute("showtimes", areaService.getShowtimes());
        return "areas";
    }

    @PostMapping("/select-area")
    public String selectArea(@RequestParam String area,
                           @RequestParam String showtime,
                           HttpSession session) {
        if (session.getAttribute("user") == null) {
            return "redirect:/login";
        }
        if (session.getAttribute("selectedMovieId") == null) {
            return "redirect:/movies";
        }
        session.setAttribute("selectedArea", area);
        session.setAttribute("selectedShowtime", showtime);
        return "redirect:/seats";
    }
}

