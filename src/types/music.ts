export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  cover?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  createdAt: Date;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
  currentPlaylist: Playlist | null;
}

export interface OnlineSong {
  id: string;
  title: string;
  artist: string;
  duration: number;
  preview_url: string;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
}