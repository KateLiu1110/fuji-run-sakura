import { Participant, Prize, Group } from '@/types';

// 預設獎項設定
export const DEFAULT_PRIZES: Prize[] = [
  { id: 'p1', name: '五獎', amount: 2000, count: 5, remaining: 5 },
  { id: 'p2', name: '四獎', amount: 5000, count: 2, remaining: 2 },
  { id: 'p3', name: '三獎', amount: 10000, count: 1, remaining: 1 },
  { id: 'p4', name: '二獎', amount: 20000, count: 1, remaining: 1 },
  { id: 'p5', name: '頭獎', amount: 50000, count: 1, remaining: 1 },
];

// 模擬參加者數據
export const MOCK_PARTICIPANTS: Participant[] = [
  { id: '1', name: '張小明', department: '科技服務處' },
  { id: '2', name: '李大華', department: '科技服務處' },
  { id: '3', name: '王美麗', department: '人資處' },
  { id: '4', name: '陳建國', department: '行政管理部' },
  { id: '5', name: '林淑芬', department: '人資處' },
  { id: '6', name: '黃志強', department: '研發中心' },
  { id: '7', name: '吳美惠', department: '研發中心' },
  { id: '8', name: '周杰倫', department: '市場行銷部' },
  { id: '9', name: '蔡依林', department: '市場行銷部' },
  { id: '10', name: '劉德華', department: '演藝部' },
  { id: '11', name: '郭富城', department: '演藝部' },
  { id: '12', name: '黎明', department: '演藝部' },
  { id: '13', name: '張學友', department: '演藝部' },
  { id: '14', name: '孫悟空', department: '維安組' },
  { id: '15', name: '豬八戒', department: '後勤組' },
];

// 北部跑步團體群組
export const NORTHERN_GROUPS: Group[] = [
  { id: 'north-1', name: '台北市中心組', members: ['張小明', '李大華', '王美麗'] },
  { id: 'north-2', name: '新北市河濱組', members: ['陳建國', '林淑芬'] },
  { id: 'north-3', name: '基隆山海組', members: ['黃志強', '吳美惠'] },
];

// 應用設定
export const APP_CONFIG = {
  APP_NAME: '櫻色富士',
  APP_SUBTITLE: 'Atré Project',
  GOAL_DISTANCE: 60, // 完賽目標公里數
  SAKURA_POINTS_PER_KM: 10, // 每公里獲得的櫻花積分
};

// API 設定
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 10000,
};

// 官方連結與櫻花路線示例（供 SakuraRoutes 與 MtFujiGuide 使用）
export const MT_FUJI_OFFICIAL_URL = 'https://www.example.com/mt-fuji-virtual-run';

export const SAKURA_ROUTES = [
  { id: 'r1', name: '淡水天元宮步道', location: '新北市淡水區', distance: 3.8, image: 'https://images.unsplash.com/photo-1520975910100-5c5f7d1b1c1f?q=80&w=1200' },
  { id: 'r2', name: '陽明山櫻花步道', location: '台北市北投區', distance: 8.5, image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1200' },
  { id: 'r3', name: '武陵農場櫻花環線', location: '台中市和平區', distance: 5.2, image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200' },
];
