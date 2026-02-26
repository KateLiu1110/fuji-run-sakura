import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
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
  Database,
  Zap,
  CheckCircle,
  Circle,
  Map,
  Navigation
} from 'lucide-react';

interface SelfDisciplinePageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

// 跑步路线数据
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

const SelfDisciplinePage: React.FC<SelfDisciplinePageProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  // 狀態管理
  const [showLoginModal, setShowLoginModal] = useState(!isLoggedIn);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'routes' | 'tracking' | 'analytics'>('routes');
  const [routeSelected, setRouteSelected] = useState(false);
  
  // 路線選擇相關
  const [selectedRegion, setSelectedRegion] = useState('北部');
  const [selectedCity, setSelectedCity] = useState('台北市');
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  
  // 跑步記錄相關
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  const [dailyChecked, setDailyChecked] = useState(false);
  const [totalDistance, setTotalDistance] = useState(48.5);
  const [totalTime, setTotalTime] = useState(12.5);
  const [totalRuns, setTotalRuns] = useState(15);
  
  // 跑步歷程數據
  const [runHistory, setRunHistory] = useState([
    { id: 1, date: '2026-02-27', route: '松山河堤', distance: 5.2, time: '32:10', pace: '6:11' },
    { id: 2, date: '2026-02-26', route: '大安森林公園', distance: 3.8, time: '24:30', pace: '6:26' },
    { id: 3, date: '2026-02-25', route: '淡水河濱步道', distance: 10.5, time: '65:20', pace: '6:13' },
    { id: 4, date: '2026-02-23', route: '信義區都會路跑', distance: 6.5, time: '40:15', pace: '6:11' },
  ]);
  
  // GPS 追蹤定時器
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
    if (isLoggedIn && !showLoginModal) {
      setShowRegistrationModal(true);
    }
  }, [isLoggedIn, showLoginModal]);
  
  // 登入處理
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  
  // 路線選擇處理
  const toggleRouteSelection = (routeId: string) => {
    setSelectedRoutes(prev =>
      prev.includes(routeId)
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    );
  };
  
  // 確認路線選擇
  const confirmRouteSelection = () => {
    if (selectedRoutes.length > 0) {
      setRouteSelected(true);
      setActiveTab('tracking');
    }
  };
  
  // 開始/停止 GPS 追蹤
  const toggleTracking = () => {
    if (!isTracking) {
      setIsTracking(true);
      setTrackingTime(0);
    } else {
      setIsTracking(false);
      // 添加新的跑步記錄
      const newRun = {
        id: runHistory.length + 1,
        date: new Date().toISOString().split('T')[0],
        route: selectedRoutes.length > 0 
          ? Object.values(RUNNING_ROUTES)
              .flatMap(region => Object.values(region).flat())
              .find(r => r.id === selectedRoutes[0])?.name || '自定義路線'
          : '自定義路線',
        distance: parseFloat((trackingTime / 360).toFixed(1)), // 模拟距离
        time: `${Math.floor(trackingTime / 60)}:${(trackingTime % 60).toString().padStart(2, '0')}`,
        pace: '6:15'
      };
      setRunHistory(prev => [newRun, ...prev]);
      setTotalDistance(prev => prev + newRun.distance);
      setTotalTime(prev => prev + trackingTime / 3600);
      setTotalRuns(prev => prev + 1);
      if (!dailyChecked) {
        setDailyChecked(true);
      }
    }
  };
  
  // 每日打卡
  const handleDailyCheckIn = () => {
    setDailyChecked(true);
  };
  
  // ECharts 配置 - 每日跑步折線圖
  const getLineChartOption = () => {
    const last7Days = runHistory.slice(0, 7).reverse();
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
        data: last7Days.map(r => r.date.slice(5)),
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
        data: last7Days.map(r => r.distance),
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
  
  // ECharts 配置 - 配速分布餅圖
  const getPieChartOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} 次 ({d}%)'
      },
      legend: {
        bottom: '5%',
        left: 'center'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        data: [
          { value: 5, name: '輕鬆跑 (>7:00)', itemStyle: { color: '#10b981' } },
          { value: 8, name: '耐力跑 (6:00-7:00)', itemStyle: { color: '#3b82f6' } },
          { value: 2, name: '節奏跑 (<6:00)', itemStyle: { color: '#f59e0b' } }
        ]
      }]
    };
  };
  
  // ECharts 配置 - 月度統計柱狀圖
  const getBarChartOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
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
        data: ['第一週', '第二週', '第三週', '第四週'],
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
        data: [28.5, 35.2, 42.8, 48.5],
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#ec4899' },
              { offset: 1, color: '#f472b6' }
            ]
          },
          borderRadius: [8, 8, 0, 0]
        }
      }]
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

  // 報名確認彈窗
  const RegistrationModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-black text-center text-slate-800 mb-3">已報名成功！</h3>
        <p className="text-slate-600 text-center font-medium mb-2">🏃 半馬富士山路跑</p>
        <p className="text-slate-400 text-center text-sm mb-8">
          📅 比賽日期：<span className="font-bold text-pink-500">2026/03/14 - 03/19</span>
        </p>
        
        <button
          onClick={() => setShowRegistrationModal(false)}
          className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-2xl shadow-lg shadow-pink-100 transition-all active:scale-95"
        >
          開始訓練
        </button>
      </div>
    </div>
  );

  // 標籤頁 1: 跑步路線
  const RoutesTab = () => (
    <div className="space-y-6">
      <div className="bg-white/90 rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <MapPin className="text-pink-500" size={28} /> 選擇訓練路線
        </h2>
        
        {/* 地區選擇 */}
        <div className="flex gap-3 mb-6">
          {Object.keys(RUNNING_ROUTES).map(region => (
            <button
              key={region}
              onClick={() => {
                setSelectedRegion(region);
                setSelectedCity(Object.keys(RUNNING_ROUTES[region as keyof typeof RUNNING_ROUTES])[0]);
              }}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                selectedRegion === region
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-100'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        
        {/* 城市選擇 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.keys(RUNNING_ROUTES[selectedRegion as keyof typeof RUNNING_ROUTES]).map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCity === city
                  ? 'bg-pink-100 text-pink-600 border-2 border-pink-300'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-pink-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
        
        {/* 路線卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {RUNNING_ROUTES[selectedRegion as keyof typeof RUNNING_ROUTES][selectedCity as keyof (typeof RUNNING_ROUTES)[keyof typeof RUNNING_ROUTES]]?.map(route => (
            <div
              key={route.id}
              onClick={() => toggleRouteSelection(route.id)}
              className={`cursor-pointer rounded-3xl overflow-hidden transition-all transform hover:scale-105 ${
                selectedRoutes.includes(route.id)
                  ? 'ring-4 ring-pink-400 shadow-xl'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className="relative h-48">
                <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{route.name}</h3>
                  <p className="text-sm opacity-90">預估 {route.distance} 公里</p>
                </div>
                {selectedRoutes.includes(route.id) && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* 下一步按鈕 */}
        <button
          onClick={confirmRouteSelection}
          disabled={selectedRoutes.length === 0}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
            selectedRoutes.length > 0
              ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-100 active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          下一步 <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );

  // 標籤頁 2: 記錄跑步時光
  const TrackingTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 左側主要內容 */}
      <div className="lg:col-span-2 space-y-6">
        {/* GPS 追蹤卡片 */}
        <div className="bg-white/90 rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <Navigation className="text-pink-500" size={28} /> GPS 路跑追蹤
          </h2>
          
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-8 text-white mb-6">
            <div className="text-center mb-8">
              <div className="text-6xl font-black mb-2">
                {Math.floor(trackingTime / 60)}:{(trackingTime % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-pink-100 text-sm">追蹤時間</div>
            </div>
            
            <button
              onClick={toggleTracking}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
                isTracking
                  ? 'bg-white text-pink-500 hover:bg-pink-50'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              {isTracking ? (
                <>
                  <CheckCircle2 size={24} /> 停止追蹤
                </>
              ) : (
                <>
                  <Play size={24} fill="currentColor" /> Start GPS
                </>
              )}
            </button>
          </div>
          
          <div className="text-center text-sm text-slate-500 italic">
            💡 提示：也可以連結 TATTA APP 同步數據
          </div>
        </div>
        
        {/* 訓練歷程 */}
        <div className="bg-white/90 rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <TrendingUp className="text-pink-400" size={24} /> 訓練歷程
          </h3>
          
          <div className="space-y-3">
            {runHistory.slice(0, 5).map(run => (
              <div
                key={run.id}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-pink-50/50 transition-all border border-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-pink-100 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-xs text-pink-500 font-black">KM</span>
                    <span className="text-lg font-black text-pink-600">{run.distance}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{run.route}</h4>
                    <p className="text-sm text-slate-400">{run.date} · {run.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-600">{run.pace}</div>
                  <div className="text-xs text-slate-400">分/公里</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 右側側邊欄 */}
      <div className="space-y-6">
        {/* 我的路跑統計 */}
        <div className="bg-white/90 rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
          <h3 className="text-lg font-black text-slate-800 mb-6">我的路跑</h3>
          
          <div className="space-y-4">
            <div className="text-center p-4 bg-pink-50 rounded-2xl">
              <div className="text-pink-400 mb-2"><MapPin size={24} className="mx-auto" /></div>
              <div className="text-2xl font-black text-slate-800">{totalDistance.toFixed(1)} km</div>
              <div className="text-xs text-slate-500 mt-1">累積里程</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-2xl">
              <div className="text-blue-400 mb-2"><Clock size={24} className="mx-auto" /></div>
              <div className="text-2xl font-black text-slate-800">{totalTime.toFixed(1)} h</div>
              <div className="text-xs text-slate-500 mt-1">運動時數</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-2xl">
              <div className="text-green-400 mb-2"><Activity size={24} className="mx-auto" /></div>
              <div className="text-2xl font-black text-slate-800">{totalRuns}</div>
              <div className="text-xs text-slate-500 mt-1">訓練次數</div>
            </div>
          </div>
        </div>
        
        {/* 今日打卡 */}
        <div className="bg-white/90 rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
          <h3 className="text-lg font-black text-slate-800 mb-4">今日打卡</h3>
          <div className="text-center mb-4">
            <div className="text-4xl font-black text-pink-500 mb-2">
              {new Date().getDate()}
            </div>
            <div className="text-sm text-slate-500">
              {new Date().toLocaleDateString('zh-TW', { month: 'long', year: 'numeric' })}
            </div>
          </div>
          
          <button
            onClick={handleDailyCheckIn}
            disabled={dailyChecked}
            className={`w-full py-3 rounded-2xl font-black transition-all ${
              dailyChecked
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-pink-500 text-white hover:bg-pink-600 active:scale-95'
            }`}
          >
            {dailyChecked ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 size={20} /> 已打卡
              </span>
            ) : (
              '每日打卡'
            )}
          </button>
        </div>
        
        {/* 智慧路跑管家 */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-[2.5rem] p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} />
            <h3 className="text-lg font-black">智慧路跑管家</h3>
          </div>
          <p className="text-indigo-100 text-sm mb-4">
            自動同步跑步記錄，分析訓練數據
          </p>
          <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-sm font-bold transition-all">
            <span className="flex items-center justify-center gap-2">
              <Database size={16} /> 立即同步
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // 標籤頁 3: 數據分析
  const AnalyticsTab = () => (
    <div className="space-y-6">
      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '平均配速', value: '6\'15"', unit: '/km', icon: Clock, color: 'blue' },
          { label: '總訓練次數', value: totalRuns.toString(), unit: '次', icon: Activity, color: 'green' },
          { label: '最長距離', value: '10.5', unit: 'km', icon: TrendingUp, color: 'pink' },
          { label: '總卡路里', value: '2,450', unit: 'kcal', icon: Zap, color: 'yellow' }
        ].map((stat, idx) => (
          <div key={idx} className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-50`}>
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
      
      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
          <h3 className="text-lg font-black text-slate-800 mb-6">每日跑步里程</h3>
          <ReactECharts option={getLineChartOption()} style={{ height: '300px' }} />
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
          <h3 className="text-lg font-black text-slate-800 mb-6">配速分布</h3>
          <ReactECharts option={getPieChartOption()} style={{ height: '300px' }} />
        </div>
      </div>
      
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
        <h3 className="text-lg font-black text-slate-800 mb-6">月度訓練統計</h3>
        <ReactECharts option={getBarChartOption()} style={{ height: '350px' }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9f5f6] text-slate-700 font-sans p-4 md:p-10 lg:p-12 relative overflow-x-hidden">
      {/* 登入彈窗 */}
      {showLoginModal && <LoginModal />}
      
      {/* 報名確認彈窗 */}
      {showRegistrationModal && <RegistrationModal />}
      
      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <TrendingUp size={20} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-slate-800 italic">樱色富士</h1>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] leading-none">Personal Zone</span>
          </div>
        </div>
        
        <button
          onClick={() => setIsLoggedIn(false)}
          className="bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-3 shadow-sm border border-slate-100 active:scale-95"
        >
          LOGOUT <LogOut size={16} className="text-pink-500" />
        </button>
      </header>
      
      {/* 標籤導航 */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-2 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
              activeTab === 'routes'
                ? 'bg-white text-pink-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MapPin className="inline mr-2" size={18} /> 跑步路線
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            disabled={!routeSelected}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
              activeTab === 'tracking'
                ? 'bg-white text-pink-500 shadow-sm'
                : routeSelected
                  ? 'text-slate-400 hover:text-slate-600'
                  : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <Activity className="inline mr-2" size={18} /> 記錄跑步時光
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            disabled={!routeSelected}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
              activeTab === 'analytics'
                ? 'bg-white text-pink-500 shadow-sm'
                : routeSelected
                  ? 'text-slate-400 hover:text-slate-600'
                  : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <BarChart3 className="inline mr-2" size={18} /> 數據分析
          </button>
        </div>
      </div>
      
      {/* 內容區 */}
      <main className="max-w-7xl mx-auto relative z-10 pb-24 md:pb-0">
        {activeTab === 'routes' && <RoutesTab />}
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
