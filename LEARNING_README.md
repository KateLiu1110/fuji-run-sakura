# 學習過程記錄 📚

## React 學習經驗與用法

### 1. **React Hooks 的深度應用**

#### useState - 狀態管理
```tsx
// 基本用法：管理簡單狀態
const [isLoggedIn, setIsLoggedIn] = useState(false);

// 複雜狀態：管理物件陣列
const [dailyPlans, setDailyPlans] = useState<DailyPlan[]>([]);

// 狀態初始化：從 localStorage 讀取
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem('fuji_is_logged_in') === 'true';
});
```

**學習心得：**
- useState 適合管理組件內部狀態
- 對於複雜狀態，使用 TypeScript 定義型別能避免錯誤
- 初始化函數型別可以避免每次渲染都執行昂貴的計算

#### useEffect - 副作用處理
```tsx
// 監聽狀態變化並同步到 localStorage
useEffect(() => {
  localStorage.setItem('fuji_is_logged_in', isLoggedIn.toString());
}, [isLoggedIn]);

// 計時器功能：GPS 追蹤
useEffect(() => {
  let interval: NodeJS.Timeout;
  if (isTracking) {
    interval = setInterval(() => {
      setTrackingTime(prev => prev + 1);
    }, 1000);
  }
  return () => clearInterval(interval); // 清理函數
}, [isTracking]);

// 檢查目標完成並觸發慶祝動畫
useEffect(() => {
  if (selectedCategory && totalCompleted > 0) {
    const targetDistance = parseInt(selectedCategory);
    if (totalCompleted >= targetDistance && !showCelebration) {
      setShowCelebration(true);
    }
  }
}, [totalCompleted, selectedCategory, showCelebration]);
```

**學習心得：**
- useEffect 的依賴陣列非常重要，決定何時執行
- 記得在需要時返回清理函數（cleanup），避免記憶體洩漏
- 可以用來處理 API 請求、事件監聽、計時器等副作用

#### useRef - 保持引用不變
```tsx
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
```

**學習心得：**
- useRef 的值在組件重新渲染時保持不變
- 適合存儲 DOM 引用或不需要觸發重新渲染的值

### 2. **組件化思維**

#### 函數式組件
```tsx
interface HomePageProps {
  onNavigateToDiscipline?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDiscipline }) => {
  // 組件邏輯
  return (
    <div>...</div>
  );
};
```

**學習心得：**
- 使用 TypeScript 定義 Props 介面，提高代碼可維護性
- FC（FunctionComponent）是 React 提供的類型定義
- 可選屬性使用 `?` 標記

#### 子組件封裝（內部組件）
```tsx
const SelfDisciplinePage: React.FC<Props> = () => {
  // 登入彈窗組件
  const LoginModal = () => (
    <div className="fixed inset-0 z-[100]">...</div>
  );
  
  // 訓練計畫標籤
  const PlanTab = () => {
    // 組件內部邏輯
    return <div>...</div>;
  };
  
  return (
    <div>
      {showLoginModal && <LoginModal />}
      {activeTab === 'plan' && <PlanTab />}
    </div>
  );
};
```

**學習心得：**
- 內部組件可以訪問外部組件的狀態和函數
- 適合將大組件拆分成小的、可管理的部分
- 提高代碼可讀性和維護性

### 3. **條件渲染與列表渲染**

#### 條件渲染
```tsx
// 使用 && 運算符
{isTracking && currentTrainingDay !== null && (
  <div className="gps-tracker">GPS 追蹤中</div>
)}

// 使用三元運算符
className={`button ${
  plan.completed
    ? 'bg-green-500'
    : isTracking
    ? 'bg-slate-200'
    : 'bg-pink-500'
}`}

// 條件顯示不同組件
{view === 'home' ? (
  <HomePage />
) : (
  <SelfDisciplinePage />
)}
```

#### 列表渲染
```tsx
{dailyPlans.map((plan, index) => (
  <div key={index}>
    <h4>{plan.date}</h4>
    <p>{plan.plannedDistance} km</p>
  </div>
))}

// 使用 Object.keys 遍歷物件
{Object.keys(RUNNING_ROUTES).map(region => (
  <option key={region} value={region}>{region}</option>
))}
```

**學習心得：**
- 列表渲染必須提供 `key` 屬性，幫助 React 識別元素
- map 函數是最常用的列表渲染方法
- 可以結合條件渲染過濾數據

### 4. **事件處理**

```tsx
// 基本事件處理
const handleLogin = () => {
  setIsLoggedIn(true);
  setView('discipline');
};

// 表單提交
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // 防止頁面刷新
  onLogin();
};

// 帶參數的事件處理
const startTraining = (dayIndex: number) => {
  setCurrentTrainingDay(dayIndex);
  setIsTracking(true);
};

// 下拉選單變化
<select
  value={selectedRegion}
  onChange={(e) => {
    setSelectedRegion(e.target.value);
    setSelectedCity(''); // 重置依賴狀態
  }}
>
```

**學習心得：**
- 事件處理函數需要使用箭頭函數或 bind 綁定 this
- 可以使用內聯箭頭函數傳遞參數
- 記得在需要時調用 `preventDefault()`

### 5. **Context API - 狀態共享**

```tsx
// 創建 Context
import { createContext, useContext, useState } from 'react';

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

// Provider 組件
export const CommunityProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  
  return (
    <CommunityContext.Provider value={{ comments, setComments }}>
      {children}
    </CommunityContext.Provider>
  );
};

// 使用 Context
const { comments, setComments } = useContext(CommunityContext);
```

**學習心得：**
- Context 適合跨組件共享狀態，避免 props drilling
- 配合 TypeScript 定義型別更安全
- 不建議過度使用，簡單場景用 props 就好

### 6. **Tailwind CSS 樣式設計**

```tsx
// 基本工具類
className="flex items-center justify-center gap-4"

// 響應式設計
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// 懸停效果
className="hover:bg-pink-600 transition-all"

// 條件樣式
className={`px-4 py-2 rounded-lg ${
  isActive ? 'bg-pink-500 text-white' : 'text-slate-600'
}`}

// 漸變背景
className="bg-gradient-to-r from-pink-500 to-purple-500"

// 陰影與模糊
className="shadow-xl backdrop-blur-md"
```

**學習心得：**
- Tailwind 提供強大的工具類，快速開發 UI
- 響應式前綴（sm, md, lg, xl）很方便
- 可以使用模板字符串動態組合樣式

### 7. **第三方庫整合**

#### React-ECharts 圖表
```tsx
import ReactECharts from 'echarts-for-react';

const getLineChartOption = () => {
  return {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Day1', 'Day2'] },
    yAxis: { type: 'value' },
    series: [{
      data: [5.2, 4.8],
      type: 'line',
      smooth: true
    }]
  };
};

<ReactECharts option={getLineChartOption()} style={{ height: '300px' }} />
```

**學習心得：**
- 圖表庫需要配置 option 物件
- 注意設置容器高度
- 可以動態更新數據

### 8. **動畫效果**

```tsx
// CSS 動畫類
className="animate-in fade-in zoom-in-95 duration-300"

// 過渡效果
className="transition-all hover:scale-110"

// 自定義動畫
<style dangerouslySetInnerHTML={{
  __html: `
    @keyframes fall {
      0% { transform: translateY(0); }
      100% { transform: translateY(100vh); }
    }
    .animate-fall {
      animation: fall linear forwards;
    }
  `
}} />
```

**學習心得：**
- Tailwind 提供常用動畫類
- 複雜動畫可以寫自定義 CSS
- 使用 dangerouslySetInnerHTML 注入樣式（謹慎使用）

---

## Python 學習功能

### 1. **FastAPI 框架**

#### 基本路由設置
```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 設置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GET 路由
@app.get("/")
async def root():
    return {"message": "Welcome to Fuji Sakura API"}

# POST 路由
@app.post("/users/")
async def create_user(user: UserCreate):
    return {"id": 1, "name": user.name}
```

**學習心得：**
- FastAPI 使用 async/await 支持異步操作
- 自動生成 API 文檔（/docs）
- 內建數據驗證，使用 Pydantic 模型

### 2. **Pydantic 數據模型**

```python
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: date
    
    class Config:
        from_attributes = True  # 支持 ORM 模型轉換
```

**學習心得：**
- Pydantic 提供強大的數據驗證
- 可以定義可選字段、默認值、驗證規則
- Config 類可以配置額外行為

### 3. **SQLAlchemy ORM**

```python
from sqlalchemy import Column, Integer, String, Float, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class TrainingRecord(Base):
    __tablename__ = "training_records"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    date = Column(Date)
    distance = Column(Float)
    time = Column(Integer)
    completed = Column(Boolean, default=False)

# 創建會話
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///./fuji_sakura.db")
SessionLocal = sessionmaker(bind=engine)

# 查詢數據
def get_user_records(db: Session, user_id: int):
    return db.query(TrainingRecord).filter(
        TrainingRecord.user_id == user_id
    ).all()
```

**學習心得：**
- ORM 讓數據庫操作更直觀，不需要寫 SQL
- Column 類型對應數據庫字段類型
- 支持關聯查詢、過濾、排序等操作

### 4. **依賴注入**

```python
from fastapi import Depends
from sqlalchemy.orm import Session

# 數據庫依賴
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 在路由中使用
@app.get("/users/{user_id}/records")
async def get_records(
    user_id: int,
    db: Session = Depends(get_db)
):
    records = db.query(TrainingRecord).filter(
        TrainingRecord.user_id == user_id
    ).all()
    return records
```

**學習心得：**
- Depends 實現依賴注入，代碼更簡潔
- 自動處理資源的創建和清理
- 可以嵌套使用依賴

### 5. **異常處理**

```python
from fastapi import HTTPException, status

@app.get("/users/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
```

**學習心得：**
- HTTPException 用於返回 HTTP 錯誤
- FastAPI 會自動處理錯誤並返回 JSON 響應
- 可以自定義錯誤處理器

### 6. **類型提示**

```python
from typing import List, Optional, Dict

def calculate_average(distances: List[float]) -> float:
    return sum(distances) / len(distances) if distances else 0.0

def find_user(user_id: int) -> Optional[User]:
    # 可能返回 User 或 None
    return db.query(User).filter(User.id == user_id).first()

def get_stats() -> Dict[str, float]:
    return {
        "total_distance": 50.5,
        "average_pace": 6.15
    }
```

**學習心得：**
- 類型提示提高代碼可讀性
- IDE 可以提供更好的自動完成
- 運行時不強制檢查，但可以用 mypy 檢查

### 7. **環境變量配置**

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./fuji_sakura.db"
    secret_key: str
    algorithm: str = "HS256"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

**學習心得：**
- 使用環境變量管理配置
- 敏感信息不直接寫在代碼中
- pydantic-settings 自動讀取 .env 文件

### 8. **測試**

```python
import pytest
from fastapi.testclient import TestClient

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome"}

def test_create_user():
    response = client.post(
        "/users/",
        json={"email": "test@example.com", "name": "Test User"}
    )
    assert response.status_code == 200
    assert "id" in response.json()
```

**學習心得：**
- TestClient 讓測試 API 變得簡單
- pytest 提供清晰的測試結構
- 可以模擬數據庫和外部服務

---

## 關鍵學習收穫

### React 方面：
1. **組件化思維**：將 UI 拆分成可重用的組件
2. **狀態管理**：掌握 useState、useEffect 等 Hooks
3. **TypeScript 整合**：類型安全提高代碼質量
4. **樣式設計**：Tailwind CSS 快速開發
5. **用戶體驗**：動畫、過渡效果讓應用更流暢

### Python 方面：
1. **FastAPI 框架**：現代化的 API 開發
2. **類型系統**：Pydantic 和類型提示
3. **ORM 操作**：SQLAlchemy 簡化數據庫操作
4. **異步編程**：async/await 提高性能
5. **測試驅動**：pytest 保證代碼質量

### 最佳實踐：
- 代碼模塊化，提高可維護性
- 使用 TypeScript/類型提示增強代碼安全性
- 關注用戶體驗，添加動畫和反饋
- 編寫測試，確保功能正確
- 遵循命名規範，提高可讀性

---

## 未來學習方向

### React：
- [ ] Redux 或 Zustand 狀態管理
- [ ] React Query 數據獲取
- [ ] Next.js 服務端渲染
- [ ] 性能優化（React.memo, useMemo）

### Python：
- [ ] WebSocket 實時通信
- [ ] Celery 任務隊列
- [ ] Docker 容器化部署
- [ ] PostgreSQL 進階查詢

---

*此文檔持續更新，記錄學習的點點滴滴 🌸*
