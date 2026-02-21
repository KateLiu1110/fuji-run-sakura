# 🚀 n8n 自動化整合 - 快速開始

本專案已整合 n8n 自動化工具，提供匯率監控、天氣預報、Strava 同步、賽事通知等功能。

## 📋 已完成整合內容

### ✅ 前端整合
- [x] n8n 服務模組 (`src/services/n8nService.ts`)
- [x] React UI 元件 (`src/components/components/N8nIntegration.tsx`)
- [x] 已掛載到主應用 (`src/App.tsx`)
- [x] 環境變數設定 (`.env.example`)

### ✅ n8n Workflows（5個）
1. **匯率監控** - 每日 09:00 檢查日幣匯率
2. **天氣預報** - 每日 06:00/18:00 查詢富士山天氣
3. **Strava 同步** - 自動同步訓練記錄到 Notion/Sheets（含 Gemini AI 鼓勵語）
4. **賽事管理** - 官網監測 + 賽前打包清單提醒
5. **每日自律打卡** - 早上任務提醒與記錄

### ✅ 說明文件
- [x] Workflow 詳細說明 (`.n8n/README_n8n_workflows.md`)
- [x] 安裝指引 (`.n8n/INSTALL.md`)
- [x] 主 README 更新 (`README.md`)
- [x] 專案結構更新 (`STRUCTURE.md`)

---

## ⚡ 快速啟動（3 步驟）

### 步驟 1️⃣：安裝並啟動 n8n

使用 Docker（推薦）:
```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

或使用 npm:
```bash
npm install n8n -g
n8n start
```

開啟瀏覽器訪問 http://localhost:5678

### 步驟 2️⃣：匯入 Workflows

1. 在 n8n UI 點擊右上角 **"Import from File"**
2. 依序匯入 `.n8n/workflows/` 資料夾中的 5 個 JSON 檔案
3. 每個 workflow 匯入後，檢查節點並設定憑證

### 步驟 3️⃣：設定環境變數

複製並編輯 `.env.example` 為 `.env`:
```bash
cp .env.example .env
```

最低限度需填入（測試用）:
```bash
# 前端（必須）
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook

# Telegram（建議）
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# API Keys（選填，測試時可先跳過）
EXCHANGE_RATE_API_KEY=
OPENWEATHERMAP_API_KEY=
GEMINI_API_KEY=
```

---

## 🎯 測試整合

### 測試前端整合

1. 啟動前端專案:
```bash
npm install
npm run dev
```

2. 開啟瀏覽器訪問 http://localhost:3000 (或 Vite 顯示的 port)

3. 滾動到「**n8n 自動化工具**」區塊

4. 檢查連線狀態（綠色 = 已連線）

5. 點擊「刷新」按鈕測試各功能

### 測試 n8n Workflows

1. 在 n8n UI 選擇任一 workflow

2. 點擊 **"Execute Workflow"** 手動執行

3. 查看每個節點的輸出是否正確

4. 確認通知有送達（Telegram/Email）

5. 測試成功後，啟用 workflow（右上角開關）

---

## 📱 取得必要的 API Keys

### 快速取得（免費）

| 服務 | 註冊網址 | 取得時間 |
|-----|---------|---------|
| **Telegram Bot** | [@BotFather](https://t.me/BotFather) | 1 分鐘 |
| **ExchangeRate-API** | [exchangerate-api.com](https://www.exchangerate-api.com/) | 2 分鐘 |
| **OpenWeatherMap** | [openweathermap.org/api](https://openweathermap.org/api) | 3 分鐘 |
| **Google Gemini** | [ai.google.dev](https://ai.google.dev/) | 2 分鐘 |

### Telegram Bot 設定（最重要）

1. 在 Telegram 搜尋 `@BotFather`
2. 輸入 `/newbot` 並跟隨指示
3. 複製 Bot Token 到 `.env`
4. 取得你的 Chat ID：
   - 搜尋 `@userinfobot`
   - 傳任意訊息
   - 複製顯示的 ID

---

## 🔧 自訂設定

### 修改匯率門檻

編輯 `.n8n/workflows/exchange_rate_monitor.json`:
```json
"value2": 0.21  // 改成你想要的門檻值
```

### 修改天氣查詢時間

編輯 `.n8n/workflows/weather_monitor_fujisan.json`:
```json
"cronExpression": "0 6,18 * * *"  // 改成你想要的時間
```

### 修改通知目標

所有 Telegram 節點中的 `@your_telegram_chat_id` 替換為你的 Chat ID。

---

## 📚 完整說明文件

- **Workflow 詳細說明**: [.n8n/README_n8n_workflows.md](.n8n/README_n8n_workflows.md)
- **安裝指引**: [.n8n/INSTALL.md](.n8n/INSTALL.md)
- **專案 README**: [README.md](../README.md)

---

## 🐛 常見問題

### Q: 前端顯示「n8n 未連線」？
**A**: 確認：
1. n8n 正在運行 (http://localhost:5678)
2. `.env` 中的 `VITE_N8N_WEBHOOK_URL` 正確
3. 重啟前端專案

### Q: Workflow 執行失敗？
**A**: 檢查：
1. 憑證是否正確綁定
2. API Key 是否有效
3. 查看 n8n 的執行日誌

### Q: Telegram 沒收到訊息？
**A**: 確認：
1. Bot Token 正確
2. Chat ID 正確（不是用戶名）
3. 先傳訊給 Bot 啟用對話

### Q: API 回傳 401/403？
**A**: 
1. 檢查 API Key 是否過期
2. 確認 API 配額是否用盡
3. 檢查 API Key 的環境變數名稱

---

## 💡 下一步

完成基本設定後，可以：

1. **整合更多服務**:
   - Line Notify (替代 Telegram)
   - Garmin Connect (替代 Strava)
   - Slack、Discord 通知

2. **擴充功能**:
   - 週訓練統計報表
   - 賽事倒數計時器
   - 天氣警報（降雨 > 70%）
   - 自動生成訓練計畫

3. **優化體驗**:
   - 設定 ngrok 讓 Webhook 可公開存取
   - 使用 n8n Cloud（免維護）
   - 建立自訂儀表板

---

## 🤝 需要協助？

- 查看 [n8n 官方文檔](https://docs.n8n.io/)
- 加入 [n8n Community](https://community.n8n.io/)
- 本專案 Issues: [GitHub Issues](#)

---

**祝你跑步愉快！🏃‍♂️🌸**
