// 用户相关类型
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

// 区域枚举
export enum Region {
  NORTH = '北部',
  CENTRAL = '中部',
  SOUTH = '南部'
}

// 评论相关类型
export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  userId?: string;
}

// 抽奖相关类型
export interface Participant {
  id: string;
  name: string;
  department: string;
}

export interface Prize {
  id: string;
  name: string;
  amount: number;
  count: number;
  remaining: number;
}

export interface WinnerRecord {
  id: string;
  participantId: string;
  participantName: string;
  department: string;
  prizeId: string;
  prizeName: string;
  amount: number;
  timestamp: Date;
}

// 路跑相关类型
export interface RunRecord {
  id: string;
  userId: string;
  date: string;
  distance: number; // km
  time: string; // HH:MM:SS
  route: string;
  type: '🌸' | '⚡' | '🏔️' | '🏃';
  location?: {
    lat: number;
    lng: number;
  };
}

export interface SakuraRoute {
  id: string;
  name: string;
  location: string;
  distance: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  sakuraLevel?: number; // 1-5
  description: string;
  imageUrl?: string;
  image?: string;
  bestSeason?: string;
  region?: Region;
  applyRequired?: boolean;
}

// 训练团体类型
export interface TrainingGroup {
  id: string;
  name: string;
  location: string;
  tag: string;
  description: string;
  image: string;
}

// GPS 追踪相关类型
export interface GPSCoordinate {
  lat: number;
  lng: number;
  timestamp: Date;
  altitude?: number;
}

export interface TrackingSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  coordinates: GPSCoordinate[];
  totalDistance: number;
  status: 'active' | 'paused' | 'completed';
}

// 用户统计数据
export interface UserStats {
  userId: string;
  totalKm: number;
  totalRuns: number;
  checkInDays: number;
  sakuraPoints: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

// 社群相关类型
export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  timestamp: Date;
  tags?: string[];
}

// Tab 类型
export type TabType = 'home' | 'dashboard';

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 分组类型
export interface Group {
  id: string;
  name: string;
  members: string[];
  // optional metadata used by UI
  tag?: string;
  image?: string;
  location?: string;
  description?: string;
}
