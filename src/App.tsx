import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MusicLibrary } from './components/MusicLibrary';
import { PlaylistManager } from './components/PlaylistManager';
import { OnlineSearch } from './components/OnlineSearch';
import { Player } from './components/Player';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { usePlaylistManager } from './hooks/usePlaylistManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import { sampleSongs } from './data/sampleMusic';
import { Song } from './types/music';

function App() {
  const [activeView, setActiveView] = useState('library');
  const [songs, setSongs] = useLocalStorage<Song[]>('musicLibrary', sampleSongs);
  
  const {
    playerState,
    playSong,
    togglePlayPause,
    setVolume,
    toggleMute,
    seekTo,
    handleNext,
    handlePrevious,
    toggleShuffle,
    cycleRepeatMode
  } = useAudioPlayer();

  const {
    playlists,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    clearPlaylist,
    renamePlaylist
  } = usePlaylistManager();

  // Load saved volume on mount
  const [savedVolume] = useLocalStorage('volume', 1);
  const [savedMuted] = useLocalStorage('muted', false);

  useEffect(() => {
    setVolume(savedVolume);
    if (savedMuted) toggleMute();
  }, []);

  // Save volume changes
  useEffect(() => {
    localStorage.setItem('volume', JSON.stringify(playerState.volume));
    localStorage.setItem('muted', JSON.stringify(playerState.isMuted));
  }, [playerState.volume, playerState.isMuted]);

  const handlePlaySong = (song: Song, playlist: Song[]) => {
    playSong(song, playlist);
  };

  const handleAddToLibrary = (song: Song) => {
    setSongs(prev => [...prev, song]);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'library':
        return (
          <MusicLibrary
            songs={songs}
            playlists={playlists}
            currentSong={playerState.currentSong}
            isPlaying={playerState.isPlaying}
            onPlaySong={handlePlaySong}
            onAddToPlaylist={addSongToPlaylist}
          />
        );
      case 'search':
        return (
          <OnlineSearch
            currentSong={playerState.currentSong}
            isPlaying={playerState.isPlaying}
            playlists={playlists}
            onPlaySong={handlePlaySong}
            onAddToLibrary={handleAddToLibrary}
            onAddToPlaylist={addSongToPlaylist}
          />
        );
      case 'playlists':
        return (
          <PlaylistManager
            playlists={playlists}
            currentSong={playerState.currentSong}
            isPlaying={playerState.isPlaying}
            onCreatePlaylist={createPlaylist}
            onDeletePlaylist={deletePlaylist}
            onClearPlaylist={clearPlaylist}
            onRenamePlaylist={renamePlaylist}
            onRemoveSongFromPlaylist={removeSongFromPlaylist}
            onPlaySong={handlePlaySong}
          />
        );
      case 'favorites':
        return (
          <div className="flex-1 p-6">
            <h2 className="text-3xl font-bold text-white mb-4">Favorites</h2>
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No favorite songs yet</p>
              <p className="text-gray-500 text-sm mt-2">Songs you love will appear here</p>
            </div>
          </div>
        );
      case 'recent':
        return (
          <div className="flex-1 p-6">
            <h2 className="text-3xl font-bold text-white mb-4">Recently Played</h2>
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No recent songs</p>
              <p className="text-gray-500 text-sm mt-2">Your listening history will appear here</p>
            </div>
          </div>
        );
      default:
        return (
          <MusicLibrary
            songs={songs}
            currentSong={playerState.currentSong}
            isPlaying={playerState.isPlaying}
            onPlaySong={handlePlaySong}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          {renderMainContent()}
        </div>
        
        <Player
          playerState={playerState}
          onTogglePlayPause={togglePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToggleShuffle={toggleShuffle}
          onCycleRepeat={cycleRepeatMode}
          onSeek={seekTo}
          onVolumeChange={setVolume}
          onToggleMute={toggleMute}
        />
      </div>
    </div>
  );
}

export default App;