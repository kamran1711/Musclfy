import React, { useMemo, useState } from 'react';
import { Heart, List, Music, Library } from 'lucide-react';
import SongCard from '../common/SongCard';
import { formatTime } from '../../utils/musicUtils';

const LibraryPage = ({
  songs,
  currentSongIndex,
  isPlaying,
  playSong,
  likedSongs,
  activeLibraryTab,
  onLibraryAction,
  playlists,
  selectedPlaylistId,
  onSelectPlaylist,
  createPlaylist,
  onAddToPlaylist
}) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const likedList = useMemo(() => songs.filter((song) => likedSongs.has(song.id)), [songs, likedSongs]);
  const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedPlaylistId);
  const playlistSongs = useMemo(
    () => (selectedPlaylist ? songs.filter((song) => selectedPlaylist.songIds.includes(song.id)) : []),
    [songs, selectedPlaylist]
  );

  const quickActions = [
    {
      key: 'liked',
      icon: Heart,
      name: 'Liked Songs',
      description: "Songs you've loved",
      color: 'text-red-400'
    },
    {
      key: 'playlists',
      icon: List,
      name: 'Playlists',
      description: 'Your custom collections',
      color: 'text-cyan-400'
    },
    {
      key: 'albums',
      icon: Music,
      name: 'Albums',
      description: 'Saved albums',
      color: 'text-purple-400'
    },
    {
      key: 'artists',
      icon: Library,
      name: 'Artists',
      description: 'Followed artists',
      color: 'text-green-400'
    }
  ];

  return (
    <main className="relative z-10 px-4 lg:pl-32 lg:pr-8 pt-28 pb-32">
      <div className="space-y-12">
        {/* Library Header */}
        <section>
          <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2">Your Library</h1>
          <p className="text-slate-400">Your saved music, playlists, and liked songs</p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => {
            const isSelected = activeLibraryTab === action.key;
            return (
              <button
                key={idx}
                onClick={() => onLibraryAction(action.key)}
                className={`glass-card rounded-xl p-6 transition-all border ${
                  isSelected ? 'border-cyan-400 bg-cyan-500/10' : 'border-transparent hover:border-white/10 hover:bg-white/5'
                } text-left`}
              >
                <action.icon className={`w-12 h-12 ${action.color} mb-4 transition-transform ${isSelected ? 'scale-105' : ''}`} fill="currentColor" />
                <h3 className="text-lg font-bold text-white mb-2">{action.name}</h3>
                <p className="text-sm text-slate-400">{action.description}</p>
              </button>
            );
          })}
        </section>

        {activeLibraryTab === 'liked' && (
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-white">Liked Songs</h2>
              <p className="text-sm text-cyan-400">{likedList.length} saved</p>
            </div>
            {likedList.length > 0 ? (
              <div className="space-y-4">
                {likedList.map((song) => {
                  const songIndex = songs.findIndex((item) => item.id === song.id);
                  return (
                    <SongCard
                      key={song.id}
                      song={song}
                      index={songIndex}
                      isActive={currentSongIndex === songIndex}
                      isPlaying={isPlaying}
                      onClick={playSong}
                      onAddToPlaylist={onAddToPlaylist}
                      showIndex={false}
                      showSource={true}
                      formatTime={formatTime}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500">No liked songs yet. Tap the heart icon to save favorites, then click this card to view them.</p>
            )}
          </section>
        )}

        {activeLibraryTab === 'playlists' && (
          <section className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Create a Playlist</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newPlaylistName.trim()) {
                      createPlaylist(newPlaylistName);
                      setNewPlaylistName('');
                    }
                  }}
                  className="space-y-4"
                >
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="New playlist name"
                  />
                  <button className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-all">
                    Create playlist
                  </button>
                </form>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Saved Playlists</h2>
                {playlists.length > 0 ? (
                  <div className="space-y-3">
                    {playlists.map((playlist) => (
                      <button
                        key={playlist.id}
                        onClick={() => onSelectPlaylist(playlist.id)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                          selectedPlaylistId === playlist.id ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-white">{playlist.name}</span>
                          <span className="text-xs text-slate-400">{playlist.songIds.length} songs</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">Create a playlist above to begin organizing your favorite songs.</p>
                )}
              </div>
            </div>

            {selectedPlaylist ? (
              <div>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">{selectedPlaylist.name}</h2>
                    <p className="text-sm text-slate-400">{playlistSongs.length} songs in this playlist</p>
                  </div>
                </div>
                {playlistSongs.length > 0 ? (
                  <div className="space-y-4">
                    {playlistSongs.map((song) => {
                      const songIndex = songs.findIndex((item) => item.id === song.id);
                      return (
                        <SongCard
                          key={song.id}
                          song={song}
                          index={songIndex}
                          isActive={currentSongIndex === songIndex}
                          isPlaying={isPlaying}
                          onClick={playSong}
                          onAddToPlaylist={onAddToPlaylist}
                          showIndex={false}
                          showSource={true}
                          formatTime={formatTime}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500">This playlist is empty. Add songs using the plus icon on any track.</p>
                )}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-slate-400">
                Select a playlist to view its songs.
              </div>
            )}
          </section>
        )}

        {activeLibraryTab !== 'liked' && activeLibraryTab !== 'playlists' && (
          <section className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-slate-400 text-center">
            Click a card above to view liked songs or manage playlists.
          </section>
        )}
      </div>
    </main>
  );
};

export default LibraryPage;