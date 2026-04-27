import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Library, Radio, Music, Settings } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/', filled: true },
  { icon: Library, label: 'Library', path: '/library' },
  { icon: Radio, label: 'Radio', path: '/radio' },
  { icon: Music, label: 'Music', path: '/music' },
];

const Sidebar = ({ onSettingsClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveIndex = () => {
    const activeItem = navItems.findIndex(item => item.path === location.pathname);
    return activeItem >= 0 ? activeItem : 0;
  };

  const activeNavIndex = getActiveIndex();
  return (
    <aside className="fixed left-4 top-4 flex flex-col items-center py-8 z-50 rounded-full h-[calc(100vh-2rem)] w-20 glass-sidebar">
      <div className="mb-12 sidebar-logo">
        <span className="text-cyan-400 font-bold text-2xl">M</span>
      </div>

      <nav className="flex flex-col gap-8 flex-1 sidebar-nav">
        {navItems.map((item, idx) => {
          const isActive = idx === activeNavIndex;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              title={item.label}
              className={`p-3 rounded-full transition-all hover-scale ${
                isActive
                  ? 'bg-cyan-400/20 text-cyan-400 scale-110'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-6 h-6" fill={item.filled ? 'currentColor' : 'none'} />
            </button>
          );
        })}
        
        {/* Settings button inside nav on mobile for alignment, hidden on desktop if mt-auto used */}
        <button 
          onClick={onSettingsClick}
          className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all p-3 mt-auto hover-scale lg:hidden"
          title="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </nav>

      <button 
        onClick={onSettingsClick}
        className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all p-3 mt-auto hover-scale hidden lg:block"
        title="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>
    </aside>
  );
};

export default Sidebar;