import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Song } from '../types/music';
import { formatTime } from '../utils/formatTime';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isCurrentSong: boolean;
  onPlay: (song: Song) => void;
}

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isPlaying,
  isCurrentSong,
  onPlay
}) => {
  return (
    <div className={`group flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 hover:bg-white/5 cursor-pointer ${
      isCurrentSong ? 'bg-white/10' : ''
    }`} onClick={() => onPlay(song)}>
      <div className="relative">
        <img
          src={song.cover || 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300'}
          alt={song.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          {isCurrentSong && isPlaying ? (
            <Pause size={16} className="text-white" />
          ) : (
            <Play size={16} className="text-white" />
          )}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate ${
          isCurrentSong ? 'text-purple-400' : 'text-white'
        }`}>
          {song.title}
        </h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
      </div>
      
      <div className="text-sm text-gray-400">
        {formatTime(song.duration)}
      </div>
    </div>
  );
};