import { useState, useRef, useEffect, useCallback } from 'react';
import { Song, PlayerState } from '../types/music';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    volume: 1,
    isMuted: false,
    isShuffled: false,
    repeatMode: 'none',
    currentPlaylist: null
  });

  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime
      }));
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleLoadedData = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: 0
      }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  const playSong = useCallback((song: Song, playlistSongs: Song[] = []) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    if (playlistSongs.length > 0) {
      setPlaylist(playlistSongs);
      const index = playlistSongs.findIndex(s => s.id === song.id);
      setCurrentIndex(index);
    }

    audio.src = song.url;
    audio.volume = playerState.volume;
    audio.muted = playerState.isMuted;

    setPlayerState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true
    }));

    audio.play().catch(console.error);
  }, [playerState.volume, playerState.isMuted]);

  const pauseSong = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    setPlayerState(prev => ({
      ...prev,
      isPlaying: false
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    if (playerState.isPlaying) {
      pauseSong();
    } else if (playerState.currentSong) {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
        setPlayerState(prev => ({
          ...prev,
          isPlaying: true
        }));
      }
    }
  }, [playerState.isPlaying, playerState.currentSong, pauseSong]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setPlayerState(prev => ({
      ...prev,
      volume,
      isMuted: volume === 0
    }));
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;

    const newMutedState = !playerState.isMuted;
    audioRef.current.muted = newMutedState;
    
    setPlayerState(prev => ({
      ...prev,
      isMuted: newMutedState
    }));
  }, [playerState.isMuted]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const handleNext = useCallback(() => {
    if (playlist.length === 0) return;

    let nextIndex = currentIndex + 1;
    
    if (playerState.repeatMode === 'one') {
      nextIndex = currentIndex;
    } else if (playerState.isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else if (nextIndex >= playlist.length) {
      if (playerState.repeatMode === 'all') {
        nextIndex = 0;
      } else {
        return;
      }
    }

    setCurrentIndex(nextIndex);
    playSong(playlist[nextIndex], playlist);
  }, [currentIndex, playlist, playerState.repeatMode, playerState.isShuffled, playSong]);

  const handlePrevious = useCallback(() => {
    if (playlist.length === 0) return;

    let prevIndex = currentIndex - 1;
    
    if (playerState.isShuffled) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else if (prevIndex < 0) {
      prevIndex = playlist.length - 1;
    }

    setCurrentIndex(prevIndex);
    playSong(playlist[prevIndex], playlist);
  }, [currentIndex, playlist, playerState.isShuffled, playSong]);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      isShuffled: !prev.isShuffled
    }));
  }, []);

  const cycleRepeatMode = useCallback(() => {
    setPlayerState(prev => {
      const modes: ('none' | 'one' | 'all')[] = ['none', 'one', 'all'];
      const currentModeIndex = modes.indexOf(prev.repeatMode);
      const nextModeIndex = (currentModeIndex + 1) % modes.length;
      return {
        ...prev,
        repeatMode: modes[nextModeIndex]
      };
    });
  }, []);

  return {
    playerState,
    playSong,
    pauseSong,
    togglePlayPause,
    setVolume,
    toggleMute,
    seekTo,
    handleNext,
    handlePrevious,
    toggleShuffle,
    cycleRepeatMode,
    audioRef
  };
};