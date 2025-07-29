import { useState, useCallback } from 'react';
import { Playlist, Song } from '../types/music';
import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

export const usePlaylistManager = () => {
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>('playlists', []);
  const [isCreating, setIsCreating] = useState(false);

  const createPlaylist = useCallback((name: string) => {
    const newPlaylist: Playlist = {
      id: uuidv4(),
      name,
      songs: [],
      createdAt: new Date()
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, [setPlaylists]);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
  }, [setPlaylists]);

  const addSongToPlaylist = useCallback((playlistId: string, song: Song) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        // Check if song already exists in playlist
        const songExists = playlist.songs.some(s => s.id === song.id);
        if (!songExists) {
          return {
            ...playlist,
            songs: [...playlist.songs, song]
          };
        }
      }
      return playlist;
    }));
  }, [setPlaylists]);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: playlist.songs.filter(s => s.id !== songId)
        };
      }
      return playlist;
    }));
  }, [setPlaylists]);

  const clearPlaylist = useCallback((playlistId: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: []
        };
      }
      return playlist;
    }));
  }, [setPlaylists]);

  const renamePlaylist = useCallback((playlistId: string, newName: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          name: newName
        };
      }
      return playlist;
    }));
  }, [setPlaylists]);

  return {
    playlists,
    isCreating,
    setIsCreating,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    clearPlaylist,
    renamePlaylist
  };
};