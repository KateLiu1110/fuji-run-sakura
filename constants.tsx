import { Participant, Prize } from './types';

export const DEFAULT_PRIZES: Prize[] = [
  { id: 'p1', name: '五獎', amount: 2000, count: 5, remaining: 5 },
  { id: 'p2', name: '四獎', amount: 5000, count: 2, remaining: 2 },
  { id: 'p3', name: '三獎', amount: 10000, count: 1, remaining: 1 },
  { id: 'p4', name: '二獎', amount: 20000, count: 1, remaining: 1 },
  { id: 'p5', name: '頭獎', amount: 50000, count: 1, remaining: 1 },
];

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