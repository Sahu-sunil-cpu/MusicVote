"use client"
import React, { useState } from 'react';
import { Play, User, LogOut, Settings, Wallet, Bell } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const { state, actions } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MusicVote</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#queue" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Queue
              </a>
              <a href="#charts" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Charts
              </a>
              <a href="#rewards" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Rewards
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                How It Works
              </a>
            </nav>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${state.connected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {state.connected ? 'Live' : 'Disconnected'}
                </span>
              </div>

              {state.user ? (
                <>
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="hidden sm:inline font-medium">{state.user.name}</span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{state.user.name}</p>
                          <p className="text-xs text-gray-500">{state.user.email}</p>
                        </div>
                        
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Wallet className="w-4 h-4" />
                          <span>Wallet</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            actions.logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;