import React from 'react';
import { Play, Pause, PlusCircle } from 'lucide-react';
import { getTruncatedArtist } from '../../utils/musicUtils';

const SongCard = ({
  song,
  index,
  isActive = false,
  isPlaying = false,
  onClick,
  onAddToPlaylist,
  showIndex = false,
  showSource = true,
  formatTime
}) => {
  return (
    <div
      className={`group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer ${
        isActive ? 'bg-cyan-400/10 border-l-2 border-cyan-400 shadow-[0_0_15px_rgba(129,236,255,0.4)] animate-pulse-custom' : ''
      }`}
      onClick={() => onClick(index)}
    >
      {showIndex && (
        <div className="w-8 text-center">
          <span className="text-sm text-slate-400 group-hover:text-white">{index + 1}</span>
        </div>
      )}

      <div className="relative w-12 h-12 rounded overflow-hidden">
        <img src={song.image} alt={song.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isActive && isPlaying ? (
            <Pause className="w-4 h-4 text-white" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 text-white" fill="currentColor" />
          )}
        </div>
      </div>

      <div className="flex-1">
        <h4 className={`text-sm font-bold ${isActive ? 'text-cyan-400' : 'text-white'}`}>{song.title}</h4>
        <p className="text-xs text-slate-400">
          {getTruncatedArtist(song.artist)}
          {showSource && (
            <span className={`ml-2 text-[10px] px-2 py-0.5 rounded ${
              song.source === 'Jamendo' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {song.source || 'Library'}
            </span>
          )}
          {formatTime && ` • ${formatTime(song.duration)}`}
        </p>
      </div>

      {onAddToPlaylist && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToPlaylist(song);
          }}
          className="text-slate-400 hover:text-cyan-300 transition-colors"
          title="Add to playlist"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SongCard;