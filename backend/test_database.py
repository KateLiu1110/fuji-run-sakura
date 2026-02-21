import pytest
from backend.database import (
    get_user_by_email,
    create_user,
    verify_password,
    hash_password,
    get_runs_by_user,
    create_run,
    delete_run,
    get_all_comments,
    create_comment,
    get_user_stats,
    _users_db,
    _runs_db,
    _comments_db
)
from backend.models import UserCreate, RunRecordCreate, CommentCreate


@pytest.fixture(autouse=True)
def reset_database():
    """Reset database before each test"""
    _users_db.clear()
    _runs_db.clear()
    _comments_db.clear()
    yield
    _users_db.clear()
    _runs_db.clear()
    _comments_db.clear()


class TestPasswordFunctions:
    """Test password hashing and verification"""
    
    def test_hash_password(self):
        """Test password hashing produces consistent results"""
        password = "testpassword123"
        hash1 = hash_password(password)
        hash2 = hash_password(password)
        assert hash1 == hash2
        assert hash1 != password
    
    def test_verify_password_correct(self):
        """Test password verification with correct password"""
        password = "testpassword123"
        hashed = hash_password(password)
        assert verify_password(password, hashed) is True
    
    def test_verify_password_incorrect(self):
        """Test password verification with incorrect password"""
        password = "testpassword123"
        wrong_password = "wrongpassword"
        hashed = hash_password(password)
        assert verify_password(wrong_password, hashed) is False


class TestUserFunctions:
    """Test user-related database functions"""
    
    def test_create_user(self):
        """Test creating a new user"""
        user_data = UserCreate(
            name="Test User",
            email="test@example.com",
            password="password123"
        )
        user = create_user(user_data)
        
        assert user["name"] == user_data.name
        assert user["email"] == user_data.email
        assert "id" in user
        assert "hashed_password" in user
        assert user["hashed_password"] != user_data.password
    
    def test_get_user_by_email_exists(self):
        """Test getting existing user by email"""
        user_data = UserCreate(
            name="Test User",
            email="test@example.com",
            password="password123"
        )
        created_user = create_user(user_data)
        
        retrieved_user = get_user_by_email("test@example.com")
        assert retrieved_user is not None
        assert retrieved_user["id"] == created_user["id"]
        assert retrieved_user["email"] == created_user["email"]
    
    def test_get_user_by_email_not_exists(self):
        """Test getting non-existent user by email"""
        user = get_user_by_email("notexist@example.com")
        assert user is None


class TestRunFunctions:
    """Test run-related database functions"""
    
    def test_create_run(self):
        """Test creating a new run record"""
        run_data = RunRecordCreate(
            userId="user123",
            date="2024-02-20",
            distance=5.2,
            time="30:00",
            route="淡水天元宮",
            type="🌸"
        )
        run = create_run(run_data)
        
        assert run["userId"] == run_data.userId
        assert run["distance"] == run_data.distance
        assert run["route"] == run_data.route
        assert "id" in run
        assert "created_at" in run
    
    def test_get_runs_by_user(self):
        """Test getting all runs for a specific user"""
        user_id = "user123"
        
        # Create multiple runs
        for i in range(3):
            run_data = RunRecordCreate(
                userId=user_id,
                date=f"2024-02-{20+i}",
                distance=5.0 + i,
                time="30:00",
                route=f"路線 {i+1}",
                type="🌸"
            )
            create_run(run_data)
        
        # Create run for different user
        other_run = RunRecordCreate(
            userId="otheruser",
            date="2024-02-25",
            distance=3.0,
            time="20:00",
            route="其他路線",
            type="🏃"
        )
        create_run(other_run)
        
        # Get runs for user123
        runs = get_runs_by_user(user_id)
        assert len(runs) == 3
        assert all(run["userId"] == user_id for run in runs)
    
    def test_delete_run_exists(self):
        """Test deleting an existing run"""
        run_data = RunRecordCreate(
            userId="user123",
            date="2024-02-20",
            distance=5.2,
            time="30:00",
            route="淡水天元宮",
            type="🌸"
        )
        run = create_run(run_data)
        run_id = run["id"]
        
        # Delete run
        result = delete_run(run_id)
        assert result is True
        
        # Verify it's deleted
        runs = get_runs_by_user("user123")
        assert len(runs) == 0
    
    def test_delete_run_not_exists(self):
        """Test deleting a non-existent run"""
        result = delete_run("nonexistent_id")
        assert result is False


class TestCommentFunctions:
    """Test comment-related database functions"""
    
    def test_get_all_comments(self):
        """Test getting all comments"""
        comments = get_all_comments()
        assert isinstance(comments, list)
    
    def test_create_comment(self):
        """Test creating a new comment"""
        comment_data = CommentCreate(
            author="Test Author",
            content="Test content"
        )
        comment = create_comment(comment_data)
        
        assert comment["author"] == comment_data.author
        assert comment["content"] == comment_data.content
        assert "id" in comment
        assert "timestamp" in comment
    
    def test_create_comment_with_user_id(self):
        """Test creating a comment with user ID"""
        comment_data = CommentCreate(
            author="Test Author",
            content="Test content",
            userId="user123"
        )
        comment = create_comment(comment_data)
        
        assert comment["userId"] == "user123"


class TestUserStats:
    """Test user statistics functions"""
    
    def test_get_user_stats_no_runs(self):
        """Test getting stats for user with no runs"""
        stats = get_user_stats("user123")
        
        assert stats["totalDistance"] == 0
        assert stats["totalTime"] == "0:00:00"
        assert stats["totalRuns"] == 0
        assert stats["averagePace"] == "0:00"
    
    def test_get_user_stats_with_runs(self):
        """Test getting stats for user with runs"""
        user_id = "user123"
        
        # Create multiple runs
        runs = [
            RunRecordCreate(
                userId=user_id,
                date="2024-02-20",
                distance=5.0,
                time="30:00",
                route="路線1",
                type="🌸"
            ),
            RunRecordCreate(
                userId=user_id,
                date="2024-02-21",
                distance=10.0,
                time="1:00:00",
                route="路線2",
                type="🏃"
            )
        ]
        
        for run_data in runs:
            create_run(run_data)
        
        stats = get_user_stats(user_id)
        
        assert stats["totalDistance"] == 15.0
        assert stats["totalRuns"] == 2
        assert stats["totalTime"] != "0:00:00"
        assert stats["averagePace"] != "0:00"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
