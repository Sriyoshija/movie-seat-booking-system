# Seat Booking System - Run Script
$ErrorActionPreference = "Stop"

# Change to script directory
Set-Location $PSScriptRoot

# Set JAVA_HOME if not already set
if (-not $env:JAVA_HOME) {
    $env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
    Write-Host "Setting JAVA_HOME to: $env:JAVA_HOME" -ForegroundColor Yellow
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Seat Booking System - Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Java Home: $env:JAVA_HOME" -ForegroundColor Green
Write-Host ""
Write-Host "Please wait, this may take a few minutes on first run..." -ForegroundColor Yellow
Write-Host "(Maven will download automatically)" -ForegroundColor Yellow
Write-Host ""
Write-Host ""

try {
    & ".\mvnw.cmd" clean spring-boot:run
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  Error occurred!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

