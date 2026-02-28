const API_BASE_URL = 'http://localhost:8000/api';

// API响应类型
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// 用户相关类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserCredentials {
  name: string;
}

// 跑步记录类型
export interface RunRecord {
  id: string;
  userId: string;
  date: string;
  distance: number;
  time: string;
  route: string;
  type: '🌸' | '⚡' | '🏔️' | '🏃';
  location?: {
    lat: number;
    lng: number;
  };
}

export interface RunRecordCreate {
  userId: string;
  date: string;
  distance: number;
  time: string;
  route: string;
  type: '🌸' | '⚡' | '🏔️' | '🏃';
  location?: {
    lat: number;
    lng: number;
  };
}

// 评论类型
export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  userId?: string;
}

export interface CommentCreate {
  author: string;
  content: string;
  userId?: string;
}

// 路线类型
export interface SakuraRoute {
  id: string;
  name: string;
  location: string;
  distance: number;
  difficulty: 'easy' | 'medium' | 'hard';
  sakuraLevel: number;
  description: string;
  bestSeason: string;
}

// 简化的路线类型（用于首页显示）
export interface SimpleRoute {
  name: string;
  dist: string;
  elevation: string;
  type: string;
  color: string;
}

// 注册步骤类型
export interface RegistrationStep {
  id?: string;
  step?: number;
  title: string;
  desc: string;
}

// 用户统计类型
export interface UserStats {
  totalDistance: number;
  totalTime: string;
  totalRuns: number;
  averagePace: string;
}

/**
 * 通用請求處理函數
 */
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.detail || '請求失敗' };
    }

    return { data };
  } catch (error) {
    // 静默处理连接失败，让组件使用默认数据
    return { error: '網絡連接失敗，請檢查後端服務是否運行' };
  }
}

/**
 * 用戶 API
 */
export const userApi = {
  /**
   * 用戶註冊
   */
  register: async (userData: UserRegisterData): Promise<ApiResponse<User>> => {
    return fetchApi<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * 用戶登入
   */
  login: async (credentials: UserCredentials): Promise<ApiResponse<User>> => {
    return fetchApi<User>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * 獲取用戶統計數據
   */
  getStats: async (userId: string): Promise<ApiResponse<UserStats>> => {
    return fetchApi<UserStats>(`/users/${userId}/stats`);
  },
};

/**
 * 跑步記錄 API
 */
export const runApi = {
  /**
   * 獲取用戶的所有跑步記錄
   */
  getUserRuns: async (userId: string): Promise<ApiResponse<RunRecord[]>> => {
    return fetchApi<RunRecord[]>(`/runs/user/${userId}`);
  },

  /**
   * 創建新的跑步記錄
   */
  create: async (runData: RunRecordCreate): Promise<ApiResponse<RunRecord>> => {
    return fetchApi<RunRecord>('/runs', {
      method: 'POST',
      body: JSON.stringify(runData),
    });
  },

  /**
   * 刪除跑步記錄
   */
  delete: async (runId: string): Promise<ApiResponse<{ message: string }>> => {
    return fetchApi<{ message: string }>(`/runs/${runId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * 評論 API
 */
export const commentApi = {
  /**
   * 獲取所有評論
   */
  getAll: async (): Promise<ApiResponse<Comment[]>> => {
    return fetchApi<Comment[]>('/comments');
  },

  /**
   * 創建新評論
   */
  create: async (commentData: CommentCreate): Promise<ApiResponse<Comment>> => {
    return fetchApi<Comment>('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  },
};

/**
 * 路線 API
 */
export const routeApi = {
  /**
   * 獲取所有櫻花路線（簡化格式）
   */
  getAll: async (): Promise<ApiResponse<SimpleRoute[]>> => {
    return fetchApi<SimpleRoute[]>('/routes');
  },

  /**
   * 獲取所有櫻花路線（完整格式）
   */
  getAllFull: async (): Promise<ApiResponse<SakuraRoute[]>> => {
    return fetchApi<SakuraRoute[]>('/routes/full');
  },

  /**
   * 根據 ID 獲取路線詳情
   */
  getById: async (routeId: string): Promise<ApiResponse<SakuraRoute>> => {
    return fetchApi<SakuraRoute>(`/routes/${routeId}`);
  },
};

/**
 * 報名流程 API
 */
export const registrationApi = {
  /**
   * 獲取報名流程步驟
   */
  getSteps: async (): Promise<ApiResponse<RegistrationStep[]>> => {
    return fetchApi<RegistrationStep[]>('/registration-steps');
  },
};

/**
 * 健康檢查 API
 */
export const healthApi = {
  check: async (): Promise<ApiResponse<{ status: string; timestamp: string }>> => {
    return fetchApi<{ status: string; timestamp: string }>('/health');
  },
};

// 導出所有 API
export const api = {
  user: userApi,
  run: runApi,
  comment: commentApi,
  route: routeApi,
  registration: registrationApi,
  health: healthApi,
};

export default api;
