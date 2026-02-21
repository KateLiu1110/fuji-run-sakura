import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend API
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#f9f5f6] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-pink-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-200">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 italic">櫻色富士</h1>
          <p className="text-gray-500 text-sm mt-2">ATRÉ PROJECT 跑者登入</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">
              Runner ID
            </label>
            <input 
              type="text" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 outline-none transition-all"
              placeholder="輸入跑者編號"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">
              Password
            </label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95 mt-4"
          >
            進入系統
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
