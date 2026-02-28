# 🌸 富士櫻花路跑 Fuji Sakura Run

<div align="center">
  <img src="https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2076&auto=format&fit=crop" alt="Sakura" width="100%" style="object-fit: cover; border-radius: 10px;"/>
  
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

---

## 🎯 專案簡介

**富士櫻花路跑**是一個結合櫻花季節與跑步運動的線上活動平台。此專案採用**完整前後端分離架構**，提供用戶訓練計畫、追蹤跑步記錄、數據分析等功能。

### 主要目標
- 🏃 制定個人化訓練計畫
- 📊 記錄和追蹤跑步數據
- 🗺️ 推薦適合的練跑路線
- 💪 倒數計時激勵挑戰
- 📈 提供數據可視化與統計分析

---

## ✨ 功能特色

### 🏠 首頁功能
- **Hero 區塊**：展示賽事資訊與獎牌介紹
- **Header 導航列**：
  - 快速跳轉至報名流程區塊
  - 追櫻路線 & 練跑基地導航
  - 留言區連結
  - 響應式設計，支援行動裝置
- **報名流程**：清晰的四步驟報名指引
- **知識專區**：跑步訓練指南、健康知識
- **路線地圖**：
  - 台灣各地櫻花路線推薦
  - GPS 路線查看功能
  - Google 地圖整合，點擊查看詳細位置
  - 互動式地圖 Modal
- **社群留言板**：跑友分享與互動
- **櫻花返回頂部按鈕**：
  - 固定在頁面右下角
  - 帶有櫻花圖標裝飾
  - 平滑滾動動畫

### 👤 個人專區（自律表 Dashboard）

#### 登入體驗
- **登入彈窗**：進入即顯示精美的登入介面
- **報名組別選擇彈窗**：登入後選擇挑戰組別
  - 50km（大獎牌收藏組）- 每天平均 5 公里
  - 25km（經典挑戰組）- 每天平均 2.5 公里
  - 10km（輕鬆跑組）- 每天平均 1 公里
- **地區選擇**：設定居住地區，系統推薦適合的練跑路線
  - 北部（台北市、新北市）
  - 中部（台中市、彰化縣）
  - 南部（台南市、高雄市）

#### 📅 第一個標籤：訓練計畫

##### 進度追蹤卡片
- **剩餘公里**：
  - 顯示還需完成的公里數
  - 目標總計顯示
  - 進度條視覺化
- **剩餘天數**：
  - 倒數計時顯示距離比賽結束的天數
  - 比賽日期：2026/03/07 - 03/16（共 10 天）
- **已完成里程**：
  - 累積完成的總公里數
  - 完成度百分比

##### 訓練計畫表
- **每日計畫卡片**：
  - 顯示日期（DAY 1, DAY 2...）
  - 計畫距離（每天應跑公里數）
  - 推薦地點（系統根據居住地區推薦）
  - 實際距離（完成後顯示）
- **訓練按鈕**：
  - 「訓練去」按鈕開啟 GPS 追蹤
  - 只能同時進行一個訓練
  - 完成後按鈕變為「已完成」狀態

##### GPS 追蹤功能
- **追蹤介面**（點擊「訓練去」後顯示）：
  - 大字體顯示訓練時間（分:秒）
  - 即時預估距離（根據時間計算）
  - 配速顯示（分/公里）
  - 「完成訓練」按鈕停止追蹤
- **自動記錄**：
  - 訓練完成後自動更新計畫表
  - 記錄實際跑步距離
  - 累加至總完成里程
  - 加入訓練歷程列表

#### 🏃 第二個標籤：訓練記錄

##### 統計卡片
- **累計完成**：總完成公里數
- **訓練次數**：已完成的訓練次數
- **平均配速**：每公里平均時間
- **已完成天數**：完成訓練的天數

##### 訓練歷程列表
- 顯示每次訓練的詳細記錄：
  - 跑步距離
  - 訓練日期與時間
  - 路線名稱
  - 配速資訊
- 按時間倒序排列（最新的在上面）
- 精美的卡片式設計
- 空狀態提示（無記錄時）

#### 📊 第三個標籤：數據分析

##### 統計卡片
- **平均配速**：整體訓練配速
- **總訓練次數**：完成的訓練總數
- **最長距離**：單次訓練的最長距離
- **訓練達成率**：完成天數 ÷ 總天數

##### 數據視覺化（ECharts）
- **每日訓練距離折線圖**：
  - 顯示每天完成的跑步里程
  - 平滑曲線
  - 區域填充效果
  - 互動式 Tooltip
- **計畫 vs 實際完成柱狀圖**：
  - 對比每天的計畫距離與實際完成距離
  - 雙色柱狀圖（計畫 / 實際）
  - 渐變色設計
  - 清晰的數據對比
- **空狀態提示**：
  - 無數據時顯示友善訊息
  - 引導用戶開始訓練

### 🌐 社群功能
- 發佈路跑心得
- 查看其他跑者分享
- 評論與互動

---

## 🛠️ 技術架構

### 前端技術棧

#### React 技術（從基礎到應用）

1. **基礎技術**
   - React 18.3.1：核心框架
   - TypeScript 5.3.0：類型安全
   - React Hooks：
     - `useState`: 狀態管理
     - `useEffect`: 副作用處理

2. **狀態管理**
   - React Context API：全域狀態共享
   - Local State：組件內部狀態
   - Props Drilling：組件間數據傳遞

3. **UI 組件開發**
   - 函數式組件設計
   - 組件化架構
   - Props 介面設計
   - 條件渲染
   - 列表渲染與 Key 優化

4. **進階應用**
   - Modal 組件封裝
   - 自訂 Hooks
   - 效能優化（避免不必要的重渲染）
   - 事件處理與表單控制

5. **樣式技術**
   - **Tailwind CSS 3.4**：
     - Utility-first CSS 框架
     - 響應式設計（sm, md, lg, xl 斷點）
     - 自訂配置
     - Dark mode 支援
     - 動畫效果（transition, transform, animate）
   - **模組化樣式**：
     - 組件級樣式封裝
     - 條件樣式類名
     - 動態樣式綁定

6. **圖標系統**
   - Lucide React 0.563.0：
     - 豐富的圖標庫
     - Tree-shaking 優化
     - TypeScript 支援

7. **數據可視化**
   - **ECharts 5.5.1**：企業級圖表庫
   - **echarts-for-react 3.0.2**：React 封裝
   - 圖表類型：
     - 折線圖（Line Chart）
     - 柱狀圖（Bar Chart）
   - 特性：
     - 響應式設計
     - 互動式 Tooltip
     - 渐變色填充
     - 動畫效果

8. **HTTP 通信**
   - Axios 1.6.0：HTTP 客戶端
   - Fetch API：原生請求
   - RESTful API 整合

9. **建置工具**
   - **Vite 7.3.1**：
     - 極速的開發伺服器
     - Hot Module Replacement (HMR)
     - 優化的生產建置
     - TypeScript 原生支援
     - ESM 優先

10. **測試框架**
    - Jest 29.7.0：測試運行器
    - React Testing Library 14.0.0：組件測試
    - 單元測試
    - 整合測試

### 後端技術棧（Python）

1. **Web 框架**
   - **FastAPI**：
     - 現代化的 Python Web 框架
     - 自動 API 文件生成（Swagger UI）
     - 基於 ASGI 的非同步處理
     - 類型提示支援
     - 高效能

2. **數據驗證**
   - **Pydantic**：
     - 數據模型定義
     - 自動驗證
     - JSON Schema 生成
     - 類型安全

3. **HTTP 伺服器**
   - **Uvicorn**：
     - ASGI 伺服器
     - 支援非同步處理
     - WebSocket 支援

4. **安全性**
   - Hashlib (SHA-256)：密碼加密
   - CORS 跨域處理
   - HTTPBearer 認證

5. **資料庫**
   - 開發環境：記憶體資料庫（Python Dictionary）
   - 生產環境：可擴展至 PostgreSQL / MongoDB
   - ORM：SQLAlchemy（可選）

6. **測試**
   - **Pytest**：
     - 單元測試
     - API 端點測試
     - Fixture 支援

7. **API 設計**
   - RESTful API 架構
   - JSON 數據格式
   - 狀態碼規範
   - 錯誤處理機制

---

## 📁 專案結構

```
fuji-sakura-run/
├── src/
│   ├── components/          # React 組件
│   │   ├── Header.tsx       # 導航列組件
│   │   ├── SakuraFalling.tsx # 櫻花動畫
│   │   ├── Community.tsx    # 社群組件
│   │   ├── BoardSection.tsx # 留言板區塊
│   │   ├── GPSTracker.tsx   # GPS 追蹤器
│   │   └── ...
│   ├── pages/               # 頁面組件
│   │   ├── HomePage.tsx     # 首頁
│   │   ├── LoginPage.tsx    # 登入頁
│   │   └── SelfDisciplinePage.tsx # 個人專區（自律表）
│   ├── services/            # API 服務
│   │   └── api.ts          # API 調用函數
│   ├── store/              # 狀態管理
│   │   └── CommunityContext.tsx
│   ├── types/              # TypeScript 類型定義
│   │   ├── index.ts
│   │   └── globals.d.ts
│   ├── constants/          # 常數定義
│   │   └── index.ts
│   ├── assets/             # 靜態資源
│   │   └── images/
│   ├── __tests__/          # 測試檔案
│   ├── App.tsx             # 根組件
│   ├── index.tsx           # 入口檔案
│   └── index.css           # 全域樣式
├── backend/
│   ├── main.py                 # API 路由定義與主應用
│   ├── models.py               # Pydantic 數據模型
│   ├── database.py             # 資料庫操作
│   ├── test_main.py            # 後端 API 端點測試
│   ├── test_models.py          # 模型測試
│   ├── test_database.py        # 資料庫測試
│   ├── requirements.txt        # Python 依賴
│   └── requirements-test.txt   # 測試依賴
├── public/                 # 公共資源
├── package.json            # 依賴配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── postcss.config.js       # PostCSS 配置
├── jest.config.ts          # Jest 測試配置
├── README.md               # 專案說明文件
├── start.bat               # Windows 啟動腳本
└── start.sh                # Unix/Linux 啟動腳本
```

---

## 🚀 安裝與執行

### 前置需求
- Node.js 18+ 
- Python 3.9+
- npm 或 yarn
- Git

### 1. 複製專案
```bash
git clone https://github.com/your-username/fuji-sakura-run.git
cd fuji-sakura-run
```

### 2. 前端安裝與啟動

```bash
# 安裝依賴
npm install

# 或使用 yarn
yarn install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 預覽生產建置
npm run preview
```

前端將在 `http://localhost:5173` 運行

### 3. 後端安裝與啟動

#### Windows
```bash
cd backend

# 建立虛擬環境
python -m venv venv

# 啟動虛擬環境
venv\Scripts\activate

# 安裝依賴
pip install -r requirements.txt

# 啟動伺服器
python -m uvicorn main:app --reload
```

#### macOS / Linux
```bash
cd backend

# 建立虛擬環境
python3 -m venv venv

# 啟動虛擬環境
source venv/bin/activate

# 安裝依賴
pip install -r requirements.txt

# 啟動伺服器
python -m uvicorn main:app --reload
```

後端將在 `http://localhost:8000` 運行

API 文件：`http://localhost:8000/docs`

### 4. 使用啟動腳本（推薦）

#### Windows
```bash
.\start.bat
```

#### macOS / Linux
```bash
chmod +x start.sh
./start.sh
```

啟動腳本會自動：
- 檢查 Python 和 Node.js 版本
- 建立虛擬環境
- 安裝依賴
- 同時啟動前後端伺服器

---

## 🧪 測試

### 前端測試
```bash
# 運行所有測試
npm test

# 運行測試並生成覆蓋率報告
npm test -- --coverage

# 監視模式
npm test -- --watch
```

### 後端測試
```bash
cd backend

# 安裝測試依賴
pip install -r requirements-test.txt

# 運行測試
pytest

# 生成覆蓋率報告
pytest --cov=. --cov-report=html
```

---

## 📊 數據流程圖

```
┌─────────────┐
│   用戶介面   │
│  (React App) │
└──────┬──────┘
       │
       │ HTTP/REST
       │
┌──────▼──────┐      ┌──────────┐
│  FastAPI    │◄────►│ Database │
│   Backend   │      └──────────┘
└─────────────┘
```

---

## 🔧 環境配置

建立 `.env` 檔案：

```env
# 前端環境變數
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=富士櫻花路跑

# Google Maps API Key（用於地圖功能）
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**取得 Google Maps API Key**：
1. 訪問 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用 Maps JavaScript API 和 Maps Embed API
4. 建立 API 金鑰
5. 設定 API 金鑰限制（HTTP referrer）

---

## 🎨 設計特色

### 視覺設計
- **配色方案**：
  - 主色：Pink (#ec4899)
  - 輔助色：Indigo (#6366f1)
  - 中性色：Slate 系列
- **字體**：
  - 系統字體堆疊
  - 支援中文優化
- **動畫效果**：
  - Tailwind 原生動畫
  - 平滑過渡效果
  - Hover 互動反饋

### 響應式設計
- Mobile First 方法
- 斷點設置：
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### 用戶體驗
- 直覺式導航
- 快速反饋
- 流暢的動畫過渡
- 無障礙設計（Accessibility）

---

## 📝 開發規範

### TypeScript 規範
- 使用介面定義 Props
- 避免使用 `any` 類型
- 善用類型推導
- 組件 Props 必須定義類型

### React 規範
- 函數式組件優先
- Hooks 使用規範
- 避免不必要的重渲染
- 合理拆分組件

### 樣式規範
- Tailwind Utility Classes
- 避免內聯樣式（除非動態）
- 保持樣式一致性
- 響應式優先

---

## 🚧 未來規劃

- [ ] 實現真實 GPS 追蹤整合
- [ ] 增加更多圖表類型
- [ ] 加入社交分享功能
- [ ] 開發行動端 App
- [ ] 多語言支援（i18n）
- [ ] PWA 支援
- [ ] 深色模式
- [ ] 用戶成就系統
- [ ] 排行榜功能
- [ ] 匯出訓練報表（PDF）

---

## 🤝 貢獻指南

歡迎貢獻！請遵循以下步驟：

1. Fork 此專案
2. 建立您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的改動 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 🙏 致謝

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [ECharts](https://echarts.apache.org/)
- [Lucide Icons](https://lucide.dev/)
- [Unsplash](https://unsplash.com/) - 圖片來源

---

<div align="center">
  <p>Made with ❤️ and 🌸</p>
  <p>© 2026 富士櫻花路跑專案</p>
</div>
