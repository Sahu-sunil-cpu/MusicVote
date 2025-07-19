"use client"
import { Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Play } from "next/font/google";
import { useEffect, useRef, useState } from "react"



export default function YoutubePlayer({state}) {

    const initialPlaylist = [
        { id: 1, title: "Never Gonna Give You Up", artist: "Rick Astley", videoId: "BSJa1UytM8w", duration: null },
        { id: 2, title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee", videoId: "dTsrUZVlmJk", duration: null },
    ];

    const [playlist, setPlaylist] = useState(initialPlaylist);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playerReady, setPlayerReady] = useState(false);
    const [volume, setVolume] = useState(70);
    const intervalRef = useRef(null);
    const playerRef = useRef(null);


    useEffect(() => {
     
      let tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";

      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
//@ts-ignore
      window.onYouTubeIframeAPIReady = initializePlayer
    }, [])

    const initializePlayer = () => {
      console.log("yes")
        //@ts-ignore
        if (!window.YT || !window.YT.Player) return;
      
        //@ts-ignore
        playerRef.current = new window.YT.Player('youtube-player', {
            height: '460',
            width: '640',
            videoId: state.currentSong?.youtubeId,
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

    const onPlayerReady = (event) => {
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


    const onPlayerStateChange = (event) => {
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
                if (currentSongIndex < playlist.length - 1) {
                    skipToNext();
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
            if(playerRef.current && playerRef.current.getCurrentTime) {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 1000)
    }

    const stopTimeTracking = () => {
        if(intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const togglePlay = () => {
        if(!playerRef.current || !playerReady) return;

        if(isPlaying) {
            playerRef.current.pauseVideo();
        }else {
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


      const loadVideo = (index) => {
        if (!playerRef.current || !playerReady) return;
    
        const videoId = playlist[index].videoId;
        playerRef.current.loadVideoById(videoId);
        console.log("loaded")
        // Reset states
        setCurrentTime(0);
        setDuration(0);
        
        // Get new video duration after loading
        setTimeout(() => {
          const videoDuration = playerRef.current?.getDuration();
          setDuration(videoDuration);
          
          // Update playlist with new duration
          setPlaylist(prev => prev.map((song, i) => 
            i === index 
              ? { ...song, duration: videoDuration }
              : song
          ));
        }, 1000);
      };

      const playSong = (index) => {
        setCurrentSongIndex(index);
        loadVideo(index);
      };
   
      const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (playerRef.current && playerReady) {
          playerRef.current.setVolume(newVolume);
        }
      };

      const handleSeek = (e) => {
        if (!playerRef.current || !playerReady || !duration) return;
    
        const clickX = e.nativeEvent.offsetX;
        const width = e.target.offsetWidth;
        const newTime = (clickX / width) * duration;
        
        playerRef.current.seekTo(newTime);
        setCurrentTime(newTime);
      };

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      };
    
      const removeSong = (indexToRemove) => {
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
    return <div>
  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {/* YouTube Player */}
          <div className="mb-6">
            <div 
              id="youtube-player" 
              className="w-full h-full rounded-lg overflow-hidden"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        </div>
        </div>
  
}