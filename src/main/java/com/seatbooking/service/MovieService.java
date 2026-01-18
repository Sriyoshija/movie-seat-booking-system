package com.seatbooking.service;

import com.seatbooking.model.Movie;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    private List<Movie> movies = new ArrayList<>();

    public MovieService() {
        // Initialize with sample movies
        movies.add(new Movie(1, "Avengers: Endgame", 
            "The epic conclusion to the Infinity Saga", 
            "3h 1m", "Action, Adventure", 
            "https://via.placeholder.com/300x400?text=Avengers"));
        
        movies.add(new Movie(2, "The Dark Knight", 
            "Batman faces his greatest challenge", 
            "2h 32m", "Action, Crime, Drama", 
            "https://via.placeholder.com/300x400?text=Dark+Knight"));
        
        movies.add(new Movie(3, "Inception", 
            "A mind-bending thriller about dreams", 
            "2h 28m", "Sci-Fi, Thriller", 
            "https://via.placeholder.com/300x400?text=Inception"));
        
        movies.add(new Movie(4, "Interstellar", 
            "A journey beyond our solar system", 
            "2h 49m", "Sci-Fi, Drama", 
            "https://via.placeholder.com/300x400?text=Interstellar"));
        
        movies.add(new Movie(5, "The Matrix", 
            "A computer hacker learns about the true nature of reality", 
            "2h 16m", "Action, Sci-Fi", 
            "https://via.placeholder.com/300x400?text=Matrix"));
    }

    public List<Movie> getAllMovies() {
        return new ArrayList<>(movies);
    }

    public Optional<Movie> getMovieById(int id) {
        return movies.stream()
                .filter(movie -> movie.getId() == id)
                .findFirst();
    }

    public Movie addMovie(String title, String description, String duration, String genre, String imageUrl) {
        int newId = movies.stream().mapToInt(Movie::getId).max().orElse(0) + 1;
        Movie movie = new Movie(newId, title, description, duration, genre, imageUrl);
        movies.add(movie);
        return movie;
    }

    public boolean deleteMovie(int id) {
        return movies.removeIf(movie -> movie.getId() == id);
    }
}

