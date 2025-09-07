@echo off
echo ========================================
echo   M&P Checker - PATH Fix Script
echo ========================================
echo.
echo This script will permanently add Node.js to your PATH
echo.
echo Current PATH status:
where node 2>nul
if %errorlevel% neq 0 (
    echo Node.js is NOT in PATH
    echo.
    echo Adding Node.js to PATH permanently...
    setx PATH "%PATH%;C:\Program Files\nodejs" /M
    echo.
    echo PATH updated! Please restart your terminal.
) else (
    echo Node.js is already in PATH
)
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo 1. Restart your terminal/PowerShell
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
pause
