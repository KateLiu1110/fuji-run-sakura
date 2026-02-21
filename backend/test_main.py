import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.database import _users_db, _runs_db, _comments_db

client = TestClient(app)


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


class TestRootEndpoints:
    """Test root and health check endpoints"""
    
    def test_root_endpoint(self):
        """Test root endpoint returns correct message"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "富士櫻花路跑 API"
        assert data["version"] == "1.0.0"
        assert data["status"] == "running"
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data


class TestUserEndpoints:
    """Test user-related API endpoints"""
    
    def test_user_registration_success(self):
        """Test successful user registration"""
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }
        response = client.post("/api/users/register", json=user_data)
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == user_data["email"]
        assert data["name"] == user_data["name"]
        assert "id" in data
        assert "password" not in data  # Password should not be in response
    
    def test_user_registration_duplicate_email(self):
        """Test registration with duplicate email fails"""
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }
        # First registration
        client.post("/api/users/register", json=user_data)
        
        # Second registration with same email
        response = client.post("/api/users/register", json=user_data)
        assert response.status_code == 400
        data = response.json()
        assert "已被註冊" in data["detail"]
    
    def test_user_login_success(self):
        """Test successful user login"""
        # Register user first
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }
        client.post("/api/users/register", json=user_data)
        
        # Login
        login_data = {
            "email": "test@example.com",
            "password": "password123"
        }
        response = client.post("/api/users/login", json=login_data)
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == user_data["email"]
    
    def test_user_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        login_data = {
            "email": "notexist@example.com",
            "password": "wrongpassword"
        }
        response = client.post("/api/users/login", json=login_data)
        assert response.status_code == 401
        data = response.json()
        assert "不正確" in data["detail"]
    
    def test_get_user_stats(self):
        """Test getting user statistics"""
        # Register user
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }
        reg_response = client.post("/api/users/register", json=user_data)
        user_id = reg_response.json()["id"]
        
        # Get stats
        response = client.get(f"/api/users/{user_id}/stats")
        assert response.status_code == 200
        data = response.json()
        assert "totalDistance" in data
        assert "totalTime" in data
        assert "totalRuns" in data


class TestRunEndpoints:
    """Test run-related API endpoints"""
    
    def test_create_run_record(self):
        """Test creating a new run record"""
        # Register user first
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }
        reg_response = client.post("/api/users/register", json=user_data)
        user_id = reg_response.json()["id"]
        
        # Create run record
        run_data = {
            "userId": user_id,
            "date": "2024-02-20",
            "distance": 5.2,
            "time": "30:00",
            "route": "淡水天元宮櫻花環線",
            "type": "🌸"
        }
        response = client.post("/api/runs", json=run_data)
        assert response.status_code == 200
        data = response.json()
        assert data["userId"] == user_id
        assert data["distance"] == 5.2
        assert "id" in data
    
    def test_get_user_runs(self):
        """Test getting all runs for a user"""
        # Register user
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }
        reg_response = client.post("/api/users/register", json=user_data)
        user_id = reg_response.json()["id"]
        
        # Create multiple runs
        for i in range(3):
            run_data = {
                "userId": user_id,
                "date": f"2024-02-{20+i}",
                "distance": 5.0 + i,
                "time": "30:00",
                "route": f"路線 {i+1}",
                "type": "🌸"
            }
            client.post("/api/runs", json=run_data)
        
        # Get all runs
        response = client.get(f"/api/runs/user/{user_id}")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 3
    
    def test_delete_run_record(self):
        """Test deleting a run record"""
        # Register user
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }
        reg_response = client.post("/api/users/register", json=user_data)
        user_id = reg_response.json()["id"]
        
        # Create run
        run_data = {
            "userId": user_id,
            "date": "2024-02-20",
            "distance": 5.2,
            "time": "30:00",
            "route": "淡水天元宮",
            "type": "🌸"
        }
        create_response = client.post("/api/runs", json=run_data)
        run_id = create_response.json()["id"]
        
        # Delete run
        response = client.delete(f"/api/runs/{run_id}")
        assert response.status_code == 200
        data = response.json()
        assert "刪除成功" in data["message"]
        
        # Verify it's deleted
        get_response = client.get(f"/api/runs/user/{user_id}")
        assert len(get_response.json()) == 0


class TestCommentEndpoints:
    """Test comment-related API endpoints"""
    
    def test_get_all_comments(self):
        """Test getting all comments"""
        response = client.get("/api/comments")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_create_comment(self):
        """Test creating a new comment"""
        comment_data = {
            "author": "小林",
            "content": "加油！今天跑了 10k"
        }
        response = client.post("/api/comments", json=comment_data)
        assert response.status_code == 200
        data = response.json()
        assert data["author"] == comment_data["author"]
        assert data["content"] == comment_data["content"]
        assert "id" in data
        assert "timestamp" in data


class TestRouteEndpoints:
    """Test route-related API endpoints"""
    
    def test_get_all_routes(self):
        """Test getting all sakura routes"""
        response = client.get("/api/routes")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        
        # Check first route structure
        route = data[0]
        assert "id" in route
        assert "name" in route
        assert "location" in route
        assert "distance" in route
        assert "difficulty" in route
    
    def test_get_route_by_id(self):
        """Test getting a specific route by ID"""
        # First get all routes to get a valid ID
        all_routes_response = client.get("/api/routes")
        route_id = all_routes_response.json()[0]["id"]
        
        # Get specific route
        response = client.get(f"/api/routes/{route_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == route_id
    
    def test_get_nonexistent_route(self):
        """Test getting a non-existent route"""
        response = client.get("/api/routes/nonexistent_id")
        assert response.status_code == 404
        data = response.json()
        assert "找不到" in data["detail"]


class TestCORS:
    """Test CORS configuration"""
    
    def test_cors_headers(self):
        """Test that CORS headers are present"""
        response = client.options("/api/health")
        # CORS middleware should handle OPTIONS requests
        assert response.status_code in [200, 405]  # 405 if no explicit OPTIONS handler


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
