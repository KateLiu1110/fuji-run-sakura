
import React, { useState } from 'react';
import { MessageCircle, Share2, Users, UserPlus, Copy, Check, Link2, QrCode, ArrowRight } from 'lucide-react';

const Community: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSyncLine = () => {
    setIsSynced(true);
    setTimeout(() => {
      alert("Line 資訊已成功同步！個人跑力數據、目標路線已更新至會員系統。");
    }, 500);
  };

  return (
    <div id="community" className="py-32 px-4 bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Background Decorative Script */}
      <div className="absolute top-20 right-10 md:right-24 lg:right-40 z-0">
         <h2 className="font-script text-8xl md:text-[12rem] text-pink-50 opacity-80 select-none pointer-events-none">Social</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="japanese-stamp mb-4 text-xl px-6 py-2">跑友結盟</div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-[0.2em]">社群揪團與自律連動</h2>
          <p className="text-gray-400 text-sm tracking-widest uppercase font-bold">Connect with Fellow Runners</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Column 1: QR Code Scanner Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm border border-gray-100 relative group transition-all hover:shadow-2xl">
              <div className="absolute -top-6 -left-6 bg-pink-500 text-white p-4 rounded-full shadow-lg shadow-pink-200">
                <QrCode size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-6 tracking-widest flex items-center gap-2">
                掃碼加入 <span className="text-pink-500">Line 群組</span>
              </h3>
              
              <div className="relative mb-8 bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center group-hover:border-pink-300 transition-colors">
                {/* Placeholder QR Code - In production, replace with real Line Group QR */}
                <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-inner flex items-center justify-center relative">
                   <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://line.me/ti/g2/placeholder" 
                    alt="Line Group QR Code" 
                    className="w-full h-full object-contain"
                   />
                   <div className="absolute inset-0 flex items-center justify-center bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-[10px] font-black tracking-widest text-pink-500 uppercase flex flex-col items-center gap-1">
                         <span className="bg-pink-500 text-white px-3 py-1 rounded-full">SCAN ME</span>
                      </div>
                   </div>
                </div>
                <p className="mt-6 text-[11px] text-gray-400 text-center leading-loose tracking-widest">
                  掃描上方 QR Code 立即加入<br/>「櫻色富士 官方跑友圈」<br/>分享即時花況與賽事情報
                </p>
              </div>

              <a href="#" className="w-full flex items-center justify-center gap-3 py-4 bg-[#06C755] text-white rounded-full font-black text-xs tracking-[0.2em] shadow-lg shadow-[#06C755]/20 hover:brightness-110 transition-all">
                <MessageCircle fill="white" size={16} /> 開啟 LINE APP
              </a>
            </div>
          </div>

          {/* Column 2: Share & Invite Section */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#fffcfd] p-10 rounded-sm border border-pink-50 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 tracking-widest flex items-center gap-2">
                  <Users className="text-pink-500" /> 邀請跑友
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-8 tracking-wide">
                  一個人跑得快，一群人跑得遠。將這份自律的精神分享給更多人，共同見證櫻花盛放。
                </p>
                
                <div className="grid grid-cols-1 gap-4 mb-10">
                  <button 
                    onClick={handleCopyLink}
                    className={`flex items-center gap-4 p-5 rounded-2xl transition-all border-2 ${
                      isCopied ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-pink-50 text-gray-600 hover:border-pink-200'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${isCopied ? 'bg-green-500 text-white' : 'bg-pink-100 text-pink-500'}`}>
                      {isCopied ? <Check size={20} /> : <Link2 size={20} />}
                    </div>
                    <div className="text-left">
                      <div className="font-black text-sm">{isCopied ? "連結已複製" : "專屬邀請連結"}</div>
                      <div className="text-[10px] opacity-60">點擊複製邀請連結</div>
                    </div>
                  </button>

                  <a href="#" className="flex items-center gap-4 bg-white border-2 border-gray-50 p-5 rounded-2xl hover:border-blue-100 transition-all group">
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Share2 size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-sm">Threads 跑友圈</div>
                      <div className="text-[10px] opacity-60 text-gray-400">分享挑戰日誌</div>
                    </div>
                  </a>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 py-4 border border-pink-200 text-pink-500 rounded-full font-black text-xs tracking-[0.2em] hover:bg-pink-50 transition-all">
                <UserPlus size={16} /> 製作櫻花邀請卡
              </button>
            </div>
          </div>

          {/* Column 3: Member Sync Section */}
          <div className="lg:col-span-1">
            <div className="bg-fuji-blue p-10 rounded-sm text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              {/* Decorative Circle */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 tracking-widest flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-pink-400"></span>
                  會員同步系統
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-10 tracking-wide">
                  同步您的 Line 資訊至櫻色富士系統，讓數據整合更輕鬆。我們將自動導入您的暱稱與跑步里程。
                </p>
                
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white/40 overflow-hidden ring-4 ring-white/5">
                        {isSynced ? (
                          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="Avatar" />
                        ) : (
                          <Users size={24} />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="font-black text-sm">{isSynced ? "跑者：Alex Chen" : "未連結 Line 資訊"}</div>
                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{isSynced ? "STATUS: CONNECTED" : "STATUS: DISCONNECTED"}</div>
                      </div>
                      {isSynced && <div className="text-pink-400"><Check size={20} /></div>}
                   </div>
                </div>
              </div>

              {!isSynced ? (
                <button 
                  onClick={handleSyncLine}
                  className="w-full bg-white text-fuji-blue py-5 rounded-full font-black text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-pink-50 transition-all shadow-xl"
                >
                  <Copy size={16} /> 同步 LINE 帳號資料
                </button>
              ) : (
                <div className="w-full border border-white/20 text-white/40 py-5 rounded-full font-black text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 cursor-default">
                  資訊已成功串接 SUCCESS
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
