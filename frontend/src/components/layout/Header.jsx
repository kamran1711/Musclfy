import React, { useState, useRef, useEffect } from 'react';
import { Search, Cast, Bell, Settings, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ searchQuery, setSearchQuery, handleSearch, isLoading }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 lg:px-8">
      <div className="rounded-full mt-4 mx-auto w-full max-w-2xl glass-header px-4 lg:px-6 py-2 lg:py-3 flex items-center gap-3 lg:gap-4">
        <Search className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
          className="bg-transparent border-none outline-none focus:ring-0 text-xs lg:text-sm w-full text-slate-200 placeholder:text-slate-500"
          title="Press Enter to search for songs"
        />
        {isLoading && <span className="text-[10px] text-cyan-400 animate-pulse hidden sm:inline">Loading...</span>}

        <div className="flex items-center gap-3 lg:gap-4 border-l border-white/10 pl-3 lg:pl-4">
          <Cast className="w-4 h-4 lg:w-5 lg:h-5 text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors hidden sm:block" />
          <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors hidden sm:block" />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <img
                  src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuA0lVN8VWfq3ybEem6f2zDapLtjznkENVL5Y3sTPVoKhTSYJpLMceWZoydL6HJcBSotYEBkrfV-Vfv21Hf8_PcELMkbMLd0U2YZUBoLUhXUUkQdKY9N9xOEU2fqjGBUFSLKIG_mAUubp8ekua0Acsqr-lelvuOTiuKNxJAiVoc-wo2NtUJeQQNYLcm7EOxT4yo--xmzW8dH62lD-AgjQ4O8Fbij8GNKcg8DdLTaB-Zg0rTS6W97opR_qwi_UACgurmLJkrRXnpkmZg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-cyan-400/30"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0a0e14] rounded-full"></div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 rounded-3xl bg-[#0f1721] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-white/5 bg-white/5">
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Signed in as</p>
                  <p className="text-sm font-semibold truncate text-white">{user?.name || 'Musicfy Listener'}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => { setIsDropdownOpen(false); navigate('/library'); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </button>
                  <div className="h-px bg-white/5 my-2 mx-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;