import React, { useEffect, useState } from 'react';
import { Trophy, Award, Star, Sparkles } from 'lucide-react';
import FujiMountainReward from '@/assets/images/FujiMountainReward.png';

interface CelebrationProps {
  onClose: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ onClose }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; duration: number; color: string }>>([]);

  useEffect(() => {
    // 生成隨機彩紙
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: ['#ec4899', '#f472b6', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 6)]
    }));
    setConfetti(pieces);

    // 5秒後自動關閉
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    // ESC 鍵關閉
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* 彩紙動畫 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm animate-fall"
            style={{
              left: `${piece.x}%`,
              top: '-20px',
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 獎牌卡片 */}
      <div 
        className="relative bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閃爍星星裝飾 */}
        <div className="absolute -top-4 -right-4 text-yellow-400 animate-pulse">
          <Sparkles size={48} fill="currentColor" />
        </div>
        <div className="absolute -bottom-4 -left-4 text-pink-400 animate-pulse">
          <Star size={40} fill="currentColor" />
        </div>
        
        {/* 獎牌圖示 */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full animate-spin-slow shadow-2xl shadow-yellow-500/50"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <Trophy size={64} className="text-yellow-500" />
          </div>
          {/* 綬帶 */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-16">
            <div className="w-6 h-16 bg-gradient-to-b from-pink-500 to-pink-600 absolute left-0 rounded-t-lg shadow-lg"></div>
            <div className="w-6 h-16 bg-gradient-to-b from-blue-500 to-blue-600 absolute right-0 rounded-t-lg shadow-lg"></div>
          </div>
        </div>

        {/* 文字內容 */}
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-800 mb-3 tracking-tight">
            恭喜完成目標！
          </h2>
          <div className="relative inline-block mb-6">
            <Award className="absolute -left-8 top-1/2 -translate-y-1/2 text-pink-500" size={24} />
                <img src={FujiMountainReward}
                alt="Mt. Fuji Commemorative Medal" 
                className="w-full h-full object-cover" />
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              櫻色富士挑戰者
            </p>
            <Award className="absolute -right-8 top-1/2 -translate-y-1/2 text-blue-500" size={24} />
          </div>
          
          <p className="text-slate-600 mb-8 text-sm leading-relaxed">
            您已經完成了所有訓練目標！<br/>
            每一步的堅持都值得驕傲 🌸
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95"
          >
            繼續前進
          </button>
        </div>

        {/* 漂浮的小星星 */}
        <div className="absolute top-20 left-8 text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }}>
          <Star size={20} fill="currentColor" />
        </div>
        <div className="absolute top-32 right-12 text-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }}>
          <Star size={16} fill="currentColor" />
        </div>
        <div className="absolute bottom-32 left-16 text-blue-400 animate-bounce" style={{ animationDelay: '0.6s' }}>
          <Star size={18} fill="currentColor" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          
          @keyframes spin-slow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          .animate-fall {
            animation: fall linear forwards;
          }
          
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `
      }} />
    </div>
  );
};

export default Celebration;
