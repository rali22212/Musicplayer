import React, { useState } from 'react';
import { Plus, Music, Trash2, Edit2, X } from 'lucide-react';
import { Playlist, Song } from '../types/music';
import { SongCard } from './SongCard';

interface PlaylistManagerProps {
  playlists: Playlist[];
  currentSong: Song | null;
  isPlaying: boolean;
  onCreatePlaylist: (name: string) => void;
  onDeletePlaylist: (id: string) => void;
  onClearPlaylist: (id: string) => void;
  onRenamePlaylist: (id: string, name: string) => void;
  onRemoveSongFromPlaylist: (playlistId: string, songId: string) => void;
  onPlaySong: (song: Song, playlist: Song[]) => void;
}

export const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  playlists,
  currentSong,
  isPlaying,
  onCreatePlaylist,
  onDeletePlaylist,
  onClearPlaylist,
  onRenamePlaylist,
  onRemoveSongFromPlaylist,
  onPlaySong
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [editingPlaylist, setEditingPlaylist] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setIsCreating(false);
    }
  };

  const handleRenamePlaylist = (playlistId: string) => {
    if (editName.trim()) {
      onRenamePlaylist(playlistId, editName.trim());
      setEditingPlaylist(null);
      setEditName('');
    }
  };

  const startEditing = (playlist: Playlist) => {
    setEditingPlaylist(playlist.id);
    setEditName(playlist.name);
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-white">Playlists</h2>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            <Plus size={20} />
            <span>New Playlist</span>
          </button>
        </div>

        {isCreating && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Enter playlist name..."
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
              />
              <button
                onClick={handleCreatePlaylist}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewPlaylistName('');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {playlists.length === 0 ? (
        <div className="text-center py-12">
          <Music size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No playlists created yet</p>
          <p className="text-gray-500 text-sm mt-2">Create your first playlist to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {playlists.map(playlist => (
            <div
              key={playlist.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedPlaylist(selectedPlaylist === playlist.id ? null : playlist.id)}
            >
              <div className="flex items-center justify-between mb-2">
                {editingPlaylist === playlist.id ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleRenamePlaylist(playlist.id)}
                      autoFocus
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRenamePlaylist(playlist.id);
                      }}
                      className="text-green-400 hover:text-green-300"
                    >
                      ✓
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPlaylist(null);
                        setEditName('');
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(playlist);
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClearPlaylist(playlist.id);
                        }}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        title="Clear playlist"
                      >
                        <Music size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePlaylist(playlist.id);
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-400">
                {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedPlaylist && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {playlists.find(p => p.id === selectedPlaylist)?.name}
            </h3>
            <button
              onClick={() => setSelectedPlaylist(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-1">
            {playlists.find(p => p.id === selectedPlaylist)?.songs.map(song => (
              <div key={song.id} className="flex items-center">
                <div className="flex-1">
                  <SongCard
                    song={song}
                    isPlaying={isPlaying}
                    isCurrentSong={currentSong?.id === song.id}
                    onPlay={(song) => {
                      const playlist = playlists.find(p => p.id === selectedPlaylist);
                      if (playlist) {
                        onPlaySong(song, playlist.songs);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={() => onRemoveSongFromPlaylist(selectedPlaylist, song.id)}
                  className="ml-4 p-2 text-red-400 hover:text-red-300 transition-colors"
                  title="Remove from playlist"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            {playlists.find(p => p.id === selectedPlaylist)?.songs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">This playlist is empty</p>
                <p className="text-gray-500 text-sm mt-1">Add songs from your library or search online</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};