"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, Clock } from 'lucide-react';
import { useApp } from './contexts/AppContext';
import YoutubePlayer from './YoutubePlayer';

const VideoPlayer: React.FC = () => {

  const initialPlaylist = [
    { id: 1, title: "Never Gonna Give You Up", artist: "Rick Astley", videoId: "BSJa1UytM8w", duration: null },
    { id: 2, title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee", videoId: "dTsrUZVlmJk", duration: null },
  ];
  const { state } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playlist, setPlaylist] = useState(initialPlaylist);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
const [videoId, SetvideoId] = useState('cUmUOb7j3dc')
  const [playerReady, setPlayerReady] = useState(false);
  const [volume, setVolume] = useState(100);
  const intervalRef = useRef(null);
  const playerRef = useRef(null);
  const elementRef = useRef(null)




  useEffect(() => {
    if (state.currentSong) {
      console.log(state.currentSong)
      setIsPlaying(true);
      setCurrentTime(0);
      setDuration(180);
    }
  }, [state.currentSong]);

  useEffect(() => {
    if (isPlaying && duration > 0) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          console.log(duration)
          console.log(prev)
          if(Math.floor(prev) == Math.floor(duration-5)) {
           const updatedSong =  state.songs.splice(0, 1);
           state.songs = updatedSong
           console.log(state.songs)
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, duration, state.songs]);

  const yt = () => {
 
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.className = "yt"

    //@ts-ignore
    elementRef.current = tag
   

    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    //@ts-ignore
    window.onYouTubeIframeAPIReady = initializePlayer
  }

  useEffect(() => {
  yt()
  }, [])

  useEffect(() => {
loadVideo(state.currentSong?.youtubeId)
  }, [state.currentSong?.youtubeId])

  const initializePlayer = () => {
    //@ts-ignore
    if (!window.YT || !window.YT.Player) return;
    console.log("yes")
    //@ts-ignore
    playerRef.current = new window.YT.Player('youtube-player', {
      height: '460',
      width: '640',
      videoId: videoId,
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
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }

  const onPlayerReady = (event: any) => {
    setPlayerReady(true);
    const player = event.target;

    const videoDuration = player.getDuration();
    setDuration(videoDuration);

    player.setVolume(volume);

    setPlaylist(prev => prev.map((song, index) =>
      index === currentSongIndex ?
        { ...song, duration: videoDuration }
        :
        song
    ))
  }


  const onPlayerStateChange = (event: any) => {
    const player = event.target;

    switch (event.data) {
      //@ts-ignore
      case window.YT.PlayerState.PLAYING:
        setIsPlaying(true);
        startTimeTracking();
        break;

      //@ts-ignore
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        stopTimeTracking();
        break;

      //@ts-ignore
      case window.YT.PlayerState.ENDED:
        setIsPlaying(false);
        stopTimeTracking();
        // Auto-play next song
        if ( state.songs.length - 1 >= 0) {
          const updatedSong =  state.songs.splice(0, 1);
           state.songs = updatedSong
           console.log(state.songs)
        }
        break;

      //@ts-ignore
      case window.YT.PlayerState.BUFFERING:
        setIsPlaying(false);
        break;
    }
  }

  const startTimeTracking = () => {
    //@ts-ignore
    intervalRef.current = setInterval(() => {
      //@ts-ignore
      if (playerRef.current && playerRef.current.getCurrentTime) {
        //@ts-ignore
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000)
  }

  const stopTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const togglePlay = () => {
    if (!playerRef.current || !playerReady) return;

    if (isPlaying) {
      //@ts-ignore
      playerRef.current.pauseVideo();
    } else {
      //@ts-ignore

      playerRef.current.playVideo();
    }
  }

  const skipToNext = () => {
    if (currentSongIndex < playlist.length - 1) {
      const nextIndex = currentSongIndex + 1;
      setCurrentSongIndex(nextIndex);
      loadVideo(nextIndex);
    }
  };


  const skipToPrevious = () => {
    if (currentSongIndex > 0) {
      const prevIndex = currentSongIndex - 1;
      setCurrentSongIndex(prevIndex);
      loadVideo(prevIndex);
    }
  };


  const loadVideo = (videoId: any) => {
    if (!playerRef.current || !playerReady) return;

    const videoId1 = videoId;
    console.log(videoId1)
    //@ts-ignore

    playerRef.current.loadVideoById(videoId);
    console.log("loaded")
    // Reset states
    setCurrentTime(0);
    setDuration(0);

    // Get new video duration after loading
    setTimeout(() => {
      //@ts-ignore

      const videoDuration = playerRef.current?.getDuration();
      setDuration(videoDuration);

      // Update playlist with new duration
      // setPlaylist(prev => prev.map((song, i) =>
      //   i === index
      //     ? { ...song, duration: videoDuration }
      //     : song
      // ));
    }, 1000);
  };

  const playSong = (index: any) => {
    setCurrentSongIndex(index);
    loadVideo(index);
  };

  const handleVolumeChange = (e: any) => {
    const newVolume = parseInt(e);
    setVolume(newVolume);
    if (playerRef.current && playerReady) {
      //@ts-ignore

      playerRef.current.setVolume(newVolume);
    }
  };

  const handleSeek = (e: any) => {
    if (!playerRef.current || !playerReady || !duration) return;

    const clickX = e.nativeEvent.offsetX;
    const width = e.target.offsetWidth;
    const newTime = (clickX / width) * duration;

    //@ts-ignore

    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const removeSong = (indexToRemove: any) => {
    const newPlaylist = playlist.filter((_, index) => index !== indexToRemove);
    setPlaylist(newPlaylist);

    if (indexToRemove < currentSongIndex) {
      setCurrentSongIndex(prev => prev - 1);
    } else if (indexToRemove === currentSongIndex) {
      if (currentSongIndex >= newPlaylist.length) {
        setCurrentSongIndex(Math.max(0, newPlaylist.length - 1));
      }
      if (newPlaylist.length > 0) {
        loadVideo(Math.min(currentSongIndex, newPlaylist.length - 1));
      }
    }
  };

  const currentSong = playlist[currentSongIndex];


  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // if (!state.currentSong) {
  //   return (
  //     <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700">
  //       <div className="text-center">
  //         <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
  //           <Play className="w-12 h-12 text-gray-400" />
  //         </div>
  //         <h3 className="text-xl font-semibold text-white mb-2">
  //           No Song Playing
  //         </h3>
  //         <p className="text-gray-400">
  //           Vote for songs in the queue to start the music!
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

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
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
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