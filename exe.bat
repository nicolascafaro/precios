@echo off
python src/extraer.py
git add .
git commit -m "Actualizacion de datos"
git push origin main
pause