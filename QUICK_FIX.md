# Quick Fix: "Site Can't Be Reached"

## ✅ Check These Steps:

### 1. Is the Application Running?

**In IntelliJ IDEA:**
- Look at the bottom panel (Console tab)
- You should see: `Started SeatBookingApplication in X.XXX seconds`
- If you see red errors, read them!

**If NOT running:**
- Click the green ▶️ play button next to `SeatBookingApplication`
- Or right-click `SeatBookingApplication.java` → Run

### 2. Check the Console Output

**Look for these messages:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
...
Started SeatBookingApplication in X.XXX seconds
```

**If you see errors:**
- Copy the error message
- Common errors are listed below

### 3. Common Errors & Fixes

#### Error: "Port 8080 is already in use"
**Fix:** Change the port
1. Open: `src/main/resources/application.properties`
2. Change `server.port=8080` to `server.port=8081`
3. Restart application
4. Go to: `http://localhost:8081`

#### Error: "Cannot resolve symbol 'SpringApplication'"
**Fix:** Download Maven dependencies
1. Right-click `pom.xml` → Maven → Reload Project
2. Wait for download to complete
3. Try running again

#### Error: "Java version mismatch"
**Fix:** Set correct Java version
1. File → Project Structure (Ctrl+Alt+Shift+S)
2. Project → SDK: Java 17 or 21
3. Click OK

### 4. Test if Server is Running

**Method 1: Check API endpoint**
- Open browser
- Go to: `http://localhost:8080/api/seats`
- You should see JSON like: `{"seats":[[false,false,...]]}`
- If this works → Server is running, but template issue
- If this fails → Server is not running

**Method 2: Check port**
- Open Command Prompt
- Run: `netstat -ano | findstr :8080`
- If you see `LISTENING` → Server is running
- If nothing → Server is not running

### 5. Try Different URL

Try these in your browser:
- `http://localhost:8080`
- `http://127.0.0.1:8080`
- `http://localhost:8080/`
- `http://localhost:8080/api/seats` (should show JSON)

### 6. Restart Everything

1. **Stop the application:**
   - Click the red square ⏹️ stop button in IDE
   
2. **Close browser completely**

3. **Start application again:**
   - Run `SeatBookingApplication`
   - Wait for "Started..." message
   
4. **Open browser:**
   - Go to `http://localhost:8080`

## 🎯 Most Likely Issues:

### Issue #1: Application Never Started
**Solution:** Make sure you clicked Run on `SeatBookingApplication.java`

### Issue #2: Application Crashed Immediately
**Solution:** Check console for red error messages

### Issue #3: Port Conflict
**Solution:** Change port to 8081 in `application.properties`

### Issue #4: Wrong URL
**Solution:** Make sure you're using `http://` not `https://`

## 📋 What to Share if Still Not Working:

1. **Console output** - Copy everything from the console
2. **Error messages** - Any red text
3. **What you see** - Screenshot or description
4. **IDE name** - IntelliJ IDEA or Eclipse?
5. **Java version** - Run `java -version` in terminal

## ✅ Success Looks Like:

**Console:**
```
Started SeatBookingApplication in 2.345 seconds (JVM running for 2.567)
```

**Browser:**
- Beautiful purple gradient background
- "🎫 Seat Booking System" title
- 10x10 grid of seats (green = available, red = booked)
- Book/Cancel buttons

---

**Still stuck?** Share the console output and I'll help debug!

