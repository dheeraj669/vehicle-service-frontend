@echo off
echo =========================================================
echo  Initialize and Push Frontend Repository to GitHub
echo =========================================================
echo.

where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed or not in your PATH!
    echo Please install Git from: https://git-scm.com/download/win
    echo After installing, restart your terminal and run this script again.
    pause
    exit /b 1
)

echo [1/4] Initializing Git repository...
git init
git branch -M main

echo [2/4] Adding files...
git add .

echo [3/4] Creating initial commit...
git commit -m "Initial commit: Standalone React Vite Frontend for deployment"

echo.
echo =========================================================
echo  Git repository initialized successfully!
echo =========================================================
echo.
echo To push this to your GitHub repository:
echo   1. Create an empty repository on GitHub named: vehicle-service-frontend
echo   2. Run the following commands:
echo.
echo      git remote add origin https://github.com/<YOUR-USERNAME>/vehicle-service-frontend.git
echo      git push -u origin main
echo.
pause
