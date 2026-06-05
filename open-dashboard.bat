@echo off
cd /d "%~dp0"
start "Cocktail Dashboard Server" /min node server.js
timeout /t 1 /nobreak >nul
start "" "http://localhost:5500"
