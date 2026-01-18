@echo off
echo ========================================
echo Seat Booking System - Public URL Helper
echo ========================================
echo.
echo Step 1: Finding your local IP address...
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set LOCAL_IP=%%a
    goto :found
)
:found
set LOCAL_IP=%LOCAL_IP:~1%
echo Your local IP address is: %LOCAL_IP%
echo.
echo Step 2: Public URL Options
echo.
echo Option A - Local Network Access:
echo   Other devices on your network can access:
echo   http://%LOCAL_IP%:8080
echo.
echo Option B - Internet Access (requires port forwarding):
echo   1. Find your public IP: https://whatismyipaddress.com
echo   2. Configure port forwarding on your router:
echo      - External Port: 8080
echo      - Internal IP: %LOCAL_IP%
echo      - Internal Port: 8080
echo   3. Share: http://YOUR_PUBLIC_IP:8080
echo.
echo Option C - Use ngrok for temporary public URL:
echo   1. Download ngrok from: https://ngrok.com/download
echo   2. Run: ngrok http 8080
echo   3. Share the ngrok URL shown
echo.
echo ========================================
echo Make sure the server is running first!
echo Run: mvn spring-boot:run
echo ========================================
pause

