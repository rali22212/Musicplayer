import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Song, Playlist } from '../types/music';
import { SongCard } from './SongCard';
import { SearchBar } from './SearchBar';

interface MusicLibraryProps {
  songs: Song[];
  playlists: Playlist[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song, playlist: Song[]) => void;
  onAddToPlaylist: (playlistId: string, song: Song) => void;
}

export const MusicLibrary: React.FC<MusicLibraryProps> = ({
  songs,
  playlists,
  currentSong,
  isPlaying,
  onPlaySong,
  onAddToPlaylist
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  const filteredSongs = useMemo(() => {
    if (!searchTerm) return songs;
    
    const term = searchTerm.toLowerCase();
    return songs.filter(song =>
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term) ||
      song.album.toLowerCase().includes(term)
    );
  }, [songs, searchTerm]);

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
        <h2 className="text-3xl font-bold text-white mb-4">My Library</h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
      
      <div className="space-y-1">
        {filteredSongs.length > 0 ? (
          filteredSongs.map(song => (
            <div key={song.id} className="group flex items-center">
              <div className="flex-1">
                <SongCard
                  song={song}
                  isPlaying={isPlaying}
                  isCurrentSong={currentSong?.id === song.id}
                  onPlay={(song) => onPlaySong(song, filteredSongs)}
                />
              </div>
              <button
                onClick={() => handleAddToPlaylist(song)}
                className="ml-4 p-2 text-purple-400 hover:text-purple-300 transition-colors opacity-0 group-hover:opacity-100"
                title="Add to playlist"
              >
                <Plus size={20} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No songs found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </div>

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