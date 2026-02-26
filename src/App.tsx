import React, { useState, useEffect } from 'react';
import { Home, CheckCircle } from 'lucide-react';
import HomePage from './pages/HomePage';
import SelfDisciplinePage from './pages/SelfDisciplinePage';
import LoginPage from './pages/LoginPage';
import { CommunityProvider } from './store/CommunityContext';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'discipline'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('fuji_is_logged_in') === 'true';
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [pendingView, setPendingView] = useState<'home' | 'discipline' | null>(null);

  // Sync login state to localStorage
  useEffect(() => {
    localStorage.setItem('fuji_is_logged_in', isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('discipline'); // 登入後自動進入自律表
  };

  const handleViewChange = (newView: 'home' | 'discipline') => {
    if (view === 'discipline' && isLoggedIn && newView === 'home') {
      setPendingView(newView);
      setShowLogoutConfirm(true);
      return;
    }
    setView(newView);
    if (newView === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('fuji_is_logged_in');
    if (pendingView) setView(pendingView);
    setShowLogoutConfirm(false);
    setPendingView(null);
  };

  const cancelLogout = () => {
    if (pendingView) setView(pendingView);
    setShowLogoutConfirm(false);
    setPendingView(null);
  };

  // 如果未登入且在自律表頁面，先顯示登入頁
  if (view === 'discipline' && !isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <CommunityProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative">
        {/* 固定導航欄 */}
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleViewChange('home')}>
            <div className="bg-pink-500 p-2 rounded-full text-white transition-transform group-hover:scale-110">
              <Home size={20} />
            </div>
            <span className="font-bold text-lg hidden sm:inline tracking-wider">櫻色富士</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            <button
              onClick={() => handleViewChange('home')}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all font-bold ${
                view === 'home' 
                  ? 'text-white bg-pink-500 shadow-lg shadow-pink-200' 
                  : 'text-slate-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              <Home size={18}/>
              <span className="hidden md:inline">首頁</span>
            </button>
            
            <button
              onClick={() => handleViewChange('discipline')}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all font-bold ${
                view === 'discipline' 
                  ? 'text-white bg-pink-500 shadow-lg shadow-pink-200' 
                  : 'text-slate-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              <CheckCircle size={18}/>
              <span className="hidden md:inline">自律表</span>
            </button>
          </div>
        </nav>

        {/* Logout Confirmation Popup */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
            <div className="bg-white rounded-[32px] p-10 max-w-sm w-full shadow-2xl text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500">
                <Home size={40} />
              </div>
              <h3 className="text-2xl font-serif font-black mb-4">即將離開頁面</h3>
              <p className="text-gray-500 mb-8">您是否要同時登出跑者帳號？<br/>(您的紀錄將會被保留)</p>
              <div className="space-y-3">
                <button 
                  onClick={confirmLogout}
                  className="w-full py-4 bg-pink-500 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-pink-600 transition-all"
                >
                  登出並離開
                </button>
                <button 
                  onClick={cancelLogout}
                  className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all"
                >
                  保留登入並離開
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="pt-16">
          {view === 'home' ? (
            <HomePage onNavigateToDiscipline={() => handleViewChange('discipline')} />
          ) : (
            <SelfDisciplinePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      </div>
    </CommunityProvider>
  );
};

export default App;
