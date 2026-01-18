package com.seatbooking.controller;

import com.seatbooking.service.MovieService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/movies")
    public String moviesPage(HttpSession session, Model model) {
        if (session.getAttribute("user") == null) {
            return "redirect:/login";
        }
        com.seatbooking.model.User user = (com.seatbooking.model.User) session.getAttribute("user");
        model.addAttribute("movies", movieService.getAllMovies());
        model.addAttribute("isAdmin", user != null && user.isAdmin());
        return "movies";
    }

    @PostMapping("/select-movie")
    public String selectMovie(@RequestParam int movieId, HttpSession session) {
        if (session.getAttribute("user") == null) {
            return "redirect:/login";
        }
        session.setAttribute("selectedMovieId", movieId);
        return "redirect:/areas";
    }
}

