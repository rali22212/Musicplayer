import { Song, Playlist } from '../types/music';

export const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Sunset Dreams',
    artist: 'Aurora Waves',
    album: 'Electronic Horizons',
    duration: 245,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    title: 'Midnight Jazz',
    artist: 'Cool Cats Collective',
    album: 'Late Night Sessions',
    duration: 312,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    title: 'Digital Rain',
    artist: 'Cyber Symphony',
    album: 'Future Beats',
    duration: 198,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    title: 'Ocean Breeze',
    artist: 'Coastal Vibes',
    album: 'Summer Waves',
    duration: 267,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    cover: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    title: 'Urban Pulse',
    artist: 'City Lights',
    album: 'Street Symphony',
    duration: 289,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const samplePlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'Chill Vibes',
    songs: [sampleSongs[0], sampleSongs[3], sampleSongs[1]],
    createdAt: new Date()
  },
  {
    id: 'playlist-2',
    name: 'Electronic Mix',
    songs: [sampleSongs[2], sampleSongs[4], sampleSongs[0]],
    createdAt: new Date()
  }
];