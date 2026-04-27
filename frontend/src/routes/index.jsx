import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/sections/HomePage';
import LibraryPage from '../components/sections/LibraryPage';
import RadioPage from '../components/sections/RadioPage';
import MusicPage from '../components/sections/MusicPage';
import LoginPage from '../components/auth/LoginPage';
import RegisterPage from '../components/auth/RegisterPage';
import IntroPage from '../components/auth/IntroPage';

const AppRoutes = ({
  albums,
  teluguSongs,
  continuePlayingSongs,
  currentSongIndex,
  isPlaying,
  playSong,
  playDirectSong,
  fetchAllSongs,
  fetchItunesSongs,
  searchAndPlaySong,
  songs,
  likedSongs,
  updateAudioSource,
  setIsPlaying,
  activeLibraryTab,
  onLibraryAction,
  playlists,
  selectedPlaylistId,
  onSelectPlaylist,
  createPlaylist,
  onAddToPlaylist
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            albums={albums}
            teluguSongs={teluguSongs}
            continuePlayingSongs={continuePlayingSongs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            playSong={playSong}
            playDirectSong={playDirectSong}
            fetchAllSongs={fetchAllSongs}
            searchAndPlaySong={searchAndPlaySong}
            fetchItunesSongs={fetchItunesSongs}
          />
        }
      />
      <Route
        path="/library"
        element={
          <LibraryPage
            songs={songs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            playSong={playSong}
            likedSongs={likedSongs}
            activeLibraryTab={activeLibraryTab}
            onLibraryAction={onLibraryAction}
            playlists={playlists}
            selectedPlaylistId={selectedPlaylistId}
            onSelectPlaylist={onSelectPlaylist}
            createPlaylist={createPlaylist}
            onAddToPlaylist={onAddToPlaylist}
          />
        }
      />
      <Route
        path="/radio"
        element={
          <RadioPage
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            playSong={playSong}
            playDirectSong={playDirectSong}
            songs={songs}
            updateAudioSource={updateAudioSource}
            setIsPlaying={setIsPlaying}
          />
        }
      />
      <Route
        path="/music"
        element={
          <MusicPage
            songs={songs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            playSong={playSong}
            onAddToPlaylist={onAddToPlaylist}
          />
        }
      />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
