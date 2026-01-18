# Admin Features & Area Differentiation

## ✅ New Features Implemented

### 1. **Admin Panel** 🔐
- **Access**: Only users with admin role can access `/admin`
- **Add Movies**: Admins can add new movies with:
  - Title, Description, Duration, Genre
  - Optional image URL
- **Delete Movies**: Admins can remove movies from the system
- **Admin Button**: Appears in movies page header for admin users only

**Default Admin Account:**
- Username: `admin`
- Password: `admin123`

### 2. **Area Differentiation** 🎯

Each area now has:
- **Different seat map sizes**
- **Different pricing**
- **Unique seat layouts**

**Area Details:**

| Area | Seat Layout | Price per Seat |
|------|------------|----------------|
| **Standard** | 10x10 (100 seats) | $10 |
| **Premium** | 8x8 (64 seats) | $15 |
| **VIP** | 6x6 (36 seats) | $25 |
| **Recliner** | 5x5 (25 seats) | $30 |

### 3. **Email Booking Confirmation** 📧

- **Automatic Email**: When user confirms booking, email is sent
- **Email Content Includes**:
  - Booking ID
  - Movie details
  - Area and showtime
  - Selected seats
  - Total price
- **Fallback**: If email not configured, booking details are printed to console

### 4. **Enhanced Seat Booking** 🎫

- **Dynamic Seat Maps**: Seat map size changes based on selected area
- **Price Display**: Shows price per seat for selected area
- **Selected Seats Tracker**: Shows all selected seats and total price
- **Booking Confirmation**: "Confirm Booking & Send Email" button
- **Multi-seat Selection**: Users can select multiple seats before confirming

## How to Use

### For Admins:
1. Login with admin account (`admin` / `admin123`)
2. Click "Admin Panel" button on movies page
3. Add new movies using the form
4. Delete movies using the delete button

### For Regular Users:
1. Login with regular account
2. Select movie → area → showtime
3. Book seats (seat map size adjusts to area)
4. Click "Confirm Booking & Send Email" to finalize
5. Receive email confirmation (if email configured)

## Email Configuration (Optional)

To enable real email sending, edit `src/main/resources/application.properties`:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

**Note**: For Gmail, you need to use an "App Password" instead of your regular password.

## Security

- **Admin-only access**: Movie addition/deletion restricted to admin users
- **Session-based**: User roles checked on each admin action
- **Regular users**: Can only book tickets, cannot modify movies

## Area Features

- **Visual Differentiation**: Each area shows different seat map sizes
- **Pricing Display**: Price per seat shown on seat selection page
- **Separate Seat Maps**: Each movie/area/showtime combination has independent seat availability
- **Smart Validation**: Seat numbers validated based on area size

Enjoy your enhanced booking system! 🎊

