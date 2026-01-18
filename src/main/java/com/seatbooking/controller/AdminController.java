package com.seatbooking.controller;

import com.seatbooking.model.Movie;
import com.seatbooking.model.User;
import com.seatbooking.service.MovieService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AdminController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/admin")
    public String adminPanel(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || !user.isAdmin()) {
            return "redirect:/login";
        }
        model.addAttribute("movies", movieService.getAllMovies());
        return "admin";
    }

    @PostMapping("/admin/add-movie")
    public String addMovie(@RequestParam String title,
                          @RequestParam String description,
                          @RequestParam String duration,
                          @RequestParam String genre,
                          @RequestParam(required = false) String imageUrl,
                          HttpSession session,
                          RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null || !user.isAdmin()) {
            return "redirect:/login";
        }

        if (imageUrl == null || imageUrl.isEmpty()) {
            imageUrl = "https://via.placeholder.com/300x400?text=" + title.replace(" ", "+");
        }

        Movie newMovie = movieService.addMovie(title, description, duration, genre, imageUrl);
        if (newMovie != null) {
            redirectAttributes.addFlashAttribute("success", "Movie added successfully!");
        } else {
            redirectAttributes.addFlashAttribute("error", "Failed to add movie.");
        }
        return "redirect:/admin";
    }

    @PostMapping("/admin/delete-movie")
    public String deleteMovie(@RequestParam int movieId,
                             HttpSession session,
                             RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null || !user.isAdmin()) {
            return "redirect:/login";
        }

        if (movieService.deleteMovie(movieId)) {
            redirectAttributes.addFlashAttribute("success", "Movie deleted successfully!");
        } else {
            redirectAttributes.addFlashAttribute("error", "Failed to delete movie.");
        }
        return "redirect:/admin";
    }
}

