import React from 'react';
import { getTruncatedArtist } from '../../utils/musicUtils';

const AlbumCard = ({ album, index, currentSongIndex, isActive, onClick }) => {
  const isCurrentlyActive = isActive !== undefined ? isActive : currentSongIndex === index;

  return (
    <div
      className="flex-shrink-0 w-48 group cursor-pointer"
      onClick={() => onClick(index)}
    >
      <div className={`glass-card p-3 rounded-lg mb-3 transition-all hover-lift ${isCurrentlyActive ? 'border-cyan-400 shadow-[0_0_20px_rgba(129,236,255,0.6)] animate-pulse-custom' : 'border-white/10'
        }`}>
        <img
          src={album.image}
          alt={album.title}
          className="w-full aspect-square rounded-md mb-4 shadow-xl object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMWEwZTE0Ii8+Cjx0ZXh0IHg9IjI1MCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NdXNpYzwvdGV4dD4KPC9zdmc+';
          }}
        />
        <h3 className={`font-bold text-sm truncate ${isCurrentlyActive ? 'text-cyan-400' : 'text-white'}`}>{album.title}</h3>
        <p className="text-xs text-slate-400">{getTruncatedArtist(album.artist)}</p>
      </div>
    </div>
  );
};

export default AlbumCard;