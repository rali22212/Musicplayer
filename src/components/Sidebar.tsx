import React from 'react';
import { Music, Heart, Clock, Plus, Search } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'library', label: 'My Library', icon: Music },
    { id: 'search', label: 'Search Online', icon: Search },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'recent', label: 'Recently Played', icon: Clock },
    { id: 'playlists', label: 'Playlists', icon: Plus }
  ];

  return (
    <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Music Player</h1>
        <p className="text-gray-400 text-sm">Your personal music experience</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};