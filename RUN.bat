@echo off
cd /d "%~dp0"

REM Set JAVA_HOME if not already set
if "%JAVA_HOME%"=="" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-21"
    setx JAVA_HOME "C:\Program Files\Java\jdk-21" >nul 2>&1
)

echo ========================================
echo   Seat Booking System - Starting...
echo ========================================
echo.

REM Kill any processes using port 8081 (current port) or 8080 (previous port)
echo Checking ports 8081 and 8080...
set PORT_FREE=0

REM Check and kill port 8081
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081 ^| findstr LISTENING 2^>nul') do (
    echo Port 8081 is in use by process %%a. Killing it...
    taskkill /F /PID %%a >nul 2>&1
    set PORT_FREE=1
)

REM Check and kill port 8080 (in case it's still running)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING 2^>nul') do (
    echo Port 8080 is in use by process %%a. Killing it...
    taskkill /F /PID %%a >nul 2>&1
    set PORT_FREE=1
)

if %PORT_FREE%==1 (
    echo Waiting for ports to be released...
    timeout /t 2 /nobreak >nul
    REM Try one more time for both ports
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081 ^| findstr LISTENING 2^>nul') do (
        echo Still in use, killing process %%a again...
        taskkill /F /PID %%a >nul 2>&1
    )
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING 2^>nul') do (
        echo Still in use, killing process %%a again...
        taskkill /F /PID %%a >nul 2>&1
    )
    timeout /t 1 /nobreak >nul
)

echo Java Home: %JAVA_HOME%
echo.
echo Please wait, this may take a few minutes on first run...
echo (Maven will download automatically)
echo.
echo.

call mvnw.cmd clean spring-boot:run

if errorlevel 1 (
    echo.
    echo ========================================
    echo   Error occurred!
    echo ========================================
    echo.
    echo If JAVA_HOME is incorrect, please set it manually:
    echo   set JAVA_HOME=C:\Program Files\Java\jdk-21
    echo.
    pause
    exit /b 1
)

pause

