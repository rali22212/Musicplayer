import React, { useRef } from 'react';
import { formatTime } from '../utils/formatTime';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full space-y-2">
      <div
        ref={progressRef}
        className="w-full h-2 bg-gray-700 rounded-full cursor-pointer group"
        onClick={handleClick}
      >
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative transition-all duration-150"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};