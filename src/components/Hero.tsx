
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <header className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center">
      {/* 背景圖 (富士山) */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[20s] ease-linear transform scale-100"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2076&auto=format&fit=crop")' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-0"></div>

      {/* 佈局內容 */}
      <div className="container mx-auto px-6 relative z-10 h-full flex items-center justify-between text-white">
        {/* 左側：富士山意象 (這裡用文字或裝飾) */}
        <div className="hidden lg:block w-1/4">
          <div className="writing-vertical text-6xl font-serif opacity-20 select-none tracking-[1em]">
            富士山
          </div>
        </div>

        {/* 中央：Logo 與 獎牌 */}
        <div className="flex-1 text-center">
          <div className="relative inline-block p-12 md:p-16">
            <svg className="absolute inset-0 w-full h-full text-white opacity-40 animate-pulse-slow" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 20C110 5 130 5 140 20C155 10 170 20 170 40C185 45 190 65 180 80C195 95 185 115 170 120C170 140 150 150 135 140C125 155 105 160 90 150C75 160 55 155 45 140C30 150 10 140 10 120C-5 115 -5 95 10 80C-5 65 5 45 20 40C20 20 35 10 50 20C60 5 80 5 90 20C93 18 97 18 100 20Z" stroke="currentColor" strokeWidth="0.8"/>
            </svg>
            
            <div className="relative z-10">
              <div className="w-40 h-40 md:w-64 md:h-64 mx-auto mb-6 drop-shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1578416065124-b35b330002e8?auto=format&fit=crop&q=80&w=800" 
                  alt="Fuji Pyramid Medal" 
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-widest whitespace-nowrap shadow-lg">
                  立體富士山造型獎牌
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-[0.2em] mb-4">櫻色富士</h1>
              <p className="text-sm md:text-lg tracking-[0.4em] font-light opacity-90">在台灣跑出日本榮耀</p>
            </div>
          </div>
        </div>

        {/* 右側：線上路跑 */}
        <div className="hidden lg:block w-1/4 text-right">
          <div className="writing-vertical text-6xl font-serif opacity-20 select-none tracking-[1em] ml-auto">
            線上路跑
          </div>
        </div>
      </div>

      {/* 底部導引與裝飾 */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center animate-bounce">
         <p className="text-[10px] tracking-[0.8em] text-white opacity-60 mb-2 uppercase">Scroll Down</p>
         <ChevronDown className="mx-auto text-white" size={24} strokeWidth={1} />
      </div>
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#fdf2f4] to-transparent z-10"></div>
    </header>
  );
};

export default Hero;
