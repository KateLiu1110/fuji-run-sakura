#!/bin/bash

# 富士櫻花路跑 - 一鍵啟動腳本

echo "🌸 富士櫻花路跑 - 啟動中... 🌸"
echo ""

# 檢查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 錯誤：未安裝 Node.js"
    echo "請訪問 https://nodejs.org/ 安裝 Node.js"
    exit 1
fi

# 檢查 Python
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ 錯誤：未安裝 Python"
    echo "請訪問 https://www.python.org/ 安裝 Python 3.9+"
    exit 1
fi

# 設置 Python 命令
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
else
    PYTHON_CMD="python"
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ Python 版本: $($PYTHON_CMD --version)"
echo ""

# 檢查並安裝前端依賴
if [ ! -d "node_modules" ]; then
    echo "📦 安裝前端依賴..."
    npm install
    echo "✅ 前端依賴安裝完成"
    echo ""
fi

# 檢查並安裝後端依賴
if [ ! -d "backend/venv" ]; then
    echo "📦 創建 Python 虛擬環境..."
    cd backend
    $PYTHON_CMD -m venv venv
    
    # 啟動虛擬環境並安裝依賴
    if [ -f "venv/bin/activate" ]; then
        source venv/bin/activate
    else
        source venv/Scripts/activate
    fi
    
    pip install -r requirements.txt
    cd ..
    echo "✅ 後端依賴安裝完成"
    echo ""
fi

# 檢查環境變量文件
if [ ! -f ".env" ]; then
    echo "⚠️  未找到 .env 文件，複製示例文件..."
    cp .env.example .env
    echo "✅ 已創建 .env 文件"
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠️  未找到 backend/.env 文件，複製示例文件..."
    cp backend/.env.example backend/.env
    echo "✅ 已創建 backend/.env 文件"
fi

echo ""
echo "🚀 啟動服務..."
echo ""
echo "📍 後端將運行在: http://localhost:8000"
echo "📍 前端將運行在: http://localhost:3000"
echo "📍 API 文檔: http://localhost:8000/docs"
echo ""
echo "按 Ctrl+C 停止服務"
echo ""

# 啟動後端（背景執行）
cd backend
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    source venv/Scripts/activate
fi
$PYTHON_CMD -m uvicorn main:app --reload &
BACKEND_PID=$!
cd ..

# 等待後端啟動
sleep 3

# 啟動前端
npm start

# 清理：當前端停止時，也停止後端
kill $BACKEND_PID
