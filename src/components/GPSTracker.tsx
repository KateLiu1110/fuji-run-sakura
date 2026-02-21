
import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, MapPin, Mountain, Info, Navigation, Search } from 'lucide-react';

const GPSTracker: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [location, setLocation] = useState<string>('未偵測');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fujiProgress = Math.min((distance / 3.776) * 100, 100);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      }, () => {
        setLocation("定位權限未開啟");
      });
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    alert(`恭喜！你本次跑了 ${distance.toFixed(2)} 公里！繼續加油集富士山徽章！`);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
        setDistance((prev) => prev + 0.001);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  return (
    <div id="tracker" className="py-40 px-6 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Text and Style */}
          <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
             <div className="inline-block japanese-stamp mb-6 text-xl px-6 py-2">自律打卡</div>
             <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-8 tracking-widest leading-tight">
                實時路跑追蹤<br/>
                <span className="text-pink-400">數據見證成就</span>
             </h2>
             <p className="text-sm text-gray-500 leading-loose mb-12 max-w-lg mx-auto lg:mx-0">
                GPS 軌跡即時紀錄，每一次呼吸與汗水，<br/>
                都是通往富士山頂的自律之光。
             </p>

             <div className="bg-pink-50/50 p-8 rounded-sm border-l-4 border-pink-400 mb-12">
               <div className="flex items-start gap-4">
                 <Info className="text-pink-400 shrink-0" size={20} />
                 <p className="text-[11px] text-gray-500 leading-relaxed text-left">
                   部分櫻花路線屬於國家公園或私人領地，請務必確認已完成入園申請，避免影響他人及自身權益。
                 </p>
               </div>
             </div>

             <div className="flex justify-center lg:justify-start">
               <button className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition duration-300 border border-gray-100 group">
                  <Search className="text-gray-400 w-6 h-6 group-hover:text-pink-400 transition-colors" />
               </button>
             </div>
          </div>

          {/* Right Side: Tracking Card */}
          <div className="w-full lg:w-1/2 relative">
             <div className="absolute top-0 right-0 z-0 pointer-events-none">
               <h2 className="font-script text-[180px] text-pink-50/80 leading-none select-none">Live</h2>
             </div>
             
             <div className="relative z-10 bg-white p-10 md:p-14 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-sm border border-gray-50">
                <div className="grid grid-cols-2 gap-10 mb-12 border-b border-gray-100 pb-10">
                   <div>
                      <span className="text-[10px] tracking-[0.4em] font-black text-gray-400 block mb-2 uppercase">KM</span>
                      <span className="text-4xl font-serif font-bold text-gray-800">{distance.toFixed(3)}</span>
                   </div>
                   <div>
                      <span className="text-[10px] tracking-[0.4em] font-black text-gray-400 block mb-2 uppercase">TIME</span>
                      <span className="text-4xl font-serif font-bold text-gray-800 tabular-nums">{formatTime(time)}</span>
                   </div>
                </div>

                <div className="mb-12">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] tracking-widest font-bold text-pink-400 uppercase flex items-center gap-2">
                         <Navigation size={12} /> 登頂進度
                      </span>
                      <span className="text-xs font-bold text-gray-800">{fujiProgress.toFixed(1)}%</span>
                   </div>
                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${fujiProgress}%` }}
                      ></div>
                   </div>
                   <div className="flex justify-between mt-3 text-[9px] text-gray-400 tracking-widest font-bold uppercase">
                      <span>START</span>
                      <span className="flex items-center gap-1 text-fuji-blue"><Mountain size={10} /> FUJI SUMMIT</span>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                   {!isRunning ? (
                    <button 
                      onClick={handleStart}
                      className="w-full bg-pink-500 text-white py-5 rounded-full font-bold text-sm tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all hover:-translate-y-1"
                    >
                      <Play fill="currentColor" size={16} /> START RUN
                    </button>
                   ) : (
                    <button 
                      onClick={handleStop}
                      className="w-full bg-fuji-blue text-white py-5 rounded-full font-bold text-sm tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg hover:bg-black transition-all hover:-translate-y-1"
                    >
                      <Square fill="currentColor" size={16} /> STOP RUN
                    </button>
                   )}
                   
                   <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap flex items-center gap-2">
                      <MapPin size={12} className="text-pink-300" /> {location}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPSTracker;
