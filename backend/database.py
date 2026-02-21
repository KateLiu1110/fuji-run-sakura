from typing import List, Optional, Dict
from datetime import datetime
import hashlib
import uuid

# 簡單的內存數據庫（實際應用中應使用真實數據庫如 PostgreSQL, MongoDB 等）
_users_db: Dict[str, dict] = {}
_runs_db: List[dict] = []
_comments_db: List[dict] = [
    {
        "id": "1",
        "author": "小跑",
        "content": "今天去武陵跑了 10k，櫻花真的超美！大家加油！",
        "timestamp": datetime.now(),
        "userId": None
    },
    {
        "id": "2",
        "author": "FujiMaster",
        "content": "富士山線上賽報名成功，開始自主訓練囉。",
        "timestamp": datetime.now(),
        "userId": None
    }
]


def hash_password(password: str) -> str:
    """密碼哈希處理"""
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """驗證密碼"""
    return hash_password(plain_password) == hashed_password


# ========== 用戶相關函數 ==========

def get_user_by_email(email: str) -> Optional[dict]:
    """根據 email 獲取用戶"""
    return _users_db.get(email)


def create_user(user_data) -> dict:
    """創建新用戶"""
    user_id = str(uuid.uuid4())
    user = {
        "id": user_id,
        "name": user_data.name,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "created_at": datetime.now()
    }
    _users_db[user_data.email] = user
    return user


# ========== 跑步記錄相關函數 ==========

def get_runs_by_user(user_id: str) -> List[dict]:
    """獲取用戶的所有跑步記錄"""
    return [run for run in _runs_db if run["userId"] == user_id]


def create_run(run_data) -> dict:
    """創建新的跑步記錄"""
    run = {
        "id": str(uuid.uuid4()),
        "userId": run_data.userId,
        "date": run_data.date,
        "distance": run_data.distance,
        "time": run_data.time,
        "route": run_data.route,
        "type": run_data.type,
        "location": run_data.location,
        "created_at": datetime.now()
    }
    _runs_db.append(run)
    return run


def delete_run(run_id: str) -> bool:
    """刪除跑步記錄"""
    global _runs_db
    initial_length = len(_runs_db)
    _runs_db = [run for run in _runs_db if run["id"] != run_id]
    return len(_runs_db) < initial_length


# ========== 評論相關函數 ==========

def get_all_comments() -> List[dict]:
    """獲取所有評論"""
    return _comments_db


def create_comment(comment_data) -> dict:
    """創建新評論"""
    comment = {
        "id": str(uuid.uuid4()),
        "author": comment_data.author,
        "content": comment_data.content,
        "timestamp": datetime.now(),
        "userId": comment_data.userId
    }
    _comments_db.insert(0, comment)
    return comment


# ========== 統計相關函數 ==========

def get_user_stats(user_id: str) -> dict:
    """獲取用戶統計數據"""
    user_runs = get_runs_by_user(user_id)
    
    total_km = sum(run["distance"] for run in user_runs)
    total_runs = len(user_runs)
    
    # 計算打卡天數（簡化版）
    unique_dates = set(run["date"] for run in user_runs)
    check_in_days = len(unique_dates)
    
    # 櫻花積分 = 總公里數 * 10
    sakura_points = int(total_km * 10)
    
    return {
        "userId": user_id,
        "totalKm": total_km,
        "totalRuns": total_runs,
        "checkInDays": check_in_days,
        "sakuraPoints": sakura_points,
        "badges": []
    }


# ========== 初始化一些測試數據 ==========

def init_test_data():
    """初始化測試數據"""
    # 創建測試用戶
    test_user = {
        "name": "測試跑者",
        "email": "test@runner.com",
        "password": "password123"
    }
    
    # 使用 Pydantic model 的形式
    class UserData:
        def __init__(self, name, email, password):
            self.name = name
            self.email = email
            self.password = password
    
    create_user(UserData(**test_user))
    
    # 創建測試跑步記錄
    test_runs = [
        {
            "userId": "user_1",
            "date": "2025-02-15",
            "distance": 5.2,
            "time": "32:10",
            "route": "淡水天元宮櫻花環線",
            "type": "🌸"
        },
        {
            "userId": "user_1",
            "date": "2025-02-14",
            "distance": 4.8,
            "time": "28:45",
            "route": "內湖樂活公園",
            "type": "🌸"
        }
    ]
    
    for run_data in test_runs:
        class RunData:
            def __init__(self, **kwargs):
                for key, value in kwargs.items():
                    setattr(self, key, value)
                if not hasattr(self, 'location'):
                    self.location = None
        
        create_run(RunData(**run_data))


# 初始化測試數據
init_test_data()
