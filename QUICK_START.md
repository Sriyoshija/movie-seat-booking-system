# Quick Start Guide - Seat Booking System

## Problem: RUN.bat not working / Maven not installed

Since Maven is not installed on your system, here are **3 easy solutions**:

## Solution 1: Install Maven (Recommended)

1. **Download Maven:**
   - Go to: https://maven.apache.org/download.cgi
   - Download: `apache-maven-3.9.5-bin.zip`

2. **Extract Maven:**
   - Extract to: `C:\Program Files\Apache\maven` (or any folder you prefer)

3. **Add to PATH:**
   - Press `Win + X` → System → Advanced system settings
   - Click "Environment Variables"
   - Under "System Variables", find "Path" and click "Edit"
   - Click "New" and add: `C:\Program Files\Apache\maven\bin`
   - Click OK on all dialogs

4. **Verify:**
   ```bash
   mvn -version
   ```

5. **Run the project:**
   ```bash
   cd "d:\2YR 1SEM\KLH\PROJECTS\BEEC PROJECT\JAVA PROJECT"
   mvn clean spring-boot:run
   ```

## Solution 2: Use an IDE (Easiest - No Maven needed!)

### IntelliJ IDEA (Recommended)
1. Download: https://www.jetbrains.com/idea/download/
2. Install and open IntelliJ IDEA
3. File → Open → Select your project folder
4. Wait for Maven to sync (IntelliJ has built-in Maven)
5. Right-click `SeatBookingApplication.java` → Run

### Eclipse
1. Download: https://www.eclipse.org/downloads/
2. Install Eclipse IDE for Java Developers
3. File → Import → Maven → Existing Maven Projects
4. Select your project folder
5. Right-click project → Run As → Spring Boot App

## Solution 3: Use PowerShell Script

1. Right-click `RUN.ps1` → Run with PowerShell
2. If you get an execution policy error, run this first:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Then run `RUN.ps1` again

## Access the Website

Once the application starts, open your browser and go to:
```
http://localhost:8080
```

## Troubleshooting

### "Port 8080 already in use"
- Another application is using port 8080
- Change port in `src/main/resources/application.properties`:
  ```
  server.port=8081
  ```

### "JAVA_HOME not set"
- The batch files should set it automatically
- If not, manually set: `set JAVA_HOME=C:\Program Files\Java\jdk-21`

### Still having issues?
- Use Solution 2 (IDE) - it's the easiest and handles everything automatically!

