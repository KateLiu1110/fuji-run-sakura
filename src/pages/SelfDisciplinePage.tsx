import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import Celebration from '../components/Celebration';
import {
  User,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Award,
  ChevronRight,
  LogOut,
  BarChart3,
  Home,
  CheckCircle2,
  Loader2,
  TrendingUp,
  Play,
  Activity,
  CheckCircle,
  Circle,
  Map,
  Navigation,
  Target,
  Calendar,
  Trophy,
  AlertCircle
} from 'lucide-react';

interface SelfDisciplinePageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

// 比賽組別
type RaceCategory = '50km' | '25km' | '10km' | null;

// 比賽日期
const RACE_START_DATE = new Date('2026-03-07T00:00:00');
const RACE_END_DATE = new Date('2026-03-16T23:59:59');
const RACE_DAYS = 10; // 3/7-3/16 共10天

// 跑步路線資料（按地區分類）
const RUNNING_ROUTES = {
  '北部': {
    '台北市': [
      { id: '1', name: '松山河堤', distance: 5.2, image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400' },
      { id: '2', name: '大安森林公園', distance: 3.8, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
      { id: '3', name: '信義區都會路跑', distance: 6.5, image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400' }
    ],
    '新北市': [
      { id: '4', name: '淡水河濱步道', distance: 10.5, image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400' },
      { id: '5', name: '新店溪自行車道', distance: 8.0, image: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=400' },
      { id: '6', name: '碧潭風景區', distance: 4.5, image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400' }
    ]
  },
  '中部': {
    '台中市': [
      { id: '7', name: '台中都會公園', distance: 7.2, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400' },
      { id: '8', name: '東豐自行車綠廊', distance: 12.0, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400' },
      { id: '9', name: '秋紅谷景觀生態公園', distance: 2.8, image: 'https://images.unsplash.com/photo-1487139975590-b4f1dce9b035?w=400' }
    ],
    '彰化縣': [
      { id: '10', name: '八卦山大佛步道', distance: 5.5, image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' }
    ]
  },
  '南部': {
    '台南市': [
      { id: '11', name: '安平運河步道', distance: 6.0, image: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=400' }
    ],
    '高雄市': [
      { id: '12', name: '愛河河畔', distance: 4.8, image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400' }
    ]
  }
};

// 每日計畫介面
interface DailyPlan {
  day: number;
  date: string;
  plannedDistance: number;
  completed: boolean;
  actualDistance: number;
  recommendedLocation: string;
}

const SelfDisciplinePage: React.FC<SelfDisciplinePageProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  // 狀態管理
  const [showLoginModal, setShowLoginModal] = useState(!isLoggedIn);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showRouteDisplayModal, setShowRouteDisplayModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState<'plan' | 'tracking' | 'analytics'>('plan');
  
  // 報名資訊
  const [selectedCategory, setSelectedCategory] = useState<RaceCategory>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  
  // 計畫與進度
  const [dailyPlans, setDailyPlans] = useState<DailyPlan[]>([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [currentTrainingDay, setCurrentTrainingDay] = useState<number | null>(null);
  
  // GPS 追蹤
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  
  // 訓練歷程
  const [runHistory, setRunHistory] = useState<any[]>([]);
  
  // 檢查是否完成目標
  useEffect(() => {
    if (selectedCategory && totalCompleted > 0) {
      const targetDistance = parseInt(selectedCategory);
      if (totalCompleted >= targetDistance && !showCelebration) {
        setShowCelebration(true);
      }
    }
  }, [totalCompleted, selectedCategory, showCelebration]);
  
  // GPS 追蹤計時器
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);
  
  // 登入後顯示報名確認彈窗
  useEffect(() => {
    if (isLoggedIn && !showLoginModal && !selectedCategory) {
      setShowRegistrationModal(true);
    }
  }, [isLoggedIn, showLoginModal, selectedCategory]);
  
  // 生成每日計畫
  const generateDailyPlans = (category: RaceCategory) => {
    if (!category) return;
    
    const totalKm = parseInt(category);
    const avgDaily = totalKm / RACE_DAYS;
    
    const plans: DailyPlan[] = [];
    for (let i = 0; i < RACE_DAYS; i++) {
      const date = new Date(RACE_START_DATE);
      date.setDate(date.getDate() + i);
      
      plans.push({
        day: i + 1,
        date: date.toISOString().split('T')[0],
        plannedDistance: parseFloat(avgDaily.toFixed(1)),
        completed: false,
        actualDistance: 0,
        recommendedLocation: getRandomLocation()
      });
    }
    
    setDailyPlans(plans);
  };
  
  // 隨機推薦地點
  const getRandomLocation = () => {
    const allRoutes = Object.values(RUNNING_ROUTES)
      .flatMap(region => Object.values(region).flat());
    return allRoutes[Math.floor(Math.random() * allRoutes.length)].name;
  };
  
  // 處理登入
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  
  // 確認報名組別
  const handleCategorySelect = (category: RaceCategory) => {
    setSelectedCategory(category);
    generateDailyPlans(category);
    setShowRegistrationModal(false);
    setShowRegionModal(true);
  };
  
  // 確認居住地區
  const handleRegionSelect = () => {
    if (selectedRegion && selectedCity) {
      setShowRegionModal(false);
      setShowRouteDisplayModal(true);
    }
  };
  
  // 確認練跑地點並開始
  const handleStartTraining = () => {
    setShowRouteDisplayModal(false);
  };
  
  // 開始訓練（開啟GPS）
  const startTraining = (dayIndex: number) => {
    setCurrentTrainingDay(dayIndex);
    setIsTracking(true);
    setTrackingTime(0);
  };
  
  // 停止訓練
  const stopTraining = () => {
    if (currentTrainingDay === null) return;
    
    setIsTracking(false);
    
    // 計算距離（模擬：每分鐘約0.17公里，配速約6分/公里）
    const distance = parseFloat((trackingTime / 360).toFixed(1));
    
    // 更新計畫完成狀態
    const updatedPlans = [...dailyPlans];
    updatedPlans[currentTrainingDay].completed = true;
    updatedPlans[currentTrainingDay].actualDistance = distance;
    setDailyPlans(updatedPlans);
    
    // 更新總完成里程
    setTotalCompleted(prev => prev + distance);
    
    // 添加到訓練歷程
    const newRun = {
      id: runHistory.length + 1,
      date: dailyPlans[currentTrainingDay].date,
      route: dailyPlans[currentTrainingDay].recommendedLocation,
      distance: distance,
      time: `${Math.floor(trackingTime / 60)}:${(trackingTime % 60).toString().padStart(2, '0')}`,
      pace: '6:15'
    };
    setRunHistory(prev => [newRun, ...prev]);
    
    setCurrentTrainingDay(null);
    setTrackingTime(0);
  };
  
  // 計算剩餘公里數
  const getRemainingDistance = () => {
    if (!selectedCategory) return 0;
    return parseInt(selectedCategory) - totalCompleted;
  };
  
  // 計算剩餘天數
  const getRemainingDays = () => {
    const today = new Date();
    const diff = RACE_END_DATE.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  
  // ECharts 配置 - 每日跑步折線圖
  const getLineChartOption = () => {
    const completedPlans = dailyPlans.filter(p => p.completed);
    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#ec4899',
        borderWidth: 1,
        textStyle: { color: '#1e293b' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: completedPlans.map(p => `D${p.day}`),
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        name: '公里 (km)',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        axisLabel: { color: '#64748b' }
      },
      series: [{
        data: completedPlans.map(p => p.actualDistance),
        type: 'line',
        smooth: true,
        itemStyle: { color: '#ec4899' },
        lineStyle: { width: 3 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(236, 72, 153, 0.3)' },
              { offset: 1, color: 'rgba(236, 72, 153, 0.05)' }
            ]
          }
        }
      }]
    };
  };
  
  // ECharts 配置 - 計畫 vs 實際
  const getBarChartOption = () => {
    const completedPlans = dailyPlans.filter(p => p.completed);
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['計畫距離', '實際距離'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: completedPlans.map(p => `第${p.day}天`),
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b', rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: '公里 (km)',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        axisLabel: { color: '#64748b' }
      },
      series: [
        {
          name: '計畫距離',
          data: completedPlans.map(p => p.plannedDistance),
          type: 'bar',
          itemStyle: { color: '#94a3b8' }
        },
        {
          name: '實際距離',
          data: completedPlans.map(p => p.actualDistance),
          type: 'bar',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#ec4899' },
                { offset: 1, color: '#f472b6' }
              ]
            }
          }
        }
      ]
    };
  };

  // 登入彈窗
  const LoginModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500">
          <User size={40} />
        </div>
        <h3 className="text-2xl font-black text-center text-slate-800 mb-3">跑者登入</h3>
        <p className="text-slate-400 text-center font-medium text-sm mb-8">登入開啟您的富士山路跑挑戰</p>
        
        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="電子郵件"
            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
          />
          <input
            type="password"
            placeholder="密碼"
            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
          />
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-2xl shadow-lg shadow-pink-100 transition-all active:scale-95"
        >
          立即登入
        </button>
      </div>
    </div>
  );

  // 報名組別選擇彈窗
  const RegistrationModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500">
          <Trophy size={40} />
        </div>
        <h3 className="text-2xl font-black text-center text-slate-800 mb-3">選擇挑戰組別</h3>
        <p className="text-slate-600 text-center font-medium mb-2">🏃 富士櫻花線上馬拉松</p>
        <p className="text-slate-400 text-center text-sm mb-8">
          📅 活動期間：<span className="font-bold text-pink-500">2026/03/07 - 03/16</span> (10天)
        </p>
        
        <div className="space-y-4">
          {[
            { value: '50km', name: '大獎牌收藏組', desc: '每天平均 5 公里' },
            { value: '25km', name: '經典挑戰組', desc: '每天平均 2.5 公里' },
            { value: '10km', name: '輕鬆跑組', desc: '每天平均 1 公里' }
          ].map(category => (
            <button
              key={category.value}
              onClick={() => handleCategorySelect(category.value as RaceCategory)}
              className="w-full p-6 bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-2xl border-2 border-pink-200 hover:border-pink-400 transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black text-slate-800 mb-1">{category.value}</h4>
                  <p className="text-pink-600 font-bold text-sm mb-1">{category.name}</p>
                  <p className="text-slate-500 text-xs">{category.desc}</p>
                </div>
                <ChevronRight className="text-pink-500 group-hover:translate-x-1 transition-transform" size={28} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // 地區選擇彈窗
  const RegionModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
          <MapPin size={40} />
        </div>
        <h3 className="text-2xl font-black text-center text-slate-800 mb-3">選擇居住地區</h3>
        <p className="text-slate-400 text-center text-sm mb-8">我們會根據您的地區推薦適合的練跑路線</p>
        
        <div className="space-y-4 mb-6">
          {/* 地區選擇 */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-2 block">地區</label>
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedCity('');
              }}
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            >
              <option value="">請選擇地區</option>
              {Object.keys(RUNNING_ROUTES).map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* 城市選擇 */}
          {selectedRegion && (
            <div>
              <label className="text-sm font-bold text-slate-600 mb-2 block">城市</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              >
                <option value="">請選擇城市</option>
                {Object.keys(RUNNING_ROUTES[selectedRegion as keyof typeof RUNNING_ROUTES]).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <button
          onClick={handleRegionSelect}
          disabled={!selectedRegion || !selectedCity}
          className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all ${
            selectedRegion && selectedCity
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-100 active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          確認選擇
        </button>
      </div>
    </div>
  );

  // 練跑地點展示彈窗
  const RouteDisplayModal = () => {
    const cityRoutes = selectedRegion && selectedCity 
      ? RUNNING_ROUTES[selectedRegion as keyof typeof RUNNING_ROUTES][selectedCity]
      : [];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
        <div className="bg-gradient-to-br from-white to-pink-50 rounded-[3rem] p-8 md:p-12 max-w-4xl w-full shadow-2xl animate-in zoom-in-95 duration-300 border-2 border-pink-100 my-8">
          {/* 活動日期區塊 */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full mb-4 shadow-lg">
              <span className="font-black text-lg">🌸 櫻色富士線上馬拉松 🗻</span>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-3">比賽日期</h3>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 max-w-md mx-auto shadow-md border border-pink-200">
              <div className="flex items-center justify-center gap-4 mb-2">
                <CalendarIcon className="text-pink-500" size={32} />
                <div>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                    03/07 - 03/16
                  </p>
                  <p className="text-slate-600 text-sm mt-1">2026 年 · 共 10 天</p>
                </div>
              </div>
            </div>
          </div>

          {/* 分隔線 */}
          <div className="relative py-6 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-pink-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-r from-white to-pink-50 px-6 text-sm font-black text-pink-600 tracking-wider">
                您的區域練跑地點
              </span>
            </div>
          </div>

          {/* 區域資訊 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-bold">
              <MapPin size={20} />
              <span>{selectedRegion} · {selectedCity}</span>
            </div>
          </div>

          {/* 練跑地點卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
            {cityRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 group hover:scale-105 duration-300"
              >
                {/* 地點照片 */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg">
                    {route.distance} km
                  </div>
                </div>

                {/* 地點資訊 */}
                <div className="p-4">
                  <h4 className="font-black text-slate-800 text-lg mb-1">{route.name}</h4>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <MapPin size={14} className="text-pink-500" />
                    建議跑步距離：{route.distance} 公里
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 提示訊息 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white rounded-full p-2 flex-shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="font-black text-blue-900 mb-2">溫馨提醒</h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  以上是根據您選擇的 <span className="font-bold">{selectedCity}</span> 地區推薦的練跑地點。
                  您可以在這些地點進行訓練，每個地點都標示了建議的跑步距離。
                  記得在訓練時攜帶水和手機，注意安全！
                </p>
              </div>
            </div>
          </div>

          {/* 確認按鈕 */}
          <button
            onClick={handleStartTraining}
            className="w-full py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <CheckCircle2 size={28} />
            開始我的訓練計畫
          </button>
        </div>
      </div>
    );
  };

  // 標籤頁 1: 訓練計畫表
  const PlanTab = () => {
    if (!selectedCategory) return null;
    
    const remainingDays = getRemainingDays();
    const remainingDistance = getRemainingDistance();
    const totalDistance = parseInt(selectedCategory);
    const progress = (totalCompleted / totalDistance) * 100;
    
    return (
      <div className="space-y-8">
        {/* 倒數計時與進度卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <Target size={24} />
              <h3 className="font-black text-lg">剩餘公里</h3>
            </div>
            <div className="text-4xl font-black mb-1">{remainingDistance.toFixed(1)} km</div>
            <div className="text-pink-100 text-sm">目標總計 {totalDistance} km</div>
            <div className="mt-4 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={24} />
              <h3 className="font-black text-lg">剩餘天數</h3>
            </div>
            <div className="text-4xl font-black mb-1">{remainingDays} 天</div>
            <div className="text-blue-100 text-sm">比賽日期：3/7 - 3/16</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <Award size={24} />
              <h3 className="font-black text-lg">已完成</h3>
            </div>
            <div className="text-4xl font-black mb-1">{totalCompleted.toFixed(1)} km</div>
            <div className="text-green-100 text-sm">完成度 {progress.toFixed(1)}%</div>
          </div>
        </div>
        
        {/* 分隔線 */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#f9f5f6] px-4 text-sm font-bold text-slate-400">GPS 追蹤區域</span>
          </div>
        </div>
        
        {/* GPS 追蹤卡片（訓練中顯示） */}
        {isTracking && currentTrainingDay !== null && (
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl animate-in slide-in-from-top border-4 border-indigo-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black mb-2 flex items-center justify-center gap-2">
                <Navigation className="animate-pulse" size={28} /> GPS 追蹤中
              </h3>
              <p className="text-indigo-100">第 {dailyPlans[currentTrainingDay].day} 天訓練</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-6xl font-black mb-2">
                  {Math.floor(trackingTime / 60)}:{(trackingTime % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-indigo-100 text-sm">訓練時間</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black">{(trackingTime / 360).toFixed(2)}</div>
                  <div className="text-indigo-100 text-xs">預估距離 (km)</div>
                </div>
                <div>
                  <div className="text-2xl font-black">6:15</div>
                  <div className="text-indigo-100 text-xs">配速 (分/km)</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={stopTraining}
              className="w-full py-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
            >
              <CheckCircle2 size={24} /> 完成訓練
            </button>
          </div>
        )}
        
        {/* 分隔線 */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#f9f5f6] px-4 text-sm font-bold text-slate-400">每日訓練計畫</span>
          </div>
        </div>
        
        {/* 每日計畫表格 */}
        <div className="bg-white/90 rounded-[2.5rem] p-8 shadow-lg border-2 border-slate-100">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <CalendarIcon className="text-pink-500" size={28} /> 訓練計畫表
          </h2>
          
          <div className="space-y-4">
            {dailyPlans.map((plan, index) => (
              <div key={index}>
                <div
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    plan.completed
                      ? 'bg-green-50 border-green-300 shadow-md'
                      : currentTrainingDay === index
                      ? 'bg-indigo-50 border-indigo-400 shadow-lg'
                      : 'bg-white border-slate-200 hover:border-pink-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-black shadow-md ${
                        plan.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-pink-100 text-pink-600'
                      }`}>
                        <div className="text-xs">DAY</div>
                        <div className="text-xl">{plan.day}</div>
                      </div>
                      
                      <div>
                        <h4 className="font-black text-slate-800 text-lg">
                          {new Date(plan.date).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' })}
                        </h4>
                        <p className="text-sm text-slate-500">{plan.date}</p>
                      </div>
                    </div>
                    
                    {plan.completed && (
                      <div className="flex items-center gap-2 text-green-600 font-bold">
                        <CheckCircle size={24} />
                        <span>已完成</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 mb-1">計畫距離</div>
                      <div className="text-2xl font-black text-slate-800">{plan.plannedDistance} km</div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 mb-1">推薦地點</div>
                      <div className="text-sm font-bold text-slate-800 flex items-center gap-1">
                        <MapPin size={14} className="text-pink-500" />
                        {plan.recommendedLocation}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      {plan.completed ? (
                        <>
                          <div className="text-xs text-slate-500 mb-1">實際距離</div>
                          <div className="text-2xl font-black text-green-600">{plan.actualDistance} km</div>
                        </>
                      ) : (
                        <button
                          onClick={() => startTraining(index)}
                          disabled={isTracking}
                          className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                            isTracking
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-pink-500 text-white hover:bg-pink-600 active:scale-95 shadow-md'
                          }`}
                        >
                          <Play size={16} fill="currentColor" /> 訓練去
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {/* 分隔線 between items */}
                {index < dailyPlans.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 提示訊息 */}
        {dailyPlans.length > 0 && totalCompleted === 0 && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 flex items-start gap-4 shadow-md">
            <AlertCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-black text-blue-900 mb-2">開始您的挑戰！</h4>
              <p className="text-blue-700 text-sm">
                點擊「訓練去」按鈕開啟 GPS 追蹤，完成每日目標。系統會自動記錄您的訓練數據。
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 標籤頁 2: 訓練記錄
  const TrackingTab = () => (
    <div className="space-y-6">
      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '累計完成', value: totalCompleted.toFixed(1), unit: 'km', icon: MapPin, color: 'pink' },
          { label: '訓練次數', value: runHistory.length.toString(), unit: '次', icon: Activity, color: 'blue' },
          { label: '平均配速', value: '6\'15"', unit: '/km', icon: Clock, color: 'green' },
          { label: '已完成天數', value: dailyPlans.filter(p => p.completed).length.toString(), unit: '天', icon: Calendar, color: 'yellow' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50">
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mb-4 text-${stat.color}-500`}>
              <stat.icon size={24} />
            </div>
            <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-800">{stat.value}</span>
              <span className="text-sm text-slate-400">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* 訓練歷程列表 */}
      <div className="bg-white/90 rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <TrendingUp className="text-pink-500" size={28} /> 訓練歷程
        </h2>
        
        {runHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-medium">尚無訓練記錄</p>
            <p className="text-slate-300 text-sm mt-2">開始您的第一次訓練吧！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {runHistory.map(run => (
              <div
                key={run.id}
                className="flex items-center justify-between p-5 rounded-2xl hover:bg-pink-50/50 transition-all border border-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl flex flex-col items-center justify-center">
                    <span className="text-xs font-bold">KM</span>
                    <span className="text-xl font-black">{run.distance}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-lg">{run.route}</h4>
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                      <CalendarIcon size={14} />
                      {run.date} · {run.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-600">{run.pace}</div>
                  <div className="text-xs text-slate-400">分/公里</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // 標籤頁 3: 數據分析
  const AnalyticsTab = () => {
    const completedPlans = dailyPlans.filter(p => p.completed);
    
    if (completedPlans.length === 0) {
      return (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 size={48} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-3">暫無數據分析</h3>
          <p className="text-slate-400">完成訓練後，這裡將顯示您的數據分析圖表</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: '平均配速', value: '6\'15"', unit: '/km', icon: Clock, color: 'blue' },
            { label: '總訓練次數', value: runHistory.length.toString(), unit: '次', icon: Activity, color: 'green' },
            { label: '最長距離', value: Math.max(...runHistory.map(r => r.distance), 0).toFixed(1), unit: 'km', icon: TrendingUp, color: 'pink' },
            { label: '訓練達成率', value: ((completedPlans.length / dailyPlans.length) * 100).toFixed(0), unit: '%', icon: Target, color: 'yellow' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mb-4 text-${stat.color}-500`}>
                <stat.icon size={24} />
              </div>
              <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-800">{stat.value}</span>
                <span className="text-sm text-slate-400">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* 圖表區域 */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
            <h3 className="text-lg font-black text-slate-800 mb-6">每日訓練距離</h3>
            <ReactECharts option={getLineChartOption()} style={{ height: '300px' }} />
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
            <h3 className="text-lg font-black text-slate-800 mb-6">計畫 vs 實際完成</h3>
            <ReactECharts option={getBarChartOption()} style={{ height: '350px' }} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f5f6] text-slate-700 font-sans p-4 md:p-10 lg:p-12 relative overflow-x-hidden">
      {/* 登入彈窗 */}
      {showLoginModal && <LoginModal />}
      
      {/* 報名確認彈窗 */}
      {showRegistrationModal && <RegistrationModal />}
      
      {/* 地區選擇彈窗 */}
      {showRegionModal && <RegionModal />}
      
      {/* 練跑地點展示彈窗 */}
      {showRouteDisplayModal && <RouteDisplayModal />}
      
      {/* 慶祝動畫 */}
      {showCelebration && <Celebration onClose={() => setShowCelebration(false)} />}
      
      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <TrendingUp size={20} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-slate-800 italic">櫻色富士</h1>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] leading-none">Personal Zone</span>
          </div>
        </div>
        
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setSelectedCategory(null);
            setDailyPlans([]);
            setTotalCompleted(0);
            setRunHistory([]);
          }}
          className="bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-3 shadow-sm border border-slate-100 active:scale-95"
        >
          LOGOUT <LogOut size={16} className="text-pink-500" />
        </button>
      </header>
      
      {/* 標籤導航 */}
      {selectedCategory && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                activeTab === 'plan'
                  ? 'bg-white text-pink-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <CalendarIcon className="inline mr-2" size={18} /> 訓練計畫
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                activeTab === 'tracking'
                  ? 'bg-white text-pink-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Activity className="inline mr-2" size={18} /> 訓練記錄
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                activeTab === 'analytics'
                  ? 'bg-white text-pink-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <BarChart3 className="inline mr-2" size={18} /> 數據分析
            </button>
          </div>
        </div>
      )}
      
      {/* 內容區 */}
      <main className="max-w-7xl mx-auto relative z-10 pb-24 md:pb-0">
        {activeTab === 'plan' && <PlanTab />}
        {activeTab === 'tracking' && <TrackingTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </main>
      
      {/* 背景裝飾 */}
      <div className="fixed -top-20 -right-20 w-[40rem] h-[40rem] bg-pink-200/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed -bottom-40 -left-20 w-[50rem] h-[50rem] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
    </div>
  );
};

export default SelfDisciplinePage;
