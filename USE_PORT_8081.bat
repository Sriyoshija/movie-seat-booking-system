@echo off
echo ========================================
echo Switching to port 8081...
echo ========================================
echo.
echo This will change the server port to 8081
echo to avoid conflicts with port 8080.
echo.

REM Backup original file
copy "src\main\resources\application.properties" "src\main\resources\application.properties.backup" >nul 2>&1

REM Change port to 8081
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'server.port=8080', 'server.port=8081' | Set-Content 'src\main\resources\application.properties'"

echo ✅ Port changed to 8081!
echo.
echo Now run RUN.bat to start the server
echo Then access: http://localhost:8081
echo.
pause

