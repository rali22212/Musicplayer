import React from 'react';
import { PlayerControls } from './PlayerControls';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { NowPlaying } from './NowPlaying';
import { PlayerState } from '../types/music';

interface PlayerProps {
  playerState: PlayerState;
  onTogglePlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export const Player: React.FC<PlayerProps> = ({
  playerState,
  onTogglePlayPause,
  onPrevious,
  onNext,
  onToggleShuffle,
  onCycleRepeat,
  onSeek,
  onVolumeChange,
  onToggleMute
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 items-center gap-8">
          <NowPlaying song={playerState.currentSong} />
          
          <div className="space-y-4">
            <PlayerControls
              playerState={playerState}
              onTogglePlayPause={onTogglePlayPause}
              onPrevious={onPrevious}
              onNext={onNext}
              onToggleShuffle={onToggleShuffle}
              onCycleRepeat={onCycleRepeat}
            />
            <ProgressBar
              currentTime={playerState.currentTime}
              duration={playerState.currentSong?.duration || 0}
              onSeek={onSeek}
            />
          </div>
          
          <div className="flex justify-end">
            <VolumeControl
              volume={playerState.volume}
              isMuted={playerState.isMuted}
              onVolumeChange={onVolumeChange}
              onToggleMute={onToggleMute}
            />
          </div>
        </div>
      </div>
    </div>
  );
};