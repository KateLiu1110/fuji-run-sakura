import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
// 記得確認這兩個路徑是否符合你專案的實際位置
import { Comment } from '../types';
import { useCommunity } from '../store/CommunityContext';
 
const BoardSection: React.FC = () => {
  // 1. 從 Store 取得留言資料與新增方法
  const { comments, addComment } = useCommunity();
  
  // 2. 設定表單的 Local State
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  // 3. 處理表單送出
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 防止畫面重整
    
    // 簡單的防呆：確保名稱和內容都有填寫
    if (!newComment.trim() || !author.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: author,
      content: newComment,
      timestamp: new Date()
    };
    
    // 寫入 Store
    addComment(comment);
    
    // 清空表單
    setNewComment('');
    setAuthor('');
  };

  return (
    <section id="board" className="h-screen overflow-y-auto bg-white snap-start">
      <div className="py-24 min-h-full">
        <div className="max-w-4xl mx-auto px-6">
        
        {/* 標題區 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">跑者留言板</h2>
          <p className="text-slate-500">分享您的路跑風景，為隊友打氣</p>
        </div>

        {/* 留言列表區 (動態渲染) */}
        <div className="space-y-6 mb-16">
          {/* 如果沒有留言，顯示提示訊息 */}
          {comments.length === 0 ? (
            <p className="text-center text-slate-400 italic">目前還沒有留言，快來搶頭香吧！</p>
          ) : (
            // 迴圈渲染陣列中的留言
            comments.map((c) => (
              <div key={c.id} className="bg-slate-50 p-6 rounded-2xl flex gap-4 animate-fade-in">
                {/* 頭像區域 */}
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <MessageSquare className="text-pink-400" size={20} />
                </div>
                
                {/* 留言內容 */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="font-bold text-sm text-slate-800">{c.author}</p>
                    <span className="text-xs text-slate-400">
                      {new Date(c.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 bg-white p-4 rounded-xl shadow-sm italic">
                    「{c.content}」
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 發布留言表單區 */}
        <form onSubmit={handleSubmit} className="bg-slate-50 p-8 rounded-3xl mt-12 flex flex-col items-center border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-slate-700 w-full text-left max-w-2xl">新增留言</h3>
          
          <div className="w-full max-w-2xl flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="您的暱稱 (例如: 小林 - 台北)" 
              className="w-full px-6 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            
            <textarea 
              placeholder="說點什麼來激勵其他跑者..." 
              rows={3}
              className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            
            <button 
              type="submit" 
              className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors self-end mt-2"
            >
              送出鼓勵 <Send size={16} />
            </button>
          </div>
        </form>

        </div>
      </div>
    </section>
  );
};

export default BoardSection;