
import React from 'react';
import { SAKURA_ROUTES } from '../constants';
import { MapPin, Search } from 'lucide-react';

const SakuraRoutes: React.FC = () => {
  return (
    <section id="routes" className="relative z-10 py-24 bg-gradient-to-b from-pink-50/50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative">
           <h2 className="font-script text-7xl md:text-9xl text-pink-100 opacity-90 select-none">Routes</h2>
           <div className="relative z-10 -mt-10 md:-mt-16">
              <h3 className="text-2xl font-bold text-gray-800 tracking-widest">在地追櫻路線</h3>
              <p className="text-[10px] tracking-widest text-gray-400 mt-2 uppercase">Recommended Running Spots</p>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {SAKURA_ROUTES.map((route) => (
            <div key={route.id} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden mb-5 border-4 border-white shadow-lg rounded-sm bg-white">
                <div className="absolute top-2 left-2 bg-pink-500 text-white text-[9px] px-2 py-1 z-20 font-bold tracking-widest">
                  {route.distance} KM
                </div>
                <img 
                  src={route.image} 
                  alt={route.name}
                  className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/10 transition duration-300 flex items-center justify-center">
                   <Search className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                </div>
              </div>
              <h4 className="text-sm font-bold text-gray-700 group-hover:text-pink-500 transition tracking-wider mb-1">
                {route.name}
              </h4>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <MapPin size={10} /> {route.location}
                </div>
                <button className="text-[9px] font-bold text-pink-500 hover:underline tracking-widest uppercase">
                  GPX 下載
                </button>
              </div>
              <div className="w-6 h-px bg-gray-300 mt-3 group-hover:w-12 group-hover:bg-pink-300 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SakuraRoutes;
