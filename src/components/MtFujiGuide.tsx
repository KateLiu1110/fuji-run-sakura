
import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { MT_FUJI_OFFICIAL_URL } from '../constants';

const MtFujiGuide: React.FC = () => {
  return (
    <div id="register" className="relative py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Header Script Style Decorative Background */}
          <div className="absolute top-20 left-10 md:left-24 lg:left-40 z-0">
             <h2 className="font-script text-8xl md:text-[12rem] text-pink-100 opacity-80 select-none pointer-events-none">Guide</h2>
          </div>

          {/* Left Info Card */}
          <div className="bg-white p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] z-20 w-full lg:w-5/12 rounded-sm border border-gray-100 relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 tracking-widest leading-relaxed">
              富士山，跑出榮耀<br/>
              <span className="text-pink-400">在台灣解鎖日本獎牌</span>
            </h3>
            
            <p className="text-sm text-gray-500 leading-loose mb-10">
              雖是線上跑，也要跑出日本感覺！<br/>
              透過 GPS 紀錄，在台灣的每一公里都等同於攀登富士山的壯舉。<br/>
              完成挑戰，即可獲得從日本直送的實體榮耀。
            </p>

            <div className="space-y-8 mb-12">
              {[
                { title: '註冊帳號', desc: '建立您的跑友檔案，開啟自律旅程。' },
                { title: '上傳 GPS 紀錄', desc: '支援 Strava / Garmin 數據同步。' },
                { title: '線上路跑報名', desc: '選擇挑戰組別 (10k / 半馬 / 全馬)，正式開跑。' },
                { title: '追蹤進度，領獎牌', desc: '累積里程，解鎖富士山實體獎牌。' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-bold text-xs shrink-0">{i+1}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1 tracking-wider">{step.title}</h4>
                    <p className="text-[11px] text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#register" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-pink-500 text-white rounded-full text-xs font-bold tracking-[0.2em] shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all hover:scale-105"
              >
                立即報名 <ArrowRight size={14} />
              </a>
              <button className="inline-flex items-center gap-3 px-8 py-4 border border-pink-200 text-pink-500 rounded-full text-xs font-bold tracking-[0.2em] hover:bg-pink-50 transition-all">
                看獎牌詳情
              </button>
            </div>
          </div>

          {/* Right Image / Badges Area */}
          <div className="w-full lg:w-6/12 relative group">
            <div className="absolute inset-0 bg-pink-50 transform translate-x-4 translate-y-4 rounded-sm transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative z-10 bg-white p-2 shadow-md rounded-sm overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1578416065124-b35b330002e8?auto=format&fit=crop&q=80&w=1200" 
                alt="Fuji Medal" 
                className="w-full h-[500px] object-cover rounded-sm grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-10 left-10 text-white drop-shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-[1px] bg-white"></div>
                   <span className="text-[10px] tracking-[0.5em] font-bold">FINISHER REWARD</span>
                </div>
                <h4 className="text-3xl font-bold tracking-widest italic">完賽者榮耀</h4>
              </div>
            </div>

            {/* Floating Badge Info */}
            <div className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-8 shadow-2xl z-30 max-w-[280px] rounded-sm hidden md:block border border-gray-50">
               <h4 className="text-yellow-500 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
                  <Award size={18} /> 立體造型獎牌
               </h4>
               <p className="text-[11px] text-gray-500 leading-relaxed">
                  集齊 5 站大獎牌，即可拼成「立體富士山」造型。精緻的設計充滿季節特色，且手感紮實富有份量感。
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MtFujiGuide;
