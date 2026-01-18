// Utility functions for the standalone application

// User management
function getCurrentUser() {
    const userStr = sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.isAdmin === true;
}

function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Movie management
function getMovies() {
    return JSON.parse(localStorage.getItem('movies') || '[]');
}

function addMovie(movie) {
    const movies = getMovies();
    const nextId = parseInt(localStorage.getItem('nextMovieId') || '1');
    movie.id = nextId;
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
    localStorage.setItem('nextMovieId', (nextId + 1).toString());
    return movie;
}

function deleteMovie(id) {
    const movies = getMovies();
    const filtered = movies.filter(m => m.id !== id);
    localStorage.setItem('movies', JSON.stringify(filtered));
    return filtered.length < movies.length;
}

// User management
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function addUser(user) {
    const users = getUsers();
    if (users.find(u => u.username === user.username)) {
        return false;
    }
    user.isAdmin = false;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// Seat booking management
function getSeatKey(movieId, area, showtime) {
    return `${movieId}_${area}_${showtime}`;
}

function getSeats(movieId, area, showtime) {
    const key = getSeatKey(movieId, area, showtime);
    const seats = localStorage.getItem(`seats_${key}`);
    if (seats) {
        return JSON.parse(seats);
    }
    // Initialize based on area
    const areaSizes = {
        'Standard': 10,
        'Premium': 8,
        'VIP': 6,
        'Recliner': 5
    };
    const size = areaSizes[area] || 10;
    const newSeats = Array(size).fill(null).map(() => Array(size).fill(false));
    localStorage.setItem(`seats_${key}`, JSON.stringify(newSeats));
    return newSeats;
}

function bookSeat(movieId, area, showtime, row, seat) {
    const seats = getSeats(movieId, area, showtime);
    const areaSizes = {
        'Standard': 10,
        'Premium': 8,
        'VIP': 6,
        'Recliner': 5
    };
    const size = areaSizes[area] || 10;
    
    if (row < 1 || row > size || seat < 1 || seat > size) {
        return { success: false, message: `Invalid seat. Please enter row and seat between 1 and ${size}.` };
    }
    
    if (seats[row - 1][seat - 1]) {
        return { success: false, message: 'Seat is already booked. Please choose another seat.' };
    }
    
    seats[row - 1][seat - 1] = true;
    const key = getSeatKey(movieId, area, showtime);
    localStorage.setItem(`seats_${key}`, JSON.stringify(seats));
    
    return { success: true, message: 'Seat successfully booked.' };
}

function cancelSeat(movieId, area, showtime, row, seat) {
    const seats = getSeats(movieId, area, showtime);
    const areaSizes = {
        'Standard': 10,
        'Premium': 8,
        'VIP': 6,
        'Recliner': 5
    };
    const size = areaSizes[area] || 10;
    
    if (row < 1 || row > size || seat < 1 || seat > size) {
        return { success: false, message: `Invalid seat. Please enter row and seat between 1 and ${size}.` };
    }
    
    if (!seats[row - 1][seat - 1]) {
        return { success: false, message: 'Seat is not booked. Please enter a valid seat number.' };
    }
    
    seats[row - 1][seat - 1] = false;
    const key = getSeatKey(movieId, area, showtime);
    localStorage.setItem(`seats_${key}`, JSON.stringify(seats));
    
    return { success: true, message: 'Booking successfully cancelled.' };
}

// Area pricing
function getAreaPrice(area) {
    const prices = {
        'Standard': 10,
        'Premium': 15,
        'VIP': 25,
        'Recliner': 30
    };
    return prices[area] || 10;
}

function getAreaSize(area) {
    const sizes = {
        'Standard': 10,
        'Premium': 8,
        'VIP': 6,
        'Recliner': 5
    };
    return sizes[area] || 10;
}

// Email simulation (since we can't send real emails without a server)
function sendBookingEmail(booking) {
    const emailContent = `
Dear ${booking.user.name},

Thank you for your booking!

BOOKING DETAILS:
================
Booking ID: ${booking.bookingId}
Movie: ${booking.movie.title}
Area: ${booking.area}
Showtime: ${booking.showtime}
Seats: ${booking.seats.map(s => `Row ${s.row}, Seat ${s.seat}`).join('; ')}
Total Price: $${booking.totalPrice.toFixed(2)}

We look forward to seeing you at the theater!

Best regards,
Seat Booking System
    `;
    
    // In a real scenario, this would send an email
    // For standalone version, we'll show it in an alert and save to localStorage
    console.log('Email would be sent to:', booking.user.email);
    console.log('Email content:', emailContent);
    
    // Save booking to localStorage for history
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
        ...booking,
        timestamp: new Date().toISOString(),
        emailContent: emailContent
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    return emailContent;
}

// Session management
function getSessionData(key) {
    return sessionStorage.getItem(key);
}

function setSessionData(key, value) {
    sessionStorage.setItem(key, value);
}

function clearSession() {
    sessionStorage.clear();
}

