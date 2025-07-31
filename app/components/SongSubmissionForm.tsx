"use client"
import React, { useEffect, useState } from 'react';
import { Plus, Link, Loader2 } from 'lucide-react';
import { useApp } from './contexts/AppContext';
import { SocketManager } from '../lib/WsSingelton';

const SongSubmissionForm: React.FC = () => {
  const { state, actions } = useApp();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {

    
  }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl.trim() || !state.user) return;

    setIsSubmitting(true);
    try {
      await actions.submitSong(youtubeUrl, 'youtube');
      setYoutubeUrl('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!state.user) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Join to Submit Songs
          </h3>
          <p className="text-gray-400">
            Sign up or login to start submitting your favorite tracks to the queue
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
          <Plus className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Submit a Song</h3>
          <p className="text-gray-400">Add your favorite track to the voting queue</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            YouTube URL
          </label>
          <div className="relative">
            <Link className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Paste any YouTube video URL to add it to the queue
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !youtubeUrl.trim()}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 inline mr-2" />
              Submit Song
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/20">
        <h4 className="font-medium text-white mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Popular songs get more votes and play sooner</li>
          <li>• Use crypto or UPI to boost your song's visibility</li>
          <li>• Submit quality tracks to earn hourly rewards</li>
        </ul>
      </div>
    </div>
  );
};

export default SongSubmissionForm;