@echo off
REM 富士櫻花路跑 - Windows 一鍵啟動腳本

echo.
echo 🌸 富士櫻花路跑 - 啟動中... 🌸
echo.

REM 檢查 Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 錯誤：未安裝 Node.js
    echo 請訪問 https://nodejs.org/ 安裝 Node.js
    pause
    exit /b 1
)

REM 檢查 Python
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 錯誤：未安裝 Python
    echo 請訪問 https://www.python.org/ 安裝 Python 3.9+
    pause
    exit /b 1
)

echo ✅ Node.js 版本:
node --version
echo ✅ Python 版本:
python --version
echo.

REM 檢查並安裝前端依賴
if not exist "node_modules\" (
    echo 📦 安裝前端依賴...
    call npm install
    echo ✅ 前端依賴安裝完成
    echo.
)

REM 檢查並安裝後端依賴
if not exist "backend\venv\" (
    echo 📦 創建 Python 虛擬環境...
    cd backend
    python -m venv venv
    call venv\Scripts\activate
    pip install -r requirements.txt
    cd ..
    echo ✅ 後端依賴安裝完成
    echo.
)

REM 檢查環境變量文件
if not exist ".env" (
    echo ⚠️  未找到 .env 文件，複製示例文件...
    copy .env.example .env
    echo ✅ 已創建 .env 文件
)

if not exist "backend\.env" (
    echo ⚠️  未找到 backend\.env 文件，複製示例文件...
    copy backend\.env.example backend\.env
    echo ✅ 已創建 backend\.env 文件
)

echo.
echo 🚀 啟動服務...
echo.
echo 📍 後端將運行在: http://localhost:8000
echo 📍 前端將運行在: http://localhost:3000
echo 📍 API 文檔: http://localhost:8000/docs
echo.
echo 按 Ctrl+C 停止服務
echo.

REM 啟動後端（新視窗）
start "富士櫻花路跑 - 後端" cmd /k "cd backend && venv\Scripts\activate && python -m uvicorn main:app --reload"

REM 等待後端啟動
timeout /t 3 /nobreak >nul

REM 啟動前端
start "富士櫻花路跑 - 前端" cmd /k "npm start"

echo.
echo ✅ 服務已啟動！
echo.
pause
