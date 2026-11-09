@echo off
title Build MCQ Slide Maker
where node >nul 2>nul || (echo Please install Node.js LTS from https://nodejs.org first, then run this file again. & pause & exit /b)
call npm install
call npm run build
echo.
echo Done. Your installer (.exe) is in the "dist" folder.
start "" dist
pause
