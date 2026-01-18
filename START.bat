@echo off
cd /d "%~dp0"

REM Set JAVA_HOME
set "JAVA_HOME=C:\Program Files\Java\jdk-21"

REM Add Java to PATH for this session
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo ========================================
echo   Seat Booking System
echo ========================================
echo.
echo Starting application...
echo.
echo If Maven is not installed, please:
echo 1. Download Maven from: https://maven.apache.org/download.cgi
echo 2. Extract it to a folder (e.g., C:\Program Files\Apache\maven)
echo 3. Add Maven's bin folder to your PATH
echo.
echo OR use an IDE like IntelliJ IDEA or Eclipse
echo.
echo Press any key to try running with Maven Wrapper...
pause >nul

REM Try to run with wrapper
if exist "mvnw.cmd" (
    call mvnw.cmd clean spring-boot:run
) else (
    echo Maven wrapper not found. Please install Maven.
    pause
)

