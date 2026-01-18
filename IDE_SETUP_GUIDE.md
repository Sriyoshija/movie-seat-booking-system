# IDE Setup Guide - Seat Booking System

## Option A: IntelliJ IDEA (Recommended) ⭐

### Step 1: Download IntelliJ IDEA
1. Go to: https://www.jetbrains.com/idea/download/
2. Download **IntelliJ IDEA Community Edition** (Free)
3. Run the installer and follow the setup wizard

### Step 2: Open the Project
1. Launch IntelliJ IDEA
2. Click **"Open"** or **File → Open**
3. Navigate to: `d:\2YR 1SEM\KLH\PROJECTS\BEEC PROJECT\JAVA PROJECT`
4. Click **"OK"**

### Step 3: Wait for Maven Import
- IntelliJ will automatically detect the `pom.xml` file
- A popup will appear: **"Maven projects need to be imported"**
- Click **"Import Maven Project"** or **"Enable Auto-Import"**
- Wait for dependencies to download (first time: 2-3 minutes)
- You'll see progress in the bottom-right corner

### Step 4: Find the Main Class
1. In the Project panel (left side), expand:
   ```
   src → main → java → com → seatbooking
   ```
2. You should see: **`SeatBookingApplication.java`**

### Step 5: Run the Application
**Method 1: Right-click**
- Right-click on `SeatBookingApplication.java`
- Select **"Run 'SeatBookingApplication'"**

**Method 2: Green Play Button**
- Open `SeatBookingApplication.java`
- Click the green ▶️ play button next to the `main` method

**Method 3: Keyboard Shortcut**
- Open `SeatBookingApplication.java`
- Press `Shift + F10` (or `Ctrl + Shift + F10`)

### Step 6: Access the Website
1. Wait for the application to start
2. Look for this message in the console:
   ```
   Started SeatBookingApplication in X.XXX seconds
   ```
3. Open your web browser
4. Go to: **http://localhost:8080**
5. You should see the Seat Booking System interface! 🎉

---

## Option B: Eclipse IDE

### Step 1: Download Eclipse
1. Go to: https://www.eclipse.org/downloads/
2. Download **"Eclipse IDE for Enterprise Java and Web Developers"**
3. Extract and run `eclipse.exe`

### Step 2: Import the Project
1. In Eclipse: **File → Import**
2. Select: **Maven → Existing Maven Projects**
3. Click **Next**
4. Browse to: `d:\2YR 1SEM\KLH\PROJECTS\BEEC PROJECT\JAVA PROJECT`
5. Click **Finish**
6. Wait for Maven to download dependencies

### Step 3: Run the Application
1. In Project Explorer, find: `SeatBookingApplication.java`
   - Path: `src/main/java/com/seatbooking/SeatBookingApplication.java`
2. Right-click on the file
3. Select: **Run As → Spring Boot App**
   - (If you don't see "Spring Boot App", select **Java Application**)

### Step 4: Access the Website
1. Check the Console tab for startup messages
2. Open browser: **http://localhost:8080**

---

## Troubleshooting

### IntelliJ: "Maven projects need to be imported"
- Click **"Import Maven Project"** in the popup
- Or: **File → Settings → Build, Execution, Deployment → Build Tools → Maven**
- Check "Import Maven projects automatically"

### IntelliJ: Dependencies not downloading
- **File → Settings → Build Tools → Maven → Repositories**
- Click **"Update"** button
- Or: Right-click `pom.xml` → **Maven → Reload Project**

### Eclipse: "Spring Boot App" not in menu
- Install Spring Tools: **Help → Eclipse Marketplace**
- Search for "Spring Tools 4" and install
- Restart Eclipse

### Port 8080 already in use
- Change port in: `src/main/resources/application.properties`
- Change `server.port=8080` to `server.port=8081`
- Then access: `http://localhost:8081`

### Java version error
- IntelliJ: **File → Project Structure → Project**
- Set "SDK" to Java 17 or 21
- Set "Language level" to match

---

## What You'll See

Once running, the website will show:
- ✅ Visual 10x10 seat map
- ✅ Green seats = Available
- ✅ Red seats = Booked
- ✅ Book/Cancel buttons
- ✅ Real-time updates

Enjoy your Seat Booking System! 🎫

