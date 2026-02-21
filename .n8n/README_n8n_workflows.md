# n8n 自動化工作流程說明

這個資料夾包含 **5 個可匯入到 n8n 的 workflow JSON 範例**：

## 📦 工作流程清單

### 1. 行前準備與旅遊規劃 (Trip Planning)

#### `exchange_rate_monitor.json` - 日幣匯率監控
- **觸發**: 每日 09:00 (Schedule Trigger)
- **功能**: 檢查日幣匯率，低於 0.21 門檻時發送 Telegram 通知
- **API**: ExchangeRate-API
- **需要憑證**: `EXCHANGE_RATE_API_KEY`, Telegram Bot Token

#### `weather_monitor_fujisan.json` - 富士山天氣預報
- **觸發**: 每日 06:00/18:00 (Schedule Trigger)
- **功能**: 查詢富士河口湖天氣並寄送 Email
- **API**: OpenWeatherMap
- **需要憑證**: `OPENWEATHERMAP_API_KEY`, Email SMTP

### 2. 跑步訓練記錄整合 (Training Log)

#### `strava_sync_with_gemini.json` - Strava 同步到 Notion/Google Sheets
- **觸發**: Strava Webhook (新活動產生時)
- **功能**: 
  - 讀取 Strava 活動數據（距離、時間、配速、心率）
  - 使用 **Google Gemini AI** 生成鼓勵語
  - 同步到 Google Sheets 和 Notion
- **API**: Strava API, Google Gemini API, Google Sheets API, Notion API
- **需要憑證**: 
  - `STRAVA_ACCESS_TOKEN`
  - `GEMINI_API_KEY`
  - Google Sheets Credential
  - Notion Integration Token

### 3. 賽事資訊與行程管理 (Event Management)

#### `event_management.json` - 官網監測與打包清單
- **觸發**: 
  - 每 6 小時檢查官網 (Schedule Trigger)
  - 每日 09:00 檢查行事曆 (Schedule Trigger)
- **功能**:
  - 監控賽事官網「最新消息」頁面，有新公告時推播
  - 監控 Google Calendar，賽前 3 天自動複製打包清單到 Todoist
- **API**: Google Calendar API, Todoist API, Telegram
- **需要憑證**: 
  - Google Calendar Credential
  - `TODOIST_API_TOKEN`
  - Telegram Bot Token

#### `personal_discipline_course.json` - 個人自律課程打卡
- **觸發**: 每日 07:00 (Schedule Trigger)
- **功能**: 發送每日訓練任務提示，接收回覆並記錄到 Google Sheets
- **需要憑證**: Telegram Bot Token, Google Sheets Credential

---

## 🚀 快速匯入與設定

### Step 1: 匯入 Workflows

1. 打開 n8n UI (預設 http://localhost:5678)
2. 點擊右上角 **"Import from File"**
3. 選擇對應的 JSON 檔案匯入
4. 重複步驟匯入所有 5 個 workflow

### Step 2: 設定憑證 (Credentials)

在 n8n 中建立以下憑證：

#### A. API Keys (設為環境變數)
在 n8n 的 `.env` 檔案或 Docker Compose 中加入：

```bash
EXCHANGE_RATE_API_KEY=your_key_here
OPENWEATHERMAP_API_KEY=your_key_here
GEMINI_API_KEY=your_gemini_key
STRAVA_ACCESS_TOKEN=your_strava_token
TODOIST_API_TOKEN=your_todoist_token
```

#### B. OAuth & Service Accounts
- **Strava**: Settings → Credentials → Add Credential → Strava OAuth2 API
- **Google Sheets/Calendar**: 上傳 Service Account JSON 或使用 OAuth2
- **Notion**: 建立 Integration 並取得 API Key
- **Telegram**: 透過 @BotFather 建立 Bot，取得 Token

#### C. Telegram 設定
1. 在 Telegram 搜尋 `@BotFather`
2. 建立新 Bot: `/newbot`
3. 複製 Bot Token
4. 取得你的 Chat ID: 傳訊給 `@userinfobot`
5. 在 n8n Telegram 節點中填入 Token 與 Chat ID

### Step 3: 替換 Workflow 中的佔位符

匯入後，請編輯以下節點並替換佔位符：

| Workflow | 節點 | 要替換的內容 |
|----------|------|------------|
| `exchange_rate_monitor.json` | Send Telegram | `@your_telegram_chat_id` |
| `weather_monitor_fujisan.json` | Send Email | `your.email@example.com` |
| `strava_sync_with_gemini.json` | Append to Google Sheets | `YOUR_GOOGLE_SHEET_ID` |
| `strava_sync_with_gemini.json` | Create Notion Page | `YOUR_NOTION_DATABASE_ID` |
| `event_management.json` | Add to Todoist | `YOUR_TODOIST_PROJECT_ID` |
| `event_management.json` | Send Telegram/Packing | `@your_telegram_chat_id` |

### Step 4: 測試執行

1. 選擇匯入的 workflow
2. 點擊 **"Execute Workflow"** 手動測試
3. 檢查每個節點的輸出是否正確
4. 確認通知有正確發送到 Telegram/Email

### Step 5: 啟用自動執行

測試成功後，點擊右上角的開關 **"Activate"** 啟用 workflow。

---

## 🔗 前端整合

本專案已整合 React 前端元件與 n8n 通訊：

### 元件位置
- **服務模組**: `src/services/n8nService.ts`
- **React 元件**: `src/components/components/N8nIntegration.tsx`
- **已掛載到**: `src/App.tsx`

### 前端環境變數
在專案根目錄建立 `.env` 或 `.env.local`：

```bash
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 使用方式
啟動專案後，前往「n8n 自動化工具」區塊：
- 手動觸發匯率/天氣檢查
- 查看最新訓練記錄
- 查看賽事通知
- 建立打包清單提醒

---

## 🎯 進階設定

### Strava Webhook 設定
Strava 需要驗證 webhook endpoint：

```bash
# n8n webhook URL
https://your-n8n-domain.com/webhook/strava-webhook

# Strava 驗證 callback
設定 Strava App → Webhook Subscription → Callback URL
```

### Google Sheets 欄位設定
建議建立 Google Sheet，欄位如下：
- A 欄: 日期
- B 欄: 類型
- C 欄: 距離(km)
- D 欄: 時間(分鐘)
- E 欄: 配速
- F 欄: 心率
- G 欄: 鼓勵語

### Notion Database 設定
在 Notion 建立 Database，欄位：
- 標題 (Title): 活動名稱
- 日期 (Date): 跑步日期
- 距離 (Number): 公里數
- 配速 (Text): min/km
- 心率 (Text): bpm
- 鼓勵語 (Text): AI 生成內容

---

## 📝 常見問題 (FAQ)

### Q1: n8n 連線失敗？
**A**: 檢查 `VITE_N8N_WEBHOOK_URL` 是否正確，確保 n8n 正在運行。

### Q2: Gemini API 回傳 401?
**A**: 檢查 `GEMINI_API_KEY` 是否正確，確認 API 已啟用。

### Q3: Telegram 沒收到訊息？
**A**: 確認 Bot Token 正確，且 Chat ID 是你的 Telegram ID。

### Q4: Strava Webhook 沒觸發？
**A**: 確認 Strava App 的 Webhook Subscription 已正確設定，並通過驗證。

### Q5: Google Sheets 寫入失敗？
**A**: 檢查 Service Account 是否有 Sheet 的編輯權限。

---

## 📚 相關資源

- [n8n 官方文檔](https://docs.n8n.io/)
- [ExchangeRate-API](https://www.exchangerate-api.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Strava API](https://developers.strava.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Notion API](https://developers.notion.com/)
- [Todoist API](https://developer.todoist.com/)

---

## 💡 自訂擴充建議

1. **新增 Line Notify**: 替代 Telegram 發送通知到 Line
2. **整合 Garmin**: 支援 Garmin Connect 數據同步
3. **賽事倒數計時**: 定期發送「距離比賽還有 X 天」提醒
4. **週訓練統計**: 每週日自動產生訓練週報
5. **天氣警報**: 當降雨機率 > 70% 時特別通知

---

**提示**: 若要我為特定需求建立自訂 workflow，或協助整合其他服務，請告訴我！🚀
