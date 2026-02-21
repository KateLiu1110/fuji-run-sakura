from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Optional
from datetime import datetime
import uvicorn

from models import (
    User, UserCreate, UserLogin, UserResponse,
    RunRecord, RunRecordCreate,
    Comment, CommentCreate,
    SakuraRoute,
    UserStats
)
from database import (
    get_user_by_email,
    create_user,
    get_runs_by_user,
    create_run,
    get_all_comments,
    create_comment,
    get_user_stats,
    verify_password
)

app = FastAPI(
    title="富士櫻花路跑 API",
    description="Fuji Sakura Run Backend API",
    version="1.0.0"
)

# CORS 設置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # 前端地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Mock data for development
mock_routes = [
    {
        "id": "1",
        "name": "武陵農場櫻花環線",
        "location": "台中市和平區",
        "distance": 5.2,
        "difficulty": "easy",
        "sakuraLevel": 5,
        "description": "紅粉佳人盛開，最美的櫻花路線",
        "bestSeason": "2-3月"
    },
    {
        "id": "2",
        "name": "淡水天元宮步道",
        "location": "新北市淡水區",
        "distance": 3.8,
        "difficulty": "easy",
        "sakuraLevel": 4,
        "description": "吉野櫻與天元宮的絕美組合",
        "bestSeason": "3-4月"
    },
    {
        "id": "3",
        "name": "陽明山櫻花步道",
        "location": "台北市北投區",
        "distance": 8.5,
        "difficulty": "medium",
        "sakuraLevel": 4,
        "description": "山櫻花與八重櫻的夢幻組合",
        "bestSeason": "2-3月"
    }
]


@app.get("/")
async def root():
    return {
        "message": "富士櫻花路跑 API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


# ========== 用戶相關 API ==========

@app.post("/api/users/register", response_model=UserResponse)
async def register(user_data: UserCreate):
    """用戶註冊"""
    existing_user = get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    user = create_user(user_data)
    return UserResponse(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        message="User registered successfully"
    )


@app.post("/api/users/login")
async def login(credentials: UserLogin):
    """用戶登入"""
    user = get_user_by_email(credentials.email)
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # 這裡應該生成 JWT token，目前簡化處理
    return {
        "token": f"mock_token_{user['id']}",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    }


@app.get("/api/users/profile")
async def get_profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """獲取用戶資料"""
    # 這裡應該驗證 token
    return {
        "id": "user_1",
        "name": "跑步愛好者",
        "email": "runner@example.com"
    }


# ========== 跑步記錄 API ==========

@app.get("/api/runs", response_model=List[RunRecord])
async def get_runs(userId: str):
    """獲取用戶的跑步記錄"""
    runs = get_runs_by_user(userId)
    return runs


@app.post("/api/runs", response_model=RunRecord)
async def add_run(
    run_data: RunRecordCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """新增跑步記錄"""
    run = create_run(run_data)
    return run


@app.delete("/api/runs/{run_id}")
async def delete_run(
    run_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """刪除跑步記錄"""
    # TODO: 實現刪除邏輯
    return {"message": "Run deleted successfully"}


# ========== 評論 API ==========

@app.get("/api/comments", response_model=List[Comment])
async def get_comments():
    """獲取所有評論"""
    comments = get_all_comments()
    return comments


@app.post("/api/comments", response_model=Comment)
async def add_comment(comment_data: CommentCreate):
    """新增評論"""
    comment = create_comment(comment_data)
    return comment


# ========== 路線 API ==========

@app.get("/api/routes", response_model=List[SakuraRoute])
async def get_routes():
    """獲取所有櫻花路線"""
    return mock_routes


@app.get("/api/routes/{route_id}", response_model=SakuraRoute)
async def get_route(route_id: str):
    """獲取特定路線詳情"""
    route = next((r for r in mock_routes if r["id"] == route_id), None)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    return route


# ========== 統計 API ==========

@app.get("/api/stats/{user_id}", response_model=UserStats)
async def get_stats(
    user_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """獲取用戶統計數據"""
    stats = get_user_stats(user_id)
    return stats


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
