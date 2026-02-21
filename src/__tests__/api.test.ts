import { api, userApi, runApi, commentApi, routeApi, healthApi } from '../services/api';

// Mock fetch
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('userApi', () => {
    it('registers a new user successfully', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const response = await userApi.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.data).toEqual(mockUser);
      expect(response.error).toBeUndefined();
    });

    it('handles registration error', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ detail: '用戶已存在' }),
      });

      const response = await userApi.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.data).toBeUndefined();
      expect(response.error).toBe('用戶已存在');
    });

    it('logs in a user successfully', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const response = await userApi.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.data).toEqual(mockUser);
    });

    it('gets user stats successfully', async () => {
      const mockStats = {
        totalDistance: 100.5,
        totalTime: '10:30:00',
        totalRuns: 15,
        averagePace: '6:30',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      });

      const response = await userApi.getStats('user123');

      expect(response.data).toEqual(mockStats);
    });
  });

  describe('runApi', () => {
    it('gets user runs successfully', async () => {
      const mockRuns = [
        {
          id: '1',
          userId: 'user123',
          date: '2024-02-20',
          distance: 5.2,
          time: '30:00',
          route: '淡水天元宮',
          type: '🌸' as const,
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRuns,
      });

      const response = await runApi.getUserRuns('user123');

      expect(response.data).toEqual(mockRuns);
    });

    it('creates a new run record', async () => {
      const newRun = {
        userId: 'user123',
        date: '2024-02-20',
        distance: 5.2,
        time: '30:00',
        route: '淡水天元宮',
        type: '🌸' as const,
      };

      const mockResponse = { ...newRun, id: 'run123' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await runApi.create(newRun);

      expect(response.data).toEqual(mockResponse);
    });

    it('deletes a run record', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: '刪除成功' }),
      });

      const response = await runApi.delete('run123');

      expect(response.data?.message).toBe('刪除成功');
    });
  });

  describe('commentApi', () => {
    it('gets all comments', async () => {
      const mockComments = [
        {
          id: '1',
          author: '小林',
          content: '加油！',
          timestamp: '2024-02-20T10:00:00Z',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockComments,
      });

      const response = await commentApi.getAll();

      expect(response.data).toEqual(mockComments);
    });

    it('creates a new comment', async () => {
      const newComment = {
        author: '小林',
        content: '加油！',
      };

      const mockResponse = {
        ...newComment,
        id: 'comment123',
        timestamp: '2024-02-20T10:00:00Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await commentApi.create(newComment);

      expect(response.data).toEqual(mockResponse);
    });
  });

  describe('routeApi', () => {
    it('gets all routes', async () => {
      const mockRoutes = [
        {
          id: '1',
          name: '武陵農場櫻花環線',
          location: '台中市和平區',
          distance: 5.2,
          difficulty: 'easy' as const,
          sakuraLevel: 5,
          description: '紅粉佳人盛開',
          bestSeason: '2-3月',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRoutes,
      });

      const response = await routeApi.getAll();

      expect(response.data).toEqual(mockRoutes);
    });

    it('gets route by id', async () => {
      const mockRoute = {
        id: '1',
        name: '武陵農場櫻花環線',
        location: '台中市和平區',
        distance: 5.2,
        difficulty: 'easy' as const,
        sakuraLevel: 5,
        description: '紅粉佳人盛開',
        bestSeason: '2-3月',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRoute,
      });

      const response = await routeApi.getById('1');

      expect(response.data).toEqual(mockRoute);
    });
  });

  describe('healthApi', () => {
    it('checks health status', async () => {
      const mockHealth = {
        status: 'healthy',
        timestamp: '2024-02-20T10:00:00Z',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockHealth,
      });

      const response = await healthApi.check();

      expect(response.data).toEqual(mockHealth);
    });
  });

  describe('Error handling', () => {
    it('handles network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const response = await userApi.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.error).toBe('網絡連接失敗，請檢查後端服務是否運行');
    });
  });
});
