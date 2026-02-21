
import React, { useEffect, useState } from 'react';

const SakuraFalling: React.FC = () => {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    const count = 30;
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 8}s`,
      size: Math.random() * 10 + 6,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute bg-pink-300 opacity-60 animate-fall"
          style={{
            left: petal.left,
            top: -20,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animation: `fall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            borderRadius: '100% 0% 100% 5%', // Sakura petal shape
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(0px); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(50px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SakuraFalling;
