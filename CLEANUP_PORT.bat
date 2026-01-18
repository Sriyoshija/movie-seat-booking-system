@echo off
echo ========================================
echo Cleaning up port 8080...
echo ========================================
echo.

REM Kill all processes using port 8080
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING 2^>nul') do (
    echo Killing process %%a on port 8080...
    taskkill /F /PID %%a >nul 2>&1
)

REM Also kill any Java processes that might be holding the port
echo.
echo Killing any Java processes...
taskkill /F /IM java.exe >nul 2>&1
taskkill /F /IM javaw.exe >nul 2>&1

timeout /t 2 /nobreak >nul

echo.
echo Verifying port 8080 is free...
netstat -ano | findstr :8080
if errorlevel 1 (
    echo.
    echo ✅ Port 8080 is now free!
) else (
    echo.
    echo ⚠️  Port 8080 may still be in use. You may need to:
    echo    1. Close any IDE windows running the application
    echo    2. Or use a different port (change server.port in application.properties)
)

echo.
pause

