package com.seatbooking.model;

import java.util.List;

public class Booking {
    private String bookingId;
    private User user;
    private Movie movie;
    private String area;
    private String showtime;
    private List<SeatSelection> seats;
    private double totalPrice;

    public Booking() {
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getShowtime() {
        return showtime;
    }

    public void setShowtime(String showtime) {
        this.showtime = showtime;
    }

    public List<SeatSelection> getSeats() {
        return seats;
    }

    public void setSeats(List<SeatSelection> seats) {
        this.seats = seats;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public static class SeatSelection {
        private int row;
        private int seat;

        public SeatSelection(int row, int seat) {
            this.row = row;
            this.seat = seat;
        }

        public int getRow() {
            return row;
        }

        public void setRow(int row) {
            this.row = row;
        }

        public int getSeat() {
            return seat;
        }

        public void setSeat(int seat) {
            this.seat = seat;
        }
    }
}

