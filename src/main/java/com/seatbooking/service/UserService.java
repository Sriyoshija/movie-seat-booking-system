package com.seatbooking.service;

import com.seatbooking.model.User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {
    private Map<String, User> users = new ConcurrentHashMap<>();

    public UserService() {
        // Add a default admin user
        users.put("admin", new User("admin", "admin123", "admin@example.com", "Admin User", true));
        users.put("user", new User("user", "user123", "user@example.com", "Test User", false));
    }

    public boolean register(User user) {
        if (users.containsKey(user.getUsername())) {
            return false; // Username already exists
        }
        users.put(user.getUsername(), user);
        return true;
    }

    public User authenticate(String username, String password) {
        User user = users.get(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public User findByUsername(String username) {
        return users.get(username);
    }
}

