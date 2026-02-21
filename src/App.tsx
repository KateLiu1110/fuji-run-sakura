import React, { useState, useEffect } from 'react';
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
  Share2,
  Lock,
  Zap,
  Loader2,
  TrendingUp,
  Play,
  Activity,
  Database
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_LOGS = [
  { id: 1, location: "淡水天元宮櫻花環線", distance: 5.2, date: "2025-02-15", time: "32:10" },
  { id: 2, location: "內湖樂活公園", distance: 4.8, date: "2025-02-14", time: "28:45" },
  { id: 3, location: "河濱公園自主訓練", distance: 10.5, date: "2025-02-12", time: "58:20" },
  { id: 4, location: "武陵農場紅粉佳人", distance: 3.2, date: "2025-02-10", time: "18:15" },
];

const WEEKLY_STATS = [
  { day: '一', value: 4.2 },
  { day: '二', value: 6.5 },
  { day: '三', value: 0 },
  { day: '四', value: 8.5 },
  { day: '五', value: 4.8 },
  { day: '六', value: 10.5 },
  { day: '日', value: 7.0 },
];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [checkInCount, setCheckInCount] = useState(12);
  const [isCheckedInToday, setIsCheckedInToday] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [weeklyStats, setWeeklyStats] = useState(WEEKLY_STATS);

  // 新增：Smart Run (n8n 自動化流程) 相關狀態
  const [showSmartRunModal, setShowSmartRunModal] = useState(false);
  const [smartRunState, setSmartRunState] = useState('recommend'); // recommend, running, syncing, done
  const [recommendedRoute, setRecommendedRoute] = useState(null);

  // 登入處理
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  // 導航攔截處理 (要求登出確認)
  const handleTabSwitch = (tab) => {
    if (tab === 'logout') {
      setShowLogoutModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    setActiveTab('dashboard');
  };

  // 打卡邏輯
  const handleCheckIn = () => {
    if (!isCheckedInToday) {
      setIsCheckedInToday(true);
      setCheckInCount(prev => prev + 1);
    }
  };

  // 模擬同步 n8n 流程
  const handleSyncN8N = async () => {
    setIsSyncing(true);
    // 模擬網路延遲與 Webhook 觸發
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 這裡實際上可以發送 fetch 到 n8n webhook
    // const response = await fetch('YOUR_N8N_WEBHOOK_URL', { method: 'POST', body: JSON.stringify(logs) });
    
    setIsSyncing(false);
    // 簡單的成功提示替代 alert
    console.log("數據同步完成");
  };

  // 新增：觸發下班自動推薦流程 (n8n 排程模擬)
  const triggerSmartRun = () => {
    const routes = [
      { name: "彩虹橋河濱夜跑", distance: 5.5 },
      { name: "大安森林公園外圈", distance: 2.2 },
      { name: "信義區都會街跑", distance: 3.8 }
    ];
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    setRecommendedRoute(randomRoute);
    setSmartRunState('recommend');
    setShowSmartRunModal(true);
  };

  // 新增：開始跑步與自動化 GA4 數據流程
  const startSmartRun = () => {
    setSmartRunState('running');
    
    // 模擬執行 GPS 與跑步，經過一段時間後完成
    setTimeout(() => {
      setSmartRunState('syncing'); // 進入 GA4 匯出與報表更新階段
      
      setTimeout(() => {
        // 自動更新數據報表
        const newLog = {
          id: Date.now(),
          location: recommendedRoute.name,
          distance: recommendedRoute.distance,
          date: "今天",
          time: "GPS 自動記錄"
        };
        
        setLogs(prev => [newLog, ...prev]);
        
        // 更新柱狀圖 (動態增加今天的里程)
        setWeeklyStats(prev => {
          const newStats = [...prev];
          // 假設今天是週六(index 5)，實際應用會抓 new Date().getDay() 等邏輯
          newStats[5] = { ...newStats[5], value: +(newStats[5].value + recommendedRoute.distance).toFixed(1) };
          return newStats;
        });

        if (!isCheckedInToday) {
          setIsCheckedInToday(true);
          setCheckInCount(prev => prev + 1);
        }
        
        setSmartRunState('done');
        
        // 自動關閉 POP
        setTimeout(() => {
          setShowSmartRunModal(false);
        }, 2500);
        
      }, 2500); // 模擬 GA4 API 處理與報表更新時間
    }, 3000); // 模擬跑步經過的時間
  };

  // --- Components ---

  const LoginPage = () => (
    <div className="min-h-screen bg-[#f9f5f6] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-pink-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-200">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 italic">櫻色富士</h1>
          <p className="text-gray-500 text-sm mt-2">ATRÉ PROJECT 跑者登入</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Runner ID</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 outline-none transition-all"
              placeholder="輸入跑者編號"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95 mt-4"
          >
            進入系統
          </button>
        </form>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-700">
      {/* 左側主要內容 */}
      <div className="lg:col-span-8 space-y-6">
        {/* 標題與基礎數據 */}
        <div className="bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-white/50 shadow-sm">
          <div className="mb-10">
            <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Runner Personal Space</span>
            <h2 className="text-4xl font-black text-slate-800 mt-4 leading-tight">我的路跑紀實</h2>
            <p className="text-slate-500 mt-2 font-medium">追逐櫻花的第 <span className="text-pink-500 font-black">{checkInCount}</span> 天，距離目標 <span className="font-bold text-slate-700">12.5 km</span></p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center group">
              <div className="text-pink-400 mb-3 flex justify-center transform group-hover:scale-110 transition-transform"><MapPin size={28} /></div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">累計里程</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-slate-800">48.5</span>
                <span className="text-sm font-bold text-slate-400">km</span>
              </div>
            </div>
            <div className="text-center group border-x border-slate-100">
              <div className="text-blue-400 mb-3 flex justify-center transform group-hover:scale-110 transition-transform"><Clock size={28} /></div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">運動時數</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-slate-800">12.5</span>
                <span className="text-sm font-bold text-slate-400">h</span>
              </div>
            </div>
            <div className="text-center group">
              <div className="text-yellow-400 mb-3 flex justify-center transform group-hover:scale-110 transition-transform"><Award size={28} /></div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">解鎖勳章</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-slate-800">4</span>
                <span className="text-sm font-bold text-slate-400">枚</span>
              </div>
            </div>
          </div>
        </div>

        {/* 訓練歷程列表 */}
        <div className="bg-white/90 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <TrendingUp className="text-pink-400" size={24} /> 訓練歷程
            </h3>
            <span className="text-[10px] text-pink-500 font-black bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100">本月進度 +15%</span>
          </div>

          <div className="space-y-4">
            {logs.map(log => (
              <div key={log.id} className="group flex items-center justify-between p-5 rounded-3xl hover:bg-pink-50/50 transition-all border border-slate-50 hover:border-pink-100 cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center border border-slate-100 shadow-sm group-hover:shadow-pink-100 transition-all">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">KM</span>
                    <span className="text-xl font-black text-pink-500 leading-none">{log.distance}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{log.location} 🌸</h4>
                    <p className="text-sm text-slate-400 font-medium">{log.date} · {log.time} 完賽</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300 group-hover:text-pink-500 transition-colors">
                  <MapPin size={20} />
                  <ChevronRight size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右側 Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* 打卡與自律表單工具 */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
          <div className="flex gap-4 mb-8">
            <button className="flex-1 h-14 rounded-2xl border border-slate-100 flex items-center justify-center gap-2 text-slate-400 font-bold text-sm hover:bg-slate-50 transition-colors">
              <Share2 size={18} />
            </button>
            <button 
              onClick={handleCheckIn}
              disabled={isCheckedInToday}
              className={`flex-[3] h-14 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all shadow-lg ${
                isCheckedInToday 
                ? 'bg-green-500 text-white cursor-default shadow-green-100' 
                : 'bg-pink-500 text-white hover:bg-pink-600 shadow-pink-100 active:scale-95'
              }`}
            >
              {isCheckedInToday ? <CheckCircle2 size={20} /> : <div className="w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center text-[10px]">✓</div>}
              {isCheckedInToday ? '今日已打卡' : '每日打卡'}
            </button>
          </div>

          <div className="border-t border-slate-50 pt-8">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
              <CalendarIcon className="text-pink-400" size={22} /> 自律打卡月曆
            </h3>
            
            <div className="grid grid-cols-7 gap-1.5 mb-8 text-center">
              {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                <span key={d} className="text-[10px] text-slate-300 font-black mb-2">{d}</span>
              ))}
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isCheckDay = [2, 5, 8, 12, 14, 15].includes(day);
                const isToday = day === 16;
                const active = isCheckDay || (isToday && isCheckedInToday);
                return (
                  <div 
                    key={i} 
                    className={`h-9 w-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                      active ? 'bg-pink-500 text-white shadow-md shadow-pink-100' : 
                      isToday ? 'border-2 border-pink-200 text-pink-500' : 'text-slate-300'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* n8n 整合工具區塊 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-500">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-700">智慧路跑管家</h4>
                  <p className="text-[10px] text-slate-400 font-medium italic">自動為您追蹤並同步 GA4 數據</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* 原本的手動同步按鈕 */}
                <button 
                  onClick={handleSyncN8N}
                  disabled={isSyncing}
                  className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-100 disabled:bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  {isSyncing ? (
                    <><Loader2 size={14} className="animate-spin" /> 同步中...</>
                  ) : (
                    <><Database size={14} /> 立即同步我的路跑紀錄</>
                  )}
                </button>

                {/* 新增的自動化情境觸發按鈕 */}
                <button 
                  onClick={triggerSmartRun}
                  className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95 group"
                >
                  <Clock size={16} className="group-hover:animate-bounce" />
                  模擬管家「下班夜跑」提醒
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 目前高度/狀態 */}
        <div className="bg-slate-800 rounded-[2.5rem] p-8 shadow-xl text-white overflow-hidden relative group">
           <div className="relative z-10 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Current Elevation</p>
                <h4 className="text-4xl font-black flex items-baseline gap-2">
                  1,245 <span className="text-sm font-bold text-white/30 tracking-normal">m</span>
                </h4>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="150" strokeDashoffset="60" className="text-pink-500" />
                 </svg>
                 <span className="text-xs font-black">42%</span>
              </div>
           </div>
           {/* 背景裝飾 */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full group-hover:bg-pink-500/20 transition-all"></div>
        </div>
      </div>
    </div>
  );

  const StatsPage = () => (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">數據分析報告</h2>
          <p className="text-slate-500 font-medium">Weekly Running Performance Chart</p>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          {['週', '月', '年'].map(p => (
            <button key={p} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${p==='週' ? 'bg-white text-pink-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* 核心柱狀圖 Chart */}
      <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-50 mb-10">
        <div className="h-72 flex items-end justify-between gap-2 md:gap-4 px-2 md:px-6 relative">
          {/* 橫向參考線 */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-2">
            {[1, 2, 3, 4].map(line => <div key={line} className="border-t border-slate-400 w-full border-dashed"></div>)}
          </div>

          {weeklyStats.map((stat, i) => {
            const maxHeight = 12; // 假設最高為 12km
            const barHeight = Math.min((stat.value / maxHeight) * 100, 100);
            return (
              <div key={i} className="flex-1 group relative flex flex-col items-center">
                {/* 數值標籤 */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 shadow-xl z-20">
                  {stat.value}km
                </div>
                
                {/* 柱體 */}
                <div 
                  className={`w-full max-w-[40px] rounded-t-xl transition-all duration-700 delay-[${i * 100}ms] relative cursor-pointer ${
                    stat.value > 8 ? 'bg-pink-500' : 
                    stat.value === 0 ? 'bg-slate-100 h-[2px] mb-0' : 'bg-pink-200 group-hover:bg-pink-300'
                  }`} 
                  style={{ height: stat.value === 0 ? '4px' : `${barHeight}%` }}
                >
                  {/* 反光效果 */}
                  <div className="absolute inset-0 bg-white/10 w-1/3 rounded-tl-xl"></div>
                </div>
                
                {/* 底部標籤 */}
                <span className="mt-4 text-[11px] text-slate-400 font-black group-hover:text-slate-800 transition-colors">{stat.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '平均配速', val: "6'12\"", unit: "/km", icon: Clock, color: 'text-blue-500' },
          { label: '卡路里消耗', val: "2,450", unit: "kcal", icon: Zap, color: 'text-yellow-500' },
          { label: '海拔爬升', val: "382", unit: "m", icon: TrendingUp, color: 'text-pink-500' },
          { label: '最大心率', val: "172", unit: "bpm", icon: User, color: 'text-red-500' },
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-pink-50 transition-all">
            <div className={`w-10 h-10 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm ${item.color}`}>
              <item.icon size={20} />
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase mb-1 tracking-wider">{item.label}</p>
            <p className="text-2xl font-black text-slate-800 flex items-baseline gap-1">
              {item.val} <span className="text-xs font-bold text-slate-400">{item.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const LogoutModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowLogoutModal(false)}></div>
      <div className="relative bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500">
          <LogOut size={40} />
        </div>
        <h3 className="text-2xl font-black text-center text-slate-800 mb-3">要暫時休息嗎？</h3>
        <p className="text-slate-400 text-center font-medium text-sm mb-8 leading-relaxed">您的路跑進度已安全儲存。<br/>每一次休息，都是為了跑更遠的路。</p>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowLogoutModal(false)}
            className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 font-black rounded-2xl transition-all"
          >
            返回
          </button>
          <button 
            onClick={confirmLogout}
            className="flex-1 py-4 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-2xl shadow-lg shadow-pink-100 transition-all active:scale-95"
          >
            確定登出
          </button>
        </div>
      </div>
    </div>
  );

  const SmartRunModal = () => {
    if (!showSmartRunModal) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"></div>
        <div className="relative bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100 overflow-hidden">
          
          {/* 背景裝飾 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>

          {smartRunState === 'recommend' && (
            <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-500 shadow-inner">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">下班時間到了！</h3>
              <p className="text-slate-500 text-sm font-medium mb-6">管家溫馨提醒：今天天氣不錯，為您推薦以下路線：</p>
              
              <div className="w-full bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100 flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-white rounded-xl flex flex-col items-center justify-center shadow-sm">
                  <span className="text-[9px] text-slate-400 font-black">KM</span>
                  <span className="text-sm font-black text-pink-500">{recommendedRoute?.distance}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">{recommendedRoute?.name}</h4>
                  <p className="text-xs text-slate-400">系統推薦最佳配速路線</p>
                </div>
              </div>

              <button 
                onClick={startSmartRun}
                className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Play size={18} fill="currentColor" /> POP Start (開啟 GPS)
              </button>
            </div>
          )}

          {smartRunState === 'running' && (
            <div className="flex flex-col items-center text-center py-4 animate-in fade-in zoom-in">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-pink-500/20 rounded-full animate-ping"></div>
                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white relative z-10 shadow-lg shadow-pink-200">
                  <Activity size={36} className="animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">GPS 執行中...</h3>
              <p className="text-slate-500 text-sm font-medium">正在追蹤您的路跑軌跡</p>
            </div>
          )}

          {smartRunState === 'syncing' && (
            <div className="flex flex-col items-center text-center py-4 animate-in fade-in zoom-in">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-8 relative">
                <Loader2 size={36} className="animate-spin relative z-10" />
                <Database size={16} className="absolute z-20 text-blue-700 bg-blue-50 rounded-full p-0.5" style={{ bottom: '20px', right: '20px' }} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">自動匯出 GA4 數據</h3>
              <p className="text-slate-500 text-sm font-medium">管家正在為您更新自律報表與訓練進度...</p>
            </div>
          )}

          {smartRunState === 'done' && (
            <div className="flex flex-col items-center text-center py-4 animate-in fade-in zoom-in">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-lg shadow-green-200">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">報表已更新！</h3>
              <p className="text-slate-500 text-sm font-medium">今日任務完成，請查看最新的數據分析</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- Main Layout ---

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#f9f5f6] text-slate-700 font-sans p-4 md:p-10 lg:p-12 relative overflow-x-hidden">
      {/* 導航 Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg">
             <TrendingUp size={20} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-slate-800 italic">櫻色富士</h1>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] leading-none">ATRÉ PROJECT</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center bg-white/80 backdrop-blur-md px-2 py-2 rounded-2xl shadow-sm border border-white/50">
          <button 
            onClick={() => handleTabSwitch('dashboard')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'dashboard' ? 'bg-white text-pink-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Home size={18} /> 紀實儀表板
          </button>
          <button 
            onClick={() => handleTabSwitch('stats')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'stats' ? 'bg-white text-pink-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <BarChart3 size={18} /> 數據分析
          </button>
        </nav>

        <button 
          onClick={() => handleTabSwitch('logout')}
          className="bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-3 shadow-sm border border-slate-100 active:scale-95"
        >
          LOGOUT <LogOut size={16} className="text-pink-500" />
        </button>
      </header>

      {/* 內容區 */}
      <main className="max-w-7xl mx-auto relative z-10 pb-24 md:pb-0">
        {activeTab === 'dashboard' ? <Dashboard /> : <StatsPage />}
      </main>

      {/* 底部導航 (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 p-3 flex gap-3 z-50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 flex flex-col items-center py-3 rounded-2xl transition-all ${activeTab === 'dashboard' ? 'bg-pink-500 text-white' : 'text-slate-400'}`}
        >
          <Home size={22} />
          <span className="text-[9px] font-black mt-1">DASHBOARD</span>
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex-1 flex flex-col items-center py-3 rounded-2xl transition-all ${activeTab === 'stats' ? 'bg-pink-500 text-white' : 'text-slate-400'}`}
        >
          <BarChart3 size={22} />
          <span className="text-[9px] font-black mt-1">STATS</span>
        </button>
        <button 
          onClick={() => handleTabSwitch('logout')}
          className="flex-1 flex flex-col items-center py-3 text-slate-400"
        >
          <LogOut size={22} />
          <span className="text-[9px] font-black mt-1">EXIT</span>
        </button>
      </div>

      {/* 登出彈窗 */}
      {showLogoutModal && <LogoutModal />}

      {/* 智慧下班路跑彈窗 */}
      <SmartRunModal />

      {/* 背景裝飾 */}
      <div className="fixed -top-20 -right-20 w-[40rem] h-[40rem] bg-pink-200/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed -bottom-40 -left-20 w-[50rem] h-[50rem] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
    </div>
  );
};

export default App;
