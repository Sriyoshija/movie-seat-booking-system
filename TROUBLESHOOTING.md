# Troubleshooting: "Site Can't Be Reached"

## Common Issues and Solutions

### Issue 1: Application Not Running

**Symptoms:** Browser shows "This site can't be reached" or "ERR_CONNECTION_REFUSED"

**Solution:**
1. **Check if application is running:**
   - In IntelliJ/Eclipse, look at the Console/Output tab
   - You should see: `Started SeatBookingApplication in X.XXX seconds`
   - If you see errors, read them carefully

2. **If application didn't start:**
   - Check for red error messages in the console
   - Common errors:
     - **Port already in use** → See Issue 2 below
     - **Java version mismatch** → See Issue 3 below
     - **Maven dependencies not downloaded** → See Issue 4 below

### Issue 2: Port 8080 Already in Use

**Symptoms:** Error message: "Port 8080 is already in use" or "Address already in use"

**Solution A: Change the port**
1. Open: `src/main/resources/application.properties`
2. Change:
   ```
   server.port=8080
   ```
   To:
   ```
   server.port=8081
   ```
3. Restart the application
4. Access: `http://localhost:8081`

**Solution B: Stop the other application**
1. Find what's using port 8080:
   ```bash
   netstat -ano | findstr :8080
   ```
2. Note the PID (last number)
3. Open Task Manager (Ctrl+Shift+Esc)
4. Go to Details tab
5. Find the process with that PID
6. End the process

### Issue 3: Java Version Error

**Symptoms:** Error about Java version or "Unsupported class file version"

**Solution:**
1. **In IntelliJ IDEA:**
   - File → Project Structure (Ctrl+Alt+Shift+S)
   - Project → SDK: Select Java 17 or 21
   - Project → Language level: 17 or 21
   - Click OK

2. **In Eclipse:**
   - Right-click project → Properties
   - Java Build Path → Libraries
   - Remove old JRE, add Java 17 or 21

### Issue 4: Maven Dependencies Not Downloaded

**Symptoms:** Red errors about missing classes like "SpringApplication cannot be resolved"

**Solution:**
1. **IntelliJ IDEA:**
   - Right-click `pom.xml` → Maven → Reload Project
   - Or: File → Settings → Build Tools → Maven → Repositories → Update

2. **Eclipse:**
   - Right-click project → Maven → Update Project
   - Check "Force Update of Snapshots/Releases"

### Issue 5: Application Starts But Page Not Found

**Symptoms:** Application runs but browser shows 404 or blank page

**Solution:**
1. Make sure you're accessing: `http://localhost:8080` (not https://)
2. Try: `http://127.0.0.1:8080`
3. Check the console for any error messages
4. Verify `index.html` exists in: `src/main/resources/templates/`

### Issue 6: Controller Not Found

**Symptoms:** 404 errors when accessing the site

**Check:**
1. Verify `SeatBookingController.java` exists
2. Make sure it has `@Controller` annotation
3. Check that `@GetMapping("/")` method exists

## Step-by-Step Debugging

### Step 1: Verify Application Started
Look for this in console:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.5)

... (lots of Spring Boot startup messages)

Started SeatBookingApplication in X.XXX seconds
```

### Step 2: Check for Errors
If you see red text, read it carefully:
- **ClassNotFoundException** → Dependencies not downloaded
- **Port already in use** → Change port or stop other app
- **BeanCreationException** → Check your Java classes

### Step 3: Test the API
1. Open browser
2. Go to: `http://localhost:8080/api/seats`
3. You should see JSON: `{"seats":[[false,false,...]]}`
4. If this works but `/` doesn't, it's a template issue

### Step 4: Check Browser Console
1. Press F12 in browser
2. Go to Console tab
3. Look for JavaScript errors
4. Go to Network tab
5. Refresh page
6. Check if files are loading (status 200 = OK, 404 = not found)

## Quick Fixes

### Restart Everything
1. Stop the application (click stop button in IDE)
2. Close browser
3. Start application again
4. Wait for "Started..." message
5. Open browser to `http://localhost:8080`

### Clean and Rebuild
**IntelliJ:**
- Build → Rebuild Project

**Eclipse:**
- Project → Clean → Clean all projects

### Check File Structure
Make sure you have:
```
src/
  main/
    java/
      com/
        seatbooking/
          SeatBookingApplication.java
          controller/
            SeatBookingController.java
          service/
            SeatBookingService.java
    resources/
      application.properties
      templates/
        index.html
```

## Still Not Working?

1. **Share the console output** - Copy the full error message
2. **Check IDE version** - Make sure it's up to date
3. **Try a different port** - Change to 8081, 8082, etc.
4. **Check firewall** - Windows Firewall might be blocking
5. **Try different browser** - Chrome, Firefox, Edge

## Success Indicators

When everything works, you'll see:
- ✅ Console: "Started SeatBookingApplication"
- ✅ Browser: Beautiful seat booking interface
- ✅ Seat map showing 10x10 grid
- ✅ Green (available) and red (booked) seats

