"use client"

import React, { createContext, useContext, useReducer, ReactNode, useRef } from 'react';
import { Song, User, RewardSession, Notification, AppState } from '../../types';
import { mockWebSocket } from '../../services/mockWebSocket';
import { extractYouTubeId } from '../../utils/youtube';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../../config';


const song = {
  id: 'song_1',
  title: 'Bohemian Rhapsody',
  artist: 'Queen',
  youtubeId: 'cUmUOb7j3dc',
  thumbnail: 'https://img.youtube.com/vi/cUmUOb7j3dc/maxresdefault.jpg',
  submittedBy: 'MusicLover42',
  submittedAt: new Date(Date.now() - 30 * 60 * 1000),
  likes: 156,
  dislikes: 12,
  plays: 45,
  isPromoted: true,
  promotionAmount: 250,
  userVotes: {},
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
  songs: [],
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
    //case 'UPDATE_SONG':
      // return {
      //   ...state,
      //   songs: state.songs.map(song =>
      //     song.id === action.payload.id ? action.payload : song
      //   ),
      //};
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

interface UserResponse {
    success: boolean,
    error: string
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    signin: (method: 'email' | 'wallet' | 'google', email: string, password: string ) => Promise<{ success: boolean; error: string; }>;
    signup: (method: 'email' | 'wallet' | 'google', username: string, password: string, email: string) => Promise<{ success: boolean; error: string; }>;
    logout: () => void;
    submitSong: (Url: string, type: 'youtube' | 'spotify', creatorId: string) => Promise<void>;
    voteSong: (songId: string, voteType: 'like' | 'dislike', userId: string) => Promise<void>;
    promoteSong: (songId: string, amount: number, method: 'upi' | 'crypto', userId: string) => Promise<void>;
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


  const actions = {
    signin: async (method: 'email' | 'wallet' | 'google', email: string, password: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await axios.post(`${BASE_URL}/api/users/signin`, {
          email,
          password
        })
        

        if(response.data.error) {
          toast.error(response.data.error);
          return {
            success: false,
            error: response.data.error as string
          };
        }

        dispatch({ type: 'SET_USER', payload: response.data });
        toast.success('signin successful!');


        console.log(response.data.error)

        return {
          success: true,
          error: ""
        };
      } catch (error) {
        toast.error('signin failed. Please try again.');
        return {
          success: false,
          error: error as string
        };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    signup: async (method: 'email' | 'wallet' | 'google', username: string, password: string, email: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
     
        const response = await axios.post(`${BASE_URL}/api/users/signup`, {
          username,
          password,
          email,
        })
        

        if(response.data.error) {
          toast.error('signin failed. Please try again');
          return {
            success: false,
            error: response.data.error as string
          };
        }

        dispatch({ type: 'SET_USER', payload: response.data });

        return {
          success: true,
          error: '' 
        };
      } catch (error) {
        return {
          success: false,
          error: error as string
        };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },


    logout: () => {
      dispatch({ type: 'SET_USER', payload: null });
      toast.success('Logged out successfully!');
    },

    submitSong: async (Url: string, type: 'youtube' | 'spotify', creatorId: string) => {
      if (!state.user) return;

      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const youtubeId = extractYouTubeId(Url);
        if (!youtubeId) {
          throw new Error('Invalid YouTube URL');
        }

        const song: Song = {
          creatorId: creatorId,
          type: type,
          url: Url
        };

        const response = await axios.post(`${BASE_URL}/addsong`, {
          song
        })

        if (!state.currentSong) {
          dispatch({ type: 'SET_CURRENT_SONG', payload: response.data})
        }

      //  dispatch({ type: 'UPDATE_SONG', payload: response.data });


        dispatch({ type: 'ADD_SONG', payload: response.data });
        toast.success('Song submitted successfully!');
      } catch (error) {
        toast.error('Failed to submit song. Please check the URL.');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    voteSong: async (songId: string, voteType: 'like' | 'dislike', userId: string) => {
      if (!state.user) return;


      try {
        const response = await axios.post(`${BASE_URL}/vote`, {
          songId,
          voteType, 
          userId
        })

        
      dispatch({ type: 'UPDATE_SONG', payload: response.data });
      toast.success(`Vote ${voteType === 'like' ? '👍' : '👎'} recorded!`);

      } catch (error) {
        toast.error("error while voting")
      }


      // const sortedSongs = [...state.songs].sort((a, b) => {
      //   if (a.isPromoted && !b.isPromoted) return -1;
      //   if (!a.isPromoted && b.isPromoted) return 1;
      //   return b.likes - a.likes;
      // });

    },

    promoteSong: async (songId: string, amount: number, method: 'upi' | 'crypto', userId: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const response = await axios.post(`${BASE_URL}/song/promote`, {
          songId,
          amount,
          method,
          userId
        })
          dispatch({ type: 'UPDATE_SONG', payload: response.data });
          toast.success(`Song promoted with ${method.toUpperCase()} payment!`);
        }
       catch (error) {
        toast.error('Payment failed. Please try again.');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};