
import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Comment } from '../types';

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', author: '小跑', content: '今天去武陵跑了 10k，櫻花真的超美！大家加油！', timestamp: new Date() },
    { id: '2', author: 'FujiMaster', content: '富士山線上賽報名成功，開始自主訓練囉。', timestamp: new Date() },
  ]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: author,
      content: newComment,
      timestamp: new Date()
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    setAuthor('');
  };

  return (
    <div className="py-24 px-4 bg-[#fff9f9]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">跑友留言牆</h2>
          <p className="text-gray-600">分享你的賞櫻路線或是訓練心得</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm mb-12 border border-pink-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="您的暱稱" 
              className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <textarea 
            placeholder="寫下您的留言..." 
            rows={4}
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 mb-4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-pink-600 transition-all ml-auto shadow-md">
            發佈留言 <Send size={18} />
          </button>
        </form>

        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="bg-white p-6 rounded-3xl flex gap-4 shadow-sm animate-fade-in border border-gray-50">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center shrink-0">
                <MessageSquare className="text-pink-500" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-gray-800">{c.author}</span>
                  <span className="text-xs text-gray-400">{c.timestamp.toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
