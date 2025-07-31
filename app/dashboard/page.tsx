"use client"

import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AppHeader from '../components/AppHeader';
import VideoPlayer from '../components/VideoPlayer';
import PlaylistQueue from '../components/PlaylistQueue';
import SongSubmissionForm from '../components/SongSubmissionForm';
import NowPlayingPopup from '../components/NowPlayingPopup';
import { useApp } from '../components/contexts/AppContext';
import { SocketManager } from '../lib/WsSingelton';
import { resolve } from 'path';
import { Song } from '../types';
import { Sort } from '../utils/sort';


const QueuePage: React.FC = () => {
  const { state, dispatch, actions } = useApp();


  const connectWS = async () => {

    const socket = SocketManager.getInstance();
    const data = {
      type: "ADD_USER",
      payload: {
        userId: state.user?.name
      }
    }


    setTimeout(() => {
      socket.sendMessage(JSON.stringify(data))
      actions.getSongs()
    }, 3000)
   
    actions.WebSocketAction();
  }

  useEffect(() => {

    if (!state.user?.name) {
      return;
    }
    connectWS()

  }, [state.user?.name])
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AppHeader />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <VideoPlayer />
              <PlaylistQueue />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <SongSubmissionForm />
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Songs in Queue</span>
                    <span className="font-semibold text-white">{state.songs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Users</span>
                    <span className="font-semibold text-white">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Votes</span>
                    <span className="font-semibold text-white"> {state.songs.reduce((acc, song) => acc + song.likes + song.dislikes, 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NowPlayingPopup />

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            © 2024 MusicVote. All rights reserved. Democratizing music, one vote at a time.
          </div>
        </div>
      </footer>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
    </div>
  );
};

export default QueuePage;