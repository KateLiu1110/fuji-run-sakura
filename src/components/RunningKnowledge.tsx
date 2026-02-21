
import React from 'react';
import { RUNNING_BENEFITS } from '../constants';

const RunningKnowledge: React.FC = () => {
  return (
    <section id="knowledge" className="relative z-10 py-24 bg-pink-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-800 tracking-widest mb-4">跑步好處</h2>
          <p className="text-xs text-gray-400 tracking-[0.2em] uppercase">The Benefits of Running</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {RUNNING_BENEFITS.map((benefit, i) => (
            <div key={i} className="bg-white p-10 rounded-sm shadow-sm border border-pink-50 hover:shadow-xl transition-all duration-500 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 tracking-wider">{benefit.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{benefit.desc}</p>
              <div className="w-10 h-px bg-pink-200 mb-6 group-hover:w-full transition-all"></div>
              <p className="text-[11px] text-gray-400 leading-loose italic">
                {benefit.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-white border border-pink-100 rounded-sm flex flex-col md:flex-row items-center gap-10 shadow-2xl">
          <div className="w-full md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=800" 
              alt="Meditation" 
              className="w-full h-64 object-cover rounded-sm"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h4 className="text-xl font-bold text-gray-800 mb-4 tracking-widest">冥想與自律</h4>
            <p className="text-sm text-gray-500 leading-loose mb-6">
              跑步不只是體力的消耗，更是一場與自我的對話。<br/>
              在規律的步伐中，大腦進入類冥想狀態，幫助您在繁忙的生活中找回平靜與專注。<br/>
              這就是為什麼許多成功的企業家都熱愛跑步的原因。
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-pink-50 text-pink-500 text-[10px] font-bold tracking-widest rounded-full">#心流狀態</span>
              <span className="px-4 py-2 bg-pink-50 text-pink-500 text-[10px] font-bold tracking-widest rounded-full">#自律思維</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RunningKnowledge;
