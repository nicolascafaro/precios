@echo off
python src/extraer.py
git add .
git commit -m "Actualización de datos"
git push origin main
pause