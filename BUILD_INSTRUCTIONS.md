# How to Build and Run the Seat Booking System

## Prerequisites

Before building, make sure you have:

1. **Java Development Kit (JDK) 17 or higher**
   - Check if installed: `java -version`
   - Download from: https://adoptium.net/ or https://www.oracle.com/java/

2. **Apache Maven 3.6 or higher**
   - Check if installed: `mvn -version`
   - Download from: https://maven.apache.org/download.cgi

## Step-by-Step Build Instructions

### Method 1: Using Maven Command Line (Recommended)

1. **Open Command Prompt or PowerShell**
   - Press `Win + R`, type `cmd` or `powershell`, press Enter
   - Or right-click in the project folder and select "Open in Terminal"

2. **Navigate to the project directory**
   ```bash
   cd "d:\2YR 1SEM\KLH\PROJECTS\BEEC PROJECT\JAVA PROJECT"
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```
   This will:
   - Download all required dependencies (first time only, may take a few minutes)
   - Compile all Java files
   - Package the application into a JAR file
   - Create the file: `target/seat-booking-system-1.0.0.jar`

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```
   OR run the JAR directly:
   ```bash
   java -jar target/seat-booking-system-1.0.0.jar
   ```

5. **Access the website**
   - Open your web browser
   - Go to: `http://localhost:8080`
   - You should see the seat booking interface!

### Method 2: Using an IDE (Eclipse/IntelliJ IDEA)

#### For IntelliJ IDEA:
1. Open IntelliJ IDEA
2. File → Open → Select the project folder
3. Wait for Maven to sync dependencies
4. Right-click on `SeatBookingApplication.java`
5. Select "Run 'SeatBookingApplication'"

#### For Eclipse:
1. File → Import → Maven → Existing Maven Projects
2. Select the project folder
3. Click Finish
4. Right-click on `SeatBookingApplication.java`
5. Run As → Java Application

### Method 3: Build JAR and Run Separately

1. **Build the JAR file:**
   ```bash
   mvn clean package
   ```

2. **Run the JAR file:**
   ```bash
   java -jar target/seat-booking-system-1.0.0.jar
   ```

## Troubleshooting

### Issue: "mvn is not recognized"
**Solution:** Maven is not installed or not in PATH
- Install Maven and add it to your system PATH
- Or use an IDE with built-in Maven support

### Issue: "Java version error"
**Solution:** You need Java 17 or higher
- Update your JDK to version 17 or later
- Set JAVA_HOME environment variable

### Issue: "Port 8080 already in use"
**Solution:** Another application is using port 8080
- Stop the other application, OR
- Change port in `src/main/resources/application.properties`:
  ```
  server.port=8081
  ```

### Issue: "Dependencies download fails"
**Solution:** Check your internet connection
- Maven needs internet to download dependencies (first time only)
- Ensure firewall/proxy settings allow Maven access

## Project Structure After Build

```
JAVA PROJECT/
├── target/                          # Build output (created after build)
│   ├── classes/                     # Compiled Java classes
│   └── seat-booking-system-1.0.0.jar  # Executable JAR file
├── src/                             # Source code
├── pom.xml                          # Maven configuration
└── README.md                        # Documentation
```

## Quick Start Commands

```bash
# Navigate to project
cd "d:\2YR 1SEM\KLH\PROJECTS\BEEC PROJECT\JAVA PROJECT"

# Build and run in one command
mvn clean spring-boot:run

# Or build first, then run
mvn clean package
java -jar target/seat-booking-system-1.0.0.jar
```

## Success Indicators

When the application starts successfully, you'll see:
```
Started SeatBookingApplication in X.XXX seconds
```

Then open `http://localhost:8080` in your browser to see the seat booking interface!

