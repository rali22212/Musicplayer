import axios from 'axios';
import { OnlineSong, Song } from '../types/music';
import { v4 as uuidv4 } from 'uuid';

// Mock music search service (simulating online music API)
export const searchOnlineMusic = async (query: string): Promise<Song[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data simulating online music search results
  const mockResults: Song[] = [
    {
      id: uuidv4(),
      title: `${query} - Electronic Mix`,
      artist: 'Various Artists',
      album: 'Online Collection',
      duration: 180 + Math.floor(Math.random() * 120),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: uuidv4(),
      title: `${query} - Acoustic Version`,
      artist: 'Indie Artists',
      album: 'Acoustic Sessions',
      duration: 200 + Math.floor(Math.random() * 100),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      cover: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: uuidv4(),
      title: `${query} - Remix`,
      artist: 'DJ Collective',
      album: 'Remix Album',
      duration: 220 + Math.floor(Math.random() * 80),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  // Filter results based on query
  return mockResults.filter(song => 
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );
};