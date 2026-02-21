from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# ========== 用戶相關 Models ==========

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    message: Optional[str] = None

class User(BaseModel):
    id: str
    name: str
    email: str
    avatar: Optional[str] = None
    created_at: datetime = datetime.now()


# ========== 跑步記錄 Models ==========

class RunRecordCreate(BaseModel):
    userId: str
    date: str
    distance: float
    time: str
    route: str
    type: str  # '🌸' | '⚡' | '🏔️' | '🏃'
    location: Optional[dict] = None

class RunRecord(BaseModel):
    id: str
    userId: str
    date: str
    distance: float
    time: str
    route: str
    type: str
    location: Optional[dict] = None
    created_at: datetime = datetime.now()


# ========== 評論 Models ==========

class CommentCreate(BaseModel):
    author: str
    content: str
    userId: Optional[str] = None

class Comment(BaseModel):
    id: str
    author: str
    content: str
    timestamp: datetime
    userId: Optional[str] = None


# ========== 路線 Models ==========

class SakuraRoute(BaseModel):
    id: str
    name: str
    location: str
    distance: float
    difficulty: str  # 'easy' | 'medium' | 'hard'
    sakuraLevel: int  # 1-5
    description: str
    imageUrl: Optional[str] = None
    bestSeason: Optional[str] = None


# ========== 統計 Models ==========

class Badge(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    earnedAt: datetime

class UserStats(BaseModel):
    userId: str
    totalKm: float
    totalRuns: int
    checkInDays: int
    sakuraPoints: int
    badges: List[Badge] = []


# ========== GPS 追踪 Models ==========

class GPSCoordinate(BaseModel):
    lat: float
    lng: float
    timestamp: datetime
    altitude: Optional[float] = None

class TrackingSession(BaseModel):
    id: str
    userId: str
    startTime: datetime
    endTime: Optional[datetime] = None
    coordinates: List[GPSCoordinate]
    totalDistance: float
    status: str  # 'active' | 'paused' | 'completed'
