# Seat Booking System - Web Application

A modern web-based seat booking system built with Spring Boot and a beautiful responsive frontend.

## Features

- 🎫 Visual 10x10 seat map
- ✅ Book available seats
- ❌ Cancel existing bookings
- 🔄 Real-time seat status updates
- 📱 Responsive design
- 🎨 Modern, user-friendly interface

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## How to Run

1. **Install Dependencies and Build:**
   ```bash
   mvn clean install
   ```

2. **Run the Application:**
   ```bash
   mvn spring-boot:run
   ```

3. **Access the Website:**
   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Project Structure

```
JAVA PROJECT/
├── pom.xml                                    # Maven configuration
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── seatbooking/
│       │           ├── SeatBookingApplication.java    # Main Spring Boot class
│       │           ├── controller/
│       │           │   └── SeatBookingController.java # REST API endpoints
│       │           └── service/
│       │               └── SeatBookingService.java   # Business logic
│       └── resources/
│           ├── application.properties         # Application configuration
│           └── templates/
│               └── index.html                # Web interface
└── README.md
```

## API Endpoints

- `GET /` - Main web page
- `GET /api/seats` - Get current seat status
- `POST /api/book` - Book a seat (requires JSON: `{"row": 1, "seat": 1}`)
- `POST /api/cancel` - Cancel a booking (requires JSON: `{"row": 1, "seat": 1}`)

## Usage

1. The seat map displays all 100 seats (10 rows × 10 seats)
2. Green seats are available, red seats are booked
3. Click on any seat to auto-fill the row and seat inputs
4. Use the "Book Seat" button to book a selected seat
5. Use the "Cancel Booking" button to cancel a booked seat
6. The seat map auto-refreshes every 5 seconds

## Technologies Used

- **Backend:** Spring Boot 3.1.5
- **Frontend:** HTML5, CSS3, JavaScript
- **Build Tool:** Maven
- **Server:** Embedded Tomcat (via Spring Boot)

