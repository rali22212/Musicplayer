import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import { PlayerState } from '../types/music';

interface PlayerControlsProps {
  playerState: PlayerState;
  onTogglePlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  playerState,
  onTogglePlayPause,
  onPrevious,
  onNext,
  onToggleShuffle,
  onCycleRepeat
}) => {
  const getRepeatIcon = () => {
    switch (playerState.repeatMode) {
      case 'one':
        return <Repeat1 size={20} />;
      case 'all':
        return <Repeat size={20} className="text-purple-400" />;
      default:
        return <Repeat size={20} />;
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={onToggleShuffle}
        className={`p-2 rounded-full transition-all duration-200 hover:bg-white/10 ${
          playerState.isShuffled ? 'text-purple-400' : 'text-gray-400 hover:text-white'
        }`}
        title="Shuffle"
      >
        <Shuffle size={20} />
      </button>
      
      <button
        onClick={onPrevious}
        className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 text-gray-400 hover:text-white"
        title="Previous"
      >
        <SkipBack size={24} />
      </button>
      
      <button
        onClick={onTogglePlayPause}
        className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 text-white shadow-lg"
        title={playerState.isPlaying ? 'Pause' : 'Play'}
      >
        {playerState.isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      
      <button
        onClick={onNext}
        className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 text-gray-400 hover:text-white"
        title="Next"
      >
        <SkipForward size={24} />
      </button>
      
      <button
        onClick={onCycleRepeat}
        className={`p-2 rounded-full transition-all duration-200 hover:bg-white/10 ${
          playerState.repeatMode !== 'none' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
        }`}
        title="Repeat"
      >
        {getRepeatIcon()}
      </button>
    </div>
  );
};