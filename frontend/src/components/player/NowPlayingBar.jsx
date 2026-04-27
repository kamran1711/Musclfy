import React from 'react';
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Heart, Volume2, PlusCircle, Maximize } from 'lucide-react';
import { formatTime } from '../../utils/musicUtils';

const NowPlayingBar = ({
  songs,
  currentSongIndex,
  activeRadio,
  likedSongs,
  toggleLike,
  isPlaying,
  togglePlayPause,
  isShuffled,
  toggleShuffle,
  handlePrevSong,
  repeatMode,
  toggleRepeat,
  handleNextSong,
  currentTime,
  duration,
  handleSeek,
  toggleMute,
  volume,
  handleVolumeChange,
  getTruncatedArtist,
  openPlaylistModal,
  toggleFullScreen,
  isFullScreen
}) => {
  const currentTrack = activeRadio || songs[currentSongIndex];
  return (
    <footer className="fixed bottom-[65px] lg:bottom-6 left-0 lg:left-1/2 lg:-translate-x-1/2 z-50 flex flex-col glass-player w-full lg:w-[90%] max-w-5xl transition-all lg:rounded-full overflow-hidden">
      {/* Progress Bar at the Top */}
      <div className="w-full progress-bar h-1 lg:h-1" onClick={(e) => handleSeek(e, duration)}>
        <div
          className="progress-fill"
          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      <div className="grid grid-cols-12 items-center p-2 lg:p-4 min-h-[70px] lg:min-h-0">
        {/* Left Side: Track Info & Like - 4/12 columns */}
        <div className="col-span-4 flex items-center gap-2 lg:gap-3 min-w-0">
          <img
            src={currentTrack?.image || currentTrack?.coverArt || "https://lh3.googleusercontent.com/aida-public/AB6AXuDH3Q6fkOKYtXyDPttMx5EkQ3QrzV_TqnF41yH0jJtJ67HFi4tQshpyeyh8iiIrJRsTzhYk7QoBzpzgf1S8kBxnp-T8CB4ZbNJjod5LdIHztNTt0JGB7CD24IFZR8cCp0LIpO_qzU_HTVkYTw4VTQ65VlJImekQlTgKXjjBo4tDSG15zmVBMkhILVj2_jcFguR36xLZdMmlemGdMpVvOKWbE_VfPcYoOW_mZT8HBvher6RQH8MIsq11zo-CabDz1bNG57FmVyvDEEQ"}
            alt="Now Playing"
            className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg shadow-lg border border-white/20 object-cover flex-shrink-0"
          />
          <div className="min-w-0 pr-1 lg:pr-2 hidden lg:block">
            <h4 className="text-xs lg:text-sm font-bold text-white leading-tight truncate max-w-[60px] lg:max-w-[120px]">{currentTrack?.name || currentTrack?.title || "Now Playing"}</h4>
            <p className="text-[8px] lg:text-[10px] text-cyan-400 uppercase tracking-widest font-bold truncate max-w-[60px] lg:max-w-[120px]">{currentTrack?.genre || getTruncatedArtist(currentTrack?.artist) || "Luminous Curator"}</p>
          </div>
          <button
            onClick={toggleLike}
            className={`transition-colors hover-scale ${
              likedSongs.has(songs[currentSongIndex]?.id)
                ? 'text-red-500'
                : 'text-slate-400 hover:text-red-400'
            }`}
          >
            <Heart className="w-4 h-4 lg:w-5 lg:h-5" fill={likedSongs.has(songs[currentSongIndex]?.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Center: Playback Controls - 4/12 columns */}
        <div className="col-span-4 flex items-center justify-center gap-2.5 sm:gap-4 lg:gap-8">
          <button
            onClick={toggleShuffle}
            className={`text-slate-400 hover:text-white transition-all hover-scale hidden md:block ${isShuffled ? 'text-cyan-400' : ''}`}
          >
            <Shuffle className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <button className="text-white hover:text-cyan-400 transition-all hover-scale" onClick={handlePrevSong}>
            <SkipBack className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-cyan-500/20 text-cyan-300 rounded-full p-1.5 lg:p-3 shadow-[0_0_20px_rgba(129,236,255,0.4)] hover-scale flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 lg:w-8 lg:h-8" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 lg:w-8 lg:h-8" fill="currentColor" />
            )}
          </button>
          <button className="text-white hover:text-cyan-400 transition-all hover-scale" onClick={handleNextSong}>
            <SkipForward className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button
            onClick={toggleRepeat}
            className={`text-slate-400 hover:text-white transition-all hover-scale hidden md:block ${repeatMode !== 'off' ? 'text-cyan-400' : ''}`}
          >
            <Repeat className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Right Side: Utility Actions - 4/12 columns */}
        <div className="col-span-4 flex items-center justify-end gap-1.5 sm:gap-4 lg:gap-6">
          <button onClick={toggleMute} className="text-slate-400 hover:text-white transition-colors">
            <Volume2 className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <button onClick={openPlaylistModal} className="text-slate-400 hover:text-cyan-300 transition-colors" title="Add current track to playlist">
            <PlusCircle className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <button 
            onClick={toggleFullScreen} 
            className={`transition-colors hover-scale ${isFullScreen ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
            title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
          >
            <Maximize className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default NowPlayingBar;