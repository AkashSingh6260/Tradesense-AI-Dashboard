@echo off
echo ==============================================
echo    TradeSense AI - ML Prediction Engine
echo ==============================================
echo.
echo Installing/Verifying Required Python Libraries...
pip install -r requirements.txt > nul

echo.
echo Running Machine Learning Models...
python model.py

echo.
pause
