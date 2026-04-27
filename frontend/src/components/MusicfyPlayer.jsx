import React, { useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import NowPlayingBar from './player/NowPlayingBar';
import HomePage from './sections/HomePage';
import LibraryPage from './sections/LibraryPage';
import RadioPage from './sections/RadioPage';
import MusicPage from './sections/MusicPage';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useMusicAPI } from '../hooks/useMusicAPI';
import { getTruncatedArtist, formatTime } from '../utils/musicUtils';
import '../styles/Musicfy.css';

export default function MusicfyPlayer() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiSongs, setApiSongs] = useState(null);
  const [fetchedTeluguSongs, setFetchedTeluguSongs] = useState(null);
  const [fetchedTopRecommendations, setFetchedTopRecommendations] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [activeLibraryTab, setActiveLibraryTab] = useState('none');
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [playlistModalSong, setPlaylistModalSong] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [playlistNotice, setPlaylistNotice] = useState('');
  const [activeRadio, setActiveRadio] = useState(null);

  const { isLoading, fetchAllSongs } = useMusicAPI();

  const {
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    volume,
    isShuffled,
    repeatMode,
    isMuted,
    audioRef,
    updateAudioSource,
    togglePlayPause,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  } = useAudioPlayer();

  // Fallback songs data
  const fallbackSongs = [
    {
      id: 1,
      title: 'Sahiba',
      artist: 'Romy, Pavni Pandey',
      duration: 183,
      audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/09/b3/a409b3eb-10ac-d446-281b-535359dd4ba7/mzaf_10523179262276587023.plus.aac.p.m4a',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cc/62/8a/cc628aa8-cd3a-86dd-91af-b2e1f4bdc8b4/8902894358897_cover.jpg/500x500bb.jpg'
    },
    {
      id: 2,
      title: 'Tum Hi Ho',
      artist: 'Arijit Singh',
      duration: 263,
      audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/61/1d/3f/611d3f53-8d7b-8455-c66a-af21f28db1cb/mzaf_3524364971696240598.plus.aac.p.m4a',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/500x500bb.jpg'
    },
    {
      id: 3,
      title: 'Raataan Lambiyan',
      artist: 'Tanishk Bagchi, Jubin Nautiyal, Asees Kaur',
      duration: 230,
      audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ed/08/9b/ed089b09-cf2a-59fa-af28-5ae00fdfc972/mzaf_34645229272365311.plus.aac.p.m4a',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/36/ab/03/36ab03b5-31ce-8ceb-2402-99572ec43270/8903431872162_cover.jpg/500x500bb.jpg'
    },
    {
      id: 4,
      title: 'Kabira',
      artist: 'Tochi Raina, Rekha Bhardwaj',
      duration: 238,
      audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/cc/ba/dd/ccbadd73-ad1a-ea6e-66bf-d703b44bdeed/mzaf_18204653634149692451.plus.aac.p.m4a',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/80/7e/cb/807ecb8f-3da2-fc49-43c3-6112ee7fbec3/8902894353014_cover.jpg/500x500bb.jpg'
    },
    {
      id: 5,
      title: 'Channa Mereya',
      artist: 'Arijit Singh',
      duration: 285,
      audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cd/66/3c/cd663cec-d499-ab19-354a-a4351b68172c/mzaf_10793664722830836544.plus.aac.p.m4a',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0d/17/cb/0d17cb0c-a9df-61a7-05bc-d232bed741e9/8903431603513_cover.jpg/500x500bb.jpg'
    },
    {
      id: 6,
      title: 'Ghungroo',
      artist: 'Arijit Singh, Shilpa Rao',
      duration: 315,
      audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/13/ed/d1/13edd115-4fa2-1f7c-78d1-1ae43b17c768/mzaf_6439050961815185966.plus.aac.p.m4a',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ec/3b/b1/ec3bb11d-23f4-c8c2-3e28-112df7fbfd00/8903431713502_cover.jpg/500x500bb.jpg',
      preview_available: true
    }
  ];

  // Use API songs if available, otherwise use fallback
  const songs = apiSongs || fallbackSongs;

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Albums data
  const albums = fetchedTopRecommendations || [
    {
      title: 'Sahiba (From "Phillauri")',
      artist: 'Pav Dharia, Karan Aujla',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cc/62/8a/cc628aa8-cd3a-86dd-91af-b2e1f4bdc8b4/8902894358897_cover.jpg/500x500bb.jpg'
    },
    {
      title: 'Tum Hi Ho',
      artist: 'Arijit Singh',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/500x500bb.jpg'
    },
    {
      title: 'Raataan Lambiyan',
      artist: 'Jubin Nautiyal & Asees Kaur',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/36/ab/03/36ab03b5-31ce-8ceb-2402-99572ec43270/8903431872162_cover.jpg/500x500bb.jpg'
    },
    {
      title: 'Kabira',
      artist: 'Tochi Raina, Rekha Bhardwaj',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/80/7e/cb/807ecb8f-3da2-fc49-43c3-6112ee7fbec3/8902894353014_cover.jpg/500x500bb.jpg'
    }
  ];

  // Telugu songs data
  const teluguSongs = fetchedTeluguSongs || [
    {
      title: 'Kurchi Madathapetti',
      artist: 'Mahesh Babu, Sreeleela',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/12/34/56/123456/artwork.jpg/500x500bb.jpg'
    },
    {
      title: 'Naa Roja Nuvve',
      artist: 'Vijay Deverakonda, Samantha',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/12/34/57/123457/artwork.jpg/500x500bb.jpg'
    },
    {
      title: 'Chuttamalle',
      artist: 'NTR Jr, Janhvi Kapoor',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/12/34/58/123458/artwork.jpg/500x500bb.jpg'
    },
    {
      title: 'Bhairava Anthem',
      artist: 'Prabhas, Diljit Dosanjh',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/12/34/59/123459/artwork.jpg/500x500bb.jpg'
    }
  ];

  // Continue playing songs
  const continuePlayingSongs = songs.map(song => ({
    ...song,
    duration: formatTime(song.duration)
  }));

  // Fetch songs on component mount
  useEffect(() => {
    const initializePlayer = async () => {
      const [bollywoodSongs, teluguSongsData, topRecs] = await Promise.all([
        fetchAllSongs('bollywood hit songs'),
        fetchAllSongs('telugu songs'),
        fetchAllSongs('bollywood top hits')
      ]);
      if (bollywoodSongs && bollywoodSongs.length > 0) {
        setApiSongs(bollywoodSongs);
      } else {
        console.warn('Could not fetch songs, using fallback data');
      }
      if (teluguSongsData && teluguSongsData.length > 0) {
        setFetchedTeluguSongs(teluguSongsData.slice(0, 4));
      }
      if (topRecs && topRecs.length > 0) {
        setFetchedTopRecommendations(topRecs.slice(0, 4));
      }
    };
    initializePlayer();
  }, []);

  // Update audio source when song changes
  useEffect(() => {
    if (songs[currentSongIndex]) {
      updateAudioSource(songs[currentSongIndex].audioUrl);
    }
  }, [currentSongIndex, songs]);

  // Handle search
  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const results = await fetchAllSongs(searchQuery);
      if (results && results.length > 0) {
        setApiSongs(results);
        setCurrentSongIndex(0); // Reset to first song of new results
      }
    }
  };

  // Toggle like for current song
  const toggleLike = () => {
    setLikedSongs(prev => {
      const newSet = new Set(prev);
      const currentSongId = songs[currentSongIndex]?.id;
      if (newSet.has(currentSongId)) {
        newSet.delete(currentSongId);
      } else {
        newSet.add(currentSongId);
      }
      return newSet;
    });
  };

  const handleLibraryAction = (tabName) => {
    setActiveLibraryTab(tabName);
    if (tabName === 'playlists' && playlists.length > 0 && !selectedPlaylistId) {
      setSelectedPlaylistId(playlists[0].id);
    }
  };

  const createPlaylist = (name, songId = null) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setPlaylistNotice('Please enter a playlist name.');
      return;
    }
    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name: trimmedName,
      songIds: songId ? [songId] : []
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    setSelectedPlaylistId(newPlaylist.id);
    setNewPlaylistName('');
    setPlaylistNotice(`Created playlist "${trimmedName}".`);
    if (songId) {
      setPlaylistNotice(`Added song to "${trimmedName}".`);
    }
  };

  const addSongToPlaylist = (songId, playlistId) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id !== playlistId) return playlist;
      if (playlist.songIds.includes(songId)) return playlist;
      return { ...playlist, songIds: [...playlist.songIds, songId] };
    }));
    setPlaylistNotice('Song added to playlist.');
  };

  const openPlaylistModal = (song) => {
    setPlaylistModalSong(song);
    setPlaylistNotice('');
  };

  const closePlaylistModal = () => {
    setPlaylistModalSong(null);
    setNewPlaylistName('');
    setPlaylistNotice('');
  };

  const handlePlaylistCreate = (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) {
      setPlaylistNotice('Enter a playlist name first.');
      return;
    }
    createPlaylist(newPlaylistName, playlistModalSong?.id);
    closePlaylistModal();
  };

  const handleAddToPlaylist = (song) => {
    if (!playlists.length) {
      setPlaylistModalSong(song);
      setPlaylistNotice('Create a playlist first or add this song to a new playlist.');
      return;
    }
    setPlaylistModalSong(song);
    setPlaylistNotice('Choose a playlist to add this song.');
  };

  const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedPlaylistId);

  const playlistSongs = selectedPlaylist
    ? songs.filter((song) => selectedPlaylist.songIds.includes(song.id))
    : [];

  // Handle next/previous song navigation
  const handleNextSong = () => {
    if (repeatMode === 'one') {
      // Replay current song
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      }
      return;
    }

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }

    if (nextIndex === 0 && repeatMode === 'off') {
      // Stop at end of playlist
      setIsPlaying(false);
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
      }
      return;
    }

    setCurrentSongIndex(nextIndex);
  };

  const handlePrevSong = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      // If more than 3 seconds played, restart current song
      audio.currentTime = 0;
      return;
    }

    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    }

    setCurrentSongIndex(prevIndex);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      handleNextSong();
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, handleNextSong]);

  const playSong = (index) => {
    if (index < 0 || index >= songs.length) return;

    const song = songs[index];
    setCurrentSongIndex(index);

    if (!song.audioUrl) {
      if (song.trackUrl) {
        const externalUrl = song.trackUrl.startsWith('//') ? `https:${song.trackUrl}` : song.trackUrl;
        window.open(externalUrl, '_blank');
      } else {
        console.warn('Selected song does not have a playable audio URL:', song);
      }
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);

    const audio = audioRef.current;
    if (audio && song) {
      audio.src = song.audioUrl;
      audio.load();
      audio.play().catch(console.error);
    }
  };

  // Render different pages based on active navigation
  const renderPage = () => {
    switch (activeNavIndex) {
      case 0: // Home
        return (
          <HomePage
            albums={albums}
            teluguSongs={teluguSongs}
            continuePlayingSongs={continuePlayingSongs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            playSong={playSong}
            fetchAllSongs={fetchAllSongs}
          />
        );

      case 1: // Library
        return (
          <LibraryPage
            songs={songs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            playSong={playSong}
            likedSongs={likedSongs}
            activeLibraryTab={activeLibraryTab}
            onLibraryAction={handleLibraryAction}
            playlists={playlists}
            selectedPlaylistId={selectedPlaylistId}
            onSelectPlaylist={setSelectedPlaylistId}
            createPlaylist={createPlaylist}
            onAddToPlaylist={handleAddToPlaylist}
          />
        );

      case 2: // Radio
        return (
          <RadioPage 
            songs={songs} 
            playSong={playSong} 
            updateAudioSource={(url, force) => {
              updateAudioSource(url, force);
            }}
            onStationSelect={(station) => {
              setActiveRadio(station);
            }}
            setIsPlaying={setIsPlaying}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
          />
        );

      case 3: // Music
        return (
          <MusicPage
            songs={songs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            playSong={playSong}
            onAddToPlaylist={handleAddToPlaylist}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white font-sans relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 musicfy-background" />

      <Sidebar activeNavIndex={activeNavIndex} setActiveNavIndex={setActiveNavIndex} />

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Render Active Page */}
      {renderPage()}

      <NowPlayingBar
        songs={songs}
        currentSongIndex={currentSongIndex}
        activeRadio={activeRadio}
        likedSongs={likedSongs}
        toggleLike={toggleLike}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        isShuffled={isShuffled}
        toggleShuffle={toggleShuffle}
        handlePrevSong={handlePrevSong}
        repeatMode={repeatMode}
        toggleRepeat={toggleRepeat}
        handleNextSong={handleNextSong}
        currentTime={currentTime}
        duration={duration}
        handleSeek={handleSeek}
        toggleMute={toggleMute}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        getTruncatedArtist={getTruncatedArtist}
        openPlaylistModal={() => openPlaylistModal(songs[currentSongIndex])}
      />

      {playlistModalSong && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-950 p-6 border border-white/10 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Add to Playlist</h2>
                <p className="text-sm text-slate-400 mt-1">Choose an existing playlist or create a new one for <span className="font-semibold text-cyan-300">{playlistModalSong.title}</span>.</p>
              </div>
              <button className="text-slate-400 hover:text-white" onClick={closePlaylistModal}>Close</button>
            </div>

            <div className="space-y-4">
              {playlists.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {playlists.map((playlist) => (
                    <button
                      key={playlist.id}
                      onClick={() => {
                        addSongToPlaylist(playlistModalSong.id, playlist.id);
                        closePlaylistModal();
                      }}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white">{playlist.name}</span>
                        <span className="text-xs text-slate-400">{playlist.songIds.length} songs</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Add to this playlist</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-slate-300">
                  No playlists yet. Create one below to add your song.
                </div>
              )}

              <form onSubmit={handlePlaylistCreate} className="grid gap-3">
                <label className="text-sm text-slate-300">New playlist name</label>
                <input
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="Enter playlist name"
                />
                <button type="submit" className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-all">
                  Create playlist and add song
                </button>
                {playlistNotice && <p className="text-sm text-slate-400 mt-1">{playlistNotice}</p>}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
}
