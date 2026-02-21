# 富士櫻花路跑 - 後端 API

FastAPI 後端服務，提供路跑記錄、用戶管理、社群互動等 RESTful API。

## 技術棧

- **Python** 3.9+
- **FastAPI** - 現代化的 Web 框架
- **Uvicorn** - ASGI 伺服器
- **Pydantic** - 數據驗證
- **Python-Jose** - JWT 處理
- **Passlib** - 密碼加密

## 快速開始

### 1. 安裝依賴

```bash
pip install -r requirements.txt
```

### 2. 設定環境變量

```bash
cp .env.example .env
# 編輯 .env 文件，設置必要的環境變量
```

### 3. 啟動開發伺服器

```bash
python -m uvicorn main:app --reload --port 8000
```

或使用簡短命令：

```bash
uvicorn main:app --reload
```

伺服器將運行在 `http://localhost:8000`

## API 文檔

啟動伺服器後，可訪問自動生成的 API 文檔：

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 專案結構

```
backend/
├── main.py           # FastAPI 主應用程式
├── models.py         # Pydantic 數據模型
├── database.py       # 數據庫操作（目前為內存數據庫）
├── requirements.txt  # Python 依賴包
├── .env.example      # 環境變量示例
└── README.md         # 本文件
```

## API 端點概覽

### 健康檢查
- `GET /` - 根路徑
- `GET /api/health` - 健康狀態檢查

### 用戶管理
- `POST /api/users/register` - 用戶註冊
- `POST /api/users/login` - 用戶登入
- `GET /api/users/profile` - 獲取用戶資料

### 跑步記錄
- `GET /api/runs` - 獲取跑步記錄列表
- `POST /api/runs` - 新增跑步記錄
- `DELETE /api/runs/{run_id}` - 刪除跑步記錄

### 評論
- `GET /api/comments` - 獲取所有評論
- `POST /api/comments` - 新增評論

### 路線
- `GET /api/routes` - 獲取所有櫻花路線
- `GET /api/routes/{route_id}` - 獲取特定路線

### 統計
- `GET /api/stats/{user_id}` - 獲取用戶統計數據

## 開發注意事項

### 數據庫

目前使用**內存數據庫**（字典資料結構），每次重啟伺服器數據會重置。

**生產環境建議**：
- 使用 PostgreSQL
- 使用 SQLAlchemy ORM
- 實現數據持久化

### 身份驗證

目前使用簡化的 Token 機制，**生產環境需要**：
- 實現完整的 JWT Token
- 添加 Token 過期機制
- 實現 Refresh Token

### CORS 設定

目前允許的前端來源：
- `http://localhost:3000`
- `http://localhost:5173`

部署時需要修改 `main.py` 中的 CORS 設定。

## 測試

```bash
# 安裝測試依賴
pip install pytest pytest-asyncio httpx

# 運行測試
pytest
```

## 部署

### 使用 Uvicorn

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 使用 Gunicorn + Uvicorn

```bash
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker 部署

創建 `Dockerfile`：

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

建構並運行：

```bash
docker build -t fuji-sakura-api .
docker run -p 8000:8000 fuji-sakura-api
```

## 環境變量

| 變量名 | 說明 | 預設值 |
|--------|------|--------|
| `DATABASE_URL` | 資料庫連接 URL | `sqlite:///./fuji_sakura.db` |
| `SECRET_KEY` | JWT 加密密鑰 | 需設定 |
| `ALGORITHM` | JWT 加密算法 | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token 過期時間 | `30` |
| `FRONTEND_URL` | 前端 URL（CORS） | `http://localhost:3000` |

## 授權

MIT License

## 聯絡方式

如有問題，請開 Issue 或聯繫開發團隊。
