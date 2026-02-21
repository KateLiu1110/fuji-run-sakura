# 🌸 富士櫻花路跑 Fuji Sakura Run

<div align="center">
  <img src="https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2076&auto=format&fit=crop" alt="Sakura" width="100%" height="300" style="object-fit: cover; border-radius: 10px;"/>
  
  <h3>「終點不會逃走，只有心會退縮」</h3>
  <p>專為櫻花季打造的線上路跑活動平台</p>
</div>

---

## 📋 目錄

- [專案簡介](#專案簡介)
- [功能特色](#功能特色)
- [技術架構](#技術架構)
- [專案結構](#專案結構)
- [安裝與執行](#安裝與執行)
- [測試](#測試)
- [API 文檔](#api-文檔)
- [關於 n8n 自動化](#關於-n8n-自動化)

---

## 🎯 專案簡介

**富士櫻花路跑**是一個結合櫻花季節與跑步運動的線上活動平台。此專案採用**完整前後端分離架構**，提供用戶追蹤跑步記錄、探索櫻花路線、參與社群互動等功能。

### 主要目標
- 🏃 記錄和追蹤個人跑步數據
- 🗺️ 發掘台灣各地的櫻花路線
- 👥 建立跑步愛好者社群
- 📊 提供數據可視化與統計分析
- 🎖️ 激勵系統（積分、徽章、打卡）
- 🤖 AI 驅動的個人化鼓勵語生成

---

## ✨ 功能特色

### 🏠 首頁功能
- **Hero 區塊**：展示賽事資訊與獎牌介紹
- **報名流程**：清晰的四步驟報名指引
- **知識專區**：跑步訓練指南、健康知識
- **路線地圖**：台灣各地櫻花路線推薦與 GPX 下載
- **社群留言板**：跑友分享與互動

### 👤 個人專區 (自律表 Dashboard)
- **跑步紀錄**：查看歷史跑步數據與訓練歷程
- **統計分析**：
  - 累積里程數
  - 運動時數統計
  - 解鎖徽章數量
- **每日打卡系統**：
  - 獲取櫻花積分
  - 視覺化月曆顯示打卡天數
  - 虛擬富士山攀登進度
- **AI 影片生成**：
  - 使用 Google Gemini AI 生成個人化鼓勵語
  - 基於用戶數據的詩意文字創作
  - 模擬影片製作流程
- **訓練歷程可視化**：
  - 每次跑步的詳細記錄
  - 路線、距離、時間追蹤
  - 進度趨勢圖表

### 🌐 社群功能
- 發佈路跑心得
- 查看其他跑者分享
- 評論與互動

---

## 🛠️ 技術架構

### 前端技術棧
- **框架**: React 18.3.1 + TypeScript 5.3.0
- **狀態管理**: React Hooks (useState, useEffect, Context API)
- **樣式**: Tailwind CSS 3.4
- **圖標**: Lucide React 0.563.0
- **AI 整合**: Google Generative AI (@google/generative-ai 0.24.1)
- **HTTP 客戶端**: Fetch API
- **建構工具**: Vite 7.3.1
- **測試框架**: Jest 29.7.0 + React Testing Library 14.0.0

### 後端技術棧
- **框架**: FastAPI (Python 3.9+)
- **ASGI 伺服器**: Uvicorn
- **數據驗證**: Pydantic
- **密碼加密**: Hashlib (SHA-256)
- **CORS 處理**: FastAPI CORS Middleware
- **測試框架**: Pytest

### 資料庫
- **開發環境**: 內存數據庫 (Python Dictionary)
- **生產環境**: 可擴展至 PostgreSQL / MongoDB

### AI 功能
- **Google Gemini API**: 生成個人化跑步鼓勵語
- **模型**: gemini-pro
- **應用場景**: 根據用戶累積里程、打卡天數、訓練紀錄生成富有詩意的激勵文字

---

## 📁 專案結構

```
fuji_sakura_run/
│
├── backend/                       # 後端 FastAPI 專案
│   ├── main.py                    # API 路由定義與主應用
│   ├── models.py                  # Pydantic 數據模型
│   ├── database.py                # 數據庫操作函數
│   ├── test_main.py               # 後端 API 端點測試
│   ├── test_database.py           # 數據庫函數測試
│   ├── test_models.py             # 數據模型驗證測試
│   ├── requirements.txt           # Python 依賴
│   ├── requirements-test.txt      # 測試依賴
│   └── README.md                  # 後端說明
│
├── src/                           # 前端 React 專案
│   ├── pages/                     # 頁面組件
│   │   ├── HomePage.tsx           # 首頁（櫻花路線、知識、留言板）
│   │   ├── SelfDisciplinePage.tsx # 自律表頁面（儀表板、統計）
│   │   └── LoginPage.tsx          # 登入頁面
│   │
│   ├── components/                # 可重用組件
│   │   ├── Dashboard.tsx          # 個人數據面板
│   │   ├── SakuraFalling.tsx      # 櫻花飄落動畫
│   │   ├── Header.tsx             # 導航欄
│   │   ├── Hero.tsx               # 首頁英雄區塊
│   │   ├── Comments.tsx           # 留言板
│   │   ├── Community.tsx          # 社群頁面
│   │   ├── SakuraRoutes.tsx       # 櫻花路線地圖
│   │   ├── GPSTracker.tsx         # GPS 追蹤器
│   │   ├── MtFujiGuide.tsx        # 富士山訓練指南
│   │   └── RunningKnowledge.tsx   # 跑步知識
│   │
│   ├── services/                  # API 服務層（前後端分離）
│   │   └── api.ts                 # 後端 API 通訊封裝
│   │
│   ├── __tests__/                 # 前端測試檔案
│   │   ├── App.test.tsx           # App 路由測試
│   │   ├── HomePage.test.tsx      # 首頁測試
│   │   ├── SelfDisciplinePage.test.tsx  # 自律表測試
│   │   ├── LoginPage.test.tsx     # 登入頁測試
│   │   └── api.test.ts            # API 服務測試
│   │
│   ├── types/                     # TypeScript 類型定義
│   │   └── index.ts
│   │
│   ├── constants/                 # 常量配置
│   │   └── index.ts
│   │
│   ├── App.tsx                    # 主應用組件（路由容器）
│   ├── index.tsx                  # React 入口
│   └── index.css                  # 全局樣式
│
├── package.json                   # NPM 配置
├── tsconfig.json                # TypeScript 配置
├── vite.config.ts               # Vite 配置
├── jest.config.ts               # Jest 測試配置
├── tailwind.config.cjs          # Tailwind 配置
└── README.md                    # 專案說明（本文件）
```

---

## 🚀 安裝與執行

### 前置需求
- Node.js 18+ 
- Python 3.9+
- npm 或 yarn

### 1. 安裝前端依賴

```bash
npm install
```

### 2. 設定環境變數

創建 `.env` 文件：

```bash
# Google Generative AI API Key (選填，用於 AI 鼓勵語生成)
VITE_GENAI_API_KEY=your_google_genai_api_key_here

# 後端 API URL
VITE_API_BASE_URL=http://localhost:8000
```

**獲取 Google AI API Key**：
1. 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 創建新的 API Key
3. 複製並貼到 `.env` 文件中

### 3. 安裝後端依賴

```bash
cd backend
pip install -r requirements.txt
```

### 4. 啟動開發環境

**方法一：使用腳本（推薦）**

Windows:
```bash
start.bat
```

Mac/Linux:
```bash
chmod +x start.sh
./start.sh
```

**方法二：手動啟動**

終端 1 - 啟動前端:
```bash
npm run dev
```

終端 2 - 啟動後端:
```bash
npm run backend
# 或
cd backend
python -m uvicorn main:app --reload
```

### 5. 訪問應用

- 前端：http://localhost:5173
- 後端 API：http://localhost:8000
- API 文檔：http://localhost:8000/docs

---

## 🧪 測試

本專案包含完整的前後端測試，確保功能正確性與業務邏輯一致性。

### 前端測試

```bash
# 運行所有測試
npm test

# 運行特定測試文件
npm test App.test.tsx

# 測試覆蓋率
npm test -- --coverage

# Watch 模式（開發時使用）
npm test -- --watch
```

**測試文件結構**：
- `src/__tests__/App.test.tsx` - 主應用路由與導航測試
- `src/__tests__/HomePage.test.tsx` - 首頁組件與內容測試
- `src/__tests__/SelfDisciplinePage.test.tsx` - 自律表頁面功能測試
- `src/__tests__/LoginPage.test.tsx` - 登入表單驗證測試
- `src/__tests__/api.test.ts` - API 服務層測試

**測試覆蓋範圍**：
- ✅ 頁面渲染與導航
- ✅ 用戶交互（打卡、登入、登出）
- ✅ 表單驗證
- ✅ 狀態管理（localStorage）
- ✅ API 請求與錯誤處理

### 後端測試

```bash
cd backend

# 安裝測試依賴
pip install -r requirements-test.txt

# 運行所有測試
pytest

# 運行特定測試文件
pytest test_main.py

# 測試覆蓋率
pytest --cov=. --cov-report=html

# 顯示詳細輸出
pytest -v

# 顯示測試失敗的詳細信息
pytest -vv
```

**測試文件結構**：
- `backend/test_main.py` - API 端點測試
- `backend/test_database.py` - 數據庫函數測試
- `backend/test_models.py` - Pydantic 模型驗證測試

**測試覆蓋範圍**：
- ✅ 用戶註冊、登入、驗證
- ✅ 跑步記錄 CRUD 操作
- ✅ 評論功能
- ✅ 櫻花路線查詢
- ✅ 數據模型驗證
- ✅ 密碼哈希與驗證
- ✅ 用戶統計數據計算
- ✅ CORS 配置

### 測試最佳實踐

1. **運行測試前**：確保後端服務未運行，避免端口衝突
2. **數據隔離**：每個測試使用獨立的數據庫環境
3. **覆蓋率目標**：維持 80% 以上的測試覆蓋率
4. **CI/CD 整合**：可配合 GitHub Actions 自動運行測試

---

## 📡 API 文檔

### 用戶相關

#### 用戶註冊
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "跑者名稱",
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### 用戶登入
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### 獲取用戶資料
```http
GET /api/users/profile
Authorization: Bearer <token>
```

### 跑步記錄相關

#### 獲取用戶跑步記錄
```http
GET /api/runs/user/{userId}
```

**Response:**
```json
[
  {
    "id": "run_123",
    "userId": "user_456",
    "date": "2026-02-21",
    "distance": 5.2,
    "time": "30:00",
    "route": "淡水天元宮櫻花環線",
    "type": "🌸",
    "location": {"lat": 25.033, "lng": 121.565},
    "created_at": "2026-02-21T10:00:00"
  }
]
```

#### 新增跑步記錄
```http
POST /api/runs
Content-Type: application/json

{
  "userId": "user_456",
  "date": "2026-02-21",
  "distance": 5.2,
  "time": "30:00",
  "route": "淡水天元宮櫻花環線",
  "type": "🌸",
  "location": {"lat": 25.033, "lng": 121.565}
}
```

**支援的跑步類型**：
- `🌸` - 櫻花路線
- `⚡` - 速度訓練
- `🏔️` - 山路訓練
- `🏃` - 一般訓練

#### 刪除跑步記錄
```http
DELETE /api/runs/{run_id}
```

#### 獲取用戶統計數據
```http
GET /api/users/{userId}/stats
```

**Response:**
```json
{
  "totalDistance": 48.5,
  "totalTime": "4:30:00",
  "totalRuns": 12,
  "averagePace": "6:15"
}
```

### 評論相關

#### 獲取所有評論
```http
GET /api/comments
```

**Response:**
```json
[
  {
    "id": "comment_123",
    "author": "小林",
    "content": "今天跑得很開心！",
    "timestamp": "2026-02-21T10:00:00",
    "userId": "user_456"
  }
]
```

#### 新增評論
```http
POST /api/comments
Content-Type: application/json

{
  "author": "跑者名稱",
  "content": "今天跑得很開心！",
  "userId": "user_123"
}
```

### 路線相關

#### 獲取所有櫻花路線
```http
GET /api/routes
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "武陵農場櫻花環線",
    "location": "台中市和平區",
    "distance": 5.2,
    "difficulty": "easy",
    "sakuraLevel": 5,
    "description": "紅粉佳人盛開，最美的櫻花路線",
    "bestSeason": "2-3月"
  }
]
```

#### 獲取單一路線詳情
```http
GET /api/routes/{route_id}
```

### 健康檢查

#### 檢查 API 狀態
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-21T10:00:00"
}
```

### API 使用範例

**前端調用範例（使用 api.ts 服務層）：**

```typescript
import { api } from './services/api';

// 用戶註冊
const response = await api.user.register({
  name: "測試用戶",
  email: "test@example.com",
  password: "password123"
});

if (response.error) {
  console.error('註冊失敗:', response.error);
} else {
  console.log('註冊成功:', response.data);
}

// 獲取跑步記錄
const runsResponse = await api.run.getUserRuns('user_123');
if (runsResponse.data) {
  console.log('跑步記錄:', runsResponse.data);
}

// 創建新的跑步記錄
const newRunResponse = await api.run.create({
  userId: 'user_123',
  date: '2026-02-21',
  distance: 5.2,
  time: '30:00',
  route: '淡水天元宮',
  type: '🌸'
});
```

#### 獲取特定路線
```http
GET /api/routes/<route_id>
```

### 統計相關

#### 獲取用戶統計數據
```http
GET /api/stats/<user_id>
Authorization: Bearer <token>
```

完整 API 文檔請訪問：http://localhost:8000/docs (FastAPI 自動生成)

---

## 🤖 關於 n8n 自動化

### 原始規劃

本專案最初規劃整合 **n8n** 工作流程自動化平台，計劃實現以下功能：

1. **日幣匯率監控**
   - 每日自動檢查 JPY → TWD 匯率
   - 低於門檻時發送 Telegram/Line 通知
   - 幫助計劃參加日本馬拉松的跑者

2. **富士山天氣預報**
   - 定期獲取富士山周邊天氣
   - 顯示溫度、降雨機率、風速
   - 推送天氣警報

3. **訓練記錄同步**
   - Strava Webhook 觸發
   - 同步活動到 Notion / Google Sheets
   - Google Gemini 生成個人化鼓勵語

4. **賽事官網監測**
   - 定期檢查富士山馬拉松官網更新
   - 自動通知報名開放時間

5. **自動打包清單提醒**
   - 賽前自動發送裝備檢查清單
   - 整合到待辦事項應用

### 當前狀態

**n8n 功能已從主專案移除**，原因如下：

1. **簡化架構**：為了保持專案的輕量化和易維護性
2. **前後端分離**：專注於核心的跑步追蹤和社群功能
3. **降低依賴**：減少外部服務依賴，提高穩定性
4. **獨立部署**：n8n 需要額外的伺服器資源和配置

### AI 功能保留

雖然移除了 n8n 整合，但我們保留了核心的 AI 功能：
- ✅ **Google Gemini AI** 直接整合到 Dashboard
- ✅ 根據用戶數據生成個人化鼓勵語
- ✅ 無需額外配置 n8n 服務

### 如需 n8n 功能
### 如需 n8n 功能

如果您想要使用原本規劃的 n8n 自動化功能，可以：

1. **獨立部署 n8n 服務**：
   ```bash
   # 使用 Docker
   docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
   
   # 或使用 npm
   npx n8n
   ```

2. **手動創建工作流程**：
   - **匯率監控**：使用 ExchangeRate-API 或 Alpha Vantage API
   - **天氣預報**：使用 OpenWeatherMap API
   - **Strava 同步**：設定 Strava Webhook 觸發器
   - **Gemini AI 整合**：連接 Google Gemini API 生成鼓勵語

3. **前端整合建議**：
   ```typescript
   // 在 src/services/ 中創建 n8nService.ts
   const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/fuji-run';
   
   export async function triggerN8nWorkflow(data: any) {
     const response = await fetch(N8N_WEBHOOK_URL, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
     });
     return response.json();
   }
   ```

---

## 🎨 特色設計

### UI/UX 設計理念
- **日式美學**：櫻花、富士山視覺元素貫穿整體設計
- **扁平化設計**：現代簡約風格，注重內容而非裝飾
- **響應式佈局**：完美支援手機、平板、桌面設備
- **動畫效果**：櫻花飄落特效、平滑過渡動畫
- **無障礙設計**：符合 WCAG 2.1 標準

### 頁面架構
- **首頁（HomePage）**：展示櫻花路線、跑步知識、社群留言板
- **自律表頁面（SelfDisciplinePage）**：
  - 儀表板：顯示累積里程、運動時數、解鎖徽章
  - 統計分析：週度跑步數據、配速分析、熱量消耗
  - 打卡系統：月曆視覺化、連續打卡追蹤
  - n8n 自動化：智慧路跑推薦、GA4 數據同步
- **登入頁面（LoginPage）**：簡潔的登入表單設計

### 數據持久化
- **LocalStorage**：用戶登入狀態、打卡記錄
- **後端數據庫**：完整跑步記錄、用戶資料、社群互動
- **未來規劃**：Redis 快取、PostgreSQL 生產環境

### 安全性
- **密碼哈希**：SHA-256 加密儲存
- **CORS 配置**：限制前端訪問來源
- **輸入驗證**：Pydantic 模型驗證
- **未來增強**：JWT Token、OAuth 2.0

---

## 🔮 未來規劃

### 短期目標（1-3 個月）
- [ ] 整合真實數據庫（PostgreSQL / MongoDB）
- [ ] JWT Token 完整實現與 Refresh Token 機制
- [ ] 單元測試覆蓋率達到 90%
- [ ] GPS 即時追蹤功能（使用 Geolocation API）
- [ ] 使用者頭像上傳功能

### 中期目標（3-6 個月）
- [ ] 社群互動增強（按讚、追蹤、私訊）
- [ ] 排行榜系統（月度、年度、總榜）
- [ ] 實體獎牌兌換流程與物流追蹤
- [ ] PWA 支援（離線使用）
- [ ] 多語言支援（中文、英文、日文）

### 長期目標（6-12 個月）
- [ ] 手機 App 版本（React Native）
- [ ] Strava / Garmin 官方 API 整合
- [ ] Apple Health / Google Fit 數據同步
- [ ] 虛擬賽事直播功能
- [ ] AI 訓練計畫生成器
- [ ] 跑步社群配對系統

---

## 🤝 貢獻指南

歡迎貢獻代碼、回報問題或提出新功能建議！

### 開發流程
1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 代碼規範
- **前端**：遵循 ESLint 配置
- **後端**：遵循 PEP 8 規範
- **提交訊息**：使用 Conventional Commits 格式

---

## 📝 授權

MIT License - 詳見 [LICENSE](LICENSE) 文件

---

## 🙏 致謝

- **櫻花圖片**：[Unsplash](https://unsplash.com/)
- **圖標庫**：[Lucide React](https://lucide.dev/)
- **AI 技術**：[Google Gemini](https://deepmind.google/technologies/gemini/)
- **框架支援**：React、FastAPI、Tailwind CSS

---

## 📧 聯絡方式

如有問題或建議，歡迎聯繫：
- **專案維護者**：Kate
- **GitHub Issues**：[專案 Issues 頁面](https://github.com/yourusername/fuji-sakura-run/issues)
- **討論區**：[GitHub Discussions](https://github.com/yourusername/fuji-sakura-run/discussions)

---

<div align="center">
  
**「終點不會逃走，只有心會退縮」**

讓我們一起跑向富士山頂！🏃‍♂️🌸🗻

[![Stars](https://img.shields.io/github/stars/yourusername/fuji-sakura-run?style=social)](https://github.com/yourusername/fuji-sakura-run)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>
│   ├── database.py               # 數據庫操作
│   ├── requirements.txt          # Python 依賴
│   └── .env.example              # 環境變量示例
│
├── src/                          # 前端 React 專案
│   ├── components/               # React 元件
│   │   └── components/           # 具體功能元件
│   │       ├── Header.tsx        # 導航欄
│   │       ├── Hero.tsx          # 首頁 Hero
│   │       ├── Dashboard.tsx     # 個人專區
│   │       ├── Comments.tsx      # 留言板
│   │       ├── Community.tsx     # 社群頁面
│   │       ├── SakuraRoutes.tsx  # 路線地圖
│   │       ├── GPSTracker.tsx    # GPS 追蹤
│   │       ├── MtFujiGuide.tsx   # 富士山指南
│   │       └── SakuraFalling.tsx # 櫻花飄落動畫
│   │
│   ├── store/                    # 狀態管理
│   │   ├── index.ts              # Store 統一導出
│   │   ├── UserContext.tsx       # 用戶狀態
│   │   ├── RunContext.tsx        # 跑步記錄狀態
│   │   └── CommunityContext.tsx  # 社群狀態
│   │
│   ├── types/                    # TypeScript 類型定義
│   │   └── index.ts              # 所有類型定義
│   │
│   ├── constants/                # 常量配置
│   │   └── index.ts              # 應用常量
│   │
│   ├── services/                 # API 服務
│   │   └── api.ts                # API 請求封裝
│   │
│   ├── App.tsx                   # 主應用元件
│   ├── index.tsx                 # 應用入口
│   └── index.css                 # 全局樣式
│
├── public/                       # 靜態資源
├── package.json                  # NPM 依賴配置
├── tsconfig.json                 # TypeScript 配置
├── tailwind.config.js            # Tailwind 配置
├── .env.example                  # 前端環境變量示例
└── README.md                     # 專案說明文檔
```

---

## 🚀 安裝步驟（詳盡）

下面提供逐步可複製的安裝與啟動指令，包含 Windows PowerShell、Windows cmd，以及 macOS / Linux 範例。

注意：以下指令假設你已安裝 `git`、`node` 與 `python`。

1) 先檢查環境（建議使用你將用來執行專案的同一個 `python`）

```bash
python --version
where python   # Windows
which python   # macOS / Linux
node --version
npm --version
```

2) 取得專案

```bash
git clone <repository-url>
cd fuji_sakura_run
```

3) 安裝前端套件

```bash
npm install
# 或
yarn install
```

4) 建立並安裝後端（推薦使用虛擬環境）

Windows PowerShell（推薦）
```powershell
cd D:\_Kate\_interview\_2026\fuji_sakura_run\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

如果 PowerShell 啟用 venv 遇到 ExecutionPolicy 限制，可先執行：
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
.\venv\Scripts\Activate.ps1
```

Windows cmd (不改 ExecutionPolicy 時使用)
```cmd
cd D:\_Kate\_interview\_2026\fuji_sakura_run\backend
python -m venv venv
venv\Scripts\activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

5) 設定前後端環境變量

前端：
```bash
cp .env.example .env
# 編輯 .env，設定 REACT_APP_API_URL
REACT_APP_API_URL=http://localhost:8000/api
```

後端：
```bash
cd backend
cp .env.example .env
# 編輯 backend/.env，設定 SECRET_KEY 等
```

6) 啟動前端（在專案根目錄）

```bash
npm start
# 或
yarn start
```

前端預設執行於 `http://localhost:3000`，後端 API 預設 `http://localhost:8000`。

7) 驗證後端是否啟動（瀏覽器）

訪問 Swagger UI： `http://localhost:8000/docs`

故障排查（常見問題）
- 錯誤 `No module named uvicorn`：表示當前 Python 環境沒有安裝 `uvicorn`，請先啟用對應 venv，或以 `python -m pip install uvicorn[standard]` 安裝到該 python 環境。
- PowerShell 無法啟用 venv（ExecutionPolicy）：可執行 `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force`，或改用 cmd 啟用 `venv\Scripts\activate`。
- 若 `pip install -r requirements.txt` 失敗，請貼上完整錯誤日誌以便協助排查。

進階：如需一次性啟動（Windows），可使用 `start.bat`；macOS / Linux 可使用 `start.sh`（請先 `chmod +x start.sh`）。

---

## 📡 API 文檔

### Base URL
```
http://localhost:8000/api
```

### 主要端點

#### 用戶相關
- `POST /users/register` - 用戶註冊
- `POST /users/login` - 用戶登入
- `GET /users/profile` - 獲取用戶資料

#### 跑步記錄
- `GET /runs?userId={userId}` - 獲取跑步記錄
- `POST /runs` - 新增跑步記錄
- `DELETE /runs/{runId}` - 刪除跑步記錄

#### 評論
- `GET /comments` - 獲取所有評論
- `POST /comments` - 新增評論

#### 路線
- `GET /routes` - 獲取所有櫻花路線
- `GET /routes/{routeId}` - 獲取路線詳情

#### 統計
- `GET /stats/{userId}` - 獲取用戶統計數據

### API 文檔（Swagger UI）

後端啟動後，可訪問自動生成的 API 文檔：
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## 💻 開發指南

### 前端開發

#### 新增元件
1. 在 `src/components/components/` 下創建元件文件
2. 使用 TypeScript 定義 Props
3. 在 `src/types/index.ts` 中添加相關類型

#### 狀態管理
項目使用 React Context API：
- `UserContext` - 用戶登入狀態
- `RunContext` - 跑步記錄管理
- `CommunityContext` - 社群互動

#### 調用 API
使用 `src/services/api.ts` 中封裝的方法：

```typescript
import { api } from '../services/api';

// 獲取評論
const comments = await api.comments.getAll();

// 新增跑步記錄
const newRun = await api.runs.create(runData, token);
```

### 後端開發

#### 新增 API 端點
1. 在 `backend/models.py` 定義 Pydantic 模型
2. 在 `backend/database.py` 實現數據操作
3. 在 `backend/main.py` 添加路由處理

#### 數據驗證
使用 Pydantic 自動驗證：

```python
from models import RunRecordCreate

@app.post("/api/runs")
async def create_run(run_data: RunRecordCreate):
    # Pydantic 自動驗證 run_data
    return create_run(run_data)
```

---

## 📦 部署

### 前端部署

#### Build 生產版本
```bash
npm run build
```

生成的文件在 `build/` 目錄，可部署至：
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

### 後端部署

#### 使用 Docker
```bash
cd backend
docker build -t fuji-sakura-api .
docker run -p 8000:8000 fuji-sakura-api
```

#### 部署平台
- **Heroku**
- **AWS EC2**
- **Google Cloud Run**
- **Railway**

---

## 🧪 測試

### 前端測試
```bash
npm test
```

### 後端測試
```bash
cd backend
pytest
```

---

## 🔒 安全性

- ✅ 密碼使用 SHA-256 哈希加密
- ✅ CORS 設置限制跨域請求
- ✅ 環境變量管理敏感信息
- ⚠️ JWT 認證（需完善）
- ⚠️ HTTPS 部署（生產環境必須）

---

## 📝 待辦事項

- [ ] 完善 JWT 認證機制
- [ ] 整合真實資料庫（PostgreSQL）
- [ ] 添加圖片上傳功能
- [ ] GPS 追蹤實時同步
- [ ] 社群功能增強（按讚、分享）
- [ ] 完整單元測試
- [ ] 多語言支持（i18n）
- [ ] PWA 支持

---

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📄 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 文件

---

## 👥 作者

**Kate** - *Initial work*

---

## 🙏 致謝

- [React](https://reactjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Unsplash](https://unsplash.com/) - 櫻花圖片素材

---

<div align="center">
  <p>🌸 Made with ❤️ for runners and sakura lovers 🌸</p>
  <p>© 2026 Fuji Sakura Run Project</p>
</div>

