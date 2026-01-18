@echo off
echo ========================================
echo Killing processes on port 8080...
echo ========================================
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo Killing process %%a...
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 1 /nobreak >nul

echo.
echo Checking if port 8080 is free...
netstat -ano | findstr :8080
if errorlevel 1 (
    echo.
    echo ✅ Port 8080 is now free!
) else (
    echo.
    echo ⚠️  Port 8080 is still in use. Trying again...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo.
echo Done!
timeout /t 2 /nobreak >nul

