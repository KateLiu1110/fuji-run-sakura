import React, { useState, useEffect } from 'react';
import { Home, ChevronUp, Award } from 'lucide-react';
import SakuraFalling from '../components/SakuraFalling';
import HeroSection from '../components/home/HeroSection';
import EventSection from '../components/home/EventSection';
import RoutesSection from '../components/home/RoutesSection';
import KnowledgeSection from '../components/home/KnowledgeSection';
import BoardSection from '../components/BoardSection';

interface HomePageProps {
  onNavigateToDiscipline?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDiscipline }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
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
              追櫻路線
            </button>
            <button 
              onClick={() => scrollTo('knowledge')} 
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeSection === 'knowledge' 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                  : 'text-slate-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              跑步知識
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

      {/* All Sections */}
      <HeroSection />
      <EventSection />
      <RoutesSection />
      <KnowledgeSection />
      <BoardSection />

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-pink-500 p-2 rounded-full text-white">
              <Home size={16} />
            </div>
            <span className="font-bold text-xl tracking-wider">櫻色富士</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 櫻色富士線上路跑 - 在台灣跑出日本感</p>
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
