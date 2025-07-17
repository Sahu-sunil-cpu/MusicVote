"use client"

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Song, User, RewardSession, Notification } from '../types';
import { mockWebSocket } from '../services/mockWebSocket';
import { extractYouTubeId } from '../utils/youtube';
import toast from 'react-hot-toast';

interface AppState {
  user: User | null;
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  notifications: Notification[];
  rewardSessions: RewardSession[];
  connected: boolean;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SONGS'; payload: Song[] }
  | { type: 'ADD_SONG'; payload: Song }
  | { type: 'UPDATE_SONG'; payload: Song }
  | { type: 'SET_CURRENT_SONG'; payload: Song | null }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_REWARD_SESSIONS'; payload: RewardSession[] };

const initialState: AppState = {
  user: null,
  songs: [
    {
      id: 'song_1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      youtubeId: 'fJ9rUzIMcZQ',
      thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
      submittedBy: 'MusicLover42',
      submittedAt: new Date(Date.now() - 30 * 60 * 1000),
      likes: 156,
      dislikes: 12,
      plays: 45,
      isPromoted: true,
      promotionAmount: 250,
      userVotes: {},
    },
    {
      id: 'song_2',
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      youtubeId: 'QkF3oxziUI4',
      thumbnail: 'https://img.youtube.com/vi/QkF3oxziUI4/maxresdefault.jpg',
      submittedBy: 'RockFan88',
      submittedAt: new Date(Date.now() - 45 * 60 * 1000),
      likes: 134,
      dislikes: 8,
      plays: 38,
      isPromoted: false,
      userVotes: {},
    },
    {
      id: 'song_3',
      title: 'Hotel California',
      artist: 'Eagles',
      youtubeId: 'BciS5krYL80',
      thumbnail: 'https://img.youtube.com/vi/BciS5krYL80/maxresdefault.jpg',
      submittedBy: 'ClassicRock',
      submittedAt: new Date(Date.now() - 60 * 60 * 1000),
      likes: 98,
      dislikes: 15,
      plays: 29,
      isPromoted: false,
      userVotes: {},
    },
    {
      id: 'song_4',
      title: 'Imagine',
      artist: 'John Lennon',
      youtubeId: 'YkgkThdzX-8',
      thumbnail: 'https://img.youtube.com/vi/YkgkThdzX-8/maxresdefault.jpg',
      submittedBy: 'PeaceLover',
      submittedAt: new Date(Date.now() - 75 * 60 * 1000),
      likes: 87,
      dislikes: 5,
      plays: 22,
      isPromoted: false,
      userVotes: {},
    },
    {
      id: 'song_5',
      title: 'Sweet Child O Mine',
      artist: 'Guns N Roses',
      youtubeId: '1w7OgIMMRc4',
      thumbnail: 'https://img.youtube.com/vi/1w7OgIMMRc4/maxresdefault.jpg',
      submittedBy: 'GnRFan',
      submittedAt: new Date(Date.now() - 90 * 60 * 1000),
      likes: 76,
      dislikes: 9,
      plays: 18,
      isPromoted: false,
      userVotes: {},
    }
  ],
  currentSong: null,
  isPlaying: false,
  notifications: [],
  rewardSessions: [],
  connected: false,
  isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SONGS':
      return { ...state, songs: action.payload };
    case 'ADD_SONG':
      return { ...state, songs: [...state.songs, action.payload] };
    case 'UPDATE_SONG':
      return {
        ...state,
        songs: state.songs.map(song =>
          song.id === action.payload.id ? action.payload : song
        ),
      };
    case 'SET_CURRENT_SONG':
      return { ...state, currentSong: action.payload };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    case 'SET_CONNECTED':
      return { ...state, connected: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_REWARD_SESSIONS':
      return { ...state, rewardSessions: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    login: (method: 'email' | 'wallet' | 'google', data: any) => Promise<void>;
    logout: () => void;
    submitSong: (youtubeUrl: string) => Promise<void>;
    voteSong: (songId: string, voteType: 'like' | 'dislike') => Promise<void>;
    promoteSong: (songId: string, amount: number, method: 'upi' | 'crypto') => Promise<void>;
    playNextSong: () => void;
  };
} | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const ws = mockWebSocket();
    
    ws.onConnect = () => {
      dispatch({ type: 'SET_CONNECTED', payload: true });
      toast.success('Connected to live updates!');
    };
    
    ws.onDisconnect = () => {
      dispatch({ type: 'SET_CONNECTED', payload: false });
      toast.error('Connection lost. Retrying...');
    };
    
    ws.onSongAdded = (song: Song) => {
      dispatch({ type: 'ADD_SONG', payload: song });
      toast.success(`${song.title} added to queue!`);
    };
    
    ws.onSongUpdated = (song: Song) => {
      dispatch({ type: 'UPDATE_SONG', payload: song });
    };
    
    ws.connect();
    
    return () => ws.disconnect();
  }, []);

  const actions = {
    login: async (method: 'email' | 'wallet' | 'google', data: any) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const user: User = {
          id: `user_${Date.now()}`,
          name: data.name || 'Anonymous User',
          email: data.email,
          walletAddress: data.walletAddress,
          authType: method,
          joinedAt: new Date('2023-06-15'),
          totalRewards: 1250,
          totalEarnings: 15750,
          totalPlays: 12450,
          averageRating: 4.7,
          followers: 2340,
          following: 156,
          songsSubmitted: 8,
          votesGiven: 42,
        };
        dispatch({ type: 'SET_USER', payload: user });
        toast.success('Login successful!');
      } catch (error) {
        toast.error('Login failed. Please try again.');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    logout: () => {
      dispatch({ type: 'SET_USER', payload: null });
      toast.success('Logged out successfully!');
    },

    submitSong: async (youtubeUrl: string) => {
      if (!state.user) return;
      
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const youtubeId = extractYouTubeId(youtubeUrl);
        if (!youtubeId) {
          throw new Error('Invalid YouTube URL');
        }

        const song: Song = {
          id: `song_${Date.now()}`,
          title: 'Loading...',
          artist: 'Unknown Artist',
          youtubeId,
          thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
          submittedBy: state.user.name,
          submittedAt: new Date(),
          likes: 0,
          dislikes: 0,
          plays: 0,
          isPromoted: false,
          userVotes: {},
        };

        setTimeout(() => {
          const updatedSong = {
            ...song,
            title: 'Amazing Song Title',
            artist: 'Great Artist',
          };
          dispatch({ type: 'UPDATE_SONG', payload: updatedSong });
        }, 1000);

        dispatch({ type: 'ADD_SONG', payload: song });
        toast.success('Song submitted successfully!');
      } catch (error) {
        toast.error('Failed to submit song. Please check the URL.');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    voteSong: async (songId: string, voteType: 'like' | 'dislike') => {
      if (!state.user) return;
      
      const song = state.songs.find(s => s.id === songId);
      if (!song) return;

      const previousVote = song.userVotes[state.user.id];
      const updatedVotes = { ...song.userVotes };
      
      if (previousVote === voteType) {
        delete updatedVotes[state.user.id];
      } else {
        updatedVotes[state.user.id] = voteType;
      }

      const likes = Object.values(updatedVotes).filter(v => v === 'like').length;
      const dislikes = Object.values(updatedVotes).filter(v => v === 'dislike').length;

      const updatedSong = {
        ...song,
        likes,
        dislikes,
        userVotes: updatedVotes,
      };

      dispatch({ type: 'UPDATE_SONG', payload: updatedSong });
      toast.success(`Vote ${voteType === 'like' ? '👍' : '👎'} recorded!`);
    },

    promoteSong: async (songId: string, amount: number, method: 'upi' | 'crypto') => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const song = state.songs.find(s => s.id === songId);
        if (song) {
          const updatedSong = {
            ...song,
            isPromoted: true,
            promotionAmount: amount,
          };
          dispatch({ type: 'UPDATE_SONG', payload: updatedSong });
          toast.success(`Song promoted with ${method.toUpperCase()} payment!`);
        }
      } catch (error) {
        toast.error('Payment failed. Please try again.');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    playNextSong: () => {
      const sortedSongs = [...state.songs].sort((a, b) => {
        if (a.isPromoted && !b.isPromoted) return -1;
        if (!a.isPromoted && b.isPromoted) return 1;
        return b.likes - a.likes;
      });

      if (sortedSongs.length > 0) {
        dispatch({ type: 'SET_CURRENT_SONG', payload: sortedSongs[0] });
        dispatch({ type: 'SET_PLAYING', payload: true });
        toast.success(`Now playing: ${sortedSongs[0].title}`);
      }
    },
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};