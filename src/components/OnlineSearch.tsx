import React, { useState, useCallback, useEffect } from 'react';
import { Search, Plus, Loader } from 'lucide-react';
import { Song, Playlist } from '../types/music';
import { SongCard } from './SongCard';
import { searchOnlineMusic } from '../services/musicSearch';

interface OnlineSearchProps {
  currentSong: Song | null;
  isPlaying: boolean;
  playlists: Playlist[];
  onPlaySong: (song: Song, playlist: Song[]) => void;
  onAddToLibrary: (song: Song) => void;
  onAddToPlaylist: (playlistId: string, song: Song) => void;
}

export const OnlineSearch: React.FC<OnlineSearchProps> = ({
  currentSong,
  isPlaying,
  playlists,
  onPlaySong,
  onAddToLibrary,
  onAddToPlaylist
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchOnlineMusic(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, handleSearch]);

  const handleAddToLibrary = (song: Song) => {
    onAddToLibrary(song);
    // Show success feedback
    const button = document.querySelector(`[data-song-id="${song.id}"] .add-to-library`);
    if (button) {
      button.textContent = 'Added!';
      setTimeout(() => {
        button.textContent = 'Add to Library';
      }, 2000);
    }
  };

  const handleAddToPlaylist = (song: Song) => {
    setSelectedSong(song);
    setShowAddToPlaylist(true);
  };

  const addSongToPlaylist = (playlistId: string) => {
    if (selectedSong) {
      onAddToPlaylist(playlistId, selectedSong);
      setShowAddToPlaylist(false);
      setSelectedSong(null);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Search Online Music</h2>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for songs, artists, albums..."
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader size={20} className="text-purple-400 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-1">
          {searchResults.map(song => (
            <div key={song.id} className="group" data-song-id={song.id}>
              <div className="flex items-center">
                <div className="flex-1">
                  <SongCard
                    song={song}
                    isPlaying={isPlaying}
                    isCurrentSong={currentSong?.id === song.id}
                    onPlay={(song) => onPlaySong(song, searchResults)}
                  />
                </div>
                <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToLibrary(song)}
                    className="add-to-library px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                  >
                    Add to Library
                  </button>
                  <button
                    onClick={() => handleAddToPlaylist(song)}
                    className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors flex items-center space-x-1"
                  >
                    <Plus size={14} />
                    <span>Playlist</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchTerm && !isSearching && searchResults.length === 0 && (
        <div className="text-center py-12">
          <Search size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No results found</p>
          <p className="text-gray-500 text-sm mt-2">Try different search terms</p>
        </div>
      )}

      {!searchTerm && (
        <div className="text-center py-12">
          <Search size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">Search for music online</p>
          <p className="text-gray-500 text-sm mt-2">Find and add new songs to your library</p>
        </div>
      )}

      {/* Add to Playlist Modal */}
      {showAddToPlaylist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Add to Playlist</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  onClick={() => addSongToPlaylist(playlist.id)}
                  className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="font-medium text-white">{playlist.name}</div>
                  <div className="text-sm text-gray-400">{playlist.songs.length} songs</div>
                </button>
              ))}
            </div>
            {playlists.length === 0 && (
              <p className="text-gray-400 text-center py-4">No playlists available</p>
            )}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddToPlaylist(false);
                  setSelectedSong(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};