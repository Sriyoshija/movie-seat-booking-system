package com.seatbooking.service;

import com.seatbooking.model.Booking;
import com.seatbooking.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendBookingConfirmation(Booking booking) {
        if (mailSender == null) {
            System.out.println("\n========================================");
            System.out.println("Email service not configured.");
            System.out.println("Booking details (printed to console):");
            System.out.println("========================================");
            System.out.println("Booking ID: " + booking.getBookingId());
            System.out.println("User: " + booking.getUser().getName());
            System.out.println("Email: " + booking.getUser().getEmail());
            System.out.println("Movie: " + booking.getMovie().getTitle());
            System.out.println("Area: " + booking.getArea());
            System.out.println("Showtime: " + booking.getShowtime());
            System.out.println("Seats: " + booking.getSeats().stream()
                .map(s -> "Row " + s.getRow() + ", Seat " + s.getSeat())
                .reduce((a, b) -> a + "; " + b).orElse("None"));
            System.out.println("Total Price: $" + String.format("%.2f", booking.getTotalPrice()));
            System.out.println("========================================\n");
            System.out.println("To enable email sending, run: SETUP_EMAIL.bat");
            System.out.println("Or see: AUTOMATIC_EMAIL_SYSTEM.md");
            return;
        }

        User user = booking.getUser();
        String email = user.getEmail();
        
        if (email == null || email.trim().isEmpty()) {
            System.out.println("⚠️  WARNING: No email address for user: " + user.getUsername() + ". Email notification skipped.");
            System.out.println("   Booking ID: " + booking.getBookingId() + " - User should update their email in profile.");
            return;
        }
        
        // Validate email format
        if (!email.contains("@") || !email.contains(".")) {
            System.err.println("⚠️  WARNING: Invalid email format for user: " + user.getUsername() + " (" + email + ")");
            System.err.println("   Booking ID: " + booking.getBookingId() + " - Email not sent.");
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.trim());
        message.setSubject("Booking Confirmation - " + booking.getMovie().getTitle());
        message.setText(buildEmailContent(booking));
        
        try {
            mailSender.send(message);
            System.out.println("✅ Booking confirmation email sent successfully to: " + email);
        } catch (Exception e) {
            System.err.println("❌ Failed to send email to " + email + ": " + e.getMessage());
            System.err.println("   Booking ID: " + booking.getBookingId() + " - Please check email configuration.");
            // Don't fail the booking if email fails - booking is still valid
        }
    }

    private String buildEmailContent(Booking booking) {
        StringBuilder content = new StringBuilder();
        content.append("Dear ").append(booking.getUser().getName()).append(",\n\n");
        content.append("Thank you for your booking!\n\n");
        content.append("BOOKING DETAILS:\n");
        content.append("================\n");
        content.append("Booking ID: ").append(booking.getBookingId()).append("\n");
        content.append("Movie: ").append(booking.getMovie().getTitle()).append("\n");
        content.append("Area: ").append(booking.getArea()).append("\n");
        content.append("Showtime: ").append(booking.getShowtime()).append("\n");
        content.append("Seats: ");
        
        if (booking.getSeats() != null && !booking.getSeats().isEmpty()) {
            booking.getSeats().forEach(seat -> {
                content.append("Row ").append(seat.getRow()).append(", Seat ").append(seat.getSeat()).append("; ");
            });
        } else {
            content.append("None");
        }
        
        content.append("\n");
        content.append("Total Price: $").append(String.format("%.2f", booking.getTotalPrice())).append("\n\n");
        content.append("We look forward to seeing you at the theater!\n\n");
        content.append("Best regards,\n");
        content.append("Seat Booking System");
        
        return content.toString();
    }
}

