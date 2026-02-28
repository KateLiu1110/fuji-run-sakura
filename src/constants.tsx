
import { Region, SakuraRoute, TrainingGroup } from './types/index';

export const SAKURA_ROUTES: SakuraRoute[] = [
  {
    id: '1',
    name: '武陵農場櫻花隧道',
    region: Region.NORTH,
    distance: 12.5,
    location: '台中市和平區',
    description: '全台最負盛名的櫻花勝地，粉紅佳人夾道歡迎，彷彿置身日本。',
    applyRequired: true,
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: '陽明山平菁街 42 巷',
    region: Region.NORTH,
    distance: 3.2,
    location: '台北市士林區',
    description: '台北最早綻放的櫻花熱點，坡度適中，適合晨跑訓練。',
    applyRequired: false,
    image: 'https://images.unsplash.com/photo-1576481073801-443b79f64a4d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: '淡水河濱櫻花步道',
    region: Region.NORTH,
    distance: 8.0,
    location: '新北市淡水區',
    description: '沿著淡水河畔奔跑，伴隨夕陽與櫻花，享受最浪漫的訓練時光。',
    applyRequired: false,
    image: 'https://images.unsplash.com/photo-1549413619-f5295f700466?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: '阿里山櫻花鐵道',
    region: Region.SOUTH,
    distance: 5.5,
    location: '嘉義縣阿里山鄉',
    description: '在高海拔的山林中穿梭，與森林小火車一同追逐櫻花。',
    applyRequired: true,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800'
  }
];

export const RUNNING_BENEFITS = [
  {
    title: '身體健康',
    desc: '減壓、心肺強化，提升基礎代謝。',
    icon: '❤️',
    detail: '持續的有氧運動能有效降低壓力荷爾蒙，強化心血管功能。'
  },
  {
    title: '腦袋清晰',
    desc: '跑步時思考對策，建立自律思維。',
    icon: '🧠',
    detail: '在奔跑中進入「心流」狀態，幫助釐清思緒，激發創意。'
  },
  {
    title: '自律生活',
    desc: '規律訓練，打造堅韌意志力。',
    icon: '✨',
    detail: '克服懶惰，每天進步一點點，讓自律成為一種生活美學。'
  }
];

export const NORTHERN_GROUPS: TrainingGroup[] = [
  {
    id: 'g1',
    name: '台北 | 大安森林跑團',
    location: '大安森林公園',
    tag: 'SOCIAL',
    description: '最成熟的練團聚點，適合平日晚間社交跑，感受都市慢生活。',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g2',
    name: '新北 | 碧潭水岸 LSD',
    location: '新店碧潭',
    tag: 'LONG RUN',
    description: '河岸清風徐徐，是練習長距離（LSD）的最佳去處。',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g3',
    name: '基隆 | 海風坡道小組',
    location: '潮境公園',
    tag: 'HILL',
    description: '具備上下坡變化的海濱路線，強化富士山賽事所需的肌力。',
    image: 'https://images.unsplash.com/photo-1558223607-ec4910243164?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g4',
    name: '桃園 | 虎頭山越野團',
    location: '虎頭山公園',
    tag: 'TRAIL',
    description: '進階越野練團點，模擬富士山多變的地形與高度挑戰。',
    image: 'https://images.unsplash.com/photo-1616039534947-920f04758d4a?auto=format&fit=crop&q=80&w=800'
  }
];

export const MT_FUJI_OFFICIAL_URL = 'https://mtfujimarathon.com/virtual-run-winter-en/';
export const TAIWAN_SAKURA_INFO_URL = 'https://vivianexplore.tw/taiwan-cherry-blossoms/';
