import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Comment, CommunityPost } from '../types';

interface CommunityContextType {
  comments: Comment[];
  posts: CommunityPost[];
  addComment: (comment: Comment) => Promise<void>;
  deleteComment: (commentId: string) => void;
  addPost: (post: CommunityPost) => Promise<void>;
  likePost: (postId: string) => void;
  isLoading: boolean;
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
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addComment = useCallback(async (comment: Comment) => {
    setIsLoading(true);
    try {
      // TODO: 调用后端 API
      setComments(prev => [comment, ...prev]);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteComment = useCallback((commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    // TODO: 调用后端 API
  }, []);

  const addPost = useCallback(async (post: CommunityPost) => {
    setIsLoading(true);
    try {
      // TODO: 调用后端 API
      setPosts(prev => [post, ...prev]);
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const likePost = useCallback((postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    // TODO: 调用后端 API
  }, []);

  const value: CommunityContextType = {
    comments,
    posts,
    addComment,
    deleteComment,
    addPost,
    likePost,
    isLoading,
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
