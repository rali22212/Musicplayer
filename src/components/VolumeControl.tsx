import React, { useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute
}) => {
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    
    onVolumeChange(percentage);
  };

  const displayVolume = isMuted ? 0 : volume;

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onToggleMute}
        className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 text-gray-400 hover:text-white"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      
      <div className="w-20 group">
        <div
          ref={volumeRef}
          className="w-full h-1 bg-gray-700 rounded-full cursor-pointer"
          onClick={handleVolumeClick}
        >
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
            style={{ width: `${displayVolume * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};