import React, { useState, useEffect } from 'react';
import { Play, Calendar, Music2 } from 'lucide-react';

const FeaturedReleases = ({ onPlaySong, playDirectSong, searchAndPlaySong }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredReleases = [
    {
      title: 'Sahiba',
      subtitle: 'From Phillauri',
      artist: 'Pav Dharia & Karan Aujla',
      description: 'Experience the soulful melody from the blockbuster movie.',
      image: 'https://c.saavncdn.com/140/Sahiba-Hindi-2023-20231213191015-500x500.jpg',
      releaseYear: '2021',
      rating: '4.8',
      duration: '3:20',
      isHotstarStyle: true,
      brand: 'T-SERIES PRESENTS',
      views: '450 MILLION+',
      quality: '4K',
      featuring: 'Pav Dharia & Karan Aujla',
      bgGradient: 'from-red-950 via-red-900 to-slate-950',
      audioUrl: '/songs/sahiba.mp3'
    },
    {
      title: 'Tum Hi Ho',
      subtitle: 'From Aashiqui 2',
      artist: 'Arijit Singh',
      description: 'The emotional anthem that defined a generation.',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/500x500bb.jpg',
      releaseYear: '2013',
      duration: '4:30',
      audioUrl: '/songs/Tum Hi Ho.mp3'
    },
    {
      title: 'Raataan Lambiyan',
      subtitle: 'From Shershaah',
      artist: 'Jubin Nautiyal & Asees Kaur',
      description: 'A romantic favorite with soaring vocals and cinematic soundscape.',
      image: 'https://c.saavncdn.com/222/Raataan-Lambiyan-From-Shershaah--Hindi-2021-20210729181107-500x500.jpg',
      releaseYear: '2021',
      duration: '3:45',
      audioUrl: '/songs/Raataan Lambiyan.mp3'
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % featuredReleases.length);
    }, 8000);

    return () => clearInterval(slideInterval);
  }, [featuredReleases.length]);

  const currentRelease = featuredReleases[featuredIndex];
  const isHotstarStyle = currentRelease.isHotstarStyle;

  return (
    <section className={`relative min-h-[400px] lg:h-96 rounded-2xl overflow-hidden border border-white/5 ${isHotstarStyle
      ? `bg-gradient-to-br ${currentRelease.bgGradient}`
      : 'bg-gradient-to-br from-slate-800 to-slate-950'
      }`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full flex transition-opacity duration-700 ease-out">
          {featuredReleases.map((release, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${idx === featuredIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={release.image}
                alt={release.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className={`absolute inset-0 ${isHotstarStyle
        ? 'bg-gradient-to-r from-red-950 via-red-900/50 to-transparent'
        : 'bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent'
        }`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col lg:flex-row items-stretch z-10">
        {isHotstarStyle ? (
          // HOTSTAR STYLE
          <>
            {/* Left Content - Hotstar Style */}
            <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 lg:pl-12">
              {/* Top Brand */}
              <div>
                <p className="text-red-400 text-[10px] lg:text-xs font-bold tracking-widest uppercase mb-2">
                  {currentRelease.brand}
                </p>
              </div>

              {/* Main Title */}
              <div className="mb-auto">
                <h1 className="text-4xl lg:text-7xl font-black text-white mb-4 lg:mb-6 leading-none tracking-tighter drop-shadow-lg">
                  {currentRelease.title}
                </h1>

                {/* Large View Count */}
                <div className="mb-6 lg:mb-8">
                  <p className="text-white text-3xl lg:text-6xl font-black leading-none mb-2">
                    {currentRelease.views}
                  </p>
                  <p className="text-white text-sm lg:text-xl font-bold">VIEWS</p>
                  <div className="w-16 lg:w-24 h-1 bg-red-500 mt-2 lg:mt-3" />
                </div>

                <button
                  onClick={() => {
                    if (currentRelease.audioUrl && playDirectSong) {
                      playDirectSong(currentRelease);
                    } else if (searchAndPlaySong) {
                      searchAndPlaySong(`${currentRelease.title} ${currentRelease.artist}`);
                    } else if (onPlaySong) {
                      onPlaySong(0);
                    }
                  }}
                  className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Listen Now
                </button>
              </div>

              {/* Bottom Info */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white text-[10px] lg:text-sm font-bold uppercase tracking-widest mb-2">
                    Featuring: {currentRelease.featuring}
                  </p>
                </div>
                <div className="text-white text-2xl lg:text-4xl font-black">
                  {currentRelease.quality}
                </div>
              </div>
            </div>

            {/* Right Album Cover - Hotstar Style */}
            <div className="w-full lg:w-80 flex items-center justify-center p-6 lg:pr-8 flex-shrink-0">
              <div className="relative w-40 h-40 lg:w-52 lg:h-52">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl blur-3xl opacity-30 -z-10" />

                {/* Album Cover */}
                <img
                  src={currentRelease.image}
                  alt={currentRelease.title}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-red-600/50 border-2 border-red-400/30 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    if (currentRelease.audioUrl && playDirectSong) {
                      playDirectSong(currentRelease);
                    } else if (searchAndPlaySong) {
                      searchAndPlaySong(`${currentRelease.title} ${currentRelease.artist}`);
                    } else if (onPlaySong) {
                      onPlaySong(0);
                    }
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          // STANDARD STYLE
          <>
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between p-6 lg:p-10 lg:pr-8">
              {/* Top Badge */}
              <div>
                <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-[10px] lg:text-xs font-bold tracking-widest uppercase mb-4 lg:mb-6 shadow-lg shadow-cyan-500/30">
                  🔥 Featured Album
                </span>
              </div>

              {/* Content */}
              <div className="mb-4 lg:mb-6">
                <p className="text-cyan-300 text-[10px] lg:text-xs font-semibold uppercase tracking-[0.2em] mb-2 lg:mb-3">
                  {currentRelease.subtitle}
                </p>
                <h1 className="text-3xl lg:text-6xl font-black text-white mb-2 lg:mb-3 leading-tight tracking-tight">
                  {currentRelease.title}
                </h1>
                <p className="text-slate-300 text-xs lg:text-sm font-medium mb-3 lg:mb-4">
                  {currentRelease.artist}
                </p>
                <p className="text-slate-400 text-xs lg:text-sm leading-relaxed max-w-sm mb-4 lg:mb-6 hidden sm:block">
                  {currentRelease.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8 text-slate-400 text-[10px] lg:text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-cyan-400" />
                    <span>{currentRelease.releaseYear}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400">⭐</span>
                    <span>{currentRelease.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Music2 className="w-3 h-3 lg:w-4 lg:h-4 text-cyan-400" />
                    <span>{currentRelease.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (currentRelease.audioUrl && playDirectSong) {
                      playDirectSong(currentRelease);
                    } else if (searchAndPlaySong) {
                      searchAndPlaySong(`${currentRelease.title} ${currentRelease.artist}`);
                    } else if (onPlaySong) {
                      onPlaySong(0);
                    }
                  }}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Listen Now
                </button>
              </div>
            </div>

            {/* Right Album Cover */}
            <div className="w-full lg:w-64 flex items-center justify-center lg:justify-end p-6 lg:pr-10 flex-shrink-0">
              <div className="relative w-40 h-40 lg:w-52 lg:h-52">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-3xl opacity-20 -z-10" />

                {/* Album Cover */}
                <img
                  src={currentRelease.image}
                  alt={currentRelease.title}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-cyan-500/30 border-2 border-white/10 transition-transform duration-700 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    if (currentRelease.audioUrl && playDirectSong) {
                      playDirectSong(currentRelease);
                    } else if (searchAndPlaySong) {
                      searchAndPlaySong(`${currentRelease.title} ${currentRelease.artist}`);
                    } else if (onPlaySong) {
                      onPlaySong(0);
                    }
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-10 flex items-center gap-2.5 z-20">
        {featuredReleases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setFeaturedIndex(idx)}
            className={`transition-all duration-300 rounded-full ${featuredIndex === idx
              ? 'w-8 h-2 bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-lg shadow-cyan-400/50'
              : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedReleases;