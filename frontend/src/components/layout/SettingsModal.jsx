import React from 'react';
import { X, Moon, Sun, Volume2, Shield, Bell, Smartphone } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0c141d] rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Settings</h2>
            <p className="text-slate-400 text-sm">Personalize your Musicfy experience</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Appearance */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-1">Appearance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-cyan-400/30 text-white">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5" />
                  <span className="font-medium">Dark Mode</span>
                </div>
                <div className="w-10 h-5 bg-cyan-400 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </button>
              <button className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:border-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5" />
                  <span className="font-medium">Light Mode</span>
                </div>
              </button>
            </div>
          </section>

          {/* Audio */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-1">Audio Quality</h3>
            <div className="space-y-2">
              {['Luminous (320kbps)', 'High (192kbps)', 'Normal (96kbps)', 'Data Saver'].map((quality, i) => (
                <button 
                  key={quality}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${i === 0 ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400' : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/10'}`}
                >
                  <span className="font-medium">{quality}</span>
                  {i === 0 && <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>}
                </button>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-1">Privacy & Security</h3>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Public Profile</p>
                  <p className="text-xs text-slate-500">Allow others to see your playlists</p>
                </div>
                <div className="w-10 h-5 bg-slate-700 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Listening Activity</p>
                  <p className="text-xs text-slate-500">Share what you're listening to</p>
                </div>
                <div className="w-10 h-5 bg-cyan-400 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white/5 border-t border-white/5 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-full text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-cyan-400 text-[#050b14] text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-300 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
