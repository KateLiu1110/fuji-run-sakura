import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  MapPin, 
  Users, 
  CheckCircle, 
  User, 
  ChevronRight, 
  Trophy, 
  Activity, 
  Wind, 
  Brain,
  Navigation,
  X,
  ExternalLink,
  ChevronUp,
  Award
} from 'lucide-react';
import SakuraFalling from '../components/SakuraFalling';
import FujiMountainReward from '@/assets/images/FujiMountainReward.jpg'
import BoardSection from '@/components/BoardSection'

interface HomePageProps {
  onNavigateToDiscipline?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDiscipline }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<{name: string, location?: string} | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 監測滾動進度與當前區塊
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
      
      // 顯示/隱藏返回頂部按鈕
      setShowScrollTop(window.pageYOffset > 400);

      const sections = ['home', 'event', 'routes', 'knowledge', 'board'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化检查
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const openGPSMap = (route: {name: string, location?: string}) => {
    setSelectedRoute(route);
    setShowMapModal(true);
  };

  // 模擬數據
  const routes = [
    { name: "武陵農場櫻花跑", dist: "10km", elevation: "300m", type: "櫻花季限定", color: "bg-pink-100 text-pink-700" },
    { name: "淡水河濱美景", dist: "15km", elevation: "10m", type: "熱門路線", color: "bg-blue-100 text-blue-700" },
    { name: "陽明山越野徑", dist: "8km", elevation: "450m", type: "體能挑戰", color: "bg-green-100 text-green-700" },
    { name: "阿里山雲端路跑", dist: "21km", elevation: "600m", type: "專業推薦", color: "bg-orange-100 text-orange-700" },
  ];

  const steps = [
    { title: "註冊帳號", desc: "建立您的跑者專屬檔案" },
    { title: "上傳數據", desc: "串聯 Strava 或 Garmin GPS" },
    { title: "線上報名", desc: "選擇挑戰組別 (10k/半馬/全馬)" },
    { title: "解鎖榮耀", desc: "累積里程領取實體金牌" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      <SakuraFalling />
      
      {/* 滾動進度條 */}
      <div 
        className="fixed top-0 left-0 h-1 bg-pink-500 z-[100] transition-all duration-300" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Header 導航欄 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="bg-pink-500 p-2 rounded-full text-white">
              <Home size={20} />
            </div>
            <span className="font-black text-xl tracking-wider text-slate-800">櫻色富士</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => scrollTo('event')} 
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeSection === 'event' 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                  : 'text-slate-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              報名流程
            </button>
            <button 
              onClick={() => scrollTo('routes')} 
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeSection === 'routes' 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                  : 'text-slate-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              追櫻路線 & 練跑基地
            </button>
            <button 
              onClick={() => scrollTo('board')} 
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeSection === 'board' 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                  : 'text-slate-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              留言區
            </button>
            <button 
              onClick={onNavigateToDiscipline}
              className="px-4 py-2 rounded-lg font-bold transition-all text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 hover:shadow-lg hover:shadow-pink-200 flex items-center gap-2"
            >
              <Award size={18} />
              自律表
            </button>
          </nav>
        </div>
      </header>
      
      {/* 返回頂部櫻花按鈕 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 animate-bounce"
          title="返回頂部"
        >
          <div className="relative">
            <ChevronUp size={28} strokeWidth={3} />
            <div className="absolute -top-1 -right-1 text-xs">🌸</div>
          </div>
        </button>
      )}
      
      {/* GPS地图Modal */}
      {showMapModal && selectedRoute && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowMapModal(false)}>
          <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-white mb-1">{selectedRoute.name}</h3>
                {selectedRoute.location && (
                  <p className="text-pink-100 text-sm flex items-center gap-2">
                    <MapPin size={16} /> {selectedRoute.location}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-4">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(selectedRoute.name + ' ' + (selectedRoute.location || '台湾'))}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              <div className="flex gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRoute.name + ' ' + (selectedRoute.location || '台湾'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} /> 在 Google 地圖中打開
                </a>
                <button
                  onClick={() => setShowMapModal(false)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Hero Block */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* 背景裝飾 (富士山意象) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-pink-50 -z-10" />
        <div className="absolute left-[-10%] bottom-0 opacity-20 hidden lg:block">
          <svg width="800" height="400" viewBox="0 0 800 400">
            <path d="M0 400 L300 100 L400 180 L600 50 L800 400 Z" fill="#2563eb" />
            <path d="M300 100 L350 140 L250 140 Z" fill="white" />
            <path d="M600 50 L650 100 L550 100 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-pink-500 font-bold tracking-widest mb-2 uppercase">櫻色富士 · 線上路跑</h2>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
              在台灣跑出<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600">日本榮耀</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto lg:mx-0">
              打破地理限制，連結台灣最美櫻花徑，用雙腳攀越虛擬富士山。每一次擺臂，都是向自律致敬。
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <a 
                href="https://www.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 group"
              >
                立即報名挑戰 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-slate-500 text-sm font-medium">
                  <span className="text-slate-900 font-bold">+1,248</span> 人已報名
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="bg-white p-4 rounded-3xl shadow-2xl rotate-3 transition-transform hover:rotate-0">
              <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative">
                <img src={FujiMountainReward}
                  alt="Mt. Fuji Commemorative Medal" 
                  className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-center font-medium text-slate-500">2024 櫻色富士限定 · 完賽紀念獎牌</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 如何報名 (Event Steps) */}
      <section id="event" className="py-32 bg-[#fdf2f4] relative overflow-hidden">
        {/* Floating Sakura Petals for this section */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="absolute animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              <div className="w-4 h-4 bg-pink-300 rounded-full opacity-30 blur-sm"></div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          {/* Red Stamp */}
          <div className="inline-block border-2 border-red-600 px-4 py-1 mb-10 rotate-[-2deg] transform">
            <span className="text-red-600 font-bold text-sm tracking-[0.3em]">在台如在日</span>
          </div>

          {/* Poetic Headline */}
          <h2 className="whitespace-nowrap text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-8 leading-tight tracking-wide">
            春風拂過步道，帶來了新的挑戰與故事。
          </h2>

          {/* Editorial Subtext */}
          <p className="text-slate-500 text-sm md:text-base leading-loose max-w-2xl mx-auto mb-20 font-light tracking-widest">
            無論是自主訓練、還是尋找志同道合的跑友，讓我們在這個美好的季節一起揮汗成長。
          </p>

          {/* Steps Grid - Styled more subtly */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left cursor-pointer ">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group p-6 hover:bg-slate-50">
                <div className="text-xs font-black text-pink-400 mb-4 tracking-[0.2em] uppercase">Step 0{idx + 1}</div>
                <h3 className="text-lg font-bold mb-3 text-slate-800">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                <div className="absolute -left-4 top-0 w-[1px] h-full bg-pink-100 group-hover:bg-pink-400 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 台灣路線 & 跑步知識 (Routes & Knowledge) */}
      <section id="routes" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">追櫻路線 & 台灣練跑地</h2>
              <p className="text-slate-500">我們為您挑選了最具「日本既視感」的台灣路線</p>
            </div>
            <button className="flex items-center gap-2 text-pink-600 font-bold hover:gap-3 transition-all">
              查看互動地圖 <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-40 bg-slate-200 relative">
                  <div className="absolute inset-0 bg-slate-300 group-hover:bg-pink-100 transition-colors flex items-center justify-center">
                    <MapPin className="text-white group-hover:text-pink-300" size={40} />
                  </div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${route.color}`}>
                    {route.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4">{route.name}</h3>
                  <div className="flex justify-between text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Activity size={14}/> {route.dist}</span>
                    <span className="flex items-center gap-1"><Wind size={14}/> {route.elevation}</span>
                  </div>
                  <button 
                    onClick={() => openGPSMap({name: route.name})}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors text-sm font-bold shadow-lg shadow-pink-100 active:scale-95"
                  >
                    <Navigation size={14}/> GPS 路线
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 跑步好處 (Knowledge Block) */}
          <div id="knowledge" className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white flex flex-col justify-between">
              <div>
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Activity size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">身體健康：強健心肺</h3>
                <p className="text-blue-100 mb-6">定期路跑能有效增強心血管耐力，減少壓力。根據統計，完成 50km 線上跑的跑者，靜息心率平均下降 5-8 bpm。</p>
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl">
                  <div className="text-center flex-1">
                    <p className="text-xs uppercase opacity-70">訓練前</p>
                    <p className="text-xl font-bold">100% 壓力</p>
                  </div>
                  <div className="w-[2px] h-8 bg-white/20"></div>
                  <div className="text-center flex-1">
                    <p className="text-xs uppercase opacity-70">挑戰後</p>
                    <p className="text-xl font-bold text-blue-300">40% 冥想態</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="bg-pink-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-pink-600">
                  <Brain size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">腦袋清晰：自律思維</h3>
                <p className="text-slate-500 mb-6">「跑步即禪定」。在長距離奔跑中，您將學會如何與孤獨相處，建立起堅定的自律習慣，這將轉化為您在事業與生活中的最強後盾。</p>
              </div>
              <ul className="space-y-3">
                {["提升決策果斷度", "增加日常專注時數", "建立對挫折的韌性"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle className="text-green-500" size={18} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 留言板 (Board) */}
      <BoardSection/>
      {/* <section id="board" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2">跑者留言板</h2>
            <p className="text-slate-500">分享您的路跑風景，為隊友打氣</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl flex gap-4">
              <div className="w-12 h-12 rounded-full bg-pink-200 shrink-0"></div>
              <div className="flex-1">
                <p className="font-bold text-sm mb-1">小林 (台北)</p>
                <p className="text-slate-600 bg-white p-4 rounded-xl shadow-sm italic">
                  「今天在淡水跑了 10km，夕陽很美，很有在日本湘南跑馬拉松的感覺！大家加油！」
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-200 shrink-0"></div>
              <div className="flex-1">
                <p className="font-bold text-sm mb-1">阿強 (台中)</p>
                <p className="text-slate-600 bg-white p-4 rounded-xl shadow-sm italic">
                  「目標月底前累積到 50km，為了那塊富士山獎牌拼了！」
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <input 
              type="text" 
              placeholder="說點什麼來激勵其他跑者..." 
              className="w-full max-w-lg px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
            />
            <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold">送出鼓勵</button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-pink-500 p-2 rounded-full text-white">
              <Home size={16} />
            </div>
            <span className="font-bold text-xl tracking-wider">櫻色富士</span>
          </div>
          <p className="text-slate-400 text-sm">© 2024 櫻色富士線上路跑 - 在台灣跑出日本感</p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-pink-50">IG</div>
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-pink-50">FB</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
