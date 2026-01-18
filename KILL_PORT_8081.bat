@echo off
echo ========================================
echo Killing processes on port 8081...
echo ========================================
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081 ^| findstr LISTENING') do (
    echo Killing process %%a on port 8081...
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 1 /nobreak >nul

echo.
echo Checking if port 8081 is free...
netstat -ano | findstr :8081
if errorlevel 1 (
    echo.
    echo ✅ Port 8081 is now free!
) else (
    echo.
    echo ⚠️  Port 8081 may still be in use.
    echo    Try closing your IDE or any running Java processes.
)

echo.
pause

