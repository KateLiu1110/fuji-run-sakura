import React from 'react';
import { ChevronRight } from 'lucide-react';
import FujiMountainReward from '@/assets/images/FujiMountainReward.png';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
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
            <p className="mt-4 text-center font-medium text-slate-500">2026 櫻色富士限定 · 完賽紀念獎牌</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
