import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Comment } from '../types';

interface CommunityContextType {
  comments: Comment[];
  addComment: (comment: Comment) => Promise<void>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

interface CommunityProviderProps {
  children: ReactNode;
}

export const CommunityProvider: React.FC<CommunityProviderProps> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([
    { 
      id: '1', 
      author: '小跑', 
      content: '今天去武陵跑了 10k，櫻花真的超美！大家加油！', 
      timestamp: new Date() 
    },
    { 
      id: '2', 
      author: 'FujiMaster', 
      content: '富士山線上賽報名成功，開始自主訓練囉。', 
      timestamp: new Date() 
    },
  ]);

  const addComment = useCallback(async (comment: Comment) => {
    try {
      // TODO: 调用后端 API
      setComments(prev => [comment, ...prev]);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }, []);

  const value: CommunityContextType = {
    comments,
    addComment,
  };

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};

export const useCommunity = (): CommunityContextType => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
