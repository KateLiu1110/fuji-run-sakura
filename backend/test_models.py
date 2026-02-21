import pytest
from pydantic import ValidationError
from backend.models import (
    UserCreate,
    UserLogin,
    UserResponse,
    User,
    RunRecordCreate,
    RunRecord,
    CommentCreate,
    Comment,
    SakuraRoute,
    UserStats
)
from datetime import datetime


class TestUserModels:
    """Test user-related Pydantic models"""
    
    def test_user_create_valid(self):
        """Test creating valid UserCreate model"""
        user = UserCreate(
            name="Test User",
            email="test@example.com",
            password="password123"
        )
        assert user.name == "Test User"
        assert user.email == "test@example.com"
        assert user.password == "password123"
    
    def test_user_create_invalid_email(self):
        """Test UserCreate with invalid email"""
        with pytest.raises(ValidationError):
            UserCreate(
                name="Test User",
                email="invalid-email",
                password="password123"
            )
    
    def test_user_login_valid(self):
        """Test creating valid UserLogin model"""
        login = UserLogin(
            email="test@example.com",
            password="password123"
        )
        assert login.email == "test@example.com"
        assert login.password == "password123"
    
    def test_user_response(self):
        """Test UserResponse model"""
        response = UserResponse(
            id="123",
            name="Test User",
            email="test@example.com",
            message="Success"
        )
        assert response.id == "123"
        assert response.message == "Success"
    
    def test_user_model(self):
        """Test User model"""
        user = User(
            id="123",
            name="Test User",
            email="test@example.com",
            avatar="https://example.com/avatar.jpg"
        )
        assert user.id == "123"
        assert isinstance(user.created_at, datetime)


class TestRunModels:
    """Test run-related Pydantic models"""
    
    def test_run_record_create_valid(self):
        """Test creating valid RunRecordCreate model"""
        run = RunRecordCreate(
            userId="user123",
            date="2024-02-20",
            distance=5.2,
            time="30:00",
            route="淡水天元宮",
            type="🌸"
        )
        assert run.userId == "user123"
        assert run.distance == 5.2
        assert run.type == "🌸"
    
    def test_run_record_create_with_location(self):
        """Test RunRecordCreate with location"""
        run = RunRecordCreate(
            userId="user123",
            date="2024-02-20",
            distance=5.2,
            time="30:00",
            route="淡水天元宮",
            type="🌸",
            location={"lat": 25.033, "lng": 121.565}
        )
        assert run.location is not None
        assert run.location["lat"] == 25.033
    
    def test_run_record_model(self):
        """Test RunRecord model"""
        run = RunRecord(
            id="run123",
            userId="user123",
            date="2024-02-20",
            distance=5.2,
            time="30:00",
            route="淡水天元宮",
            type="🌸"
        )
        assert run.id == "run123"
        assert isinstance(run.created_at, datetime)
    
    def test_run_record_valid_types(self):
        """Test RunRecord with different valid types"""
        valid_types = ['🌸', '⚡', '🏔️', '🏃']
        for run_type in valid_types:
            run = RunRecordCreate(
                userId="user123",
                date="2024-02-20",
                distance=5.2,
                time="30:00",
                route="測試路線",
                type=run_type
            )
            assert run.type == run_type


class TestCommentModels:
    """Test comment-related Pydantic models"""
    
    def test_comment_create_valid(self):
        """Test creating valid CommentCreate model"""
        comment = CommentCreate(
            author="Test Author",
            content="Test content"
        )
        assert comment.author == "Test Author"
        assert comment.content == "Test content"
    
    def test_comment_create_with_user_id(self):
        """Test CommentCreate with userId"""
        comment = CommentCreate(
            author="Test Author",
            content="Test content",
            userId="user123"
        )
        assert comment.userId == "user123"
    
    def test_comment_model(self):
        """Test Comment model"""
        comment = Comment(
            id="comment123",
            author="Test Author",
            content="Test content",
            timestamp=datetime.now()
        )
        assert comment.id == "comment123"
        assert isinstance(comment.timestamp, datetime)


class TestSakuraRouteModel:
    """Test SakuraRoute Pydantic model"""
    
    def test_sakura_route_valid(self):
        """Test creating valid SakuraRoute model"""
        route = SakuraRoute(
            id="1",
            name="武陵農場櫻花環線",
            location="台中市和平區",
            distance=5.2,
            difficulty="easy",
            sakuraLevel=5,
            description="紅粉佳人盛開",
            bestSeason="2-3月"
        )
        assert route.name == "武陵農場櫻花環線"
        assert route.difficulty == "easy"
        assert route.sakuraLevel == 5
    
    def test_sakura_route_difficulty_levels(self):
        """Test SakuraRoute with different difficulty levels"""
        difficulties = ["easy", "medium", "hard"]
        for difficulty in difficulties:
            route = SakuraRoute(
                id="1",
                name="測試路線",
                location="測試地點",
                distance=5.0,
                difficulty=difficulty,
                sakuraLevel=3,
                description="測試描述",
                bestSeason="全年"
            )
            assert route.difficulty == difficulty


class TestUserStatsModel:
    """Test UserStats Pydantic model"""
    
    def test_user_stats_valid(self):
        """Test creating valid UserStats model"""
        stats = UserStats(
            totalDistance=100.5,
            totalTime="10:30:00",
            totalRuns=15,
            averagePace="6:30"
        )
        assert stats.totalDistance == 100.5
        assert stats.totalTime == "10:30:00"
        assert stats.totalRuns == 15
        assert stats.averagePace == "6:30"
    
    def test_user_stats_zero_values(self):
        """Test UserStats with zero values"""
        stats = UserStats(
            totalDistance=0,
            totalTime="0:00:00",
            totalRuns=0,
            averagePace="0:00"
        )
        assert stats.totalDistance == 0
        assert stats.totalRuns == 0


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
