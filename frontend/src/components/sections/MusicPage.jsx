import React from 'react';
import SongCard from '../common/SongCard';
import { formatTime } from '../../utils/musicUtils';

const MusicPage = ({ songs, currentSongIndex, isPlaying, playSong, onAddToPlaylist }) => {
  const genres = [
    { name: 'Bollywood', color: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    { name: 'Indie', color: 'bg-gradient-to-br from-purple-500 to-indigo-500' },
    { name: 'Classical', color: 'bg-gradient-to-br from-cyan-500 to-blue-500' },
    { name: 'Punjabi', color: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { name: 'Telugu', color: 'bg-gradient-to-br from-indigo-500 to-purple-500' },
    { name: 'Romantic', color: 'bg-gradient-to-br from-green-500 to-teal-500' },
    { name: 'Rock', color: 'bg-gradient-to-br from-red-500 to-pink-500' },
    { name: 'Pop', color: 'bg-gradient-to-br from-yellow-500 to-orange-500' },
    { name: 'Instrumental', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' }
  ];

  return (
    <main className="relative z-10 px-4 lg:pl-32 lg:pr-8 pt-28 pb-32">
      <div className="space-y-12">
        {/* Music Header */}
        <section>
          <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2">Browse Music</h1>
          <p className="text-slate-400">Explore songs, albums, and artists</p>
        </section>

        {/* Genres */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6">Genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.map((genre, idx) => (
              <div key={idx} className={`aspect-square rounded-lg ${genre.color} flex items-center justify-center cursor-pointer hover-scale`}>
                <span className="text-white font-bold text-lg">{genre.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* All Songs */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6">All Songs</h2>
          <div className="space-y-2">
            {songs.map((song, idx) => (
              <SongCard
                key={song.id}
                song={song}
                index={idx}
                isActive={currentSongIndex === idx}
                isPlaying={isPlaying}
                onClick={playSong}
                onAddToPlaylist={onAddToPlaylist}
                showIndex={true}
                showSource={true}
                formatTime={formatTime}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MusicPage;