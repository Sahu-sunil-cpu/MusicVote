"use client"
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Crown, ExternalLink, Clock, User, Play, Pause, MoreVertical } from 'lucide-react';
import { Song } from '../types';
import { useApp } from './contexts/AppContext';
import { formatTimeAgo, formatNumber } from '../utils/formatters';
import PaymentModal from './PaymentModal';
import toast from 'react-hot-toast';

interface PlaylistSongItemProps {
  song: Song;
  rank: number;
  isPlaying?: boolean;
  isAnimating?: boolean;
}

const PlaylistSongItem: React.FC<PlaylistSongItemProps> = ({ 
  song, 
  rank, 
  isPlaying = false,
  isAnimating = false 
}) => {
  const { state, actions } = useApp();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
const [userVote, setUserVote] = useState('');
  //const userVote = state.user ? song.userVotes[state.user.name] : null;
  const totalVotes = song.likes + song.dislikes;
  const votePercentage = totalVotes > 0 ? (song.likes / totalVotes) * 100 : 0;

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (!state.user) return;
    await actions.voteSong(song.id, voteType);
    setUserVote(voteType);
  };

  const handlePromote = () => {
    if (!state.user) return;
    setShowPaymentModal(true);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-gray-500';
  };

  const formatDuration = (seconds: number = 180) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div 
        className={`group grid grid-cols-12 gap-4 p-3 hover:bg-white/5 transition-all duration-200 ${
          isPlaying ? 'bg-white/10' : ''
        } ${isAnimating ? 'animate-pulse bg-purple-500/10' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Rank/Play Button */}
        <div className="col-span-1 flex items-center justify-center">
          {isHovered && !isPlaying ? (
            <button 
            //  onClick={() => actions.playNextSong()}
              className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
            >
              <Play className="w-3 h-3 text-white ml-0.5" />
            </button>
          ) : isPlaying ? (
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="flex space-x-0.5">
                <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
                <div className="w-1 h-3 bg-green-400 animate-pulse animation-delay-100"></div>
                <div className="w-1 h-5 bg-green-400 animate-pulse animation-delay-200"></div>
              </div>
            </div>
          ) : (
            <span className={`text-sm font-medium ${getRankColor(rank)}`}>
              {rank <= 3 ? (rank === 1 ? '👑' : rank === 2 ? '🥈' : '🥉') : rank}
            </span>
          )}
        </div>

        {/* Song Info */}
        <div className="col-span-6 flex items-center space-x-3 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={imageError ? '/placeholder-song.jpg' : song.thumbnail}
              alt={song.title}
              className="w-10 h-10 rounded object-cover"
              onError={() => setImageError(true)}
            />
            {song.isPromoted && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="w-2 h-2 text-yellow-900" />
              </div>
            )}
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className={`font-medium truncate ${isPlaying ? 'text-green-400' : 'text-white'}`}>
                {song.title}
              </h3>
              {song.isPromoted && (
                <span className="bg-yellow-400/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full font-medium">
                  PROMOTED
                </span>
              )}
            </div>
           
          </div>
        </div>

        {/* Votes */}
        <div className="col-span-2 flex items-center justify-center space-x-2">
          <button
            onClick={() => handleVote('like')}
            disabled={!state.user}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              userVote === 'like'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 text-gray-300 hover:bg-green-500/10 hover:text-green-400 border border-transparent hover:border-green-500/30'
            } disabled:opacity-50`}
          >
            <ThumbsUp className="w-3 h-3" />
            <span>{formatNumber(song.likes)}</span>
          </button>
          
          <button
            onClick={() => handleVote('dislike')}
            disabled={!state.user}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              userVote === 'dislike'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-white/5 text-gray-300 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/30'
            } disabled:opacity-50`}
          >
            <ThumbsDown className="w-3 h-3" />
            <span>{formatNumber(song.dislikes)}</span>
          </button>
        </div>

        {/* Duration */}
        {/* <div className="col-span-2 flex items-center justify-center">
          <span className="text-sm text-gray-400">{formatDuration()}</span>
        </div> */}

        {/* Actions */}
        <div className="col-span-1 flex items-center justify-center">
          <div className=" items-center  transition-opacity duration-200">
            {!song.isPromoted && (
              <button
                onClick={() => song.id == state.currentSong?.id ? "" : handlePromote}
                disabled={!state.user}
                className=" ml-15 p-1 px-1 text-yellow-500 w-20 bg-white/10 hover:bg-yellow-400/20 rounded-full items-center justify-center transition-all duration-200 disabled:opacity-50"
                title="Promote Song"
              >
              { song.id == state.currentSong?.id ? "Playing" : "Play Now"}
              </button>
            )}
            
            {/* <button
              onClick={() => window.open(`https://youtube.com/watch?v=${song.youtubeId}`, '_blank')}
              className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200"
              title="Open in YouTube"
            >
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </button> */}
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        song={song}
        onPaymentSuccess={(amount, method) => {
          actions.promoteSong(song.id, amount, method);
          setShowPaymentModal(false);
        }}
      />
    </>
  );
};

export default PlaylistSongItem;