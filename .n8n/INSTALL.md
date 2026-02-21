# n8n 快速安裝指引

這份文件提供 n8n 的快速安裝方式及錯誤排除。

## 🚀 方法一：Docker（推薦）

### Windows

```powershell
# 1. 確認 Docker Desktop 已安裝並運行
docker --version

# 2. 啟動 n8n
docker run -d `
  --name n8n `
  -p 5678:5678 `
  -v c:/Users/YourUsername/.n8n:/home/node/.n8n `
  n8nio/n8n

# 3. 開啟瀏覽器訪問
# http://localhost:5678
```

### macOS / Linux

```bash
# 1. 確認 Docker 已安裝
docker --version

# 2. 啟動 n8n
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# 3. 開啟瀏覽器訪問
# http://localhost:5678
```

### Docker Compose（進階用法）

建立 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    container_name: n8n
    ports:
      - "5678:5678"
    volumes:
      - ~/.n8n:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your_password_here
      - EXCHANGE_RATE_API_KEY=${EXCHANGE_RATE_API_KEY}
      - OPENWEATHERMAP_API_KEY=${OPENWEATHERMAP_API_KEY}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - STRAVA_ACCESS_TOKEN=${STRAVA_ACCESS_TOKEN}
    restart: unless-stopped
```

啟動：
```bash
docker-compose up -d
```

---

## 📦 方法二：npm 安裝

### 前置需求
- Node.js 18.x 或更高版本

### 安裝步驟

```bash
# 1. 全域安裝 n8n
npm install n8n -g

# 2. 啟動 n8n
n8n start

# 3. 開啟瀏覽器訪問
# http://localhost:5678
```

### 指定環境變數

```bash
# Windows PowerShell
$env:EXCHANGE_RATE_API_KEY="your_key"; n8n start

# macOS / Linux
export EXCHANGE_RATE_API_KEY="your_key"
n8n start
```

---

## ⚙️ 環境變數設定

建立 `.env` 檔案在專案根目錄（或 n8n 運行目錄）：

```bash
# n8n 基本設定
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password

# API Keys
EXCHANGE_RATE_API_KEY=your_exchangerate_key
OPENWEATHERMAP_API_KEY=your_openweathermap_key
GEMINI_API_KEY=your_gemini_key

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Strava
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
STRAVA_ACCESS_TOKEN=your_strava_access_token

# Google
GOOGLE_SHEET_ID=your_google_sheet_id

# Notion
NOTION_API_KEY=your_notion_key
NOTION_DATABASE_ID=your_notion_db_id

# Todoist
TODOIST_API_TOKEN=your_todoist_token
TODOIST_PROJECT_ID=your_todoist_project_id
```

---

## 📥 匯入工作流程

1. 開啟 n8n UI: http://localhost:5678
2. 點擊右上角 **"+"** → **"Import from File"**
3. 選擇 `.n8n/workflows/` 資料夾中的 JSON 檔案
4. 匯入後，點擊每個節點檢查並設定憑證
5. 測試執行：點擊 **"Execute Workflow"**
6. 確認無誤後，啟用工作流程（右上角開關）

### 可匯入的工作流程
- `exchange_rate_monitor.json` - 匯率監控
- `weather_monitor_fujisan.json` - 天氣預報
- `strava_sync_with_gemini.json` - Strava 同步（含 Gemini AI）
- `event_management.json` - 賽事監測與打包清單
- `personal_discipline_course.json` - 每日自律打卡

---

## 🔑 取得 API Keys

### 1. ExchangeRate-API
- 網址: https://www.exchangerate-api.com/
- 註冊免費帳號
- 複製 API Key

### 2. OpenWeatherMap
- 網址: https://openweathermap.org/api
- 註冊帳號
- 前往 "API Keys" 頁面複製

### 3. Google Gemini
- 網址: https://ai.google.dev/
- 前往 Google AI Studio
- 建立 API Key

### 4. Telegram Bot
- 在 Telegram 搜尋 `@BotFather`
- 輸入 `/newbot` 建立新 Bot
- 複製 Bot Token
- 取得你的 Chat ID: 傳訊給 `@userinfobot`

### 5. Strava API
- 網址: https://www.strava.com/settings/api
- 建立應用程式
- 取得 Client ID 與 Client Secret
- 完成 OAuth 流程取得 Access Token

### 6. Notion
- 網址: https://www.notion.so/my-integrations
- 建立新 Integration
- 複製 API Key
- 分享 Database 給該 Integration

### 7. Todoist
- 網址: https://todoist.com/prefs/integrations
- 前往 "Integrations" 頁籤
- 複製 API Token

---

## 🐛 常見問題

### Q: Docker 啟動失敗？
**A**: 確認 Docker Desktop 正在運行，並檢查 5678 port 是否被佔用：
```bash
# Windows
netstat -ano | findstr :5678

# macOS/Linux
lsof -i :5678
```

### Q: n8n 無法存取環境變數？
**A**: 確認環境變數已正確設定，Docker 需在 `docker run` 加 `-e` 參數或使用 `.env` 檔案。

### Q: Webhook 無法接收？
**A**: 本地開發需使用 ngrok 或 localtunnel 暴露 localhost：
```bash
npx localtunnel --port 5678
```

### Q: Google Sheets 權限錯誤？
**A**: 確認 Service Account Email 已被加入 Google Sheet 的協作者，且有編輯權限。

### Q: Strava Webhook 驗證失敗？
**A**: Strava 需要 HTTPS endpoint，本地開發需使用 ngrok。

---

## 📚 延伸資源

- [n8n 官方文檔](https://docs.n8n.io/)
- [n8n Community](https://community.n8n.io/)
- [n8n Workflows 範例](https://n8n.io/workflows/)
- [本專案 n8n 詳細說明](./.n8n/README_n8n_workflows.md)

---

**建議**: 本地開發建議使用 Docker，生產環境可考慮 n8n Cloud 或自建伺服器。
