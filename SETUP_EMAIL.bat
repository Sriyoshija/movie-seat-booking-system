@echo off
echo ========================================
echo Email Service Setup Helper
echo ========================================
echo.
echo This script will help you configure email settings.
echo.
echo Choose your email provider:
echo.
echo 1. Gmail (Recommended)
echo 2. Outlook/Hotmail
echo 3. Yahoo Mail
echo 4. Custom SMTP
echo 5. Skip (Use console output only)
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto gmail
if "%choice%"=="2" goto outlook
if "%choice%"=="3" goto yahoo
if "%choice%"=="4" goto custom
if "%choice%"=="5" goto skip
goto invalid

:gmail
echo.
echo ========================================
echo Gmail Configuration
echo ========================================
echo.
echo Step 1: Enable 2-Step Verification on your Google account
echo Step 2: Generate App Password: https://myaccount.google.com/apppasswords
echo.
set /p email="Enter your Gmail address: "
set /p password="Enter your 16-character App Password: "
echo.
echo Updating configuration...
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.enabled=false', 'spring.mail.enabled=true' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.username=\$\{MAIL_USERNAME:your-email@gmail.com\}', 'spring.mail.username=%email%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.password=\$\{MAIL_PASSWORD:your-app-password\}', 'spring.mail.password=%password%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.from=\$\{MAIL_FROM:your-email@gmail.com\}', 'spring.mail.from=%email%' | Set-Content 'src\main\resources\application.properties'"
echo.
echo ✅ Gmail configuration updated!
echo.
echo IMPORTANT: Make sure you're using an App Password, not your regular password!
echo See EMAIL_SETUP.md for detailed instructions.
goto end

:outlook
echo.
echo ========================================
echo Outlook/Hotmail Configuration
echo ========================================
echo.
set /p email="Enter your Outlook email: "
set /p password="Enter your password: "
echo.
echo Updating configuration...
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.enabled=false', 'spring.mail.enabled=true' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.host=smtp.gmail.com', 'spring.mail.host=smtp-mail.outlook.com' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.username=\$\{MAIL_USERNAME:your-email@gmail.com\}', 'spring.mail.username=%email%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.password=\$\{MAIL_PASSWORD:your-app-password\}', 'spring.mail.password=%password%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.from=\$\{MAIL_FROM:your-email@gmail.com\}', 'spring.mail.from=%email%' | Set-Content 'src\main\resources\application.properties'"
echo.
echo ✅ Outlook configuration updated!
goto end

:yahoo
echo.
echo ========================================
echo Yahoo Mail Configuration
echo ========================================
echo.
set /p email="Enter your Yahoo email: "
set /p password="Enter your App Password: "
echo.
echo Updating configuration...
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.enabled=false', 'spring.mail.enabled=true' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.host=smtp.gmail.com', 'spring.mail.host=smtp.mail.yahoo.com' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.username=\$\{MAIL_USERNAME:your-email@gmail.com\}', 'spring.mail.username=%email%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.password=\$\{MAIL_PASSWORD:your-app-password\}', 'spring.mail.password=%password%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.from=\$\{MAIL_FROM:your-email@gmail.com\}', 'spring.mail.from=%email%' | Set-Content 'src\main\resources\application.properties'"
echo.
echo ✅ Yahoo configuration updated!
goto end

:custom
echo.
echo ========================================
echo Custom SMTP Configuration
echo ========================================
echo.
set /p host="Enter SMTP host: "
set /p port="Enter SMTP port (usually 587): "
set /p email="Enter your email: "
set /p password="Enter your password: "
echo.
echo Updating configuration...
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.enabled=false', 'spring.mail.enabled=true' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.host=smtp.gmail.com', 'spring.mail.host=%host%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.port=587', 'spring.mail.port=%port%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.username=\$\{MAIL_USERNAME:your-email@gmail.com\}', 'spring.mail.username=%email%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.password=\$\{MAIL_PASSWORD:your-app-password\}', 'spring.mail.password=%password%' | Set-Content 'src\main\resources\application.properties'"
powershell -Command "(Get-Content 'src\main\resources\application.properties') -replace 'spring.mail.from=\$\{MAIL_FROM:your-email@gmail.com\}', 'spring.mail.from=%email%' | Set-Content 'src\main\resources\application.properties'"
echo.
echo ✅ Custom SMTP configuration updated!
goto end

:skip
echo.
echo Email service will remain disabled.
echo Booking confirmations will be printed to console.
goto end

:invalid
echo.
echo Invalid choice. Please run the script again.
goto end

:end
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Restart your server (RUN.bat)
echo 2. Make a test booking
echo 3. Check console output or email inbox
echo.
echo For detailed instructions, see: EMAIL_SETUP.md
echo.
pause

