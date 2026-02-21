
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Map, 
  Play, 
  Video, 
  ChevronRight, 
  Award, 
  Footprints, 
  Clock, 
  Share2, 
  Sparkles, 
  Smartphone, 
  CheckCircle2,
  Mountain,
  Download,
  MapPin,
  User,
  RefreshCw,
  ExternalLink,
  Activity,
  Zap
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(!isLoggedIn);
  const [goalKm, setGoalKm] = useState<number | null>(null);
  const [accumulatedKm, setAccumulatedKm] = useState(0);
  const [checkInCount, setCheckInCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [aiStory, setAiStory] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Flow states
  const [step, setStep] = useState(1); // 1: Setup Run, 2: Running/GPS, 3: Photo/Check-in
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedLocation, setSelectedLocation] = useState("淡水河濱櫻花步道");
  const [selectedDistance, setSelectedDistance] = useState(5); // Daily run distance
  const [runProgress, setRunProgress] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  // Persistence: Load from localStorage
  useEffect(() => {
    const savedGoal = localStorage.getItem('fuji_goal_km');
    const savedAccumulated = localStorage.getItem('fuji_accumulated_km');
    const savedCheckIn = localStorage.getItem('fuji_check_in_count');

    if (savedGoal) setGoalKm(Number(savedGoal));
    if (savedAccumulated) setAccumulatedKm(Number(savedAccumulated));
    if (savedCheckIn) setCheckInCount(Number(savedCheckIn));
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    if (goalKm) localStorage.setItem('fuji_goal_km', goalKm.toString());
    localStorage.setItem('fuji_accumulated_km', accumulatedKm.toString());
    localStorage.setItem('fuji_check_in_count', checkInCount.toString());
  }, [goalKm, accumulatedKm, checkInCount]);

  // Sync showLogin with isLoggedIn prop
  useEffect(() => {
    setShowLogin(!isLoggedIn);
  }, [isLoggedIn]);

  const weeklyData = [
    { day: 'Mon', km: 5.2 },
    { day: 'Tue', km: 0 },
    { day: 'Wed', km: 10.5 },
    { day: 'Thu', km: 4.8 },
    { day: 'Fri', km: 0 },
    { day: 'Sat', km: 8.2 },
    { day: 'Sun', km: accumulatedKm > 30 ? 12.4 : 0 },
  ];

  const hrZones = [
    { name: 'Zone 1 (Warm up)', value: 15, color: '#94a3b8' },
    { name: 'Zone 2 (Fat Burn)', value: 45, color: '#10b981' },
    { name: 'Zone 3 (Aerobic)', value: 25, color: '#3b82f6' },
    { name: 'Zone 4 (Anaerobic)', value: 10, color: '#f59e0b' },
    { name: 'Zone 5 (VO2 Max)', value: 5, color: '#ef4444' },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleRegisterDistance = (km: number) => {
    setGoalKm(km);
  };

  const handleStartRun = () => {
    setStep(2);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setRunProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setStep(3);
      }
    }, 100);
  };

  const handlePhotoUpload = () => {
    setCapturedPhoto("https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800");
    setAccumulatedKm(prev => prev + selectedDistance);
    setCheckInCount(prev => prev + 1);
    setStep(1);
  };

  const handleSyncStrava = () => {
    setIsSyncing(true);
    // Simulate n8n webhook call
    setTimeout(() => {
      setIsSyncing(false);
      setAccumulatedKm(prev => prev + 3.5); // Simulate new activity found
      setCheckInCount(prev => prev + 1);
    }, 2000);
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `寫一段極短的路跑完賽感言。用戶完成了${goalKm}公里的挑戰，累積里程達到目標。`,
      });
      setAiStory(response.text || "自律是通往自由的唯一路徑。");
    } catch (e) {
      setAiStory("在櫻花盛開的瞬間，我看見了富士山頂的自律之光。");
    }
    setTimeout(() => {
      setIsGenerating(false);
      setVideoGenerated(true);
    }, 3000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-sakura-pink min-h-screen relative overflow-hidden">
      {/* Login Popup */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500">
                  <User size={40} />
                </div>
                <h2 className="text-3xl font-serif font-black mb-4">跑者登入</h2>
                <p className="text-gray-500 mb-8">登入以開啟您的櫻色富士自律挑戰</p>
                <div className="space-y-4">
                  <input type="text" placeholder="跑者編號 / 信箱" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-200" />
                  <input type="password" placeholder="密碼" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-200" />
                  <button onClick={handleLogin} className="w-full py-4 bg-pink-500 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-pink-600 transition-all">
                    立即登入
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        {!goalKm ? (
          /* Step 2: Select Registration Distance */
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white p-12 rounded-[48px] shadow-2xl text-center"
          >
            <div className="japanese-stamp mb-6">第一階段：目標設定</div>
            <h2 className="text-4xl font-serif font-black mb-4">選擇您的報名組別</h2>
            <p className="text-gray-500 mb-10">這將是您本次櫻色富士計畫的終極目標里程</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: '10k 體驗組', val: 10, color: 'bg-blue-50 text-blue-600 border-blue-100' },
                { label: '半馬 挑戰組', val: 21, color: 'bg-pink-50 text-pink-600 border-pink-100' },
                { label: '全馬 榮耀組', val: 42, color: 'bg-purple-50 text-purple-600 border-purple-100' },
              ].map(opt => (
                <button 
                  key={opt.val}
                  onClick={() => handleRegisterDistance(opt.val)}
                  className={`p-8 rounded-3xl border-2 transition-all hover:scale-105 flex flex-col items-center gap-2 ${opt.color}`}
                >
                  <span className="text-3xl font-black">{opt.val}k</span>
                  <span className="text-xs font-bold uppercase tracking-widest">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Main Dashboard Content */
          <>
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="japanese-stamp mb-4 text-lg">自律表 | 目標：{goalKm}km</div>
                <h1 className="text-5xl md:text-6xl font-serif font-black text-gray-900 mb-4 tracking-tight">
                  我的路跑紀實
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-gray-500 font-medium text-lg flex items-center gap-2">
                    累積里程 <span className="text-pink-500 font-bold">{accumulatedKm.toFixed(1)} / {goalKm} km</span>
                  </p>
                  <div className="h-6 w-[1px] bg-gray-200"></div>
                  <div className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <Zap size={12} /> n8n 雲端同步中
                  </div>
                </div>
              </motion.div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleSyncStrava}
                  disabled={isSyncing}
                  className="bg-white text-gray-900 px-6 py-4 rounded-3xl font-bold flex items-center gap-2 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
                  {isSyncing ? '同步中...' : '同步 Strava'}
                </button>
                {accumulatedKm >= goalKm && !videoGenerated && (
                  <button 
                    onClick={handleGenerateVideo}
                    disabled={isGenerating}
                    className="bg-gray-900 text-white px-10 py-4 rounded-3xl font-black text-xl flex items-center gap-3 shadow-2xl hover:bg-gray-800 transition-all animate-bounce"
                  >
                    {isGenerating ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Sparkles size={24} />}
                    生成完賽影片
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                {/* n8n Workflow Insights */}
                <div className="bg-white p-10 rounded-[48px] shadow-xl border border-pink-50 overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-serif font-black flex items-center gap-3">
                      <ExternalLink className="text-pink-500" /> n8n 自動化中心
                    </h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Workflow Status: Active</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Weekly Mileage Chart */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">週里程趨勢 (Strava Sync)</label>
                        <TrendingUp size={14} className="text-green-500" />
                      </div>
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                            <YAxis hide />
                            <Tooltip 
                              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                              cursor={{ fill: '#f8fafc' }}
                            />
                            <Bar dataKey="km" fill="#ec4899" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* HR Zones Chart */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">心率區間分析 (AI Insights)</label>
                        <Activity size={14} className="text-blue-500" />
                      </div>
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={hrZones}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {hrZones.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* n8n Workflow Iframe Placeholder */}
                  <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <img src="https://n8n.io/favicon.ico" alt="n8n" className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-gray-800">Strava to Google Sheets Workflow</div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold">Last triggered: 5 mins ago</div>
                      </div>
                    </div>
                    <div className="aspect-video bg-white rounded-2xl border border-slate-200 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 backdrop-blur-[2px]">
                         <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                           <ExternalLink size={14} /> Open in n8n
                         </button>
                      </div>
                      <div className="text-center p-8">
                        <div className="flex justify-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 border border-orange-100">S</div>
                          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 border border-blue-100">→</div>
                          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-100">G</div>
                        </div>
                        <p className="text-xs text-gray-400 font-medium">n8n Workflow Iframe 預覽區域</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Run Flow */}
                <div className="bg-white p-10 rounded-[48px] shadow-xl border border-pink-50 relative overflow-hidden">
                  {step === 1 && (
                    <div className="animate-in fade-in duration-500">
                      <h3 className="text-2xl font-serif font-black mb-8 flex items-center gap-3">
                        <Calendar className="text-pink-500" /> 今日跑步設定
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="space-y-4">
                          <label className="block text-xs font-black text-gray-400 tracking-widest uppercase">選擇日期</label>
                          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-200" />
                        </div>
                        <div className="space-y-4">
                          <label className="block text-xs font-black text-gray-400 tracking-widest uppercase">預計里程 (km)</label>
                          <input type="number" value={selectedDistance} onChange={e => setSelectedDistance(Number(e.target.value))} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-200" />
                        </div>
                      </div>
                      <button onClick={handleStartRun} className="w-full py-6 bg-gray-900 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-4 hover:bg-gray-800 transition-all shadow-2xl">
                        <Play fill="white" size={24} /> 開啟 GPS 並開始跑步
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="text-center py-10 animate-in fade-in duration-500">
                      <div className="relative inline-block mb-10">
                        <div className="w-48 h-48 rounded-full border-8 border-pink-100 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute bottom-0 left-0 right-0 bg-pink-500 transition-all duration-300" style={{ height: `${runProgress}%` }}></div>
                          <div className="relative z-10 text-4xl font-serif font-black text-gray-900">{runProgress}%</div>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-pink-500 text-white p-3 rounded-full animate-pulse">
                          <MapPin size={24} />
                        </div>
                      </div>
                      <h3 className="text-3xl font-serif font-black mb-4 tracking-widest">GPS 追蹤中...</h3>
                      <p className="text-gray-400">正在同步您的運動軌跡，請保持移動。</p>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="text-center py-10 animate-in fade-in duration-500">
                      <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-3xl font-serif font-black mb-4">跑步完成！</h3>
                      <p className="text-gray-400 mb-10">拍下一張此刻的風景，累積您的自律里程。</p>
                      <button onClick={handlePhotoUpload} className="w-full max-w-md mx-auto py-6 bg-pink-500 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-4 hover:bg-pink-600 transition-all shadow-2xl">
                        <Smartphone size={24} /> 拍照並累積里程
                      </button>
                    </div>
                  )}
                </div>

                {/* Video Result */}
                {videoGenerated && (
                  <div className="bg-slate-900 p-10 rounded-[48px] text-white animate-in zoom-in duration-700">
                    <div className="flex flex-col md:flex-row gap-10">
                      <div className="w-full md:w-1/2 aspect-video bg-black/40 rounded-[32px] flex items-center justify-center relative overflow-hidden group cursor-pointer border border-white/10">
                        <Play fill="white" size={60} className="relative z-10" />
                        <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Video" />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <div className="japanese-stamp mb-6">完賽紀念影片</div>
                        <h3 className="text-3xl font-serif font-black mb-6">榮耀時刻</h3>
                        <p className="text-white/60 italic mb-8 leading-loose">「{aiStory}」</p>
                        <div className="flex gap-4">
                          <button className="flex-1 bg-pink-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2">
                            <Share2 size={18} /> 分享
                          </button>
                          <button className="bg-white/10 text-white py-4 px-6 rounded-2xl font-black flex items-center justify-center">
                            <Download size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { icon: Footprints, label: '累積里程', val: accumulatedKm.toFixed(1), unit: 'km', color: 'text-pink-500' },
                    { icon: Clock, label: '打卡次數', val: checkInCount, unit: '次', color: 'text-blue-500' },
                    { icon: Award, label: '目標進度', val: goalKm ? Math.min(100, (accumulatedKm / goalKm) * 100).toFixed(0) : 0, unit: '%', color: 'text-yellow-500' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center justify-center text-center group hover:bg-pink-50 transition-colors">
                      <stat.icon size={36} className={`${stat.color} mb-6 transition-transform group-hover:scale-110`} />
                      <div className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</div>
                      <div className="text-5xl font-serif font-black text-gray-900">{stat.val} <span className="text-lg font-normal">{stat.unit}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-10 rounded-[48px] border border-pink-100 shadow-sm relative overflow-hidden">
                   <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-pink-50 rounded-full blur-2xl"></div>
                   <Calendar size={36} className="text-pink-500 mb-6" />
                   <h3 className="text-2xl font-serif font-black mb-6 text-gray-800">自律打卡月曆</h3>
                   <div className="grid grid-cols-7 gap-3 mb-8">
                     {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                       <div key={d} className="text-center text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">{d}</div>
                     ))}
                     {[...Array(31)].map((_, i) => (
                       <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center text-xs font-bold transition-all ${
                         i < checkInCount ? 'bg-pink-500 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-300'
                       }`}>
                         {i + 1}
                       </div>
                     ))}
                   </div>
                   <div className="flex items-center justify-between p-6 bg-pink-50 rounded-[32px] border border-pink-100">
                      <div className="flex items-center gap-4">
                        <Mountain className="text-pink-600" size={24} />
                        <div>
                          <div className="text-xs text-pink-400 font-black uppercase">目前高度</div>
                          <div className="font-serif font-black text-xl text-gray-800">{(accumulatedKm * 80).toFixed(0)} <span className="text-xs font-normal">m</span></div>
                        </div>
                      </div>
                   </div>
                   <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                     <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">n8n: Discord Notification Sent</span>
                   </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
