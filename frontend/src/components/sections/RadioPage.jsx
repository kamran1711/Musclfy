import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, Search, Shuffle, SkipBack, SkipForward, Volume2, Radio, Clock, TrendingUp } from 'lucide-react';

const RadioPage = ({ currentSongIndex, isPlaying, playSong, playDirectSong, songs, updateAudioSource, setIsPlaying, onStationSelect }) => {
  const [activeStation, setActiveStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [recentStations, setRecentStations] = useState([]);
  const [currentRadioTrack, setCurrentRadioTrack] = useState(null);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  const WaveformHero = () => (
    <div className="flex items-end gap-1 h-32 px-4 opacity-50">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="w-1.5 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full animate-wave"
          style={{
            height: `${20 + Math.random() * 80}%`,
            animationDuration: `${0.8 + Math.random() * 0.5}s`,
            animationDelay: `${i * 0.05}s`
          }}
        />
      ))}
    </div>
  );

  const Waveform = () => (
    <div className="flex items-end gap-[2px] h-8 px-2">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-cyan-400 rounded-full animate-wave"
          style={{
            height: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );

  const [apiStations, setApiStations] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoadingStations, setIsLoadingStations] = useState(false);

  const categories = [
    'All',
    'Bollywood',
    'Hindi',
    'Telugu',
    'Pop',
    'Classic',
    'Devotional',
    'Rock'
  ];

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoadingStations(true);
      try {
        const query = activeCategory === 'All' ? 'india' : activeCategory;
        const url = `https://de1.api.radio-browser.info/json/stations/search?limit=30&countrycode=IN&tag=${encodeURIComponent(query)}&hidebroken=true&order=clickcount&reverse=true`;
        const response = await fetch(url);
        const data = await response.json();
        setApiStations(data.map(station => ({
          id: station.stationuuid,
          name: station.name,
          description: station.tags || 'Music from India',
          frequency: station.codec || 'Live',
          location: station.state || 'India',
          genre: station.tags?.split(',')[0] || 'Radio',
          streamUrl: station.url_resolved,
          listeners: station.clickcount,
          coverArt: station.favicon || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`,
          color: 'from-blue-600 to-indigo-700'
        })));
      } catch (error) {
        console.error('Error fetching stations:', error);
      } finally {
        setIsLoadingStations(false);
      }
    };
    fetchStations();
  }, [activeCategory]);

  const featuredStations = [
    {
      id: 'bollywood-hits',
      name: 'Bollywood Hits',
      description: 'Latest Bollywood music & trending songs',
      color: 'from-pink-500 to-rose-500',
      genre: 'Bollywood',
      listeners: '2.1M',
      tags: ['trending', 'popular', 'bollywood'],
      streamTag: 'Bollywood',
      streamUrl: null,
      coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
    },
    {
      id: 'indie-hindi',
      name: 'Indie Hindi',
      description: 'Independent Hindi artists & underground scenes',
      color: 'from-purple-500 to-indigo-500',
      genre: 'Indie',
      listeners: '850K',
      tags: ['indie', 'alternative', 'hindi'],
      streamTag: 'Indie',
      streamUrl: null,
      coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop'
    },
    {
      id: 'classical-fusion',
      name: 'Classical Fusion',
      description: 'Traditional Indian classical meets modern fusion',
      color: 'from-cyan-500 to-blue-500',
      genre: 'Classical',
      listeners: '420K',
      tags: ['classical', 'fusion', 'traditional'],
      streamTag: 'Classical',
      streamUrl: null,
      coverArt: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop'
    },
    {
      id: 'punjabi-beats',
      name: 'Punjabi Beats',
      description: 'Punjabi music, bhangra & regional hits',
      color: 'from-orange-500 to-red-500',
      genre: 'Punjabi',
      listeners: '1.8M',
      tags: ['punjabi', 'bhangra', 'regional'],
      streamTag: 'Punjabi',
      streamUrl: null,
      coverArt: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
    },
    {
      id: 'telugu-live',
      name: 'Telugu Live',
      description: 'Live Telugu music and film hits stream',
      color: 'from-green-500 to-teal-500',
      genre: 'Telugu',
      listeners: '1.4M',
      tags: ['telugu', 'regional', 'film'],
      streamTag: 'Telugu',
      streamUrl: 'https://stream.radiolive.link/telugu',
      coverArt: 'https://images.unsplash.com/photo-1518933165971-611dbc9c412d?w=400&h=400&fit=crop'
    },
    {
      id: 'radio-mirchi-983',
      name: 'Radio Mirchi 98.3 FM',
      description: 'India\'s No.1 radio station with Bollywood hits & entertainment',
      color: 'from-red-500 to-pink-500',
      genre: 'Bollywood',
      listeners: '5.2M',
      tags: ['bollywood', 'hindi', 'popular', 'radio'],
      streamTag: 'Bollywood',
      streamUrl: 'https://eu8.fastcast4u.com/proxy/clyedupq/stream',
      coverArt: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop'
    }
  ];

  // Filter stations based on search
  const filteredStations = featuredStations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const fetchLiveStationForTopic = async (topic) => {
    try {
      const query = topic === 'All' ? 'india' : topic;
      const url = `https://de1.api.radio-browser.info/json/stations/search?limit=30&countrycode=IN&tag=${encodeURIComponent(query)}&hidebroken=true&order=clickcount&reverse=true`;
      const response = await fetch(url);
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) return null;
      return data.find(station => station.url_resolved) || data[0];
    } catch (error) {
      console.error('Error fetching live station for topic:', topic, error);
      return null;
    }
  };

  // Play radio station
  const playStation = async (station) => {
    setActiveStation(station);
    setRecentStations(prev => {
      const filtered = prev.filter(s => s.id !== station.id);
      return [station, ...filtered].slice(0, 5);
    });

    if (!station.streamUrl) {
      const topic = station.streamTag || station.genre || 'india';
      const liveStation = await fetchLiveStationForTopic(topic);
      if (liveStation) {
        const transformed = {
          id: liveStation.stationuuid || station.id,
          title: liveStation.name || station.name,
          artist: liveStation.tags?.split(',')[0] || station.genre || 'Live Radio',
          description: liveStation.tags || station.description,
          frequency: liveStation.codec || 'Live',
          location: liveStation.state || station.location || 'India',
          genre: liveStation.tags?.split(',')[0] || station.genre,
          audioUrl: liveStation.url_resolved,
          listeners: liveStation.clickcount || station.listeners,
          image: liveStation.favicon || station.coverArt,
          color: station.color,
          isLive: true,
          source: 'Radio'
        };

        setCurrentRadioTrack(transformed);
        setActiveStation(transformed);
        if (onStationSelect) onStationSelect(transformed);
        setIsRadioPlaying(true);
        if (playDirectSong) {
          playDirectSong(transformed);
        } else if (updateAudioSource) {
          updateAudioSource(transformed.audioUrl, true);
          if (setIsPlaying) setIsPlaying(true);
        }
        return;
      }

      if (onStationSelect) onStationSelect(null);
      const genreSongs = songs.filter(song =>
        song.title.toLowerCase().includes(topic.toLowerCase()) ||
        song.artist.toLowerCase().includes(topic.toLowerCase())
      );

      if (genreSongs.length > 0) {
        const randomSong = genreSongs[Math.floor(Math.random() * genreSongs.length)];
        setCurrentRadioTrack(randomSong);
        playSong(songs.indexOf(randomSong));
        setIsRadioPlaying(true);
      }
      return;
    }

    // For live radio stations, stream the actual URL
    const transformed = {
      ...station,
      title: station.name,
      artist: station.genre || 'Live Radio',
      audioUrl: station.streamUrl,
      image: station.coverArt,
      isLive: true,
      source: 'Radio'
    };

    setCurrentRadioTrack(transformed);
    if (onStationSelect) onStationSelect(station);
    setIsRadioPlaying(true);

    if (playDirectSong) {
      playDirectSong(transformed);
    } else if (updateAudioSource) {
      updateAudioSource(station.streamUrl, true);
      if (setIsPlaying) setIsPlaying(true);
    }
  };

  // Toggle favorite
  const toggleFavorite = (stationId) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stationId)) {
        newSet.delete(stationId);
      } else {
        newSet.add(stationId);
      }
      return newSet;
    });
  };

  // Skip to next track in radio station
  const skipToNext = () => {
    if (!activeStation || activeStation.streamUrl) return;

    const genreSongs = songs.filter(song =>
      song.title.toLowerCase().includes(activeStation.genre.toLowerCase()) ||
      song.artist.toLowerCase().includes(activeStation.genre.toLowerCase())
    );

    if (genreSongs.length > 1) {
      let nextSong;
      do {
        nextSong = genreSongs[Math.floor(Math.random() * genreSongs.length)];
      } while (nextSong.id === currentRadioTrack?.id && genreSongs.length > 1);

      setCurrentRadioTrack(nextSong);
      playSong(songs.indexOf(nextSong));
    }
  };

  // Shuffle current station
  const shuffleStation = () => {
    if (!activeStation || activeStation.streamUrl) return;
    skipToNext(); // Just skip to a random track
  };

  return (
    <main className="relative z-10 px-4 lg:pl-32 lg:pr-8 pt-28 pb-32">
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Immersive Hero Section */}
        <section className="relative overflow-hidden rounded-[3rem] p-12 glass-card border-white/5 shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop')] bg-cover bg-center mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e14] via-[#0a0e14]/80 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Featured Stream
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
                  Muscify <span className="text-cyan-400">Live</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                  Experience crystal clear audio from the world's most premium radio broadcasters. Your global soundscape, curated.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => playStation(apiStations[0] || featuredStations[0])}
                  className="px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center gap-3 hover:bg-cyan-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Listen Now
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
                  Explore Genres
                </button>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full group-hover:bg-cyan-500/40 transition-all duration-700" />
                <div className="relative w-80 h-80 rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-700">
                  <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop" className="w-full h-full object-cover" alt="" />
                </div>
              </div>
              <WaveformHero />
            </div>
          </div>
        </section>

        {/* Global Nav & Category Chips */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="relative w-full max-w-xl group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Search global stations, cities, or frequencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all backdrop-blur-3xl"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/10'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Active Now Float Fix */}
        {activeStation && isRadioPlaying && (
          <div className="fixed bottom-32 right-8 z-[100] animate-in fade-in slide-in-from-bottom duration-700">
            <div className="glass-card flex items-center gap-6 p-5 rounded-[2.5rem] border-cyan-500/30 shadow-3xl shadow-cyan-500/20 ring-1 ring-cyan-500/20 backdrop-blur-3xl">
              <div className="relative group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Radio className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0a0e14] shadow-sm animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">Live On Air</span>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                </div>
                <h4 className="text-white font-black text-lg truncate max-w-[180px]">{activeStation.name}</h4>
                <p className="text-xs text-slate-500 font-medium">Currently Streaming</p>
              </div>
              <div className="h-12 w-px bg-white/10 mx-2" />
              <Waveform />
            </div>
          </div>
        )}

        {/* Featured Radio Stations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white">Featured Stations</h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStations.map((station) => (
              <div
                key={station.id}
                className="glass-card rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => playStation(station)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={station.coverArt}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-full h-32 rounded-lg mb-4 bg-gradient-to-br ${station.color} flex items-center justify-center relative overflow-hidden`}>
                    <img
                      src={station.coverArt}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="relative z-10 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {station.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(station.id);
                      }}
                      className={`p-1 rounded-full transition-colors ${favorites.has(station.id)
                        ? 'text-red-400 hover:text-red-300'
                        : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.has(station.id) ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-slate-400 mb-3">{station.description}</p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{station.listeners} listeners</span>
                    <div className="flex gap-1">
                      {station.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Radio Stations */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <Radio className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Global Stations</h2>
            </div>
            {isLoadingStations && <div className="animate-spin rounded-full h-5 w-5 border-2 border-cyan-500 border-t-transparent" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apiStations.length > 0 ? (
              apiStations.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((radio) => (
                <div
                  key={radio.id}
                  className={`group relative glass-card p-5 rounded-3xl hover:bg-white/10 transition-all cursor-pointer border border-white/5 hover:border-white/20 shadow-xl hover:shadow-cyan-500/5 ${activeStation?.id === radio.id ? 'border-cyan-500/50 bg-white/10' : ''
                    }`}
                  onClick={() => playStation(radio)}
                >
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5">
                        <img
                          src={radio.coverArt}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'}
                        />
                      </div>
                      {activeStation?.id === radio.id && isRadioPlaying && (
                        <div className="absolute -bottom-2 -right-2 bg-cyan-500 p-1.5 rounded-lg shadow-lg">
                          <Pause className="w-3 h-3 text-white" fill="white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                          {radio.name}
                        </h4>
                        <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">LIVE</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-1">{radio.location} • {radio.genre}</p>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <TrendingUp className="w-3 h-3" />
                          <span>{radio.listeners.toLocaleString()}</span>
                        </div>
                        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500/30 w-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              [...Array(8)].map((_, i) => (
                <div key={i} className="glass-card h-28 rounded-3xl animate-pulse bg-white/5" />
              ))
            )}
          </div>
        </section>

        {/* Recently Played */}
        {recentStations.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-slate-400" />
              <h2 className="text-2xl font-bold tracking-tight text-white">Recently Played</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {recentStations.map((station) => (
                <div
                  key={station.id}
                  className="flex-shrink-0 w-48 glass-card rounded-lg p-4 hover:bg-white/5 transition-all cursor-pointer group"
                  onClick={() => playStation(station)}
                >
                  <div className={`w-full h-24 rounded-lg mb-3 bg-gradient-to-br ${station.color} flex items-center justify-center relative overflow-hidden`}>
                    <img
                      src={station.coverArt}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <Play className="w-6 h-6 text-white ml-1 relative z-10" fill="currentColor" />
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                    {station.name}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">{station.genre}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default RadioPage;