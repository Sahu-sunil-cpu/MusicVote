"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, Clock } from 'lucide-react';
import { useApp } from './contexts/AppContext';
import toast from 'react-hot-toast';
import { Sort } from '../utils/sort';

const VideoPlayer: React.FC = () => {

  const { state, actions, dispatch } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [volume, setVolume] = useState(100);
  const intervalRef = useRef(null);
  const playerRef = useRef<any>(null);
  const elementRef = useRef(null)
  const [isAPILoaded, setIsAPILoaded] = useState(false);




  const handleFinish = async (id: string) => {
    removeSong(0)
    await actions.makeSongPlayed(id)
  }

  // Load YouTube IFrame API once
  useEffect(() => {
    //@ts-ignore
    if (window.YT) {
      setIsAPILoaded(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    //@ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      setIsAPILoaded(true);
    };
  }, []);

  // Handle player init/destroy on videoId change
  useEffect(() => {
    if (!isAPILoaded || !state.currentSong?.youtubeId) return;

    // Destroy previous player
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    //@ts-ignore

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '460',
      width: '640',
      videoId: state.currentSong?.youtubeId || 'qxmVVa-9xls',
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(volume);
        },

        onStateChange: onPlayerStateChange

      }
    });
  }, [isAPILoaded, state.currentSong?.youtubeId]);

  const onPlayerStateChange = (event: any) => {
    const player = event.target;

    switch (event.data) {
      //@ts-ignore
      case window.YT.PlayerState.PLAYING:
        setIsPlaying(true);
        setPlayerReady(true);
        toast.success("started video playing");
        break;

      //@ts-ignore
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        toast.success("stoped video playing")

        break;

      //@ts-ignore
      case window.YT.PlayerState.ENDED:
        setIsPlaying(false);
        // Auto-play next song
        handleFinish(state.currentSong?.id as string)


        toast.success("video ended")

        break;

      //@ts-ignore
      case window.YT.PlayerState.BUFFERING:
        setIsPlaying(false);
        break;
    }
  }

  const loadVideo = (videoId: any) => {
    if (!playerRef.current || !playerReady) return;

    const videoId1 = videoId;
    console.log(videoId1)
    //@ts-ignore

    playerRef.current.loadVideoById(videoId);
    console.log("loaded")
  };


  const handleVolumeChange = (e: any) => {
    const newVolume = parseInt(e);
    setVolume(newVolume);
    if (playerRef.current) {
      //@ts-ignore
      playerRef.current.setVolume(newVolume);
    }
  };




  const removeSong = async (indexToRemove: any) => {
    console.log(state.currentSong?.id)
    console.log(state.songs[0].id)
    const newPlaylist = state.songs.filter((s) => s.id != state.currentSong?.id);
    const sortedSongs = await Sort(newPlaylist)

    console.log(newPlaylist)
    dispatch({ type: 'SET_SONGS', payload: sortedSongs });


    dispatch({ type: "SET_CURRENT_SONG", payload: sortedSongs[0] })
    if (newPlaylist.length > 0) {
      loadVideo(state.currentSong?.youtubeId);
    }
  }


  if (!state.currentSong) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Song Playing
          </h3>
          <p className="text-gray-400">
            Vote for songs in the queue to start the music!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
      {/* Video Container */}
      <div className="relative bg-black aspect-video">
        <div className="mb-6">
          <div
            id="youtube-player"
            className="w-full h-full rounded-lg overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Song Info & Controls */}
      <div className="p-6">
        {
          isPlaying &&
          <SongDetailsBox currentTime={playerRef.current.getCurrentTime()} duration={playerRef.current.getDuration()} isPlaying={isPlaying} />
        }

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full flex items-center justify-center transition-all transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                setIsMuted(!isMuted)
                volume != 0 ? handleVolumeChange(0) : handleVolumeChange(100)
              }
              }
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Submitted by <span className="font-medium text-white">{state.currentSong?.submittedBy}</span>
            </div>

            <button className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors">
              <SkipForward className="w-4 h-4" />
              <span className="text-gray-300">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;


export function SongDetailsBox({ duration, currentTime, isPlaying }: { duration: any, currentTime: any, isPlaying: boolean }) {
  const { state } = useApp()
  const [currentT, setCurrentT] = useState(currentTime);

  useEffect(() => {
    if (isPlaying && duration > 0) {
      const interval = setInterval(() => {
        setCurrentT((prev: any) => {
          if (prev >= duration) {
            clearInterval(interval)
            return 0;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, duration, state.songs]);

  const progress = duration > 0 ? (currentT / duration) * 100 : 0;

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };


  return <div>
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-white truncate">
          {state.currentSong?.title}
        </h3>
        <p className="text-gray-400 truncate">
          {state.currentSong?.artist}
        </p>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <Clock className="w-4 h-4" />
        <span>{formatTime(currentT)} / {formatTime(duration)}</span>
      </div>
    </div>

    {/* Progress Bar */}
    <div className="mb-4">
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
}




