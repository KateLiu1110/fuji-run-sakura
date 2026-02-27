import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Activity, Wind, Navigation, X, ExternalLink } from 'lucide-react';
import { api, SimpleRoute } from '../../services/api';

interface RoutesSectionProps {
  routes?: SimpleRoute[];
}

const RoutesSection: React.FC<RoutesSectionProps> = ({ routes: propRoutes }) => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<{name: string, location?: string} | null>(null);
  const [routes, setRoutes] = useState<SimpleRoute[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultRoutes: SimpleRoute[] = [
    { name: "武陵農場櫻花跑", dist: "10km", elevation: "300m", type: "櫻花季限定", color: "bg-pink-100 text-pink-700" },
    { name: "淡水河濱美景", dist: "15km", elevation: "10m", type: "熱門路線", color: "bg-blue-100 text-blue-700" },
    { name: "陽明山越野徑", dist: "8km", elevation: "450m", type: "體能挑戰", color: "bg-green-100 text-green-700" },
    { name: "阿里山雲端路跑", dist: "21km", elevation: "600m", type: "專業推薦", color: "bg-orange-100 text-orange-700" },
  ];

  useEffect(() => {
    const fetchRoutes = async () => {
      if (propRoutes) {
        setRoutes(propRoutes);
        setLoading(false);
        return;
      }

      try {
        const response = await api.route.getAll();
        if (response.data) {
          setRoutes(response.data);
        } else {
          setRoutes(defaultRoutes);
        }
      } catch (error) {
        console.error('Failed to fetch routes:', error);
        setRoutes(defaultRoutes);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [propRoutes]);

  const routesToRender = routes.length > 0 ? routes : defaultRoutes;
  
  const openGPSMap = (route: {name: string, location?: string}) => {
    setSelectedRoute(route);
    setShowMapModal(true);
  };

  return (
    <>
      <section id="routes" className="h-screen overflow-y-auto bg-slate-50 snap-start">
        <div className="py-24 min-h-full">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">追櫻路線 & 台灣練跑地</h2>
                <p className="text-slate-500">我們為您挑選了最具「日本既視感」的台灣路線</p>
              </div>
              <button className="flex items-center gap-2 text-pink-600 font-bold hover:gap-3 transition-all">
                查看互動地圖 <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {routesToRender.map((route, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="h-40 bg-slate-200 relative">
                    <div className="absolute inset-0 bg-slate-300 group-hover:bg-pink-100 transition-colors flex items-center justify-center">
                      <MapPin className="text-white group-hover:text-pink-300" size={40} />
                    </div>
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${route.color}`}>
                      {route.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-4">{route.name}</h3>
                    <div className="flex justify-between text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1"><Activity size={14}/> {route.dist}</span>
                      <span className="flex items-center gap-1"><Wind size={14}/> {route.elevation}</span>
                    </div>
                    <button 
                      onClick={() => openGPSMap({name: route.name})}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors text-sm font-bold shadow-lg shadow-pink-100 active:scale-95"
                    >
                      <Navigation size={14}/> GPS 路线
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GPS地圖Modal */}
      {showMapModal && selectedRoute && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowMapModal(false)}>
          <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-white mb-1">{selectedRoute.name}</h3>
                {selectedRoute.location && (
                  <p className="text-pink-100 text-sm flex items-center gap-2">
                    <MapPin size={16} /> {selectedRoute.location}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-4">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(selectedRoute.name + ' ' + (selectedRoute.location || '台湾'))}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              <div className="flex gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRoute.name + ' ' + (selectedRoute.location || '台湾'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} /> 在 Google 地圖中打開
                </a>
                <button
                  onClick={() => setShowMapModal(false)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoutesSection;
