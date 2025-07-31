"use client"

import React, { createContext, useContext, useReducer, ReactNode, useRef, useEffect } from 'react';
import { Song, User, RewardSession, Notification, AppState, UserData } from '../../types';
import { mockWebSocket } from '../../services/mockWebSocket';
import { extractYouTubeId } from '../../utils/youtube';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Sort } from '@/app/utils/sort';
import { SocketManager } from '@/app/lib/WsSingelton';


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
  | { type: 'SET_USER'; payload: UserData | null }
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
    signin: (method: 'email' | 'wallet' | 'google', email: string, password: string) => Promise<{ success: boolean; error: string; }>;
    signup: (method: 'email' | 'wallet' | 'google', username: string, password: string, email: string) => Promise<{ success: boolean; error: string; }>;
    logout: () => void;
    submitSong: (url: string, type: 'youtube' | 'spotify') => Promise<void>;
    voteSong: (songId: string, voteType: 'like' | 'dislike') => Promise<void>;
    promoteSong: (songId: string, amount: number, method: 'upi' | 'crypto') => Promise<void>;
    getUser: () => Promise<void>;
    getSongs: () => Promise<void>;
    makeSongPlayed: (songId: string) => Promise<void>;
    WebSocketAction: () => void;
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

  // console.log(state.user?.name)



  const actions = {
    signin: async (method: 'email' | 'wallet' | 'google', email: string, password: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {

        const response = await axios.post(`${BASE_URL}/api/users/signin`, {
          email,
          password
        })


        if (response.data.error) {
          toast.error(response.data.error);
          return {
            success: false,
            error: response.data.error as string
          };
        }

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

        const response = await axios.post(`${BASE_URL}/api/users/signup`, {
          username,
          password,
          email,
        })


        if (response.data.error) {
          toast.error('signin failed. Please try again');
          return {
            success: false,
            error: response.data.error as string
          };
        }


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


    logout: async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/logout`);
        if (!res.data.success) {
          return;

        }

        dispatch({ type: 'SET_USER', payload: null });
        toast.success('Logged out successfully!');

        return;
      } catch (error) {
        toast.error('error in logging out!');
        return;
      }

    },

    submitSong: async (url: string, type: 'youtube' | 'spotify') => {
      if (!state.user) return;

      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await axios.post(`${BASE_URL}/api/Streams/song`, {
          type,
          url
        })


        const SongData = response.data.message
        const song: Song = {
          id: SongData.id,
          title: SongData.title,
          artist: SongData.user.username,
          youtubeId: SongData.extractedId,
          thumbnail: SongData.smallImg,
          submittedBy: SongData.user.username,
          likes: SongData.likes.length,
          dislikes: SongData.dislikes.length,
          isPromoted: SongData.isPromoted
        }

        //send songs via websocket
        const socket = SocketManager.getInstance();
        const socketData = {
          type: "ADD_SONG",
          payload: {
            id: SongData.id,
            likes: SongData.likes.map((s: any) => ({
              userId: s.userId
            })),
            dislikes: SongData.dislikes.map((s: any) => ({
              userId: s.userId
            })),
            played: false,
            promoted: SongData.isPromoted,
            videoId: SongData.extractedId,
            createdBy: SongData.user.username,
            img: SongData.smallImg,
            title: SongData.title
          }

        }
        socket.sendMessage(JSON.stringify(socketData));

        // if (!state.currentSong) {
        //   dispatch({ type: 'SET_CURRENT_SONG', payload: song })
        // }



        // dispatch({ type: 'ADD_SONG', payload: song });

        console.log(state.songs)
        toast.success('Song submitted successfully!');
      } catch (error) {
        toast.error('Failed to submit song. Please check the URL.');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    voteSong: async (songId: string, voteType: 'like' | 'dislike') => {
      if (!state.user) return;

      try {

        const socket = SocketManager.getInstance();
        if (voteType === 'dislike') {

          const data = {
            type: "VOTE_SONG",
            payload: {
              id: songId,
              voteType: voteType,
              userId: state.user.name,
            }
          }
          socket.sendMessage(JSON.stringify(data));
          // const response = await axios.post(`${BASE_URL}/api/Streams/vote/dislike`, {
          //   songId,
          // })

          // if (response.data.error) {
          //   toast.success(`error occured while Vote 👎`);
          //   return;
          // }

          // console.log(response.data)
          // const SongData = response.data.message

          // const song = state.songs.find((s) => s.id == songId);

          // if (!song) {
          //   toast.error(`Song Not Found`);
          //   return;
          // }
          // dispatch({ type: 'UPDATE_SONG', payload: { ...song, likes: SongData.likes.length, dislikes: SongData.dislikes.length } });
          // toast.success(`Vote 👎 recorded!`);

        }


        if (voteType === 'like') {


          const data = {
            type: "VOTE_SONG",
            payload: {
              id: songId,
              voteType: voteType,
              userId: state.user.name,
            }
          }
          socket.sendMessage(JSON.stringify(data));
          // const response = await axios.post(`${BASE_URL}/api/Streams/vote/like`, {
          //   songId,
          // })


          // if (response.data.error) {
          //   toast.success(`error occured while Vote 👍`);
          //   return;
          // }

          // const SongData = response.data.message

          // const song = state.songs.find((s) => s.id == songId);

          // if (!song) {
          //   toast.error(`Song Not Found`);
          //   return;
          // }

          // dispatch({ type: 'UPDATE_SONG', payload: { ...song, likes: SongData.likes.length, dislikes: SongData.dislikes.length } });
          // toast.success(`Vote 👍 recorded!`);

        }


      } catch (error) {
        toast.error("error while voting")
      }


      // const sortedSongs = [...state.songs].sort((a, b) => {
      //   if (a.isPromoted && !b.isPromoted) return -1;
      //   if (!a.isPromoted && b.isPromoted) return 1;
      //   return b.likes - a.likes;
      // });

    },

    promoteSong: async (songId: string, amount: number, method: 'upi' | 'crypto') => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await axios.post(`${BASE_URL}/song/promote`, {
          songId,
          amount,
          method,
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

    getUser: async () => {
      try {

        const response = await axios.get(`${BASE_URL}/api/users/getUser`)


        if (response.data.error) {
          toast.error('user is not signed in');
        }

        const userData: UserData = {
          email: response.data.email,
          name: response.data.username
        }
        dispatch({ type: 'SET_USER', payload: userData });
        toast.success('user is signed in');

        console.log(response.data.message)

      } catch (error: any) {
        toast.error('signin failed. Please try again.');
        throw Error(error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    getSongs: async () => {
      try {

        // const response = await axios.get(`${BASE_URL}/api/Streams/fetch`)


        // if (response.data.error) {
        //   toast.error('error occured while fetching queue');
        // }

        // //console.log(response.data)
        // const SongData = response.data.message
        // const song: Song[] = SongData.map((s: any) => ({
        //   artist: s.user.username,
        //   id: s.id,
        //   title: s.title,
        //   youtubeId: s.extractedId,
        //   thumbnail: s.smallImg,
        //   submittedBy: s.user.username,
        //   likes: s.likes.length,
        //   dislikes: s.dislikes.length,
        //   isPromoted: s.isPromoted
        // }))


        // const sortedSongs = await Sort(song)


        // if (!state.currentSong) {
        //   dispatch({ type: 'SET_CURRENT_SONG', payload: sortedSongs[0] })
        // }

        // //  dispatch({ type: 'UPDATE_SONG', payload: response.data });


        // dispatch({ type: 'SET_SONGS', payload: song });
        // toast.success('Songs loaded successfully');

        const socket = SocketManager.getInstance();
        const socketData = {
          type: "FETCH_SONG",
          payload: { maxLim: 10, userId: state.user?.name }
        }
        socket.sendMessage(JSON.stringify(socketData));

      } catch (error: any) {
        toast.error('signin failed. Please try again.');
        throw Error(error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    makeSongPlayed: async (songId: string) => {
      try {
        console.log("songid ---> ", songId)
        const res = await axios.post(`${BASE_URL}/api/Streams/songPlayed`, {
          songId
        });

        if (!res.data.success) {
          toast.error("error playing next top song");
          return;
        }

        toast.success("Playing Next Song");
      } catch (error: any) {
        toast.error('error playing next top song');
        throw Error(error)
      }
    },

    WebSocketAction: () => {
      const socket = SocketManager.getInstance();
      socket.onMessage(async (data) => {
       
        if (!Array.isArray(data) && data.length <= 0) {
          return;
        }

        if(data.type == "VOTE") {
          
          const song: Song[] = data.payload.map((s: any) => ({
            id: s.id,
            title: s.title,
            youtubeId: s.videoId,
            thumbnail: s.img,
            submittedBy: s.createdBy,
            likes: s.likes.length,
            dislikes: s.dislikes.length,
            isPromoted: s.promoted
          }));

          const sortedSongs = await Sort(song);

          dispatch({ type: 'SET_SONGS', payload: sortedSongs });
          
          toast.success("Vote Recorded");
        }else if(data.type == "SUBMIT") {
          const song: Song =  {
             id: data.payload.id,
            title: data.payload.title,
            youtubeId: data.payload.videoId,
            thumbnail: data.payload.img,
            submittedBy: data.payload.createdBy,
            likes: data.payload.likes.length,
            dislikes: data.payload.dislikes.length,
            isPromoted: data.payload.promoted
          }
          
          console.log(state.currentSong)

          if (!state.currentSong) {
            dispatch({ type: 'SET_CURRENT_SONG', payload: song })
          }

          dispatch({ type: 'ADD_SONG', payload: song });
        }else {
          const song: Song[] = data.map((s: any) => ({
            id: s.id,
            title: s.title,
            youtubeId: s.videoId,
            thumbnail: s.img,
            submittedBy: s.createdBy,
            likes: s.likes.length,
            dislikes: s.dislikes.length,
            isPromoted: s.promoted
          }));

          const sortedSongs = await Sort(song)

          console.log(state.currentSong)

          if (!state.currentSong) {
            dispatch({ type: 'SET_CURRENT_SONG', payload: sortedSongs[0] })
          }

          dispatch({ type: 'SET_SONGS', payload: sortedSongs });
          
          toast.success("Songs Loaded");
        }

      }
      )
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};