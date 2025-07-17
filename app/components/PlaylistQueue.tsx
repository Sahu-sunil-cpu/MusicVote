"use client"
import React, { useState, useEffect } from 'react';
import { Play, Clock, Trophy, TrendingUp, Music, MoreVertical } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PlaylistSongItem from './PlaylistSongItem';

const PlaylistQueue: React.FC = () => {
  const { state, actions } = useApp();
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

  const sortedSongs = [...state.songs].sort((a, b) => {
    if (a.isPromoted && !b.isPromoted) return -1;
    if (!a.isPromoted && b.isPromoted) return 1;
    
    const aScore = a.likes - a.dislikes;
    const bScore = b.likes - b.dislikes;
    
    return bScore - aScore;
  });

  // Simulate dynamic queue updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly animate some items to show dynamic updates
      const randomSong = sortedSongs[Math.floor(Math.random() * sortedSongs.length)];
      if (randomSong) {
        setAnimatingItems(prev => new Set(prev).add(randomSong.id));
        setTimeout(() => {
          setAnimatingItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(randomSong.id);
            return newSet;
          });
        }, 1000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [sortedSongs]);

  const handlePlayNext = () => {
    actions.playNextSong();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Queue</h2>
              <p className="text-gray-400">
                {sortedSongs.length} songs • Real-time voting
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${state.connected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-sm text-gray-400">
                {state.connected ? 'Live' : 'Disconnected'}
              </span>
            </div>
            
            {sortedSongs.length > 0 && (
              <button
                onClick={handlePlayNext}
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105"
              >
                <Play className="w-4 h-4 inline mr-1" />
                Play Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Playlist Header */}
      <div className="px-6 py-3 border-b border-gray-700/50 bg-gray-900/30">
        <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 font-medium">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-6">Title</div>
          <div className="col-span-2 text-center">Votes</div>
          <div className="col-span-2 text-center">Duration</div>
          <div className="col-span-1 text-center">
            <MoreVertical className="w-4 h-4 mx-auto" />
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {sortedSongs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Songs in Queue</h3>
            <p className="text-gray-400">
              Be the first to submit a song and start the voting!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700/50">
            {sortedSongs.map((song, index) => (
              <PlaylistSongItem
                key={song.id}
                song={song}
                rank={index + 1}
                isPlaying={state.currentSong?.id === song.id}
                isAnimating={animatingItems.has(song.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Queue Stats */}
      <div className="p-4 border-t border-gray-700 bg-gray-900/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-white">{sortedSongs.length}</div>
            <div className="text-xs text-gray-400">Songs</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">
              {sortedSongs.reduce((acc, song) => acc + song.likes + song.dislikes, 0)}
            </div>
            <div className="text-xs text-gray-400">Total Votes</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">
              {Math.floor(sortedSongs.length * 3.5)} min
            </div>
            <div className="text-xs text-gray-400">Est. Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistQueue;