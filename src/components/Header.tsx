
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'dashboard';
  setActiveTab: (tab: 'home' | 'dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '跑步知識', href: '#knowledge' },
    { name: '台灣路線', href: '#routes' },
    { name: '報名揪團', href: '#groups' },
    { name: '自律打卡', href: '#tracker' },
    { name: '個人紀錄', href: '#dashboard' },
    { name: '留言板', href: '#comments' },
  ];

  const handleTabChange = (tab: 'home' | 'dashboard') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      isScrolled || activeTab === 'dashboard' ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'py-8 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => handleTabChange('home')}
          className={`flex items-center gap-3 text-lg font-bold tracking-[0.4em] uppercase cursor-pointer transition-colors ${
            isScrolled || activeTab === 'dashboard' ? 'text-gray-800' : 'text-white'
          }`}
        >
          <span className="text-2xl">🏃‍♂️</span>
          <div>
            櫻色富士 <span className="text-[10px] opacity-60 ml-2 tracking-widest">Atré Project</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {activeTab === 'home' && navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[10px] font-bold tracking-[0.3em] uppercase hover:text-pink-500 transition-all ${
                isScrolled ? 'text-gray-500' : 'text-white/80'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={() => handleTabChange(activeTab === 'home' ? 'dashboard' : 'home')}
            className={`px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all shadow-xl ${
              activeTab === 'dashboard' 
                ? 'bg-[#1a365d] text-white hover:bg-black' 
                : isScrolled 
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-white/20 text-white backdrop-blur-md hover:bg-white/40 border border-white/30'
            }`}
          >
            {activeTab === 'home' ? '個人專區 MEMBER' : '返回首頁 HOME'}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled || activeTab === 'dashboard' ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-8 gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 font-bold text-xs tracking-[0.4em] uppercase py-2 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => handleTabChange('dashboard')}
              className="w-full bg-pink-500 text-white py-4 rounded-full font-black text-xs tracking-[0.4em] uppercase shadow-lg"
            >
              個人專區 MEMBER
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
