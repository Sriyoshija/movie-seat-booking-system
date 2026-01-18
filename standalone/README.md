# Standalone Seat Booking System

This is a **standalone version** of the seat booking system that works **without running any server**. Just open `index.html` in your web browser!

## 🚀 How to Use

### Option 1: Direct File Opening
1. Navigate to the `standalone` folder
2. Double-click `index.html`
3. The website will open in your default browser
4. **That's it!** No server needed!

### Option 2: Using a Local Server (Recommended)
If you encounter CORS issues or want better functionality:

**Using Python:**
```bash
cd standalone
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Using Node.js:**
```bash
cd standalone
npx http-server
```

**Using PHP:**
```bash
cd standalone
php -S localhost:8000
```

## ✨ Features

- ✅ **Complete Booking Flow**: Login → Select Movie → Choose Area → Book Seats
- ✅ **User Registration**: Create new accounts
- ✅ **Admin Panel**: Add/delete movies (admin only)
- ✅ **Area Differentiation**: Different seat maps and pricing per area
- ✅ **Email Simulation**: Booking confirmations (shown in alert)
- ✅ **Data Persistence**: Uses localStorage (data saved in browser)
- ✅ **No Server Required**: Works completely offline

## 📁 File Structure

```
standalone/
├── index.html      # Login page
├── signup.html     # Registration page
├── movies.html     # Movie selection
├── areas.html      # Area & showtime selection
├── seats.html      # Seat booking
├── admin.html      # Admin panel
├── app.js          # Core functionality
├── styles.css      # Styling
└── README.md       # This file
```

## 🔑 Default Accounts

**Admin:**
- Username: `admin`
- Password: `admin123`

**Regular User:**
- Username: `user`
- Password: `user123`

## 💾 Data Storage

All data is stored in your browser's localStorage:
- Users
- Movies
- Seat bookings
- Booking history

**Note**: Data is browser-specific. Clearing browser data will reset everything.

## 🎯 Area Pricing

| Area | Seat Layout | Price per Seat |
|------|-------------|----------------|
| Standard | 10x10 (100 seats) | $10 |
| Premium | 8x8 (64 seats) | $15 |
| VIP | 6x6 (36 seats) | $25 |
| Recliner | 5x5 (25 seats) | $30 |

## 📧 Email Functionality

Since there's no server, emails are simulated:
- Booking confirmation details are shown in an alert
- Email content is logged to browser console
- Booking history is saved to localStorage

## 🔒 Security Note

This is a **client-side only** application for demonstration purposes. In a production environment, you would need:
- Server-side authentication
- Database for data storage
- Real email service
- Proper security measures

## 🐛 Troubleshooting

**Page not loading?**
- Make sure all files are in the same folder
- Check browser console for errors (F12)

**Data not saving?**
- Check if localStorage is enabled in your browser
- Some browsers block localStorage in private/incognito mode

**Styling looks wrong?**
- Make sure `styles.css` is in the same folder
- Check browser console for missing file errors

## 🎉 Enjoy!

Open `index.html` and start booking seats! No installation, no server, just open and use!

