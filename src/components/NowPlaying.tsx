import React from 'react';
import { Song } from '../types/music';

interface NowPlayingProps {
  song: Song | null;
}

export const NowPlaying: React.FC<NowPlayingProps> = ({ song }) => {
  if (!song) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
        <div>
          <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={song.cover || 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300'}
        alt={song.title}
        className="w-16 h-16 rounded-lg object-cover shadow-lg"
      />
      <div className="min-w-0">
        <h3 className="font-semibold text-white truncate">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
      </div>
    </div>
  );
};