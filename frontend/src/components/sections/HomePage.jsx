import React, { useState, useEffect } from 'react';
import FeaturedReleases from './FeaturedReleases';
import AlbumCard from '../common/AlbumCard';
import SongCard from '../common/SongCard';
import { formatTime } from '../../utils/musicUtils';
import { X } from 'lucide-react';

// Latest Hindi Recommendations
const hindiSongs = [
  { title: 'Kesariya', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg', itunesId: '8903434300012' },
  { title: 'Jhoome Jo Pathaan', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/807/Pathaan-Hindi-2022-20221222104158-500x500.jpg', itunesId: '8903434300013' },
  { title: 'Chaleya', artist: 'Arijit Singh & Shilpa Rao', image: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg', itunesId: '8903434300014' },
  { title: 'Apna Bana Le', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/582/Apna-Bana-Le-Soprano-Saxophone-Version-Hindi-2023-20230324180655-500x500.jpg', itunesId: '8903434300015' },
  { title: 'Tum Hi Ho', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/807/Tum-Hi-Ho-Hindi-2022-20221222104158-500x500.jpg', itunesId: '8903434300016', audioUrl: '/songs/Tum Hi Ho.mp3' },
  { title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal & Asees Kaur', image: 'https://c.saavncdn.com/222/Raataan-Lambiyan-From-Shershaah--Hindi-2021-20210729181107-500x500.jpg', itunesId: '8903434300027', audioUrl: '/songs/Raataan Lambiyan.mp3' },
  { title: 'Sahiba', artist: 'Pav Dharia & Karan Aujla', image: 'https://c.saavncdn.com/140/Sahiba-Hindi-2023-20231213191015-500x500.jpg', itunesId: '8903434300028', audioUrl: '/songs/sahiba.mp3' },
  { title: 'Bad Boy x Bad Girl', artist: 'Payal Dev & Guru Randhawa', image: 'https://c.saavncdn.com/807/Bad-Boy-x-Bad-Girl-Hindi-2022-20221222104158-500x500.jpg', itunesId: '8903434300016' },
  { title: 'Lehra Do', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/807/Lehra-Do-Hindi-2022-20221222104158-500x500.jpg', itunesId: '8903434300017' },
  { title: 'Aashiqui Aa Gayi', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/323/Radhe-Shyam-Hindi-2022-20220312141049-500x500.jpg', itunesId: '8903434300018' },
  { title: 'Nacho Nacho', artist: 'Badshah & Anirudh Ravichander', image: 'https://c.saavncdn.com/585/Naacho-Naacho-From-Rrr--Hindi-2021-20211110131007-500x500.jpg', itunesId: '8903434300019' },
  { title: 'Bijli', artist: 'Benny Dayal & Anirudh Ravichander', image: 'https://c.saavncdn.com/585/Bijli-From-Rrr--Hindi-2021-20211110131007-500x500.jpg', itunesId: '8903434300020' },
  { title: 'Gehra Hua', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/450/Gehra-Hua-From-Dhurandhar-Hindi-2025-20251205154217-500x500.jpg', itunesId: '8903434300021' },
  { title: 'Jab Saiyaan', artist: 'Arijit Singh & Jonita Gandhi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ8dD1DvSL-WRpdgBXUSj7FiU9Na0C3P-P4w&s', itunesId: '8903434300022' },
  { title: 'Zimidar', artist: 'Maninder Buttar', image: 'https://c.saavncdn.com/512/Zimidar-Punjabi-2017-500x500.jpg', itunesId: '8903434300023' },
  { title: 'Kahani Suno 2.0', artist: 'Anuv Jain', image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/41/0b/5c/410b5ca5-2f15-7001-d53f-0d40650988f9/5063561585985_cover.jpg/600x600bf-60.jpg', itunesId: '8903434300024' },
  { title: 'Tumse Bhi Zyada', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/841/Tumse-Bhi-Zyada-Lofi--Hindi-2022-20220121054839-500x500.jpg', itunesId: '8903434300025' },
  { title: 'Jalwanuma', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/545/Heropanti-2-Hindi-2022-20220504131001-500x500.jpg', itunesId: '8903434300026' },
  { title: 'Ranjha', artist: 'B Praak & Jasleen Royal', image: 'https://c.saavncdn.com/238/Shershaah-Original-Motion-Picture-Soundtrack--Hindi-2021-20210815181610-500x500.jpg', itunesId: '8903434300027' },
  { title: 'Mann Bharrya 2.0', artist: 'B Praak', image: 'https://c.saavncdn.com/242/Mann-Bharryaa-2-0-From-Shershaah--Hindi-2021-20210814143023-500x500.jpg', itunesId: '8903434300028' },
  { title: 'Agar Tum Saath Ho', artist: 'Alka Yagnik & Arijit Singh', image: 'https://c.saavncdn.com/723/Agar-Tum-Saath-Ho-From-Tamasha--English-2019-20200106215945-500x500.jpg', itunesId: '8903434300029' },
  { title: 'Shayad', artist: 'Arijit Singh', image: 'https://c.saavncdn.com/172/Shayad-Film-Version-From-Love-Aaj-Kal--Hindi-2021-20210325204139-500x500.jpg', itunesId: '8903434300030' }
];

// Extended Telugu Songs
const extendedTeluguSongs = [
  { title: 'Aaya Sher', artist: 'Sid Sriram', image: 'https://c.saavncdn.com/227/Aaya-Sher-From-The-Paradise-Telugu-Telugu-2026-20260224113206-500x500.jpg', audioUrl: '/songs/Aaya Sher.mp3', itunesId: '8903434300000' },
  { title: 'Naatu Naatu', artist: 'M.M. Keeravani & Rahul Sipligunj', image: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Naatu_Naatu.jpg', audioUrl: '/songs/Naatu Naatu.mp3', itunesId: '8903434300001' },
  { title: 'Neeli Neeli Aakasam', artist: 'Chinmayi', image: 'https://c.saavncdn.com/172/30-Rojullo-Preminchadam-Ela-Telugu-2021-20250814183402-500x500.jpg', audioUrl: '/songs/Neeli Neeli Aakasam.mp3', itunesId: '8903434300002' },
  { title: 'Saami Saami', artist: 'Vishal Mishra', image: 'https://c.saavncdn.com/566/Saami-Saami-From-Pushpa-The-Rise-Part-01--Hindi-2021-20211213121001-500x500.jpg', audioUrl: '/songs/Saami Saami.mp3', itunesId: '8903434300003' },
  { title: 'Oo Antava', artist: 'Indravathi Chauhan', image: 'https://c.saavncdn.com/blob/056/Pushpa-The-Rise-Telugu-2021-20211216115409-500x500.jpg', audioUrl: '/songs/Oo Antava.mp3', itunesId: '8903434300004' },
  { title: 'Samajavaragamana', artist: 'Vishal Mishra', image: 'https://upload.wikimedia.org/wikipedia/en/9/90/Samajavaragamana.jpg', audioUrl: '/songs/Samajavaragamana.mp3', itunesId: '8903434300005' },
  { title: 'Srivalli', artist: 'Javed Ali', image: 'https://cdn.bollywoodbubble.com/wp-content/uploads/2024/04/Rashmika-Mandanna-as-Srivalli-in-Pushpa-2-the-rule-poster.jpg', audioUrl: '/songs/Srivalli.mp3', itunesId: '8903434300006' },
  { title: 'Ramuloo Ramulaa', artist: 'Anurag Kulkarni & Mangli', image: 'https://c.saavncdn.com/517/Ala-Vaikunthapurramuloo-Telugu-2019-20200116144338-500x500.jpg', audioUrl: '/songs/Ramuloo Ramulaa.mp3', itunesId: '8903434300007' },
  { title: 'Manasuna Unnadi', artist: 'DSP', image: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/23/45/67/23456789-0abc-def0-1234-567890abcdef/cover.jpg/500x500bb.jpg', audioUrl: '/songs/Manasuna Unnadi.mp3', itunesId: '8903434300008' },
  { title: 'Butta Bomma', artist: 'Armaan Malik', image: 'https://c.saavncdn.com/626/Buttabomma-Hindi-Hindi-2022-20220408130155-500x500.jpg', audioUrl: '/songs/Buttabomma.mp3', itunesId: '8903434300010' }
];

const HomePage = ({
  albums,
  teluguSongs,
  continuePlayingSongs,
  currentSongIndex,
  isPlaying,
  playSong,
  playDirectSong,
  fetchAllSongs,
  fetchItunesSongs,
  searchAndPlaySong
}) => {
  const [showHindiModal, setShowHindiModal] = useState(false);
  const [showTeluguModal, setShowTeluguModal] = useState(false);
  const [songImages, setSongImages] = useState({});

  useEffect(() => {
    if (!fetchItunesSongs) return;

    const songsToFetch = [
      ...hindiSongs,
      ...extendedTeluguSongs
    ];

    const loadArtwork = async () => {
      const images = {};

      await Promise.all(songsToFetch.map(async (song) => {
        // Skip if image already exists and isn't a placeholder
        if (song.image && !song.image.includes('placeholder')) {
          return;
        }

        try {
          const query = `${song.title} ${song.artist}`;
          const results = await fetchItunesSongs(query);
          if (results && results.length > 0) {
            images[song.title] = results[0].image;
          }
        } catch (error) {
          console.error('Artwork fetch failed for', song.title, error);
        }
      }));

      setSongImages(images);
    };

    loadArtwork();
  }, [fetchItunesSongs]);

  const getSongImage = (song) => songImages[song.title] || song.image;

  return (
    <main className="relative z-10 px-4 lg:pl-32 lg:pr-8 pt-28 pb-32 grid grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-8 space-y-12">
        {/* Hero Section */}
        <FeaturedReleases 
          onPlaySong={playSong} 
          playDirectSong={playDirectSong} 
          searchAndPlaySong={searchAndPlaySong} 
        />

        {/* Top Recommendations - Best Hindi Songs */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white">Top Hindi Recommendations</h2>
            <button
              onClick={() => setShowHindiModal(true)}
              className="text-cyan-400 text-sm font-semibold hover:underline"
            >
              See All
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {hindiSongs.slice(0, 4).map((song, idx) => (
              <AlbumCard
                key={song.itunesId || song.title}
                album={{ ...song, image: getSongImage(song) }}
                index={idx}
                currentSongIndex={-1}
                isActive={isPlaying && continuePlayingSongs[0]?.title === song.title}
                onClick={() => {
                  if (song.audioUrl) {
                    playDirectSong(song);
                  } else {
                    searchAndPlaySong(`${song.title} ${song.artist}`);
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* Top Telugu Songs */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white">Top Telugu Songs</h2>
            <button
              onClick={() => setShowTeluguModal(true)}
              className="text-cyan-400 text-sm font-semibold hover:underline"
            >
              See All
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {extendedTeluguSongs.slice(0, 4).map((song, idx) => (
              <AlbumCard
                key={song.itunesId || song.title}
                album={{ ...song, image: getSongImage(song) }}
                index={idx}
                currentSongIndex={-1}
                isActive={isPlaying && continuePlayingSongs[0]?.title === song.title}
                onClick={() => {
                  if (song.audioUrl) {
                    playDirectSong(song);
                  } else {
                    searchAndPlaySong(`${song.title} ${song.artist}`);
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* Popular Artists */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white">Popular Artists</h2>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {[
              {
                name: 'Arijit Singh',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6tX9hCKwow6X4T6P5TIK5PP4aaMx_tCcU9A&s',
                active: true
              },
              {
                name: 'Sid Sriram',
                image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cc/62/8a/cc628aa8-cd3a-86dd-91af-b2e1f4bdc8b4/8902894358897_cover.jpg/500x500bb.jpg',
                active: false
              },
              {
                name: 'Anirudh',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPPw296LloOJam05C3o-7fARsYQ6ipdXugg&s',
                active: false
              },
              {
                name: 'Shreya Ghoshal',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTif7wRpQ5AHRYk10U3HSE--fG8u1haKWtcoA&s',
                active: true
              }
            ].map((artist, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-3 group cursor-pointer"
                onClick={() => searchAndPlaySong(artist.name)}
              >
                <div className={`relative p-1 rounded-full transition-all hover-scale ${artist.active ? 'border-2 border-cyan-400 shadow-[0_0_15px_rgba(129,236,255,0.4)]' : 'border-2 border-transparent hover:border-cyan-400/50'
                  }`}>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-20 h-20 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                  {artist.active && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#0a0e14]" />
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">{artist.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-4">
        <div className="glass-card rounded-xl p-6 h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight text-white">Continue Playing</h2>
            <span className="text-slate-400 cursor-pointer hover:text-white">⋯</span>
          </div>

          <div className="space-y-4">
            {continuePlayingSongs.map((song, idx) => (
              <SongCard
                key={song.id}
                song={song}
                index={idx}
                isActive={currentSongIndex === idx}
                isPlaying={isPlaying}
                onClick={playSong}
                showIndex={false}
                showSource={true}
                formatTime={formatTime}
              />
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-cyan-400/20 to-transparent backdrop-blur-[50px] border border-cyan-400/30 rounded-lg p-5">
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-2">Upgrade to Pro</p>
            <p className="text-sm text-slate-200 mb-4 leading-relaxed">
              Experience lossless audio quality and exclusive artist sessions.
            </p>
            <button className="w-full py-2.5 bg-white text-slate-950 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-lg hover:shadow-cyan-400/20">
              Start Trial
            </button>
          </div>
        </div>
      </div>

      {/* Hindi Songs Modal */}
      {showHindiModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-96 overflow-y-auto border border-white/10">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-slate-800 border-b border-white/10">
              <h3 className="text-2xl font-bold text-white">All Hindi Recommendations</h3>
              <button
                onClick={() => setShowHindiModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
              {hindiSongs.map((song, idx) => (
                <AlbumCard
                  key={song.itunesId || song.title}
                  album={{ ...song, image: getSongImage(song) }}
                  index={idx}
                  currentSongIndex={-1}
                  isActive={isPlaying && continuePlayingSongs[0]?.title === song.title}
                  onClick={() => {
                    if (song.audioUrl) {
                      playDirectSong(song);
                    } else {
                      searchAndPlaySong(`${song.title} ${song.artist}`);
                    }
                    setShowHindiModal(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Telugu Songs Modal */}
      {showTeluguModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-96 overflow-y-auto border border-white/10">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-slate-800 border-b border-white/10">
              <h3 className="text-2xl font-bold text-white">All Telugu Songs</h3>
              <button
                onClick={() => setShowTeluguModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
              {extendedTeluguSongs.map((song, idx) => (
                <AlbumCard
                  key={song.itunesId || song.title}
                  album={{ ...song, image: getSongImage(song) }}
                  index={idx}
                  currentSongIndex={-1}
                  isActive={isPlaying && continuePlayingSongs[0]?.title === song.title}
                  onClick={() => {
                    if (song.audioUrl) {
                      playDirectSong(song);
                    } else {
                      searchAndPlaySong(`${song.title} ${song.artist}`);
                    }
                    setShowTeluguModal(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;