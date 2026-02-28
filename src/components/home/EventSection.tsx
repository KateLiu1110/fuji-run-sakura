import React, { useEffect, useState } from 'react';
import { api, RegistrationStep } from '../../services/api';

interface EventSectionProps {
  steps?: RegistrationStep[];
}

const EventSection: React.FC<EventSectionProps> = ({ steps: propSteps }) => {
  const defaultSteps: RegistrationStep[] = [
    { title: "註冊帳號", desc: "建立您的跑者專屬檔案" },
    { title: "上傳數據", desc: "串聯 Strava 或 Garmin GPS" },
    { title: "線上報名", desc: "選擇挑戰組別 (10k/半馬/全馬)" },
    { title: "解鎖榮耀", desc: "累積里程領取實體金牌" },
  ];

  const [steps, setSteps] = useState<RegistrationStep[]>(defaultSteps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      if (propSteps) {
        setSteps(propSteps);
        setLoading(false);
        return;
      }

      try {
        const response = await api.registration.getSteps();
        if (response.data) {
          setSteps(response.data);
        } else {
          setSteps(defaultSteps);
        }
      } catch (error) {
        // 静默使用默认数据
        setSteps(defaultSteps);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, [propSteps]);

  const stepsToRender = steps.length > 0 ? steps : defaultSteps;

  return (
    <section id="event" className="h-screen overflow-y-auto bg-[#fdf2f4] relative snap-start">
      <div className="py-24 min-h-full flex items-center">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left cursor-pointer">
            {stepsToRender.map((step, idx) => (
              <div key={idx} className="relative group p-6 hover:bg-slate-50">
                <div className="text-xs font-black text-pink-400 mb-4 tracking-[0.2em] uppercase">Step 0{idx + 1}</div>
                <h3 className="text-lg font-bold mb-3 text-slate-800">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                <div className="absolute -left-4 top-0 w-[1px] h-full bg-pink-100 group-hover:bg-pink-400 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
