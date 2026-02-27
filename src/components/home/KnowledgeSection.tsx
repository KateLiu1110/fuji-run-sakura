import React from 'react';
import { Activity, Brain, CheckCircle } from 'lucide-react';

const KnowledgeSection: React.FC = () => {
  return (
    <section id="knowledge" className="h-screen overflow-y-auto bg-slate-50 snap-start">
      <div className="py-24 min-h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">跑步好處 - 為什麼要跑步？</h2>
            <p className="text-slate-500">科學證明，跑步不僅鍛煉身體，更能提升心智韌性</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
      </div>
    </section>
  );
};

export default KnowledgeSection;
